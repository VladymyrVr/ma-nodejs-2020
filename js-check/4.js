const objectForCopy = { name: 'Object D' };

class IdentifyObject {
    constructor(name) {
        this.name = name;
    }
}

const firstObject = Object.create({}, {
    'name': {
        value: 'Object A',
        writable: true,
        enumerable: true
    }
});
const secondObject = { name: 'Object B' };
const thirdObject = new Object();
const fourthObject = Object.assign({}, objectForCopy);
thirdObject.name = 'Object C';
const fifthObject = new IdentifyObject('Object E');

console.log(firstObject);
console.log(secondObject);
console.log(thirdObject);
console.log(fourthObject);
console.log(fifthObject);
