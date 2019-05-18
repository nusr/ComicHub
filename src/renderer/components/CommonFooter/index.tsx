import React from 'react';
import styles from './index.less';

export default function CommonFooter() {
    return (
        <footer className={styles.container}>
      Copyright @{' '}
            <a href="https://github.com/nusr" target="_blank">
        nusr
            </a>
        </footer>
    );
}
