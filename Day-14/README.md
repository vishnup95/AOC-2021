--- Day 14: Extended Polymerization ---

This is similar to Day-6 (Lantern Fish). We can never get an answer as fast as we want by going through the whole array.
So we take a count of pairs in the template.

For e.g: `[N, N, C, B]`. This generates pairs of `[N, N]`, `[N,C]`, `[C, B]`. We create a counter of pairs. Since we are only going to get certain pairs this will comein super handy instead of just using the array traversal.

The second counter is the one that will help us get the puzzle solution. This will keep track of the inserted polymers/individual counts.
For e.g: `[N, N, C, B]` has the counter map of `{N: 2, C: 1, B: 1}`.

After the first step, we have a pair map of `Map(6) { 'NC' => 1, 'CN' => 1, 'NB' => 1, 'BC' => 1, 'CH' => 1, 'HB' => 1 } ` and the second counter map of `Map(4) { 'N' => 2, 'C' => 2, 'B' => 2, 'H' => 1 }`. Note the count. We will generate the insertions pairs and increment the counter according to count. Doing this for 40 days get's the numbers.

Insertion Rules:

```
CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
```
