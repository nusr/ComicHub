import { Icon, Spin } from 'antd';
import styles from './index.less';

const antIcon = <Icon type="loading" style={{ fontSize: 30 }} spin />;

export default function() {
    return (
        <div className={styles.loadingWrap}>
            <Spin indicator={antIcon} className={styles.loadingIcon} />
        </div>
    );
}
