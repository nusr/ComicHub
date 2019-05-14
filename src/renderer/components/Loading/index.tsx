import styles from './index.less';
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 30 }} spin />;

export default function() {
  return (
    <div className={styles.loadingWrap}>
      <Spin indicator={antIcon} className={styles.loadingIcon} />
    </div>
  );
}
