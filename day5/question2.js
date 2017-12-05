/*
--- Part Two ---

Now, the jumps are even stranger: after each jump, if the offset was three or more, instead decrease it by 1. Otherwise, increase it by 1 as before.

Using this rule with the above example, the process now takes 10 steps, and the offset values after finding the exit are left as 2 3 2 3 -1.

How many steps does it now take to reach the exit?
*/
let input = require('./input');
let seq = input.split('\n');

// convert stings to numbers
for(let i = 0; i < seq.length; i++) {
    seq[i] = parseInt(seq[i]);
}

let escape = seq.length;

let index = 0;
let steps = 0;

while(index >= 0 && index < escape) {
    // increase step
    steps++;

    // get value of index
    let val = seq[index];

    // increase the value at that index by 1
    seq[index] = (val > 2) ? val - 1: val + 1;

    // increase the index by the original value of the index
    index += val;
}

console.log(`The value of ${index} escaped in ${steps} steps`);
