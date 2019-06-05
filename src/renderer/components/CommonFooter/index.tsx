import React from 'react';
import styles from './index.less';

const CommonFooter: React.FunctionComponent = () => {
    return (
        <footer className={styles.container}>
            Copyright @
            <a href="https://github.com/nusr" target="_blank">
                nusr
            </a>
        </footer>
    );
};
export default CommonFooter;
