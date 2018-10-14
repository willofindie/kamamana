import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import pallete from '../../src/utils/pallete';

import Button from '../../src/components/button';

const button = storiesOf('Buttons', module);

button.add('default', () => (
  <Button
    text='Click Me'
  />
));

export default button;
