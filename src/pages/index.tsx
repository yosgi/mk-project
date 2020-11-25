import React from 'react';
import styles from './index.less';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
export default () => {
  return (
    <div>
      <h1 className={styles.title}>
        <Button>hello world</Button>
      </h1>
    </div>
  );
};
