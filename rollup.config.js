// For now will support only production builds, as dev can be tested by storybooks
import _package from './package.json';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import visualizer from 'rollup-plugin-visualizer';

/*
  Might come handly someday, flow rollup libraries are not that good for now...

  import flow from 'rollup-plugin-flow';
  import flowEntry from 'rollup-plugin-flow-entry';

  Read on removing flow types later - https://github.com/flowtype/flow-remove-types
 */

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

const getBabelOptions = ({ useESModules }) => ({
  exclude: '**/node_modules/**',
  plugins: ['transform-flow-strip-types'],
});

const getPlugins = () => {
  const plugins = [
    resolve(),
    babel(getBabelOptions({ useESModules: true })),
    commonjs({ include: '**/node_modules/**' }),
  ];

  plugins.push(
    sizeSnapshot({
      snapshotPath: './.stats/snapshot-stats.json',
    })
  ); // Can be put under some condition for faster builds
  plugins.push(uglify());
  plugins.push(
    visualizer({
      filename: './.stats/visualizer-stats.html',
      title: `Kamamana v-${_package.version}`,
      sourcemap: process.env.NODE_ANALYZE === '1' ? true : false,
    })
  );
  return plugins;
};

export default {
  input: `./src/index.js`,
  output: {
    file: `dist/index.min.js`,
    format: 'cjs',
    name: 'Kamamana',
    globals,
    sourcemap: process.env.NODE_ANALYZE === '1' ? true : false,
  },
  external: Object.keys(globals),
  plugins: getPlugins(),
};
