import React from 'react';
import { storiesOf } from '@storybook/react';
import CenterDecorator from '../story-components/center-decorator';
import ColoredLayer from '../story-components/colored-layer';

import Flexbox from '/components/flexbox';
import FlexItem from '/components/flexbox/flex-item-styled';
import Card from '/components/card';
import CardContent from '/components/card/content';

const flexbox = storiesOf('Flexbox', module);

flexbox.addDecorator(CenterDecorator);
flexbox.add('2 Columns, without gutters', () => (
  <Flexbox cols='1:1'>
    <Card style={{ c: '#fafafa', bgc: '#388E3C' }}>
      <CardContent>
        Consequat eiusmod laborum officia consequat minim amet esse irure aliqua elit nulla.
      </CardContent>
    </Card>
    <FlexItem>
      <Card style={{ c: '#fafafa', bgc: '#9E9D24' }}>
        <CardContent>
          Lorem eu in cupidatat occaecat occaecat et ea in dolor tempor eu ut exercitation.
        </CardContent>
      </Card>
    </FlexItem>
  </Flexbox>
));
flexbox.add('2X2 Grid, custom gutters', () => (
  <Flexbox style={{ fxd: 'column' }}>
    <Flexbox cols='1:1'>
      <Card style={{ c: '#fafafa', bgc: '#388E3C' }}>
        Consequat eiusmod laborum officia consequat minim amet esse irure aliqua elit nulla.
      </Card>
      <Card style={{ c: '#fafafa', bgc: '#9E9D24' }} itemStyle={{ ml: 15 }}>
        Lorem eu in cupidatat occaecat occaecat et ea in dolor tempor eu ut exercitation.
      </Card>
    </Flexbox>
    <Flexbox cols='1:1' style={{ mt: 15 }}>
      <Card style={{ c: '#fafafa', bgc: '#9E9D24' }}>
        Lorem eu in cupidatat occaecat occaecat et ea in dolor tempor eu ut exercitation.
      </Card>
      <Card style={{ c: '#fafafa', bgc: '#388E3C' }} itemStyle={{ ml: 15 }}>
        Consequat eiusmod laborum officia consequat minim amet esse irure aliqua elit nulla.
      </Card>
    </Flexbox>
  </Flexbox>
));
flexbox.add('nested grids', () => (
  <Flexbox style={{ fxd: 'column' }}>
    <Flexbox style={{ bgc: '#BBDEFB', p: 15 }} cols='1:3'>
      <Card style={{ c: '#fafafa', bgc: '#B71C1C' }}>
        Consequat eiusmod laborum officia consequat minim amet esse irure aliqua elit nulla.
      </Card>
      <Card style={{ c: '#fafafa', bgc: '#0D47A1' }} itemStyle={{ ml: 15 }}>
        Lorem eu in cupidatat occaecat occaecat et ea in dolor tempor eu ut exercitation.
      </Card>
    </Flexbox>
  </Flexbox>
));
flexbox.add('vertical aligned', () => (
  <Flexbox style={{ fxd: 'column' }}>
    <Card style={{ c: '#fafafa', bgc: '#B71C1C' }}>
      Quis veniam esse ex ex mollit non et nostrud culpa nisi. Proident veniam qui commodo Lorem
      cupidatat exercitation et cillum. Quis reprehenderit culpa eu minim est exercitation anim quis
      enim. Nostrud culpa proident occaecat et id. Ipsum qui quis sunt enim sit ullamco. Officia
      anim anim deserunt cupidatat non duis Lorem labore id laboris culpa quis qui aute. Deserunt
      esse in duis ut aliqua quis in est aute. Proident ad anim dolore Lorem laborum consequat do ad
      reprehenderit adipisicing commodo incididunt duis. Aliquip dolore in consectetur nulla in
      dolore consequat quis et ut sint culpa laborum consectetur. Irure reprehenderit do duis dolor
      sunt elit veniam et nostrud sit. Reprehenderit quis exercitation duis adipisicing laborum
      magna culpa. Quis cillum nisi nostrud occaecat cupidatat excepteur nulla. Sunt in ad nulla qui
      enim tempor tempor aliqua non officia exercitation proident.
    </Card>
    <Card style={{ c: '#fafafa', bgc: '#0D47A1' }} itemStyle={{ mt: 15 }}>
      Lorem eu in cupidatat occaecat occaecat et ea in dolor tempor eu ut exercitation.
    </Card>
  </Flexbox>
));

flexbox.add('random aligned', () => (
  <Flexbox style={{ fxd: 'column' }}>
    <Card style={{ c: '#fafafa', bgc: '#B71C1C' }}>
      Quis veniam esse ex ex mollit non et nostrud culpa nisi. Proident veniam qui commodo Lorem
      cupidatat exercitation et cillum. Quis reprehenderit culpa eu minim est exercitation anim quis
      enim. Nostrud culpa proident occaecat et id. Ipsum qui quis sunt enim sit ullamco. Officia
      anim anim deserunt cupidatat non duis Lorem labore id laboris culpa quis qui aute. Deserunt
      esse in duis ut aliqua quis in est aute. Proident ad anim dolore Lorem laborum consequat do ad
      reprehenderit adipisicing commodo incididunt duis. Aliquip dolore in consectetur nulla in
      dolore consequat quis et ut sint culpa laborum consectetur. Irure reprehenderit do duis dolor
      sunt elit veniam et nostrud sit. Reprehenderit quis exercitation duis adipisicing laborum
      magna culpa. Quis cillum nisi nostrud occaecat cupidatat excepteur nulla. Sunt in ad nulla qui
      enim tempor tempor aliqua non officia exercitation proident.
    </Card>
    <Flexbox cols='1:1' style={{ mt: 15 }}>
      <Card itemStyle={{ as: 'center' }} style={{ c: '#fafafa', bgc: '#263238' }}>
        Lorem eu in cupidatat occaecat occaecat et ea in dolor tempor eu ut exercitation.
      </Card>
      <Card style={{ bgc: '#FFAB00' }} itemStyle={{ ml: 15 }}>
        Nulla dolor consequat occaecat laborum. Dolore id elit fugiat deserunt consectetur tempor
        consequat ex mollit. Voluptate Lorem elit dolor quis cillum do reprehenderit culpa do veniam
        anim. Eiusmod do velit cillum in sit magna cupidatat aliquip. Sit officia eiusmod quis do eu
        anim adipisicing ipsum. Sit nulla ad exercitation eiusmod do ex labore quis ullamco
        deserunt. Sint cupidatat laboris consequat nostrud cupidatat.
      </Card>
    </Flexbox>
  </Flexbox>
));

export default flexbox;
