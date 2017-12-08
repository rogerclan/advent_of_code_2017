/*
--- Day 8: I Heard You Like Registers ---

You receive a signal directly from the CPU. Because of your recent assistance with jump 
instructions, it would like you to compute the result of a series of unusual register 
instructions.

Each instruction consists of several parts: the register to modify, whether to increase 
or decrease that register's value, the amount by which to increase or decrease it, 
and a condition. If the condition fails, skip the instruction without modifying 
the register. The registers all start at 0. The instructions look like this:

b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10
These instructions would be processed as follows:

Because a starts at 0, it is not greater than 1, and so b is not modified.
a is increased by 1 (to 1) because b is less than 5 (it is 0).
c is decreased by -10 (to 10) because a is now greater than or equal to 1 (it is 1).
c is increased by -20 (to -10) because c is equal to 10.
After this process, the largest value in any register is 1.

You might also encounter <= (less than or equal to) or != (not equal to). However, 
the CPU doesn't have the bandwidth to tell you what all the registers are named, 
and leaves that to you to determine.

What is the largest value in any register after completing the instructions in your 
puzzle input? 

Your puzzle answer was 4888.

--- Part Two ---

To be safe, the CPU also needs to know the highest value held in any register during 
this process so that it can decide how much memory to allocate to these operations. 
For example, in the above instructions, the highest value ever held was 10 (in 
register c after the third instruction was evaluated).  

Your puzzle answer was 7774.

*/
let input = require('./input');

let seq = input.split('\n');

let register = [];
let highestValue = 0;

function findOrCreate(id) {
    let item = null;
    for(let i = 0; i < register.length; i++) {
        if(register[i].id === id) {
            item = register[i];
            break;
        }
    }
    if(item === null) {
        item = {
            id: id,
            value: 0
        }
        register.push(item)
    }

    return item;
}

function parseLine(index) {
    let line = seq[index].split(' ');
    let testItem = findOrCreate(line[4]);
    let itemToChange = findOrCreate(line[0]);
    let changeOperator = line[1];
    let changeAmount = parseInt(line[2], 10);
    let testOperator = line[5];
    let testValue = parseInt(line[6], 10);

    if(testPasses(testItem, testOperator, testValue)) {
        editItem(itemToChange, changeOperator, changeAmount);
    }
}

function testPasses(item, oper, val) {
    let pass = false;
    if (oper === '<' && item.value < val) {
        pass = true;
    } else if (oper === '>' && item.value > val) {
        pass = true;
    } else if (oper === '==' && item.value === val) {
        pass = true;
    } else if (oper === '<=' && item.value <= val) {
        pass = true;
    } else if (oper === '>=' && item.value >= val) {
        pass = true;
    } else if (oper === '!=' && item.value !== val) {
        pass = true;
    }

    return pass;
}

function editItem(item, oper, val) {
    if(oper === 'inc') {
        item.value += val;
    } else {
        item.value -= val;
    }
    if(item.value > highestValue) {
        highestValue = item.value;
    }
}

function getLargestValue() {
    let val = null;
    register.forEach(item => {
        if (val === null || val.value < item.value) {
            val = item;
        }
    });
    return val;
}

for(let i = 0; i < seq.length; i++) {
    parseLine(i);
}

let largest = getLargestValue();
console.log(`The largest value was by ${largest.id} and had a value of ${largest.value}.`);
console.log(`The highest value seen in the register was ${highestValue}.`);