import React from 'react';
import { storiesOf } from '@storybook/react';
import Context from '../story-components/context-decorator';
import CenterDecorator from '../story-components/center-decorator';

import Button from '/components/button';

const button = storiesOf('Buttons', module);

button.addDecorator(CenterDecorator);
button.addDecorator(Context);
button.add('default', () => <Button text='Click Me' />);
button.add('bordered', () => <Button type='bordered' text='Click Me' />);
button.add('ghost', () => (
  <div style={{ padding: '15px 13px 3px', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
    <Button type='ghost' text='Click Me' />
  </div>
));
button.add('disabled', () => <Button disabled text='Click Me' />);
button.add('custom', () => (
  <Button
    style={{ bdrs: 100, c: '#E65100', bgc: '#FFAB00', fz: 24, fw: 'bold', p: '5px 20px' }}
    fgcHover='#FFAB00'
    bgcHover='#E65100'
    text='Click Me'
  />
));
button.add('with icon', () => (
  <Button icon='google' fgcHover='#0277BD' type='bordered' text='Click Me' />
));
button.add('with custom icon size', () => (
  <Button
    icon='google'
    iconW='20px'
    iconH='20px'
    fgcHover='#0277BD'
    type='bordered'
    text='Click Me'
  />
));
export default button;
