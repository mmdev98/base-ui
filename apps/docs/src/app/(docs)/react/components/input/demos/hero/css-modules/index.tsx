import { Input } from '@mmdev98/base-ui-plus/input';
import styles from './index.module.css';

export default function ExampleInput() {
  return (
    <label className={styles.Label}>
      Name
      <Input placeholder="e.g. Colm Tuite" className={styles.Input} />
    </label>
  );
}
