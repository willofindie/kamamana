import React from 'react';
import CardStyled from './card-styled';

import type { Props, State, TitleElement, ContentElement } from './index.d';

export default class Card extends React.PureComponent<Props, State> {
  get Title(): ?TitleElement {
    return this.props.title || this.state.title;
  }
  get Content(): ?ContentElement {
    return this.props.content || this.state.content;
  }

  constructor(props: Props) {
    super(props);
    const children = React.Children.toArray(props.children);
    const acceptedChilds: {
      title: ?TitleElement,
      content: ?ContentElement,
    } = {
      title: null,
      content: null,
    };
    Object.keys(acceptedChilds).forEach(key => {
      let filteredChild = null;
      try {
        filteredChild = children.filter(child => child.props.className.includes(key));
      } catch (e) {
        throw e;
      }
      acceptedChilds[key] = filteredChild ? filteredChild[0] : null;
    });
    this.state = {
      title: acceptedChilds.title,
      content: acceptedChilds.content,
    };
  }

  render() {
    return (
      <CardStyled>
        {this.Title}
        {this.Content}
      </CardStyled>
    );
  }
}
