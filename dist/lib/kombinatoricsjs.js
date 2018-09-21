"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factorial = (n) => {
    let f = 1;
    for (let i = 1; i < n + 1; ++i) {
        f *= i;
    }
    return f;
};
/**
 *@method
 *
 *@param
 *@return
 */
exports.cNK = (n, k) => {
    let i, coeff = 1;
    if (n < k)
        return 0;
    if (n === k)
        return 1;
    for (i = n - k + 1; i <= n; ++i)
        coeff *= i;
    for (i = 1; i <= k; ++i)
        coeff /= i;
    return coeff;
};
/**
 *@method
 *
 *@param
 *@return
 */
exports.pNK = (n, k) => {
    let f = 1;
    for (let i = n - k + 1; i < n + 1; ++i) {
        f *= i;
    }
    return f;
};
exports.matrixToArray = (matrix) => {
    let arr = [], c, r, lc = matrix.length, lr, row;
    for (c = 0; c < lc; ++c) {
        row = matrix[c];
        lr = row.length;
        for (r = 0; r < lr; ++r) {
            arr.push(row[r]);
        }
    }
    return arr;
};
/*@TODO improve memoize to work with a wider range of functions (at least combinatorics with numeric inputs*/
const memoize = (fn) => {
    const cache = {};
    return (n, k = 0) => {
        if (n < 256 && k <= n) {
            let key = (n << 9) | k;
            let out = cache[key];
            return out ? out : (cache[key] = fn(n, k));
        }
        else
            return fn(n, k);
    };
};
exports.memoize_factorial = memoize(exports.factorial);
exports.memoize_pNK = memoize(exports.pNK);
exports.memoize_cNK = memoize(exports.cNK);
/**
 *BoxMuller method
 */
const rnd_bmt = () => {
    let x = 0, y = 0, rds, c;
    // Get two random numbers from -1 to 1.
    // If the radius is zero or greater than 1, throw them out and pick two new ones
    // Rejection sampling throws away about 20% of the pairs.
    do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        rds = x * x + y * y;
    } while (rds == 0 || rds > 1);
    // This magic is the Box-Muller Transform
    c = Math.sqrt((-2 * Math.log(rds)) / rds);
    // It always creates a pair of numbers. I'll return them in an array.
    // This function is quite efficient so don't be afraid to throw one away if you don't need both.
    return [x * c, y * c];
};
/**
 *Central Limit method
 */
const rnd_snd = () => {
    return Math.random() * 2 - 1 + (Math.random() * 2 - 1) + (Math.random() * 2 - 1);
};
/**
 *@method
 *
 *@param
 *@return
 */
exports.shuffle = (ar) => {
    let i, r, tmp, l = ar.length;
    for (i = 0; i < l; ++i) {
        r = ~~(Math.random() * l);
        [ar[r], ar[i]] = [ar[i], ar[r]];
    }
};
/**
 *@method
 *
 *@param
 *@return
 */
exports.normalRandom = {
    BoxMuller: rnd_bmt,
    CentralLimit: rnd_snd
};
/**
 *@method
 *
 *@param
 *@return
 */
exports.indexArray = (l) => {
    let arr = [];
    if (!isNaN(l) && l > 0) {
        for (let i = 0; i < l; ++i) {
            arr[i] = i;
        }
    }
    return arr;
};
/**
 *@method
 *
 *@param
 *@return
 */
/*iterator for generating combinations call it nextCombination*/
exports.binomIncrement = (idxVector, maxVal) => {
    let l, i, j;
    j = 0;
    l = idxVector.length;
    if (maxVal < l)
        return false; //doesn't work if n<k
    if (idxVector[l - 1] < maxVal)
        idxVector[l - 1]++;
    else {
        //find value to increment
        for (i = l - 1; i >= 0; i -= 1) {
            if (idxVector[i] < maxVal - j)
                break;
            else
                j += 1;
        }
        if (i < 0)
            return 0;
        //increment
        idxVector[i] += 1;
        i += 1;
        //adjust successive values
        for (i; i < l; i += 1) {
            idxVector[i] = idxVector[i - 1] + 1;
        }
    }
    return 1;
};
exports.combinationsIterator = (list, k) => {
    let n = list.length;
    var _index = exports.indexArray(k);
    var beginIndex = exports.indexArray(k);
    var _collection = list.slice();
    var combination = new Array(k);
    var count = 0;
    function setCombination() {
        for (let i = 0; i < k; ++i) {
            combination[i] = _collection[_index[i]];
        }
    }
    setCombination();
    var iterator = {
        next: function () {
            if (exports.binomIncrement(_index, n - 1)) {
                count++;
                setCombination();
                return 1;
            }
            else {
                return 0;
            }
        },
        getComb: function (cnt = 0) {
            if (cnt > 0) {
                var c = cnt - count;
                var step;
                while (c > 0 && (step = exports.binomIncrement(_index, n - 1))) {
                    c--;
                    count++;
                }
                if (!step)
                    return 0;
                setCombination();
            }
            return combination.slice();
        },
        getIndex: function () {
            return _index;
        },
        getCount: function () {
            return count;
        },
        reset: function () {
            _index = exports.indexArray(k);
            setCombination();
            count = 0;
        }
    };
    return iterator;
};
exports.pick = (n, got, pos, from, limit, cntLimit, callBack) => {
    let cnt = 0, limitCount = cntLimit;
    if (got.length == n) {
        callBack(got);
        return 1;
    }
    for (let i = pos; i < from.length; i++) {
        got.push(from[i]);
        if (limitCount === limit) {
            cnt += exports.pick(n, got, i + 1, from, limit, 0, callBack);
            limitCount = 0;
        }
        else {
            let next = limitCount === 0 || got[got.length - 1] === got[got.length - 2]
                ? limitCount + 1
                : limitCount;
            cnt += exports.pick(n, got, i, from, limit, next, callBack);
        }
        got.pop();
    }
    return cnt;
};
/**
 *@method
 *
 *@param
 *@return
 */
exports.combinations = (_collection, k) => {
    if (_collection.length < k || k < 1) {
        return [_collection];
    }
    let comb = [];
    exports.pick(k, [], 0, _collection, 0, 0, (c) => {
        comb.push(c.slice());
    });
    return comb;
};
exports.pickMulti = (n, got, pos, from, limit, limitCount, callBack) => {
    /*let limitCount = limitCnt.slice();*/
    if (got.length == n) {
        callBack(got);
    }
    for (let i = pos; i < from.length; i++) {
        got.push(from[i]);
        if (limitCount[i] === limit[i]) {
            limitCount[i] = 0;
            exports.pickMulti(n, got, i + 1, from, limit, limitCount, callBack);
        }
        else {
            if (pos === 0 || limitCount[i] === 0 || got[got.length - 1] === got[got.length - 2]) {
                limitCount[i]++;
            }
            exports.pickMulti(n, got, i, from, limit, limitCount, callBack);
        }
        got.pop();
    }
    return 1;
};
;
exports.generateFirstMultiSetIndex = (n, k, limits) => {
    let index = new Array(k);
    let limitsCounter = (new Array(n)).fill(0);
    let lastVal = 0;
    for (let i = 0; i < k; i++) {
        index[i] = lastVal;
        limitsCounter[lastVal]++;
        if (limitsCounter[lastVal] == limits[lastVal]) {
            lastVal++;
        }
    }
    return {
        limitsCounter: limitsCounter,
        index: index
    };
};
exports.multiSetCombinationsStep = (index, maxVal, limits, limitsCount) => {
    let k = index.length - 1;
    if (index[k] < maxVal) {
        limitsCount[index[k]]--;
        index[k]++;
        limitsCount[index[k]]++;
    }
    else {
        /*find the first to increment*/
        let lastMaxVal = maxVal;
        let lastMaxValCounter = 0;
        while (index[k] == lastMaxVal) {
            limitsCount[index[k]]--;
            index[k] = 0;
            k--;
            lastMaxValCounter++;
            if (lastMaxValCounter == limits[lastMaxVal]) {
                lastMaxVal--;
                lastMaxValCounter = 0;
            }
        }
        if (k == -1) {
            return false;
            /*ended*/
        }
        limitsCount[index[k]]--;
        index[k]++;
        limitsCount[index[k]]++;
        k++;
        /*now set the following elements*/
        while (k < index.length) {
            let lastVal = index[k - 1];
            if (limitsCount[lastVal] < limits[lastVal]) {
                index[k] = lastVal;
                limitsCount[lastVal]++;
            }
            else if (lastVal < maxVal) {
                lastVal++;
                index[k] = lastVal;
                limitsCount[lastVal]++;
            }
            else if (k = index.length - 1) {
                return false;
            }
            k++;
        }
    }
    return index;
};
exports.multiSetUniformIndexCombinationsIterator = (n, k, r) => {
    let maxVal = n - 1;
    let limits = (new Array(n)).fill(r);
    let { limitsCounter, index } = exports.generateFirstMultiSetIndex(n, k, limits);
    return () => {
        return exports.multiSetCombinationsStep(index, maxVal, limits, limitsCounter);
    };
};
/*@TODO pass limits as argument to manage non uniform cases*/
exports.multiSetCombinationsIterator = (list, k, repetitions) => {
    let n = list.length;
    let maxVal = list.length - 1;
    let limits = (new Array(list.length)).fill(repetitions);
    let { limitsCounter, index } = exports.generateFirstMultiSetIndex(list.length, k, limits);
    let _index = index.slice();
    let _collection = list.slice();
    let combination = new Array(k);
    let count = 0;
    let setCombination = () => {
        for (let i = 0; i < k; ++i) {
            combination[i] = _collection[_index[i]];
        }
    };
    setCombination();
    return {
        next: () => {
            if (exports.multiSetCombinationsStep(_index, maxVal, limits, limitsCounter)) {
                count++;
                setCombination();
                return 1;
            }
            else {
                return 0;
            }
        },
        getComb: function (cnt = 0) {
            if (cnt > 0) {
                let c = cnt - count;
                let step;
                while (c > 0 && (step = exports.multiSetCombinationsStep(_index, maxVal, limits, limitsCounter))) {
                    c--;
                    count++;
                }
                ;
                if (!step)
                    return 0;
                setCombination();
            }
            return combination.slice();
        },
        getIndex: () => {
            return _index;
        },
        getCount: () => {
            return count;
        },
        reset: () => {
            _index = index.slice();
            setCombination();
            count = 0;
        }
    };
};
/**
 *@method
 *
 *@param
 *@return
 */
exports.multiCombinations = (_collection, k, repetition) => {
    let multiComb = [];
    let maxVal = _collection.length - 1;
    let limits = (new Array(_collection.length)).fill(repetition);
    let { limitsCounter, index } = exports.generateFirstMultiSetIndex(_collection.length, k, limits);
    //first element
    multiComb.push(index.map(v => _collection[v]));
    let next = [];
    while (next = exports.multiSetCombinationsStep(index, maxVal, limits, limitsCounter)) {
        multiComb.push(next.map(v => _collection[v]));
    }
    /*
      pick(n, [], 0, _collection, repetition, 0, (c: any[]) => {
        multiComb.push(c.slice())
      })
    */
    return multiComb;
};
/**
 *@method  @TODO to be implemented using iterative method like the one above
 *
 *@param
 *@return
 */
exports.combinationsMultiSets = (_collection, n) => {
    var l = _collection.length, limitCount = [0], limits = [0], list = [_collection[0]], j = 0;
    for (var i = 1; i < l; ++i) {
        if (_collection[i] === _collection[i - 1]) {
            limits[j]++;
        }
        else {
            j++;
            list[j] = _collection[i];
            limitCount.push(0);
            limits.push(0);
        }
    }
    var multiComb = [];
    exports.pickMulti(n, [], 0, list, limits, limitCount, (c) => {
        multiComb.push(c.slice());
    });
    return multiComb;
};
/*@TODO use destructuring*/
function swap(items, i, j) {
    var temp = items[i];
    items[i] = items[j];
    items[j] = temp;
}
/*standard callback slices items and returns it*/
exports.heapPermute = (n, items, callBack) => {
    if (n === 1) {
        callBack(items, n);
    }
    else {
        for (var i = 0; i < n; ++i) {
            exports.heapPermute(n - 1, items, callBack);
            if (n % 2 === 1) {
                swap(items, 0, n - 1);
            }
            else {
                swap(items, i, n - 1);
            }
        }
    }
};
exports.permutations = (list) => {
    var p = exports.indexArray(list.length);
    var i = 1, j;
    var n = list.length;
    var perms = [list.slice()];
    while (i < n) {
        p[i]--;
        j = i % 2 ? p[i] : 0;
        swap(list, i, j);
        perms.push(list.slice());
        i = 1;
        while (p[i] === 0) {
            p[i] = i;
            i++;
        }
    }
    return perms;
};
/*are called variations in some libraries*/
exports.permutationsNK = (list, k) => {
    let permsNK = [];
    let _combsNK = exports.combinations(list, k);
    for (let i = 0; i < _combsNK.length; ++i) {
        permsNK.push(exports.permutations(_combsNK[i]));
    }
    return exports.matrixToArray(permsNK);
};
/*not exposed*/
const nextPermutation = (list, index, callBack) => {
    let n = list.length;
    let i = 1, j;
    while (index[i] === 0) {
        index[i] = i;
        i++;
    }
    if (i < n) {
        index[i]--;
        j = i % 2 ? index[i] : 0;
        swap(list, i, j);
        return callBack(list);
    }
    else
        return 0;
};
/*not exposed*/
const nextPermutationLexi = (list) => {
    var n = list.length;
    var i = n - 1;
    while (i > 0 && list[i - 1] >= list[i]) {
        i--;
    }
    if (i <= 0)
        return 0;
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
};
const makeIndex = (list) => {
    let n = list.length;
    let index = exports.indexArray(n);
    let j = 0, k = 0;
    for (var i = 1; i < n; ++i) {
        if (list[i] === list[i - 1]) {
            index[i] = index[i - 1] = j;
        }
        else {
            j++;
            index[i] = j;
        }
    }
    return index;
};
exports.permutationsIterator = (list) => {
    var n = list.length;
    var _index = exports.indexArray(n);
    var beginIndex = exports.indexArray(n);
    var _collection = list.slice();
    var permutation = list.slice();
    var count = 0;
    function setPermutation() {
        for (var i = 0; i < n; ++i) {
            permutation[i] = _collection[_index[i]];
        }
    }
    var iterator = {
        next: function () {
            if (nextPermutationLexi(_index)) {
                count++;
                setPermutation();
                return 1;
            }
            else {
                return 0;
            }
        },
        getPerm: function (cnt = 0) {
            if (cnt > 0) {
                var c = cnt - count;
                var step;
                while (c > 0 && (step = nextPermutationLexi(_index))) {
                    c--;
                    count++;
                }
                if (!step)
                    return 0;
                setPermutation();
            }
            return permutation.slice();
        },
        getIndex: function () {
            return _index;
        },
        getCount: function () {
            return count;
        },
        reset: function () {
            _index = exports.indexArray(n);
            setPermutation();
            count = 0;
        }
    };
    return iterator;
};
exports.permutationsMultiSets = (list) => {
    let n = list.length, index = exports.indexArray(n);
    let data = [list[0]], perm = [], j = 0, k = 0, permutationMultiSet = [list.slice()];
    /*initializaition*/
    for (let i = 1; i < n; ++i) {
        if (list[i] === list[i - 1]) {
            index[i] = index[i - 1] = j;
        }
        else {
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
};
exports.permutationsNKMultiSets = (list, k) => {
    let permsNK = [];
    let _combsNK = exports.combinationsMultiSets(list, k);
    for (let i = 0; i < _combsNK.length; ++i) {
        permsNK.push(exports.permutationsMultiSets(_combsNK[i]));
    }
    return exports.matrixToArray(permsNK);
};
exports.crossProduct = (list, k) => {
    if (k < 1)
        return list;
    let crossProdList = new Array(Math.pow(list.length, k));
    let l = crossProdList.length;
    let ln = list.length;
    for (let i = 0; i < l; ++i) {
        let tmpList = [];
        let N = i;
        for (let j = k - 1; j >= 0; --j) {
            let digit = N % ln;
            N = Math.floor(N / ln);
            tmpList[j] = list[digit];
        }
        crossProdList[i] = tmpList;
    }
    return crossProdList;
};
exports.version = '1.0.3';
//# sourceMappingURL=kombinatoricsjs.js.map