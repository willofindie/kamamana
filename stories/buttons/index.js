import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import pallete from 'utils/pallete';

import Button from 'components/button';

const button = storiesOf('Buttons', module);

button.add('default', () => <Button text='Click Me' />);
button.add('disabled', () => <Button disabled text='Click Me' />);

export default button;
