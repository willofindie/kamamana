import React from 'react';
import { storiesOf } from '@storybook/react';
import ColoredLayer from '../story-components/colored-layer';

import Flexbox from '/components/flexbox';
import Row from '/components/flexbox/flex-row';
import Column from '/components/flexbox/flex-col';
import Card from '/components/card';
import CardContent from '/components/card/content';

const flexbox = storiesOf('Flexbox', module);

flexbox.add('2 Columns', () => (
  <Row>
    <Column>
      <Card style={{ c: '#fafafa', bgc: '#388E3C' }}>
        <CardContent>
          Consequat eiusmod laborum officia consequat minim amet esse irure aliqua elit nulla.
        </CardContent>
      </Card>
    </Column>
    <Column>
      <Card style={{ c: '#fafafa', bgc: '#9E9D24' }}>
        <CardContent>
          Lorem eu in cupidatat occaecat occaecat et ea in dolor tempor eu ut exercitation.
        </CardContent>
      </Card>
    </Column>
  </Row>
));
flexbox.add('grid with custom row gutters', () => (
  <Flexbox gutter='50'>
    <Row gutter='18'>
      <Column>
        <Card style={{ c: '#fafafa', bgc: '#388E3C' }}>
          Consequat eiusmod laborum officia consequat minim amet esse irure aliqua elit nulla.
        </Card>
      </Column>
      <Column>
        <Card style={{ c: '#fafafa', bgc: '#9E9D24' }}>
          Lorem eu in cupidatat occaecat occaecat et ea in dolor tempor eu ut exercitation.
        </Card>
      </Column>
    </Row>
    <Row>
      <Column span='3'>
        <Card style={{ c: '#fafafa', bgc: '#9E9D24' }}>
          Lorem eu in cupidatat occaecat occaecat et ea in dolor tempor eu ut exercitation.
        </Card>
      </Column>
      <Column span='3'>
        <Card style={{ c: '#fafafa', bgc: '#388E3C' }}>
          Consequat eiusmod laborum officia consequat minim amet esse irure aliqua elit nulla.
        </Card>
      </Column>
      <Column span='6'>
        <Card style={{ c: '#fafafa', bgc: '#8D6E63' }}>
          Magna in magna non exercitation anim sint eiusmod duis magna adipisicing consectetur aute
          sint. Quis eu non laborum commodo commodo ea esse nostrud. Quis officia aliqua veniam
          dolor in proident Lorem aliquip voluptate excepteur id in tempor occaecat. Incididunt
          deserunt anim ea amet cillum enim deserunt in voluptate eiusmod ipsum commodo cupidatat
          dolor. Cillum ullamco laboris nulla aliqua sint proident voluptate id anim ullamco elit
          esse consequat esse. Veniam pariatur laboris et nisi commodo. Commodo et dolor commodo
          occaecat aliqua excepteur consectetur elit aute. Tempor irure dolore eu officia mollit
          officia. Ut non occaecat laboris anim amet cupidatat. Cillum consequat aliqua proident
          esse veniam ipsum est incididunt incididunt ipsum. Duis id et laboris non. Ad eiusmod
          aliqua reprehenderit Lorem et incididunt in non. Esse ad ad enim aliqua dolor pariatur
          minim aute minim nulla ipsum.
        </Card>
      </Column>
    </Row>
  </Flexbox>
));
flexbox.add('custom column gutter', () => (
  <Row gutter='30'>
    <Column span='4'>
      <Card style={{ c: '#fafafa', bgc: '#B71C1C' }}>
        Consequat eiusmod laborum officia consequat minim amet esse irure aliqua elit nulla.
      </Card>
    </Column>
    <Column span='8'>
      <Card style={{ c: '#fafafa', bgc: '#0D47A1' }}>
        Lorem eu in cupidatat occaecat occaecat et ea in dolor tempor eu ut exercitation.
      </Card>
    </Column>
  </Row>
));

flexbox.add('random aligned', () => (
  <Flexbox>
    <Row>
      <Column span='12'>
        <Card style={{ c: '#fafafa', bgc: '#B71C1C' }}>
          Quis veniam esse ex ex mollit non et nostrud culpa nisi. Proident veniam qui commodo Lorem
          cupidatat exercitation et cillum. Quis reprehenderit culpa eu minim est exercitation anim
          quis enim. Nostrud culpa proident occaecat et id. Ipsum qui quis sunt enim sit ullamco.
          Officia anim anim deserunt cupidatat non duis Lorem labore id laboris culpa quis qui aute.
          Deserunt esse in duis ut aliqua quis in est aute. Proident ad anim dolore Lorem laborum
          consequat do ad reprehenderit adipisicing commodo incididunt duis. Aliquip dolore in
          consectetur nulla in dolore consequat quis et ut sint culpa laborum consectetur. Irure
          reprehenderit do duis dolor sunt elit veniam et nostrud sit. Reprehenderit quis
          exercitation duis adipisicing laborum magna culpa. Quis cillum nisi nostrud occaecat
          cupidatat excepteur nulla. Sunt in ad nulla qui enim tempor tempor aliqua non officia
          exercitation proident.
        </Card>
      </Column>
    </Row>
    <Row>
      <Column style={{ as: 'center' }}>
        <Card style={{ c: '#fafafa', bgc: '#263238' }}>
          Lorem eu in cupidatat occaecat occaecat et ea in dolor tempor eu ut exercitation.
        </Card>
      </Column>
      <Column>
        <Card style={{ bgc: '#FFAB00' }}>
          Nulla dolor consequat occaecat laborum. Dolore id elit fugiat deserunt consectetur tempor
          consequat ex mollit. Voluptate Lorem elit dolor quis cillum do reprehenderit culpa do
          veniam anim. Eiusmod do velit cillum in sit magna cupidatat aliquip. Sit officia eiusmod
          quis do eu anim adipisicing ipsum. Sit nulla ad exercitation eiusmod do ex labore quis
          ullamco deserunt. Sint cupidatat laboris consequat nostrud cupidatat.
        </Card>
      </Column>
    </Row>
  </Flexbox>
));

export default flexbox;
