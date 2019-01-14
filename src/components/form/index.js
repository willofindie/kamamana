import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Form extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func,
  };

  handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    this.props.onSubmit(formData);
  };

  handleReset = e => {
    if (this.props.onReset) {
      this.props.onReset();
      return;
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
        {this.props.children}
      </form>
    );
  }
}

export default Form;
