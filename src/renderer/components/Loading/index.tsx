import { Icon, Spin } from 'antd';
import styles from './index.less';

const antIcon = <Icon type="loading" style={{ fontSize: 30 }} spin />;

function Loading(props) {
    const { text = '' } = props;
    return (
        <div className={styles.loadingWrap}>
            <Spin indicator={antIcon} className={styles.loadingIcon}>
                {text}
            </Spin>
        </div>
    );
}

export default Loading;
