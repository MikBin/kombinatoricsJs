
# Javascript library for combinatorial computations


A collection of combinatorial algorithms

## Dependencies

no dependencies, works with commonJs, amd, or browser global

## Usage Examples

```javascript
	console.log('computing permutations P(15,6): ' + kombinatoricsJs.pNK(15, 6));
    /*computing permutations P(15,6): 3603600*/
    console.log('memoized version for computing permutations P(15,6): ' + kombinatoricsJs.memoize_pNK(15, 6));
    /*memoized version for computing permutations P(15,6): 3603600 */

    console.log('computing combinations C(15,6): ' + kombinatoricsJs.cNK(15, 6));
    /*computing combinations C(15,6): 5005 */
    console.log('memoized version for computing combinations C(15,6): ' + kombinatoricsJs.memoize_cNK(15, 6));
    /*memoized version for computing combinations C(15,6): 5005 */

    /*generating permutations and combinations*/

    /*permutations*/
    var permutations = kombinatoricsJs.permutations(['a', 'b', 'c', 'd']);
    console.log(JSON.stringify(permutations));
    /*[["a","b","c","d"],["b","a","c","d"],["c","a","b","d"],["a","c","b","d"],["b","c","a","d"],
    ["c","b","a","d"],["c","b","d","a"],["b","c","d","a"],["d","c","b","a"],["c","d","b","a"],
    ["b","d","c","a"],["d","b","c","a"],["d","a","c","b"],["a","d","c","b"],["c","d","a","b"],
    ["d","c","a","b"],["a","c","d","b"],["c","a","d","b"],["b","a","d","c"],["a","b","d","c"],
    ["d","b","a","c"],["b","d","a","c"],["a","d","b","c"],["d","a","b","c"]] */


    /*permutations of multi sets*/
    var permMulti = kombinatoricsJs.permutationsMultiSets(['a', 'b', 'b', 'c', 'c']);
    console.log(JSON.stringify(permMulti));
    /*[["a","b","c","b","c"],["a","b","c","c","b"],["a","c","b","b","c"],["a","c","b","c","b"],["a","c","c","b","b"],
    ["b","a","b","c","c"],["b","a","c","b","c"],["b","a","c","c","b"],["b","b","a","c","c"],["b","b","c","a","c"],
    ["b","b","c","c","a"],["b","c","a","b","c"],["b","c","a","c","b"],["b","c","b","a","c"],["b","c","b","c","a"],
    ["b","c","c","a","b"],["b","c","c","b","a"],["c","a","b","b","c"],["c","a","b","c","b"],["c","a","c","b","b"],
    ["c","b","a","b","c"],["c","b","a","c","b"],["c","b","b","a","c"],["c","b","b","c","a"],["c","b","c","a","b"],
    ["c","b","c","b","a"],["c","c","a","b","b"],["c","c","b","a","b"],["c","c","b","b","a"]]*/


    /*combinations of 5 grouped by 3; repeated elements in input sets generates duplicated combinations*/ 
    /*use combinationMultiSets in case of repeated elements*/
    var combinations = kombinatoricsJs.combinations(['a', 'b', 'c', 'd', 'e'], 3);
    console.log(JSON.stringify(combinations));
    /*[["a","b","c"],["a","b","d"],["a","b","e"],["a","c","d"],["a","c","e"],["a","d","e"],["b","c","d"],["b","c","e"],["b","d","e"],["c","d","e"]] */

    /*multicombinations: 1 repeated element allowed foreach element in the set; grouped by 4*/
    var multicombinations = kombinatoricsJs.multiCombinations(['a', 'b', 'c', 'd'], 4, 1);
    console.log(JSON.stringify(multicombinations));
    /*[["a","a","b","b"],["a","a","b","c"],["a","a","b","d"],["a","a","c","c"],["a","a","c","d"],
    ["a","a","d","d"],["a","b","b","c"],["a","b","b","d"],["a","b","c","c"],["a","b","c","d"],
    ["a","b","d","d"],["a","c","c","d"],["a","c","d","d"],["b","b","c","c"],["b","b","c","d"],
    ["b","b","d","d"],["b","c","c","d"],["b","c","d","d"],["c","c","d","d"]] */


    /*combinationMultiSets: repetitions allowed are implicit in the set of elements; grouped by 4*/
    var combMultiSets = kombinatoricsJs.combinationsMultiSets(['a', 'b', 'b', 'c', 'c', 'c', 'd'], 4);
    console.log(JSON.stringify(combMultiSets));
    /*[["a","b","b","c"],["a","b","b","d"],["a","b","c","c"],["a","b","c","d"],["a","c","c","c"],
    ["a","c","c","d"],["b","b","c","c"],["b","b","c","d"],["b","c","c","c"],["b","c","c","d"],["c","c","c","d"]] */
	
    var c = 0;
    /*permutations iterator over 4 elements, for a total of 24 permutations*/
    var perm = [];
    var prmIter = kombinatoricsJs.permutationsIterator(['a', 'b', 'c', 'd']);

    perm.push(prmIter.getPerm());
    while (prmIter.next()) {
        perm.push(prmIter.getPerm());
    }

    console.log(JSON.stringify(perm));
    /*[["a","b","c","d"],["a","b","d","c"],["a","c","b","d"],["a","c","d","b"],["a","d","b","c"],["a","d","c","b"],
    ["b","a","c","d"],["b","a","d","c"],["b","c","a","d"],["b","c","d","a"],["b","d","a","c"],["b","d","c","a"],
    ["c","a","b","d"],["c","a","d","b"],["c","b","a","d"],["c","b","d","a"],["c","d","a","b"],["c","d","b","a"],
    ["d","a","b","c"],["d","a","c","b"],["d","b","a","c"],["d","b","c","a"],["d","c","a","b"],["d","c","b","a"]] */

    prmIter.reset();


    console.log('loggin odd permutations');
    while (perm = prmIter.getPerm(c)) {
        c += 2;
        console.log(perm);
    }
    /*["a", "b", "c", "d"] 
    ["a", "c", "b", "d"] 
    ["a", "d", "b", "c"] 
    ["b", "a", "c", "d"]
    ["b", "c", "a", "d"] 
    ["b", "d", "a", "c"] 
    ["c", "a", "b", "d"] 
    ["c", "b", "a", "d"] 
    ["c", "d", "a", "b"] 
    ["d", "a", "b", "c"] 
    ["d", "b", "a", "c"] 
    ["d", "c", "a", "b"] */

    /*combinationsIterator 5 elements grouped by 3, for a total of 10 combiantions */
    var cmbIter = kombinatoricsJs.combinationsIterator(['a', 'b', 'c', 'd', 'e'], 3);
    var comb = [];
    comb.push(cmbIter.getComb());
    while (cmbIter.next()) {
        comb.push(cmbIter.getComb());
    }

    console.log(JSON.stringify(comb));
    /*[["a","b","c"],["a","b","d"],["a","b","e"],["a","c","d"],["a","c","e"],
    ["a","d","e"],["b","c","d"],["b","c","e"],["b","d","e"],["c","d","e"]] */

    cmbIter.reset();

    c = 0;

    console.log('logging odd combinations');
    while (comb = cmbIter.getComb(c)) {
        c += 2;
        console.log(comb);
    }
    /*["a", "b", "c"]
    ["a", "b", "e"] 
    ["a", "c", "e"]
    ["b", "c", "d"] 
    ["b", "d", "e"] */


    /*permutations of 4 elements grouped by 3*/
    console.log('testing permutationsNK');
    console.log(JSON.stringify(kombinatoricsJs.permutationsNK(['a', 'b', 'c', 'd'], 3)));
    /*[["a","b","c"],["b","a","c"],["c","a","b"],["a","c","b"],["b","c","a"],["c","b","a"],["a","b","d"],
    ["b","a","d"],["d","a","b"],["a","d","b"],["b","d","a"],["d","b","a"],["a","c","d"],["c","a","d"],
    ["d","a","c"],["a","d","c"],["c","d","a"],["d","c","a"],["b","c","d"],["c","b","d"],["d","b","c"],
    ["b","d","c"],["c","d","b"],["d","c","b"]] */


    /*permutations of 3 elements (two repeated twice) grouped by 3*/
    console.log('testing permutationsNKmultisets');

    console.log(JSON.stringify(kombinatoricsJs.permutationsNKMultiSets(['a', 'b', 'b', 'c', 'c'], 3)));
    /*[["b","a","b"],["b","b","a"],["a","c","b"],["b","a","c"],["b","c","a"],["c","a","b"],
    ["c","b","a"],["c","a","c"],["c","c","a"],["b","c","b"],["c","b","b"],["c","b","c"],["c","c","b"]] */

```
