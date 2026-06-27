#!/usr/bin/env bash
set -Eeuo pipefail

APP_NAME="steven-resume"
IMAGE_NAME="${IMAGE_NAME:-steven-resume-web}"
CONTAINER_NAME="${CONTAINER_NAME:-steven-resume-web}"
TAG="${TAG:-latest}"
START_PORT="${START_PORT:-8084}"
END_PORT="${END_PORT:-8099}"
HOST_PORT="${HOST_PORT:-}"

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
ROOT_DIR="$(cd -- "${SCRIPT_DIR}/.." >/dev/null 2>&1 && pwd)"
FRONTEND_DIR="${ROOT_DIR}/frontend"

usage() {
  cat <<USAGE
Deploy ${APP_NAME} frontend with Docker.

Usage:
  ./scripts/deploy.sh [options]

Options:
  --port PORT          Use a specific host port. Fails if the port is already in use.
  --start-port PORT    First port to try when auto-selecting. Default: ${START_PORT}
  --end-port PORT      Last port to try when auto-selecting. Default: ${END_PORT}
  --image NAME         Docker image name. Default: ${IMAGE_NAME}
  --container NAME     Docker container name. Default: ${CONTAINER_NAME}
  --tag TAG            Docker image tag. Default: ${TAG}
  -h, --help           Show this help.

Examples:
  ./scripts/deploy.sh
  ./scripts/deploy.sh --port 8084
  START_PORT=8090 END_PORT=8100 ./scripts/deploy.sh
USAGE
}

fail() {
  echo "Error: $*" >&2
  exit 1
}

require_command() {
  command -v "$1" >/dev/null 2>&1 || fail "Missing required command: $1"
}

is_number() {
  [[ "${1:-}" =~ ^[0-9]+$ ]]
}

validate_port() {
  local port="$1"

  is_number "$port" || fail "Invalid port '${port}'. Port must be numeric."
  (( port >= 1 && port <= 65535 )) || fail "Invalid port '${port}'. Port must be between 1 and 65535."
}

docker_published_port_in_use() {
  local port="$1"

  docker ps --format '{{.Ports}}' 2>/dev/null | grep -Eq "(^|[ :])${port}->"
}

host_port_in_use() {
  local port="$1"

  if command -v ss >/dev/null 2>&1; then
    ss -H -ltn 2>/dev/null | awk '{print $4}' | grep -Eq "[:.]${port}$" && return 0
  fi

  if command -v lsof >/dev/null 2>&1; then
    lsof -nP -iTCP:"${port}" -sTCP:LISTEN >/dev/null 2>&1 && return 0
  fi

  if command -v netstat >/dev/null 2>&1; then
    netstat -ltn 2>/dev/null | awk '{print $4}' | grep -Eq "[:.]${port}$" && return 0
  fi

  return 1
}

port_in_use() {
  local port="$1"

  docker_published_port_in_use "$port" || host_port_in_use "$port"
}

list_docker_ports() {
  local ports

  ports="$(docker ps --format '{{.Ports}}' 2>/dev/null \
    | grep -Eo '([0-9.]+|\[::\]):[0-9]+->' \
    | sed -E 's/.*:([0-9]+)->/\1/' \
    | sort -nu \
    | tr '\n' ' ' || true)"

  echo "${ports:-none}"
}

choose_port() {
  local start="$1"
  local end="$2"
  local preferred="${3:-}"
  local port

  if [[ -n "$preferred" ]]; then
    validate_port "$preferred"
    if ! port_in_use "$preferred"; then
      echo "$preferred"
      return 0
    fi
  fi

  validate_port "$start"
  validate_port "$end"
  (( start <= end )) || fail "--start-port must be less than or equal to --end-port."

  for (( port = start; port <= end; port++ )); do
    if ! port_in_use "$port"; then
      echo "$port"
      return 0
    fi
  done

  fail "No free port found in range ${start}-${end}. Currently published Docker ports: $(list_docker_ports)"
}

container_exists() {
  docker ps -a --format '{{.Names}}' | grep -Fxq "$CONTAINER_NAME"
}

current_container_port() {
  if container_exists; then
    docker port "$CONTAINER_NAME" 80/tcp 2>/dev/null \
      | sed -E 's/.*:([0-9]+)$/\1/' \
      | head -n 1
  fi
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --port)
      [[ $# -ge 2 ]] || fail "--port requires a value."
      HOST_PORT="${2:-}"
      shift 2
      ;;
    --start-port)
      [[ $# -ge 2 ]] || fail "--start-port requires a value."
      START_PORT="${2:-}"
      shift 2
      ;;
    --end-port)
      [[ $# -ge 2 ]] || fail "--end-port requires a value."
      END_PORT="${2:-}"
      shift 2
      ;;
    --image)
      [[ $# -ge 2 ]] || fail "--image requires a value."
      IMAGE_NAME="${2:-}"
      shift 2
      ;;
    --container)
      [[ $# -ge 2 ]] || fail "--container requires a value."
      CONTAINER_NAME="${2:-}"
      shift 2
      ;;
    --tag)
      [[ $# -ge 2 ]] || fail "--tag requires a value."
      TAG="${2:-}"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      fail "Unknown option: $1"
      ;;
  esac
done

require_command docker

[[ -f "${FRONTEND_DIR}/Dockerfile" ]] || fail "Dockerfile not found: ${FRONTEND_DIR}/Dockerfile"
[[ -f "${FRONTEND_DIR}/package-lock.json" ]] || fail "package-lock.json not found: ${FRONTEND_DIR}/package-lock.json"

if [[ -n "$HOST_PORT" ]]; then
  validate_port "$HOST_PORT"
fi

echo "Building ${IMAGE_NAME}:${TAG}..."
docker build -t "${IMAGE_NAME}:${TAG}" -f "${FRONTEND_DIR}/Dockerfile" "${FRONTEND_DIR}"

PREVIOUS_PORT="$(current_container_port || true)"

if container_exists; then
  echo "Replacing existing container ${CONTAINER_NAME}..."
  docker stop "$CONTAINER_NAME" >/dev/null
  docker rm "$CONTAINER_NAME" >/dev/null
fi

if [[ -n "$HOST_PORT" ]]; then
  if port_in_use "$HOST_PORT"; then
    fail "Port ${HOST_PORT} is already in use. Choose another port or omit --port for auto-select."
  fi
  SELECTED_PORT="$HOST_PORT"
else
  SELECTED_PORT="$(choose_port "$START_PORT" "$END_PORT" "$PREVIOUS_PORT")"
fi

echo "Starting ${CONTAINER_NAME} on host port ${SELECTED_PORT}..."
docker run -d \
  --name "$CONTAINER_NAME" \
  --restart unless-stopped \
  -p "0.0.0.0:${SELECTED_PORT}:80" \
  "${IMAGE_NAME}:${TAG}" >/dev/null

echo "Waiting for container health..."
for _ in {1..20}; do
  STATUS="$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "$CONTAINER_NAME" 2>/dev/null || true)"
  if [[ "$STATUS" == "healthy" || "$STATUS" == "running" ]]; then
    break
  fi
  sleep 1
done

STATUS="$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "$CONTAINER_NAME")"
if [[ "$STATUS" != "healthy" && "$STATUS" != "running" ]]; then
  docker logs --tail 80 "$CONTAINER_NAME" >&2 || true
  fail "Container did not become healthy. Current status: ${STATUS}"
fi

echo "Deploy complete."
echo "Container: ${CONTAINER_NAME}"
echo "Image: ${IMAGE_NAME}:${TAG}"
echo "URL: http://localhost:${SELECTED_PORT}"
echo "Published Docker ports in use: $(list_docker_ports)"
