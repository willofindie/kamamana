import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Flexbox from '/components/flexbox';
import Row from '/components/flexbox/flex-row';
import Column from '/components/flexbox/flex-col';
import Card from '/components/card';
import Form from '/components/form';
import { Input, InputButton } from '/components/form/input';

const form = storiesOf('Form', module);

form.add('simple block form', () => {
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
        <Row>
          <Column>
            <Input
              label='Name: '
              cols='1:6'
              style={{ mb: 15 }}
              name='name'
              placeholder='Enter name'
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <Input
              label='Password: '
              style={{ mb: 15 }}
              htmlType='password'
              name='pass'
              placeholder='Password'
            />
          </Column>
        </Row>
        <Row style={{ jc: 'flex-end' }}>
          <Column style={{ fxg: 0, fxb: 'auto' }}>
            <InputButton text='Submit' />
          </Column>
          <Column style={{ fxg: 0, fxb: 'auto', ta: 'right' }}>
            <InputButton htmlType='reset' text='Reset' />
          </Column>
        </Row>
      </Form>
    </Card>
  );
});

form.add('simple inline form', () => {
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
        <Row gutter='50'>
          <Column>
            <Input
              label='Username: '
              labelSpan='80'
              cols='1:6'
              name='name'
              placeholder='Enter name'
            />
          </Column>
          <Column>
            <Input
              label='Email: '
              labelSpan='50'
              htmlType='email'
              name='email'
              placeholder='Email'
            />
          </Column>
        </Row>
        <Row style={{ mt: 15 }}>
          <Column>
            <Input
              label='Password: '
              labelSpan='86'
              htmlType='password'
              name='pass'
              placeholder='Password'
            />
          </Column>
        </Row>
        <Row style={{ jc: 'flex-end', mt: 15 }}>
          <Column style={{ fxg: 0, fxb: 'auto' }}>
            <InputButton text='Submit' />
          </Column>
          <Column style={{ fxg: 0, fxb: 'auto', ta: 'right' }}>
            <InputButton htmlType='reset' text='Reset' />
          </Column>
        </Row>
      </Form>
    </Card>
  );
});
