const vegetables = ['potato', 'tomato', 'cucumber'];
const fruits = ['apple', 'pineapple', 'banana'];

const checkValueOfArrays = (firstArray, secondArray, searchValue) => {
    return firstArray.find(item => item === searchValue)
        ? 'vegetables'
        : secondArray.find(item => item === searchValue)
            ? 'fruits'
            : 'Not Found in any of Arrays'
};

console.log(checkValueOfArrays(vegetables, fruits, 'cucumber'));

const checkValueOfArraysWithSwitchCondition = (firstArray, secondArray, searchValue) => {
    switch (firstArray.some(item => item === searchValue)) {
        case true:
            return 'vegetables';
        case false:
            switch (secondArray.some(item => item === searchValue)) {
                case true:
                    return 'fruits';
                case false:
                    return 'Not Found in any of Arrays'
            }
    }
};

console.log(checkValueOfArraysWithSwitchCondition(vegetables, fruits, 'cucumber'));
