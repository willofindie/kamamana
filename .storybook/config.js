import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { withInfo } from '@storybook/addon-info';
import { themes } from '@storybook/components';
import stylesheet from './stylesheet-info';

import Context from './global-decorators/context-decorator';
import CenterDecorator from './global-decorators/center-decorator';

addDecorator(
  withInfo({
    styles: stylesheet,
  })
);

addDecorator(CenterDecorator);
addDecorator(Context);

addDecorator(
  withOptions({
    name: 'Kamamana',
    url: 'https://github.com/willofindie/kamamana/',
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
