import React from 'react';
import styles from './index.less';

const CommonFooter: React.FunctionComponent = () => (
  <footer className={styles.container}>
    <span>Copyright&nbsp;@</span>
    &nbsp;
    <a href="https://github.com/nusr" target="_blank" rel="noopener noreferrer">
      nusr
    </a>
  </footer>
);
export default CommonFooter;
