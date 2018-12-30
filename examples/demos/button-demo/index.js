import React from 'react';
import { Flexbox, Card, CardTitle, Button } from 'kamamana';

class ButtonDemo extends React.Component {
  getTitleNode = () => <CardTitle>Button</CardTitle>;
  render() {
    return (
      <Card title={this.getTitleNode()}>
        <Flexbox cols='1:1:1'>
          <Button text='Primary' />
          <Button type='bordered' text='Bordered' />
          <Button type='ghost' text='Ghost' />
        </Flexbox>
      </Card>
    );
  }
}

export default ButtonDemo;
