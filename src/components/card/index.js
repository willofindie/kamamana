import React from 'react';
import defaultTheme from '/src/theme';
import CardStyled from './card-styled';
import CardTitle from './title';
import CardContent from './content';

import type { Props, State, TitleElement, ContentElement } from './index.d';

type AcceptedChildren = {
  title: ?TitleElement,
  content: ?ContentElement,
};

export default class Card extends React.PureComponent<Props, State> {
  static defaultProps = {
    style: {
      c: defaultTheme.fadedBlack,
      bgc: defaultTheme.fadedWhite,
    },
  };
  get Title(): ?TitleElement {
    return this.props.title || this.state.title;
  }
  get Content(): ?ContentElement {
    return this.props.content || this.state.content;
  }

  // Helps in filtering <CardTitle /> Children into `title`, and all other unknown childrens
  // Wrapped with <CardContent /> or not, are filtered into `content`.
  // User should eaither use <CardContent /> explicitly for each children as a wrapper, or should
  // not use at all. If not sone so, unexpected results might come.
  getAcceptedChildren = ({ children }: Props): AcceptedChildren => {
    const childArray = React.Children.toArray(children);
    const acceptedChilds = childArray.reduce(
      (acceptedChilds, child) => {
        if (child.type === CardTitle) {
          acceptedChilds.title = child;
          return acceptedChilds;
        } else if (child.type === CardContent) {
          acceptedChilds.content = child;
        }
        // accept everything else as Content Type, this will happen only if <CardContent /> is now explicitly set
        // as a child to <Card />
        acceptedChilds.contentWithoutType.push(child);
        return acceptedChilds;
      },
      { title: null, content: undefined, contentWithoutType: [] }
    );
    if (!acceptedChilds.content) {
      acceptedChilds.content = <CardContent>{acceptedChilds.contentWithoutType}</CardContent>;
    }
    return {
      title: acceptedChilds.title,
      content: acceptedChilds.content,
    };
  };

  constructor(props: Props) {
    super(props);

    const acceptedChilds = this.getAcceptedChildren(props);

    this.state = {
      title: acceptedChilds.title,
      content: acceptedChilds.content,
    };
  }

  render() {
    return (
      <CardStyled css={this.props.style}>
        {this.Title &&
          // Pass default color/bgc styles to child, if parent has something different from default...
          React.cloneElement(
            this.Title,
            {
              style: {
                c: this.props.style.c,
                bgc: this.props.style.bgc,
                ...this.Title.props.style,
              },
            },
            this.Title.props.children
          )}
        {this.Content &&
          React.cloneElement(
            this.Content,
            {
              style: {
                c: this.props.style.c,
                bgc: this.props.style.bgc,
                ...this.Content.props.style,
              },
            },
            this.Content.props.children
          )}
      </CardStyled>
    );
  }
}
