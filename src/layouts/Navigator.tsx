import React from 'react';
import { Nav } from 'react-bootstrap';
import styles from './index.less';
export default props => {
  return (
    <>
      <Nav
        className={`justify-content-end ${styles.navigator}`}
        activeKey="/home"
      >
        <Nav.Item>
          <Nav.Link href="/home">首页</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/products">产品</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/buy">商城</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/story">品牌故事</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/aout">联系我们</Nav.Link>
        </Nav.Item>
      </Nav>
      <div style={{ marginTop: '76px' }}>{props.children}</div>
    </>
  );
};
