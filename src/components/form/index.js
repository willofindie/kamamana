import React, { PureComponent } from 'react';

import type { Node, ElementRef } from 'react';

type Props = {
  children: Node,
  onSubmit: Function,
  onReset?: Function,
};

class Form extends PureComponent<Props> {
  element: ?ElementRef<'form'>;
  handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    this.props.onSubmit(formData);
  };

  handleReset = (e: SyntheticEvent<HTMLFormElement>) => {
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
