export default (obj: Object = {}): Object => {
  const definedKeys = Object.keys(obj).filter(key => !!key);
  return definedKeys.reduce((filtered: Object, key: string | number) => {
    filtered[key] = obj[key];
    return filtered;
  }, {});
};
