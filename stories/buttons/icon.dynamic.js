import React from 'react';
import { storiesOf } from '@storybook/react';
import Context from '../story-components/context-decorator';
import CenterDecorator from '../story-components/center-decorator';

import Button from '/components/button';

const button = storiesOf('Buttons', module);

button.addDecorator(CenterDecorator);
button.addDecorator(Context);

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
