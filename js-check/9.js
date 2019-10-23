const wrapTimeoutInPromise = (ms) => new Promise((resolve) =>
    (setTimeout(() => resolve(`Resolve Async`), ms)));

console.log('Sync Action');

wrapTimeoutInPromise(2000).then((result) => console.log(result));
