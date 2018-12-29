import React from 'react';
import { storiesOf } from '@storybook/react';
import CenterDecorator from '../story-components/center-decorator';

import Card from 'components/card';
import CardContent from 'components/card/content';
import CardTitle from 'components/card/title';

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

export default card;
