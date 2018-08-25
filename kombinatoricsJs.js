/**
 *@module kombinatoricsJs
 * Created by Michele Bini on 12/3/13.
 * library for combinatorics computations
 */



/**
 *UMD wrapper, it works with commonJS(nodejs), global/namespaced browser side and AMD (RequireJS)
 *
 *@param name {String} name of the module as it will be exposed
 *@param definition {Function} the factory containing the library code
 *@param context {Object} the context where the library is loaded
 *@param dependencies {Array} array of strings of dependencies in amd-like structure
 *@param nameSpace {Object} used only browser side (no amd case) to avoid globals
 *@return {Object} return definition executed in the right context with dependencies resolved
 */
(function(name, definition, context, dependencies, nameSpace) {

    var strName, deps = {};
    if (typeof module === 'object' && module['exports']) {
        if (dependencies && require) {

            /*store dependencies here*/
            for (var i = 0; i < dependencies.length; i++) {
                strName = dependencies[i].split('/');
                strName = strName[strName.length - 1];
                deps[strName] = require(dependencies[i]);
            }
        }
        /*to avoid circular dependencies issues in nodejs, the object pointed by module.exports is passed to the factory*/
        return module['exports'] = definition.call(deps, module['exports']);

    } else if ((typeof context['define'] !== 'undefined') && (typeof context['define'] === 'function') && context['define']['amd']) {
        define(name, (dependencies || []), function() {

            for (var i = 0; i < dependencies.length; ++i) {
                strName = dependencies[i].split('/');
                strName = strName[strName.length - 1];
                deps[strName] = arguments[i];
            }
            return definition.call(deps);
        });
    } else {
        /*context is browser global; if nameSpace is defined, then bind the library to it*/
        if (nameSpace && context[nameSpace]) {
            context[nameSpace][name] = {};
            return context[nameSpace][name] = definition(context[nameSpace][name], nameSpace);
        } else {
            context[name] = {};
            return context[name] = definition(context[name]);
        }
    }
})('kombinatoricsJs', function(myself, nameSpace) {


        var kombinatoricsJs = myself || {};
        /*to avoid circular dependencies issues in nodejs-
     here, we append functions and properties to an already existing object (module.exports) created before that dependencies binding happened;*/
        var _context = this;

        /**
         *@method
         *
         *@param
         *@return
         */
        kombinatoricsJs.factorial = function(n) {
            var f = 1;
            for (var i = 1; i < n + 1; ++i) {
                f *= i;
            }
            return f;
        }

        /**
         *@method
         *
         *@param
         *@return
         */
        kombinatoricsJs.cNK = function(n, k) {
            var i, coeff = 1;
            if (n < k) return 0;
            if (n === k) return 1;
            for (i = n - k + 1; i <= n; ++i) coeff *= i;
            for (i = 1; i <= k; ++i) coeff /= i;
            return coeff;
        };

        /**
         *@method
         *
         *@param
         *@return
         */
        kombinatoricsJs.pNK = function(n, k) {
            var f = 1;
            for (var i = n - k + 1; i < n + 1; ++i) {
                f *= i;
            }
            return f;
        }


        var matrixToArray = function(matrix) {
            var arr = [],
                c, r, lc = matrix.length,
                lr, row;
            for (c = 0; c < lc; ++c) {
                row = matrix[c];
                lr = row.length;
                for (r = 0; r < lr; ++r) {
                    arr.push(row[r]);
                }
            }
            return arr;
        }


        var memoize = function(fnName) {
            var fn = kombinatoricsJs[fnName];
            var cache = {};
            return function(n, k) {
                if (n < 256 && k <= n) {
                    var key = n << 9 | k;
                    var out = cache[key];
                    return out ? out : cache[key] = fn(n, k);
                } else return fn(n, k);
            }

        }

        kombinatoricsJs.memoize_pNK = memoize('pNK');
        kombinatoricsJs.memoize_cNK = memoize('cNK');



        /**
         *@method
         *
         *@param
         *@return
         */
        var shuffle;
        kombinatoricsJs.shuffle = shuffle = function(ar) {
            var i, r, tmp, l = ar.length;
            for (i = 0; i < l; ++i) {
                r = ~~(Math.random() * (l - i)) + i;
                tmp = ar[i];
                ar[i] = ar[r];
                ar[r] = tmp;
            }
        }

        /**
         *BoxMuller method
         */
        var rnd_bmt = function() {
            var x = 0,
                y = 0,
                rds, c;

            // Get two random numbers from -1 to 1.
            // If the radius is zero or greater than 1, throw them out and pick two new ones
            // Rejection sampling throws away about 20% of the pairs.
            do {
                x = Math.random() * 2 - 1;
                y = Math.random() * 2 - 1;
                rds = x * x + y * y;
            }
            while (rds == 0 || rds > 1)

            // This magic is the Box-Muller Transform
            c = Math.sqrt(-2 * Math.log(rds) / rds);

            // It always creates a pair of numbers. I'll return them in an array. 
            // This function is quite efficient so don't be afraid to throw one away if you don't need both.
            return [x * c, y * c];
        }

        /**
         *Central Limit method
         */
        var rnd_snd = function() {
            return (Math.random() * 2 - 1) + (Math.random() * 2 - 1) + (Math.random() * 2 - 1);
        }

        /**
         *@method
         *
         *@param
         *@return
         */
        kombinatoricsJs.normalRandom = {
            BoxMuller: rnd_bmt,
            CentralLimit: rnd_snd
        };

        /*not exposed; used as indexArray factory prototype*/
        var indexArray_Proto = {
            compact: function() {
                var i, j, k, n, _array;
                j = n = k = 0;
                _array = this.getArray();
                i = _array.length;
                while (i) {
                    i -= 1;
                    if (_array[i] === -1) {
                        _array.splice(i, 1);
                    }
                }
            },
            shuffle: function() {
                shuffle(this.getArray());
            },
            getArray: function() {
                return this._array;
            }
        };


        /**
         *@method
         *
         *@param
         *@return
         */
        var indexArray;
        kombinatoricsJs.indexArray = indexArray = function(l) {
            var arr, len;

            if (!isNaN(l) || l.buffer instanceof ArrayBuffer || Array.isArray(l)) {
                if (l < 256) {
                    arr = new Uint8Array(l);
                } else if (l < 65536) {
                    arr = new Uint16Array(l);
                } else {
                    arr = new Uint32Array(l);
                }
                for (var i = 0; i < l; ++i) {
                    arr[i] = i;
                }
            } else {
                return false;
            }

            return Object.create(indexArray_Proto, {
                // foo is a regular 'value property'
                _array: {
                    writable: false,
                    configurable: true,
                    enumerable: true,
                    value: arr
                }
            });

        }


        /**
         *@method
         *
         *@param
         *@return
         */
        /*iterator for generating combinations call it nextCombination*/
        var binomIncrement;
        kombinatoricsJs.binomIncrement = binomIncrement = function(idxVector, maxVal) {
            var l, i, j;
            j = 0;
            l = idxVector.length;
            if (maxVal < l) return false; //doesn't work if n<k 
            if (idxVector[l - 1] < maxVal) idxVector[l - 1]++;
            else {
                //find value to increment
                for (i = l - 1; i >= 0; i -= 1) {
                    if (idxVector[i] < maxVal - j) break;
                    else j += 1;
                }
                if (i < 0) return 0;
                //increment
                idxVector[i] += 1;
                i += 1;
                //adjust successive values
                for (i; i < l; i += 1) {
                    idxVector[i] = idxVector[i - 1] + 1;
                }
            }

            return 1;
        }

        var combinationsIterator = function(list, k) {

            var n = list.length;

            var _index = indexArray(k).getArray();
            var beginIndex = indexArray(k).getArray();

            var _collection = list.slice();
            var combination = new Array(k);
            var count = 0;

            function setCombination() {
                for (var i = 0; i < k; ++i) {
                    combination[i] = _collection[_index[i]];
                }
            }

            setCombination();

            var iterator = {
                next: function() {
                    if (binomIncrement(_index, n - 1)) {
                        count++;
                        setCombination();
                        return 1;
                    } else {
                        return 0;
                    }
                },
                getComb: function(cnt) {

                    if (!isNaN(cnt) && cnt > 0) {
                        var c = cnt - count;
                        var step;
                        while (c > 0 && (step = binomIncrement(_index, n - 1))) {
                            c--;
                            count++;
                        }

                        if (!step) return 0;
                        setCombination();
                    }

                    return combination.slice();

                },
                getIndex: function() {
                    return indexArray(_index).getArray();
                },
                getCount: function() {
                    return count;
                },
                reset: function() {
                    _index = indexArray(k).getArray();
                    setCombination();
                    count = 0;
                }

            };
            return iterator;
        }

        kombinatoricsJs.combinationsIterator = combinationsIterator;


        /*not exposed  count can be added separatedly in callback*/
        function pick(n, got, pos, from, limit, cntLimit, callBack) {
            var cnt = 0,
                limitCount = cntLimit;
            if (got.length == n) {
                callBack(got);
                return 1;
            }
            for (var i = pos; i < from.length; i++) {
                got.push(from[i]);


                if (limitCount === limit) {
                    cnt += pick(n, got, i + 1, from, limit, 0, callBack);
                    limitCount = 0;
                } else {
                    cnt += pick(n, got, i, from, limit, (pos === 0 || limitCount === 0 || got[got.length - 1] === got[got.length - 2]) ? limitCount + 1 : limitCount, callBack);
                }

                got.pop();
            }

            return cnt;
        }

        kombinatoricsJs.pick = pick;
        /**
         *@method
         *
         *@param
         *@return
         */
        var combinations;
        kombinatoricsJs.combinations = combinations = function(_collection, k) {

            var comb = [];

            pick(k, [], 0, _collection, 0, 0, function(c) {
                comb.push(c.slice());
            });

            return comb;
        }



        /*not exposed  limit and cntLimit are arrays   */
        function pickMulti(n, got, pos, from, limit, limitCount, callBack) {

            //var limitCount = limitCnt.slice();

            if (got.length == n) {
                callBack(got);
            }

            for (var i = pos; i < from.length; i++) {
                got.push(from[i]);


                if (limitCount[i] === limit[i]) {
                    limitCount[i] = 0;
                    pickMulti(n, got, i + 1, from, limit, limitCount, callBack);

                } else {
                    if ((pos === 0 || limitCount[i] === 0 || got[got.length - 1] === got[got.length - 2])) {
                        limitCount[i]++;
                    }
                    pickMulti(n, got, i, from, limit, limitCount, callBack);
                }

                got.pop();
            }

            return 1;
        }


        kombinatoricsJs.pickMulti = pickMulti;

        /**
         *@method
         *
         *@param
         *@return
         */
        var multiCombinations;
        kombinatoricsJs.multiCombinations = multiCombinations = function(_collection, n, repetition) {

            var multiComb = [];

            pick(n, [], 0, _collection, repetition, 0, function(c) {
                multiComb.push(c.slice());
            });

            return multiComb;
            /*TODO there must be a subtle bug, use combinations mutlisets by expanding the _collection*/
        }



        /**
         *@method
         *
         *@param
         *@return
         */
        var combinationsMultiSets;
        kombinatoricsJs.combinationsMultiSets = combinationsMultiSets = function(_collection, n) {

            var l = _collection.length,
                limitCount = [0],
                limits = [0],
                list = [_collection[0]],
                j = 0;
            /*initializaition*/
            for (var i = 1; i < l; ++i) {
                if (_collection[i] === _collection[i - 1]) {
                    limits[j]++;
                } else {
                    j++;
                    list[j] = _collection[i];
                    limitCount.push(0);
                    limits.push(0);
                }
            }
            var multiComb = [];


            pickMulti(n, [], 0, list, limits, limitCount, function(c) {
                multiComb.push(c.slice());
            });

            return multiComb;
        }


        function swap(items, i, j) {

            var temp = items[i];
            items[i] = items[j];
            items[j] = temp;

        }

        /*standard callback slices items and returns it*/
        function heapPermute(n, items, callBack) {
            if (n === 1) {

                callBack(items, n);

            } else {

                for (var i = 0; i < n; ++i) {
                    heapPermute(n - 1, items, callBack);
                    if (n % 2 === 1) {
                        swap(items, 0, n - 1);
                    } else {
                        swap(items, i, n - 1);
                    }
                }
            }
        }

        kombinatoricsJs.heapPermute = heapPermute;

        var permutations = function(list) {
            var p = kombinatoricsJs.indexArray(list.length).getArray();
            var i = 1,
                j;
            var n = list.length;
            var perms = [list.slice()];
            while (i < n) {
                p[i]--;
                j = (i % 2) ? p[i] : 0;

                swap(list, i, j);
                perms.push(list.slice());

                i = 1;
                while (p[i] === 0) {
                    p[i] = i;
                    i++;
                }
            }

            return perms;
        }

        kombinatoricsJs.permutations = permutations;


        var permutationsNK = function(list, k) {
            var permsNK = [];
            var _combsNK = combinations(list, k);
            for (var i = 0; i < _combsNK.length; ++i) {
                permsNK.push(permutations(_combsNK[i]));
            }
            return matrixToArray(permsNK);
        }

        kombinatoricsJs.permutationsNK = permutationsNK;



        /*not exposed*/
        var nextPermutation = function(list, index, callBack) {
            var n = list.length;
            var i = 1,
                j;
            while (index[i] === 0) {
                index[i] = i;
                i++;
            }
            if (i < n) {
                index[i]--;
                j = (i % 2) ? index[i] : 0;

                swap(list, i, j);
                return callBack(list);
            } else return 0;
        }

        /*not exposed*/
        var nextPermutationLexi = function(list) {
            var n = list.length;
            var i = n - 1;
            while (i > 0 && list[i - 1] >= list[i]) {
                i--;
            }
            if (i <= 0) return 0;
            var j = n - 1;

            while (list[j] <= list[i - 1]) {
                j--;
            }
            swap(list, i - 1, j);
            /*then reverse items from i+1 to j*/
            j = n - 1;
            while (i < j) {
                swap(list, i, j);
                i++;
                j--;
            }

            return 1;

        }



        var makeIndex = function(list) {
            var n = list.length;
            var index = indexArray(n).getArray();
            var j = 0,
                k = 0;
            /*initializaition*/
            for (var i = 1; i < n; ++i) {
                if (list[i] === list[i - 1]) {
                    index[i] = index[i - 1] = j;
                } else {
                    j++;
                    index[i] = j;
                }
            }
            return index;
        }

        var permutationsIterator = function(list) {

            var n = list.length;

            var _index = indexArray(n).getArray();
            var beginIndex = indexArray(n).getArray();

            var _collection = list.slice();
            var permutation = list.slice();
            var count = 0;

            function setPermutation() {
                for (var i = 0; i < n; ++i) {
                    permutation[i] = _collection[_index[i]];
                }
            }

            var iterator = {
                next: function() {
                    if (nextPermutationLexi(_index)) {
                        count++;
                        setPermutation();
                        return 1;
                    } else {
                        return 0;
                    }
                },
                getPerm: function(cnt) {

                    if (!isNaN(cnt) && cnt > 0) {
                        var c = cnt - count;
                        var step;
                        while (c > 0 && (step = nextPermutationLexi(_index))) {
                            c--;
                            count++;
                        }

                        if (!step) return 0;
                        setPermutation();
                    }

                    return permutation.slice();

                },
                getIndex: function() {
                    return indexArray(_index).getArray();
                },
                getCount: function() {
                    return count;
                },
                reset: function() {
                    _index = indexArray(n).getArray();
                    setPermutation();
                    count = 0;
                }

            };
            return iterator;
        }

        kombinatoricsJs.permutationsIterator = permutationsIterator;


        var permutationsMultiSets = function(list) {
            var n = list.length,
                index = kombinatoricsJs.indexArray(n).getArray();
            var data = [list[0]],
                perm = [],
                j = 0,
                k = 0,
                permutationMultiSet = [];
            /*initializaition*/
            for (var i = 1; i < n; ++i) {
                if (list[i] === list[i - 1]) {
                    index[i] = index[i - 1] = j;
                } else {
                    j++;
                    index[i] = j;
                    data.push(list[i]);
                }
            }


            while (nextPermutationLexi(index)) {

                for (k = 0; k < n; ++k) {
                    perm[k] = data[index[k]];
                }

                permutationMultiSet.push(perm.slice());
            }

            return permutationMultiSet;
        }

        kombinatoricsJs.permutationsMultiSets = permutationsMultiSets;


        var permutationsNKMultiSets = function(list, k) {
            var permsNK = [];
            var _combsNK = combinationsMultiSets(list, k);
            for (var i = 0; i < _combsNK.length; ++i) {
                permsNK.push(permutationsMultiSets(_combsNK[i]));
            }
            return matrixToArray(permsNK);
        }

        kombinatoricsJs.permutationsNKMultiSets = permutationsNKMultiSets;

        const crossProduct = (list, k) => {
            if (k < 1) return list;
            let crossProdList = new Array(Math.pow(list.length, k));
            let l = crossProdList.length;
            let ln = list.length;

            for (let i = 0; i < l; ++i) {
                let tmpList = [];
                let number = i;
                for (let j = k - 1; j >= 0; --j) {
                    let digit = number % ln;
                    number = Math.floor(number / ln);
                    tmpList[j] = list[digit];
                }
                crossProdList[i] = tmpList;
            }
            return crossProdList;
        }

        kombinatoricsJs.crossProduct = crossProduct;

        //console.log(crossProduct([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3));

        var version = 1.0;

        kombinatoricsJs.getVersion = function() {
            return version;
        }



        /*freezing*/
        if (Object.freeze) {

            Object.freeze(kombinatoricsJs);
            Object.freeze(indexArray_Proto);
        }
        return kombinatoricsJs;

    },
    this, [], this['ßøµŋđ']); /* in main app.js script (browser side only) set this['ßøµŋđ'] = 'nameSpaceToBeUsed-As-Global' if you're using nameSpaces to avoid globals */