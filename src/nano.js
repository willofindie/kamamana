import { createElement } from 'react';
import { create } from 'nano-css';
// Addons
import { addon as addonCache } from 'nano-css/addon/cache';
import { addon as addonNesting } from 'nano-css/addon/nesting';
import { addon as addonRule } from 'nano-css/addon/rule';
import { addon as addonJsx } from 'nano-css/addon/jsx';

const nano = create({
  pfx: 'kamamana-',
  h: createElement,
});

// Add addons you would like to use.
addonCache(nano);
addonNesting(nano);
addonRule(nano);
addonJsx(nano);

const { rule, jsx } = nano;

export { nano, rule, jsx };
