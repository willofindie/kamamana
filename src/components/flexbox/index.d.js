import type { Node, Element } from 'react';
import FlexItem from './flex-item-styled';

export type ItemElement = Element<typeof FlexItem>;

export type Props = {
  children?: Node,
  cols?: string,
  style: Object,
};

export type State = {
  children?: Array<ItemElement>,
  colSpanList: ?Array<number>,
};
