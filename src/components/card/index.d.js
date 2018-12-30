import type { Node, Element } from 'react';
import Title from './title';
import Content from './content';

export type TitleElement = Element<typeof Title>;
export type ContentElement = Element<typeof Content>;
export type Props = {
  title?: TitleElement,
  content?: ContentElement,
  style: Object,
  children?: Node,
};

export type State = {
  title: ?TitleElement,
  content: ?ContentElement,
};
