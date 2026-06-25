import type { PropsWithChildren } from 'react';

import styles from './AppLayout.module.scss';

export function AppLayout({ children }: PropsWithChildren) {
  return <main className={styles.shell}>{children}</main>;
}
