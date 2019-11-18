const { sumFunction: sum, earthInstance, timeoutPromise } = require('./task');

const boot = async () => {
    const resultOfSum = await sum;
    console.log(resultOfSum);

    const resultOfTimeoutPromise = await timeoutPromise;
    console.log(resultOfTimeoutPromise);

    const resultOfDetailInfoAboutPlanet = await earthInstance.getDetailsOfPlaten();
    console.log(resultOfDetailInfoAboutPlanet);
};

boot().then();
