let seq = `179	2358	5197	867	163	4418	3135	5049	187	166	4682	5080	5541	172	4294	1397
2637	136	3222	591	2593	1982	4506	195	4396	3741	2373	157	4533	3864	4159	142
1049	1163	1128	193	1008	142	169	168	165	310	1054	104	1100	761	406	173
200	53	222	227	218	51	188	45	98	194	189	42	50	105	46	176
299	2521	216	2080	2068	2681	2376	220	1339	244	605	1598	2161	822	387	268
1043	1409	637	1560	970	69	832	87	78	1391	1558	75	1643	655	1398	1193
90	649	858	2496	1555	2618	2302	119	2675	131	1816	2356	2480	603	65	128
2461	5099	168	4468	5371	2076	223	1178	194	5639	890	5575	1258	5591	6125	226
204	205	2797	2452	2568	2777	1542	1586	241	836	3202	2495	197	2960	240	2880
560	96	336	627	546	241	191	94	368	528	298	78	76	123	240	563
818	973	1422	244	1263	200	1220	208	1143	627	609	274	130	961	685	1318
1680	1174	1803	169	450	134	3799	161	2101	3675	133	4117	3574	4328	3630	4186
1870	3494	837	115	1864	3626	24	116	2548	1225	3545	676	128	1869	3161	109
890	53	778	68	65	784	261	682	563	781	360	382	790	313	785	71
125	454	110	103	615	141	562	199	340	80	500	473	221	573	108	536
1311	64	77	1328	1344	1248	1522	51	978	1535	1142	390	81	409	68	352`;

let rows = seq.split('\n');
let total = 0;
let evenTotal = 0;

/**
 * find the greatest difference between two numbers in a row 
 * and sum up those differnces with all of the rows 
 */
for(let i = 0; i < rows.length; i++) {
  let nums = rows[i].split('\t');
  let max, min;
  for(let x = 0; x < nums.length; x++) {
    let num = parseInt(nums[x], 10);
    if (max === undefined ) {
      max = num;
      min = num;
    } else if (num < min) {
      min = num;
    } else if (num > max)  {
      max = num;
    }
  }
  total += max - min;
}

/**
 * find the sum of quotients by
 * finding the only numbers in a row that divide evenly
 * take the quotient of those values per row and adding them up
 */
for(let i = 0; i < rows.length; i++) {
  let nums = rows[i].split('\t');
  let q = 0;
  for(let x = 0; x < nums.length; x++) {
    if (q !== 0) break; // break out of outer loop
    let num1 = parseInt(nums[x], 10);
    for(let y = 0; y < nums.length; y++){
      let num2 = parseInt(nums[y], 10);
      if (x !== y && num1 > num2 && num1 % num2 === 0 ) {
        q = num1 / num2;
        break;
      }
    }
  }
  evenTotal += q;
}

console.log(`THe total for the greatest differences is ${total}`);
console.log(`The total for the sum of quotients is ${evenTotal}`);
