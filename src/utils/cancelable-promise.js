// Help taken from https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
// for better handling of asynchronous fetches and subscriptions
export type CancelablePromise = { promise: Promise<any>, cancel: Function };
export default (promise: Promise<any>): CancelablePromise => {
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
