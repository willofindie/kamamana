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

const req = require.context('../stories', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
  // Not sure why, but dynamic imports are not working properly with auto
  // loading of story Modules
  require('../stories/buttons/icon.dynamic');
}

configure(loadStories, module);
