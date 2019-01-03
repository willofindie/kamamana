import React from 'react';
import makeCancelable from '/utils/cancelable-promise';

import type { CancelablePromise } from '/utils/cancelable-promise';
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

  dynamicPromise: ?CancelablePromise = null;

  componentDidMount() {
    if (this.props.icon) {
      this.dynamicPromise = makeCancelable(import(`./${this.props.icon}`));
      this.dynamicPromise.promise
        .then(module => {
          this.setState({ module: module.default });
        })
        .catch(rejected => {
          console.log('Got Canceled: ', !!rejected.isCanceled);
        });
    }
  }

  componentWillUnmount() {
    if (this.dynamicPromise) {
      this.dynamicPromise.cancel();
    }
  }

  render() {
    const { icon, className, ...rest } = this.props;
    const { module: Component } = this.state;
    return Component ? <Component className={className} {...rest} /> : null;
  }
}
