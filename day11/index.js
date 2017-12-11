/*
--- Day 11: Hex Ed ---

Crossing the bridge, you've barely reached the other side 
of the stream when a program comes up to you, clearly in 
distress. "It's my child process," she says, "he's gotten 
lost in an infinite grid!"

Fortunately for her, you have plenty of experience with 
infinite grids.

Unfortunately for you, it's a hex grid.

The hexagons ("hexes") in this grid are aligned such 
that adjacent hexes can be found to the north, northeast, 
southeast, south, southwest, and northwest:

  \ n  /
nw +--+ ne
  /    \
-+      +-
  \    /
sw +--+ se
  / s  \
You have the path the child process took. Starting 
where he started, you need to determine the fewest 
number of steps required to reach him. (A "step" 
means to move from the hex you are in to any 
adjacent hex.)

For example:

ne,ne,ne is 3 steps away.
ne,ne,sw,sw is 0 steps away (back where you started).
ne,ne,s,s is 2 steps away (se,se).
se,sw,se,sw,sw is 3 steps away (s,s,sw).

--- Part Two ---

How many steps away is the furthest he ever got from his starting position?

*/
let input = require('./input').split(',');
let position = {x: 0, y: 0};
let maxDistance = 0;

function getDistance(p) {
    return (Math.abs(p.x) + Math.abs(p.y)) /2;
}

for(let i = 0; i < input.length; i++) {
    switch (input[i]) {
        case 'n':
            position.y = position.y + 2;
            break;
        case 's':
            position.y = position.y - 2;
            break;
        case 'ne':
            position.y++;
            position.x++;
            break;
        case 'nw':
            position.y++;
            position.x--;
            break;
        case 'se':
            position.y--;
            position.x++;
            break;
        case 'sw':
            position.y--;
            position.x--;
            break;
    }

    let distance = getDistance(position);

    if(distance > maxDistance) maxDistance = distance;
}

console.log(`You are ${getDistance(position)} positions away and max distance was ${maxDistance}`);