const first = [1, 2, 3, 4, 5];
const second = [6, 7, 8, 9, 0];

const arrayMirrorReflection = (firstArray, secondArray) => {
    const arrayLength = firstArray.length - 1;
    let resultArray = [];

    for (let index = 0; index < firstArray.length; index++) {
        resultArray = [
            ...resultArray,
            firstArray[arrayLength - index],
            secondArray[arrayLength - index]
        ]
    }

    return resultArray;
};

console.log(arrayMirrorReflection(first, second));
