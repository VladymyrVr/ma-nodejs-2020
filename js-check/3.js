const findCharPositionAndDeleteChar = (charToFind, charToDelete, target) => (
    target.split('').filter((symbol, index) => {
        symbol === charToFind && console.log(index + 1);
        return symbol !== charToDelete;
    }).join(''));

let text = 'Hello World';
console.log(findCharPositionAndDeleteChar('o', 'l', text));
