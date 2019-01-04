import React from 'react';
import { storiesOf } from '@storybook/react';

// FontAwesome Imports...
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIgloo } from '@fortawesome/free-solid-svg-icons';

// Material Icons
import { SvgIcon } from '@material-ui/core';
import { ThreeDRotation } from '@material-ui/icons';
import { CloudDownload } from '@material-ui/icons';

import Icon from '../story-components/icons';
import Button from '/components/button';

library.add(faIgloo);

const button = storiesOf('Buttons/with-icons', module);

button.add('icon and text', () => (
  <Button icon={<Icon icon='google' />} fgcHover='#0277BD' type='bordered' text='Click Me' />
));
button.add('custom icon size', () => (
  <Button
    icon={<Icon icon='google' />}
    iconW='20px'
    iconH='20px'
    fgcHover='#0277BD'
    type='bordered'
    text='Click Me'
  />
));

button.add('3rd-party icon support', () => (
  <div>
    <Button icon={<FontAwesomeIcon icon='igloo' />} text='Font-Awesome' />
    <Button icon={<ThreeDRotation />} text='Material Icons' />
    <Button icon={<CloudDownload />} />
  </div>
));

export default button;
