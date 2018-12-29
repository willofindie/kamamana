import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { themes } from '@storybook/components';

addDecorator(
  withOptions({
    name: 'Kamamana',
    url: 'http://shub1427.github.io',
    goFullScreen: false,
    showSearchBox: false,
    addonPanelInRight: true,
  })
);

function loadStories() {
  require('../stories/buttons');
  require('../stories/card');
  require('../stories/flexbox');
}

configure(loadStories, module);
