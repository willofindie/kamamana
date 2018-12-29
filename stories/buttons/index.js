import React from 'react';
import { storiesOf } from '@storybook/react';
import CenterDecorator from '../story-components/center-decorator';

import Button from 'components/button';

const button = storiesOf('Buttons', module);

button.addDecorator(CenterDecorator);
button.add('default', () => <Button text='Click Me' />);
button.add('bordered', () => <Button type='bordered' text='Click Me' />);
button.add('ghost', () => (
  <div style={{ padding: '15px 13px 3px', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
    <Button type='ghost' text='Click Me' />
  </div>
));
button.add('disabled', () => <Button disabled text='Click Me' />);

export default button;
