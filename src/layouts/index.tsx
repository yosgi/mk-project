import { IRouteComponentProps } from 'umi';
import React from 'react';
import Navigator from './Navigator';
export default function Layout({
  children,
  location,
  route,
  history,
  match,
}: IRouteComponentProps) {
  return <Navigator></Navigator>;
}
