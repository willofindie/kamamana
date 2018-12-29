import React from 'react';
import type { Props as WrapperProps } from './wrapper-styled';

export type Props = {
  icon: string,
  className?: string,
};

export type State = {
  module: ?Function,
};

export default class Icon extends React.Component<Props & WrapperProps, State> {
  state = {
    module: null,
  };

  componentDidMount() {
    this.props.icon &&
      import(`./${this.props.icon}`).then(module => {
        this.setState({ module: module.default });
      });
  }

  render() {
    const { icon, className, ...rest } = this.props;
    const { module: Component } = this.state;
    return Component ? <Component className={className} {...rest} /> : null;
  }
}
