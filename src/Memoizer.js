// Dynamic Programming - Memoization
export const Memoizer = (function () {
  //Private data
  let cache = {};
  //named functions are awesome!
  const cacher = (func) => {
    return function () {
      const key = JSON.stringify(arguments);
      if (cache[key]) {
        return cache[key];
      } else {
        const val = func.apply(this, arguments);
        cache[key] = val;
        return val;
      }
    };
  };
  //Public data
  return {
    memo: (func) => {
      return cacher(func);
    }
  };
})();
