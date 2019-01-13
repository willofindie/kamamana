/**
 * O(n) complexity for `shallowProps`. so looks ok for now.
 */
export default (newArgs: mixed[], oldArgs: mixed[]): boolean =>
  newArgs.length === oldArgs.length &&
  newArgs.every(
    (newArg: mixed, index: number): boolean => {
      if (newArg && typeof newArg === 'object' && typeof oldArgs[index] === 'object') {
        // this check is very vague, but since I know (for now) args can be either string or object, it will work fine.
        const next: Object = newArg;
        const last: Object = oldArgs[index];
        return Object.keys(next).every(
          // Helps in one level down shallow comparison for objects...
          (key: string): boolean => {
            if (next.hasOwnProperty(key) && last.hasOwnProperty(key)) {
              return next[key] === last[key];
            }
            return false;
          }
        );
      }
      return newArg === oldArgs[index];
    }
  );
