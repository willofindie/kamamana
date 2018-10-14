import { createElement } from 'react';
import styled from 'styled-components';

/**
 * https://twitter.com/_philpl/status/888039838330621953
 * This method helps to dynamically create new React Element based on style-component
 * without the drawbacks of re-rendering styled-component each time a render is called...
 *
 * To render a new component - pass `props.tag` to the Component to be made dynamic, converts to the passed tag node
 * @param {React Component} Component
 */
export const withDynamicTag = Component => {
  const bucket = Object.create(null);
  const name = Component.displayName || Component.constructor.name;

  const DynamicTag = props => {
    const { tag } = props;

    // styled.hasOwnProperty will fail for React Derived Components, normal
    // HTML Tags will work fine here...
    if (typeof tag !== 'string' || !styled.hasOwnProperty(tag)) {
      return createElement(Component, props);
    }

    if (bucket[tag] === undefined) {
      bucket[tag] = Component.withComponent(tag);
      bucket[tag].displayName = `Styled${name}`;
    }
    return createElement(bucket[tag], props);
  };

  if (name) {
    DynamicTag.displayName = `${name}`;
  }

  return DynamicTag;
};
