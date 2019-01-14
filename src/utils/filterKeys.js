/**
 * Filters Keys from the passed `obj` which are null/undefined, kind of like `delete obj[key]`
 * @param {object} obj Object that needs to be filtered from null/undefined keys
 * @returns {object} Filtered Object, that is free of null/undefined keys
 */
export default (obj = {}) => {
  const definedKeys = Object.keys(obj).filter(key => !(obj[key] == null));
  return definedKeys.reduce(
    /**
     * @param {object} filtered Accumulator
     * @param {string | number} key
     */
    (filtered, key) => {
      filtered[key] = obj[key];
      return filtered;
    },
    {}
  );
};
