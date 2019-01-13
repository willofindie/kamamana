import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

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
  return (
    <Form
      onSubmit={formData => {
        for (var [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
        action('form:onSubmit')(formData);
      }}
    >
      <Input name='name' placeholder='Enter name' />
      <Input htmlType='password' name='pass' placeholder='Password' />
      <InputButton text='Submit' />
      <InputButton htmlType='reset' text='Reset' />
    </Form>
  );
});
