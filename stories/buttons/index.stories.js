import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '/components/button';

const button = storiesOf('Buttons', module);

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

export default button;
