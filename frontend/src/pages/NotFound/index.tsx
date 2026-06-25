import { Link } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

import styles from './NotFound.module.scss';

export function NotFound() {
  return (
    <section className={styles.page}>
      <div className={styles.content}>
        <p className={styles.status}>404</p>
        <h1>Page not found</h1>
        <Link className={styles.link} to={ROUTES.home}>
          Back home
        </Link>
      </div>
    </section>
  );
}
