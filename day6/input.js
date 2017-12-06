let sequence = '5	1	10	0	1	7	13	14	3	12	8	10	7	12	0	6'.split('\t');

for(let i = 0; i < sequence.length; i++) {
    sequence[i] = parseInt(sequence[i], 10);
}

module.exports  = sequence;