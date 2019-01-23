/**
 * Helps to Convert a Promise to a Promise with `cancel` implementation. Helpful to cancel a asynchronous tasks
 * (Promise) in-between.
 * Help taken from https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
 * for better handling of asynchronous fetches and subscriptions
 * @param {Promise} promise POJO Promise object
 * @returns {object} { promise: Promise, cancel: Function }
 *      where promise is a wrapped Promise, that can be canceled using `cancel` method
 */
export default promise => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)),
      error => (hasCanceled_ ? reject({ isCanceled: true }) : reject(error))
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};
