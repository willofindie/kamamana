import React from 'react';
import { storiesOf } from '@storybook/react';
import CenterDecorator from '../story-components/center-decorator';
import ColoredLayer from '../story-components/colored-layer';

import Flexbox from 'components/flexbox';
import FlexItem from 'components/flexbox/flex-item-styled';

const flexbox = storiesOf('Flexbox', module);

flexbox.addDecorator(CenterDecorator);
flexbox.add('2 Columns, without gutters', () => (
  <Flexbox cols={2}>
    <ColoredLayer bgc='#388E3C'>
      Consequat eiusmod laborum officia consequat minim amet esse irure aliqua elit nulla.
    </ColoredLayer>
    <FlexItem>
      <ColoredLayer bgc='#9E9D24'>
        Lorem eu in cupidatat occaecat occaecat et ea in dolor tempor eu ut exercitation.
      </ColoredLayer>
    </FlexItem>
  </Flexbox>
));
flexbox.add('2X2 Grid, custom gutters', () => (
  <Flexbox style={{ fxd: 'column' }}>
    <Flexbox cols={2}>
      <ColoredLayer bgc='#388E3C'>
        Consequat eiusmod laborum officia consequat minim amet esse irure aliqua elit nulla.
      </ColoredLayer>
      <ColoredLayer itemStyle={{ ml: 15 }} bgc='#9E9D24'>
        Lorem eu in cupidatat occaecat occaecat et ea in dolor tempor eu ut exercitation.
      </ColoredLayer>
    </Flexbox>
    <Flexbox cols={2} style={{ mt: 15 }}>
      <ColoredLayer bgc='#9E9D24'>
        Lorem eu in cupidatat occaecat occaecat et ea in dolor tempor eu ut exercitation.
      </ColoredLayer>
      <ColoredLayer itemStyle={{ ml: 15 }} bgc='#388E3C'>
        Consequat eiusmod laborum officia consequat minim amet esse irure aliqua elit nulla.
      </ColoredLayer>
    </Flexbox>
  </Flexbox>
));

export default flexbox;
