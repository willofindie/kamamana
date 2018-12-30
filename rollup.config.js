// For now will support only production builds, as dev can be tested by storybooks
import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import visualizer from 'rollup-plugin-visualizer';

/*
  Might come handly someday, flow rollup libraries are not that good for now...

  import flow from 'rollup-plugin-flow'; Not sure why, but babel automatically removes flow-type, I guess because of the use of flow presets
  import flowEntry from 'rollup-plugin-flow-entry';

  Read on removing flow types later - https://github.com/flowtype/flow-remove-types
 */

// Following helps to resolve absolute paths to src modules, like /components etc.
const root = process.platform === 'win32' ? path.resolve('/') : '/';
const external = id => !id.startsWith('.') && !id.startsWith(root);

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

const getBabelOptions = () => ({
  exclude: '**/node_modules/**',
});

const getPlugins = type => {
  const plugins = [];
  switch (type) {
    case 'esm':
      plugins.push(
        resolve(), // Required for local module resolves
        commonjs({ include: ['**/node_modules/**'] }), // required for cjs format library like nano-css
        babel(getBabelOptions())
      );
      break;
    case 'cjs':
      plugins.push(
        resolve(), // Required for local module resolves
        commonjs({ include: ['**/node_modules/**'] }), // required for cjs format library like nano-css
        babel(getBabelOptions())
      );
      break;
    default:
      // for umd
      plugins.push(
        resolve(),
        commonjs({ include: ['**/node_modules/**'] }),
        babel(getBabelOptions()),
        sizeSnapshot({
          snapshotPath: './.stats/snapshot-stats.umd.json',
        }), // `size-snapshot` works only with umd or cjs, thus it's better to use it only with umd...
        visualizer({
          filename: './.stats/visualizer-stats.html',
          title: `Kamamana v-${pkg.version}`,
        }),
        uglify()
      );
      break;
  }
  return plugins;
};

export default [
  {
    input: `./src/index.js`,
    output: {
      file: pkg.module,
      format: 'esm',
    },
    external,
    plugins: getPlugins('esm'),
  },
  {
    input: `./src/index.js`,
    output: {
      file: pkg.main,
      format: 'cjs',
    },
    external,
    plugins: getPlugins('cjs'),
  },
  {
    input: `./src/index.js`,
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'Kamamana',
      globals,
    },
    external: Object.keys(globals),
    plugins: getPlugins('umd'),
  },
];
