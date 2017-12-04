/*
--- Day 4: High-Entropy Passphrases ---

A new system policy has been put in place that requires all accounts to use a passphrase instead of simply a password. A passphrase consists of a series of words (lowercase letters) separated by spaces.

To ensure security, a valid passphrase must contain no duplicate words.

For example:

aa bb cc dd ee is valid.
aa bb cc dd aa is not valid - the word aa appears more than once.
aa bb cc dd aaa is valid - aa and aaa count as different words.
The system's full passphrase list is available as your puzzle input. How many passphrases are valid?
*/

let input = require('./input');

let rows = input.split('\n');

/**
 * isValid
 * Checks to see if vaild passphrase
 * 
 * @param {Array[String]} words 
 * @returns {Boolean}
 */
function isValid(words) {
    let valid = true;
    for(let i = 0; i < words.length - 1; i++) {
        if(!valid) break; 
        let word = words[i];
        for(let x = i+1; x < words.length; x++){
            if(word === words[x]) {
                valid = false;
                break;
            }
        }
    }
    return valid;
}

let validRows = 0;

for(let i = 0; i < rows.length; i++) {
    let row = rows[i];
    if(isValid(row.split(' '))) {
        validRows++;
    }
}

console.log(validRows);