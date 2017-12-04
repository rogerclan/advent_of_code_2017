/*
--- Part Two ---

For added security, yet another system policy has been put in place. Now, a valid passphrase must contain no two words that are anagrams of each other - that is, a passphrase is invalid if any word's letters can be rearranged to form any other word in the passphrase.

For example:

abcde fghij is a valid passphrase.
abcde xyz ecdab is not valid - the letters from the third word can be rearranged to form the first word.
a ab abc abd abf abj is a valid passphrase, because all letters need to be used when forming another word.
iiii oiii ooii oooi oooo is valid.
oiii ioii iioi iiio is not valid - any of these words can be rearranged to form any other word.
Under this new system policy, how many passphrases are valid?
*/

let input = require('./input');

let rows = input.split('\n');

/**
 * isAnagram
 * checks if you can rearrange letters between two words
 * 
 * @param {String} word 
 * @param {String} check
 * @returns {Boolean} 
 */
function isAnagram(word, check) {
    // if words are not same length cannot be anagram
    if(word.length !== check.length) return false;

    let anagram = false;

    let chars = word.split('');
    for(let i = 0; i < chars.length; i++) {
        let index = check.indexOf(chars[i]);
        if(index >= 0) {
            if(index === 0 && check.length === 1) {
                anagram = true;
            } else if (index === 0 ) {
                check = check.slice(1);
            } else if(index === check.length -1) {
                check = check.slice(0, index);
            } else {
                check = check.slice(0, index) + check.slice(index + 1);
            }
            
        }
    }
    
    return anagram;
}

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
            if(isAnagram(word,words[x])) {
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