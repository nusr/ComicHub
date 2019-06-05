import { Icon, Spin } from 'antd';
import styles from './index.less';

interface Props {
    text: string;
}
const Loading: React.FunctionComponent<Props> = ({
    text = '',
}) => {
    return (
        <div className={styles.loadingWrap}>
            <Spin indicator={<Icon type="loading" style={{ fontSize: 30 }} spin />} className={styles.loadingIcon}>
                {text}
            </Spin>
        </div>
    );
};

export default Loading;
