import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Flexbox from '/components/flexbox';
import FlexItem from '/components/flexbox/flex-item-styled';
import Card from '/components/card';
import Form from '/components/form';
import { Input, InputButton } from '/components/form/input';

// Material Icons
import { SvgIcon } from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';

const buttons = storiesOf('Form/Buttons', module);

buttons.add('default', () => {
  return <InputButton text='Submit' />;
});
buttons.add('icons', () => <InputButton icon={<CloudDownload />} text='Material Icons' />);
buttons.add('bordered', () => <InputButton type='bordered' text='Click Me' />);
buttons.add('ghost', () => (
  <div style={{ padding: '15px 13px 3px', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
    <InputButton type='ghost' text='Click Me' />
  </div>
));
buttons.add('disabled', () => <InputButton disabled text='Click Me' />);
buttons.add('inside form', () => {
  // Need to handle the layout thing, it becomes very complicated after some time...
  return (
    <Card>
      <Form
        onSubmit={formData => {
          for (var [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
          }
          action('form:onSubmit')(formData);
        }}
      >
        <Flexbox style={{ fxd: 'column' }}>
          <Input label='Name: ' style={{ mb: 15 }} name='name' placeholder='Enter name' />
          <Input
            label='Password: '
            style={{ mb: 15 }}
            htmlType='password'
            name='pass'
            placeholder='Password'
          />
          <Flexbox style={{ jc: 'flex-end' }}>
            <FlexItem style={{ fxg: 0, fxb: 'auto' }}>
              <InputButton text='Submit' />
            </FlexItem>
            <FlexItem style={{ fxg: 0, fxb: 'auto', ta: 'right' }}>
              <InputButton htmlType='reset' text='Reset' />
            </FlexItem>
          </Flexbox>
        </Flexbox>
      </Form>
    </Card>
  );
});
