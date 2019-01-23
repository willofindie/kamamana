import React from 'react';
import PropTypes from 'prop-types';
import makeCancelable from '/utils/cancelable-promise';

export default class Icon extends React.Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    className: PropTypes.string,
  };
  static defaultProps = {
    icon: 'google',
  };

  state = {
    module: null,
  };

  dynamicPromise = null;

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
