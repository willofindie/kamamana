import React from 'react';
import { storiesOf } from '@storybook/react';

import { Input } from '/components/form/input';

const input = storiesOf('Form/Input', module);

input.add('default', () => {
  return <Input placeholder='Enter Name' />;
});
input.add('with default value', () => {
  return <Input defaultValue='Kamamana' placeholder='Enter Name' />;
});
input.add('with label', () => {
  return <Input label='Name' />;
});
input.add('custom input color', () => {
  return (
    <Input inputStyle={{ bdc: '#795548' }} bdcHover='#D84315' placeholder={`isn't this AWESOME`} />
  );
});
input.add('different accepted input types', () => {
  return (
    <div>
      <Input placeholder='Text Type' />
      <Input htmlType='password' placeholder='Password Type' />
      <Input htmlType='email' placeholder='Email Type' />
      <Input htmlType='number' placeholder={`It's not a Number Type`} />
    </div>
  );
});
