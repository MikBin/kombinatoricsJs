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
            n = ~~ (maxValue * Math.random());
            k = ~~ (maxValue * Math.random());
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


});