import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Flexbox from '/components/flexbox';
import Row from '/components/flexbox/flex-row';
import Column from '/components/flexbox/flex-col';
import Card from '/components/card';
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
