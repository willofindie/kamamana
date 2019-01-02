import React from 'react';
import Center from './center-body';

const CenterDecorator = (storyFn: Function) => <Center>{storyFn()}</Center>;

export default CenterDecorator;
