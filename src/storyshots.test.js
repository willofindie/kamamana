import initStoryshots, { multiSnapshotWithOptions } from '@storybook/addon-storyshots';

initStoryshots({
  suite: 'Storyshots',
  integrityOptions: { cwd: __dirname },
  test: multiSnapshotWithOptions({}),
});
