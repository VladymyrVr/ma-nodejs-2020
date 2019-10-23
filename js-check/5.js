const data = '21345A67098';

console.log(data.split('').filter(item => Number(item) && item % 2 === 0).join(''));
