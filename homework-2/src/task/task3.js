const wrapTimeoutInPromise = (timer, text) =>
    new Promise((resolve) => setTimeout(() => resolve(`${text}`), timer));

module.exports = wrapTimeoutInPromise(3000, 'u wasted 3 seconds of your life');
