import { isObject } from './validators';
/**
 * Shallowly Compares an Object to one level down.
 * O(n) complexity for `shallowProps`. so looks ok for now.
 * @param {Array<any>} newArgs New Arguments that needs to compared to `oldArgs`
 * @param {Array<any>} oldArgs Old Arguments
 * @returns {boolean} True if shallow comparison passes for every argument.
 */
export default (newArgs, oldArgs) =>
  newArgs.length === oldArgs.length &&
  newArgs.every((newArg, index) => {
    if (isObject(newArg) && isObject(oldArgs[index])) {
      return Object.keys(newArg).every(
        // Helps in one level down shallow comparison for objects...
        key => {
          if (newArg.hasOwnProperty(key) && oldArgs[index].hasOwnProperty(key)) {
            return newArg[key] === oldArgs[index][key];
          }
          return false;
        }
      );
    }
    return newArg === oldArgs[index];
  });
