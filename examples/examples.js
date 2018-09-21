const kombinatoricsJs = kombinatoricsjs;
$(document).ready(function() {



    /*setting up permutations and combinations*/
    var pNK = kombinatoricsJs.pNK;
    var cNK = kombinatoricsJs.cNK;

    /*setting up memoized versions of combinations and permutations*/
    var memoPnk = kombinatoricsJs.memoize_pNK;
    var memoCnk = kombinatoricsJs.memoize_cNK;

    /*how many random samples*/
    var cycles = 100000;
    /*max value for N*/
    var maxValue = 32;
    var n, k, temp, i, fn;

    var countArrayTest = [{
        fn: pNK,
        txt: 'pNK iterative'
    }, {
        fn: cNK,
        txt: 'cNK iterative'
    }, {
        fn: memoPnk,
        txt: 'memoized Pnk'
    }, {
        fn: memoCnk,
        txt: 'memoized Cnk'
    }];

    for (var j = 0; j < countArrayTest.length; ++j) {
        fn = countArrayTest[j].fn;


        countArrayTest[j].time = (new Date()).getTime();

        for (i = 0; i < cycles; ++i) {
            n = ~~(maxValue * Math.random());
            k = ~~(maxValue * Math.random());
            if (n < k) {
                temp = k;
                n = k;
                k = n;
            }

            /*calling j-th function*/
            fn(n, k);
        }
        countArrayTest[j].time = (new Date()).getTime() - countArrayTest[j].time;

    }

    console.log('testing speed rates normal-iterative vs memoized one:');
    console.log('Pnk/memo-Pnk rate ' + (countArrayTest[0].time / countArrayTest[2].time).toFixed(2));
    console.log('Cnk/memo-Cnk rate ' + (countArrayTest[1].time / countArrayTest[3].time).toFixed(2));

    /*binding inputs*/
    var $cnk_setN = $('#cnk_setN');
    var $cnk_setK = $('#cnk_setK');

    var $pnk_setN = $('#pnk_setN');
    var $pnk_setK = $('#pnk_setK');

    var $pnk_set = $("#pnk-set");

    var $cnk_set = $("#cnk-set");

    var $combination_k = $("#combination-k");

    var $permutations_results = $("#permutations-result");

    var $combinations_results = $("#combinations-result");


    /*binding clicks*/
    $('#compute-fact').on('click', function() {
        var n = $("#fact_n").val();
        n = !isNaN(n) ? Math.abs(n) : 1;
        $('#fact-result').val(kombinatoricsJs.factorial(n));
    });


    $('#compute-CNK').on('click', function() {
        var n = $cnk_setN.val();
        var k = $cnk_setK.val();
        n = !isNaN(n) ? Math.abs(n) : 1;
        k = !isNaN(k) ? Math.abs(k) : 1;

        $('#cnk-result').val(cNK(n, k));
    });

    $('#compute-PNK').on('click', function() {
        var n = $pnk_setN.val();
        var k = $pnk_setK.val();
        n = !isNaN(n) ? Math.abs(n) : 1;
        k = !isNaN(k) ? Math.abs(k) : 1;

        $('#pnk-result').val(pNK(n, k));
    });


    $('#generate-PNK').on('click', function() {
        var set = $pnk_set.val().split(',');
        if (!set) return alert('fill collection by comma separated elements');
        $permutations_results.find('tbody').remove();
        var $tbody = $("<tbody></tbody>").appendTo($permutations_results);
        var permutations = kombinatoricsJs.permutations(set);

        for (var i = 0; i < permutations.length; ++i) {
            $tbody.append("<tr><td>" + (i + 1) + "</td><td>" + permutations[i] + "</td></tr>");
        }


    });

    $('#generate-CNK').on('click', function() {
        var set = $cnk_set.val().split(',');
        if (!set) return alert('fill collection by comma separated elements');
        var k = $combination_k.val();

        k = !isNaN(k) ? Math.abs(k) : 1;
        console.log('generate cnk clicked ' + k);
        console.log(set);
        $combinations_results.find('tbody').remove();
        var $tbody = $("<tbody></tbody>").appendTo($combinations_results);
        var combinations = kombinatoricsJs.combinations(set, k);


        for (var i = 0; i < combinations.length; ++i) {
            $tbody.append("<tr><td>" + (i + 1) + "</td><td>" + combinations[i] + "</td></tr>");
        }

    });


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
    console.log(kombinatoricsJs.permutationsMultiSets(['a', 'b', 'b', 'c', 'c']).length);
    console.log(kombinatoricsJs.permutationsMultiSets(['b', 'a', 'b', 'c', 'c']).length);
    /*combinations of 5 grouped by 3; repeated elements in input sets generates duplicated combinations*/
    /*use combinationMultiSets in case of repeated elements*/
    var combinations = kombinatoricsJs.combinations(['a', 'b', 'c', 'd', 'e'], 3);
    console.log(JSON.stringify(combinations));
    /*[["a","b","c"],["a","b","d"],["a","b","e"],["a","c","d"],["a","c","e"],["a","d","e"],["b","c","d"],["b","c","e"],["b","d","e"],["c","d","e"]] */

    /*multicombinations: 1 repeated element allowed foreach element in the set; grouped by 4*/
    var multicombinations = kombinatoricsJs.multiCombinations(['a', 'b', 'c', 'd'], 4, 3);
    console.log(JSON.stringify(multicombinations));
    /*[["a","a","b","b"],["a","a","b","c"],["a","a","b","d"],["a","a","c","c"],["a","a","c","d"],
    ["a","a","d","d"],["a","b","b","c"],["a","b","b","d"],["a","b","c","c"],["a","b","c","d"],
    ["a","b","d","d"],["a","c","c","d"],["a","c","d","d"],["b","b","c","c"],["b","b","c","d"],
    ["b","b","d","d"],["b","c","c","d"],["b","c","d","d"],["c","c","d","d"]] */

    console.log(kombinatoricsJs.multiCombinations([1, 2, 3, 4, 5, 6], 5, 0));
    console.log(kombinatoricsJs.multiCombinations([1, 2, 3, 4, 5, 6], 5, 1));
    console.log(kombinatoricsJs.multiCombinations([1, 2, 3, 4, 5, 6], 5, 2));
    console.log(kombinatoricsJs.multiCombinations([1, 2, 3, 4, 5, 6], 5, 3));
    console.log(kombinatoricsJs.multiCombinations([1, 2, 3, 4, 5, 6], 5, 4));
    var c53 = kombinatoricsJs.multiCombinations([1, 2, 3, 4, 5, 6], 5, 3).map(function(el) {
        return el.sort().join('');
    });
    var c54 = kombinatoricsJs.multiCombinations([1, 2, 3, 4, 5, 6], 5, 4).map(function(el) {
        return el.sort().join('');
    });

    /*combinationMultiSets: repetitions allowed are implicit in the set of elements; grouped by 4*/
    var combMultiSets = kombinatoricsJs.combinationsMultiSets(['a', 'b', 'b', 'c', 'c', 'c', 'd'], 4);
    console.log(JSON.stringify(combMultiSets));
    /*[["a","b","b","c"],["a","b","b","d"],["a","b","c","c"],["a","b","c","d"],["a","c","c","c"],
    ["a","c","c","d"],["b","b","c","c"],["b","b","c","d"],["b","c","c","c"],["b","c","c","d"],["c","c","c","d"]] */

    c54 = kombinatoricsJs.combinationsMultiSets([1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6], 5).map(function(el) {
        return el.sort().join('');
    });;
    c53 = kombinatoricsJs.combinationsMultiSets([1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6], 5).map(function(el) {
        return el.sort().join('');
    });;

    var diff = c54.filter(function(el) {
        return c53.indexOf(el) === -1;
    });
    console.log(diff);


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



    //var multicombinations2 = kombinatoricsJs.multiCombinations([2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'], 5, 2);
    // console.log('cards multicombinations', JSON.stringify(multicombinations2));






});



/*@TODO to be moved to poker lib*/

let sumHash = (v, h) => {
    return v.reduce((acc, curr) => {
        return acc + h[curr]
    }, 0);
};


function getNextHashNumber(hashes, comb6_5, i) {
    let done = false;
    let combos = {}; //Object.assign({}, _combos);
    while (!done) {
        for (let j = 0; j < comb6_5.length; ++j) {
            let h = sumHash(comb6_5[j], hashes);
            //console.log(h, combos[h]);
            if (!combos[h]) {
                combos[h] = 1;
                done = true;
            } else {
                hashes[i]++;
                done = false;
                combos = {}; //Object.assign({}, _combos);
                break;
            }
        }

    }

    return combos;
}


function createHash(numberOfDistinct, numberOfPlaces, repetitions) {

    let hashes = (new Array(numberOfDistinct)).fill(0).map((v, i) => i);
    let I = 2;
    let baseArray = hashes.slice(0, I);
    let combos = {};

    while (I < numberOfDistinct) {
        baseArray.push(I);
        console.log("doing ", I);
        let combinations = kombinatoricsJs.multiCombinations(baseArray, numberOfPlaces, repetitions);
        let _combos = getNextHashNumber(hashes, combinations, I);

        I++;
    }
    return hashes;
}
console.log(createHash(4, 7, 7));
//13,5,3[0, 1, 5, 22, 94, 312, 992, 2422, 5624, 12522, 19998, 43258, 79415]
//13,7,3 
//6,5,4 [0, 1, 6, 31, 108, 366]  
//6,3,2 [0, 1, 4, 13, 32, 71]