
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


```
