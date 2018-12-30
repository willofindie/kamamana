import React from 'react';
import { storiesOf } from '@storybook/react';
import CenterDecorator from '../story-components/center-decorator';

import Card from '/components/card';
import CardContent from '/components/card/content';
import CardTitle from '/components/card/title';

const card = storiesOf('Cards', module);

card.addDecorator(CenterDecorator);
card.add('default', () => (
  <Card title={<CardTitle>Lorem Ipsum Doler</CardTitle>}>
    <CardContent>
      Eu sint anim ex adipisicing magna proident proident exercitation non mollit et. Reprehenderit
      cupidatat est qui ut ipsum proident sunt non eiusmod. Voluptate esse pariatur dolor fugiat
      pariatur reprehenderit irure consequat. Laboris exercitation tempor dolore dolor dolore. In
      non officia velit nostrud nostrud.
    </CardContent>
  </Card>
));
card.add('without any wrapper', () => (
  <Card title={<CardTitle>Lorem Ipsum Doler</CardTitle>}>
    <p>
      Eu sint anim ex adipisicing magna proident proident exercitation non mollit et. Reprehenderit
      cupidatat est qui ut ipsum proident sunt non eiusmod. Voluptate esse pariatur dolor fugiat
      pariatur reprehenderit irure consequat. Laboris exercitation tempor dolore dolor dolore. In
      non officia velit nostrud nostrud.
    </p>
    <p>
      Commodo tempor eiusmod adipisicing ipsum dolor exercitation aliqua amet exercitation non.
      Aliqua do nisi ad sint veniam dolor nostrud irure sit cupidatat. Minim anim velit qui elit
      excepteur nulla culpa Lorem. Aliqua velit eu ut consectetur exercitation dolore ea nostrud
      consequat. Aliqua consequat eiusmod pariatur mollit dolor amet ipsum elit laborum magna cillum
      culpa ex tempor.
    </p>
  </Card>
));
card.add('custom styles', () => (
  <Card style={{ c: '#fafafa', bgc: '#B71C1C' }} title={<CardTitle>Lorem Ipsum Doler</CardTitle>}>
    <p>
      Eu sint anim ex adipisicing magna proident proident exercitation non mollit et. Reprehenderit
      cupidatat est qui ut ipsum proident sunt non eiusmod. Voluptate esse pariatur dolor fugiat
      pariatur reprehenderit irure consequat. Laboris exercitation tempor dolore dolor dolore. In
      non officia velit nostrud nostrud.
    </p>
    <p>
      Commodo tempor eiusmod adipisicing ipsum dolor exercitation aliqua amet exercitation non.
      Aliqua do nisi ad sint veniam dolor nostrud irure sit cupidatat. Minim anim velit qui elit
      excepteur nulla culpa Lorem. Aliqua velit eu ut consectetur exercitation dolore ea nostrud
      consequat. Aliqua consequat eiusmod pariatur mollit dolor amet ipsum elit laborum magna cillum
      culpa ex tempor.
    </p>
  </Card>
));

export default card;
