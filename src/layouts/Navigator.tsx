import React from 'react';
import { Nav } from 'react-bootstrap';
export default () => {
  return (
    <Nav className="justify-content-end" activeKey="/home">
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
  );
};
