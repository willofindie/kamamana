import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '/components/button';

const button = storiesOf('Buttons', module);

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
