import React from 'react';
import { Flexbox, Card, CardTitle, Input, Button } from 'kamamana';

class InputTextDemo extends React.Component {
  state = {
    isDefault: false,
  };
  getTitleNode = () => <CardTitle>Memoized Input Test</CardTitle>;
  toggleDefault = () => {
    this.setState(prevState => ({ isDefault: !prevState.isDefault }));
  };
  getColor = () => (this.state.isDefault ? '#827717' : '#1B5E20');
  getInvertColor = () => (this.state.isDefault ? '#1B5E20' : '#827717');
  render() {
    const color = this.getColor();
    const inputStyle = { bdc: color };
    const buttonStyle = { bgc: color };
    return (
      <Card title={this.getTitleNode()}>
        <Flexbox cols='1:1'>
          <Input inputStyle={inputStyle} bdcHover={inputStyle.bdc} placeholder='Memoized' />
          <Button
            style={buttonStyle}
            onClick={this.toggleDefault}
            text={`Change to ${this.getInvertColor()}`}
          />
        </Flexbox>
      </Card>
    );
  }
}

export default InputTextDemo;
