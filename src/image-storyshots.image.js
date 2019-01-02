import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

// Since this test will take a hell lot of time, keeping it in a separate test...
initStoryshots({
  suite: 'Image storyshots',
  test: imageSnapshot({
    storybookUrl: 'file:///home/subroto/Subroto/projects/kamamana/.out',
  }),
});
