import * as KOMB from '../src/kombinatoricsjs'

import test from 'ava'

test('factorial numeric value', t => {
  t.is(KOMB.factorial(0), 1)
  t.is(KOMB.factorial(1), 1)
  t.is(KOMB.factorial(5), 120)

  t.is(KOMB.memoize_factorial(0), 1)
  t.is(KOMB.memoize_factorial(1), 1)
  t.is(KOMB.memoize_factorial(5), 120)
})

test('permutations numeric value', t => {
  t.is(KOMB.pNK(0, 0), 1)
  t.is(KOMB.pNK(1, 0), 1)
  t.is(KOMB.pNK(1, 1), 1)
  t.is(KOMB.pNK(3, 2), 6)

  t.is(KOMB.memoize_pNK(0, 0), 1)
  t.is(KOMB.memoize_pNK(1, 0), 1)
  t.is(KOMB.memoize_pNK(1, 1), 1)
  t.is(KOMB.memoize_pNK(3, 2), 6)
})

test('combinations numeric value', t => {
  t.is(KOMB.cNK(0, 0), 1)
  t.is(KOMB.cNK(1, 0), 1)
  t.is(KOMB.cNK(1, 1), 1)
  t.is(KOMB.cNK(3, 2), 3)
  t.is(KOMB.cNK(5, 2), 10)
  t.is(KOMB.cNK(10, 4), 210)

  t.is(KOMB.memoize_cNK(0, 0), 1)
  t.is(KOMB.memoize_cNK(1, 0), 1)
  t.is(KOMB.memoize_cNK(1, 1), 1)
  t.is(KOMB.memoize_cNK(3, 2), 3)
  t.is(KOMB.memoize_cNK(5, 2), 10)
  t.is(KOMB.memoize_cNK(10, 4), 210)
})

test('matrix to array', t => {
  t.deepEqual(KOMB.matrixToArray([[1, 2], [3, 4], [5, 6]]), [1, 2, 3, 4, 5, 6])
  t.deepEqual(KOMB.matrixToArray([[1, 2]]), [1, 2])
})

test('combinations iterator', t => {
  let index = KOMB.indexArray(5)
  t.deepEqual(index, [0, 1, 2, 3, 4])

  let iterator = KOMB.combinationsIterator(['a', 'b', 'c', 'd'], 2)
  t.is(iterator.getCount(), 0)
  t.deepEqual(iterator.getIndex(), [0, 1])
  t.deepEqual(iterator.getComb(), ['a', 'b'])
  iterator.next()
  t.is(iterator.getCount(), 1)
  t.deepEqual(iterator.getIndex(), [0, 2])
  t.deepEqual(iterator.getComb(5), ['c', 'd'])

  iterator.reset()
  t.is(iterator.getCount(), 0)
  t.deepEqual(iterator.getIndex(), [0, 1])
  t.deepEqual(iterator.getComb(), ['a', 'b'])

  t.deepEqual(iterator.getComb(5), ['c', 'd'])
})

test('permutations iterator', t => {
  let iterator = KOMB.permutationsIterator(['a', 'b', 'c'])
  t.is(iterator.getCount(), 0)
  t.deepEqual(iterator.getIndex(), [0, 1, 2])
  t.deepEqual(iterator.getPerm(), ['a', 'b', 'c'])
  iterator.next()
  t.is(iterator.getCount(), 1)
  t.deepEqual(iterator.getIndex(), [0, 2, 1])
  t.deepEqual(iterator.getPerm(5), ['c', 'b', 'a'])
  t.deepEqual(iterator.getIndex(), [2, 1, 0])

  iterator.reset()
  t.is(iterator.getCount(), 0)
  t.deepEqual(iterator.getIndex(), [0, 1, 2])
  t.deepEqual(iterator.getPerm(), ['a', 'b', 'c'])

  t.deepEqual(iterator.getPerm(5), ['c', 'b', 'a'])
})

test('generateFirstMultiSetIndex', t => {
  let res = KOMB.generateFirstMultiSetIndex(5, 4, [3, 3, 3, 3, 3])
  t.deepEqual(
    {
      limitsCounter: [3, 1, 0, 0, 0],
      index: [0, 0, 0, 1]
    },
    res
  )
})

test('combination multi set iterator next function', t => {
  let startIdx = [0, 0, 0, 1]
  let limitsCounter = [3, 1, 0, 0, 0]
  let next = KOMB.multiSetCombinationsStep(startIdx, 4, [3, 3, 3, 3, 3], limitsCounter)
  t.deepEqual(next, [0, 0, 0, 2])
  let all = [[0, 0, 0, 1], [0, 0, 0, 2]]
  while (next) {
    next = KOMB.multiSetCombinationsStep(startIdx, 4, [3, 3, 3, 3, 3], limitsCounter)
    if (next) all.push(next.slice())
  }
  t.deepEqual(all, [
    [0, 0, 0, 1],
    [0, 0, 0, 2],
    [0, 0, 0, 3],
    [0, 0, 0, 4],
    [0, 0, 1, 1],
    [0, 0, 1, 2],
    [0, 0, 1, 3],
    [0, 0, 1, 4],
    [0, 0, 2, 2],
    [0, 0, 2, 3],
    [0, 0, 2, 4],
    [0, 0, 3, 3],
    [0, 0, 3, 4],
    [0, 0, 4, 4],
    [0, 1, 1, 1],
    [0, 1, 1, 2],
    [0, 1, 1, 3],
    [0, 1, 1, 4],
    [0, 1, 2, 2],
    [0, 1, 2, 3],
    [0, 1, 2, 4],
    [0, 1, 3, 3],
    [0, 1, 3, 4],
    [0, 1, 4, 4],
    [0, 2, 2, 2],
    [0, 2, 2, 3],
    [0, 2, 2, 4],
    [0, 2, 3, 3],
    [0, 2, 3, 4],
    [0, 2, 4, 4],
    [0, 3, 3, 3],
    [0, 3, 3, 4],
    [0, 3, 4, 4],
    [0, 4, 4, 4],
    [1, 1, 1, 2],
    [1, 1, 1, 3],
    [1, 1, 1, 4],
    [1, 1, 2, 2],
    [1, 1, 2, 3],
    [1, 1, 2, 4],
    [1, 1, 3, 3],
    [1, 1, 3, 4],
    [1, 1, 4, 4],
    [1, 2, 2, 2],
    [1, 2, 2, 3],
    [1, 2, 2, 4],
    [1, 2, 3, 3],
    [1, 2, 3, 4],
    [1, 2, 4, 4],
    [1, 3, 3, 3],
    [1, 3, 3, 4],
    [1, 3, 4, 4],
    [1, 4, 4, 4],
    [2, 2, 2, 3],
    [2, 2, 2, 4],
    [2, 2, 3, 3],
    [2, 2, 3, 4],
    [2, 2, 4, 4],
    [2, 3, 3, 3],
    [2, 3, 3, 4],
    [2, 3, 4, 4],
    [2, 4, 4, 4],
    [3, 3, 3, 4],
    [3, 3, 4, 4],
    [3, 4, 4, 4]
  ])
  /*@TODO test non uniforms limits counts*/
})

test('combinations generator ', t => {
  let C = KOMB.combinations(['a', 'b', 'c'], 1)

  t.deepEqual(C, [['a'], ['b'], ['c']])
  t.deepEqual(KOMB.combinations(['a', 'b', 'c'], 3), [['a', 'b', 'c']])
  t.deepEqual(KOMB.combinations(['a', 'b', 'c', 'd'], 3), [
    ['a', 'b', 'c'],
    ['a', 'b', 'd'],
    ['a', 'c', 'd'],
    ['b', 'c', 'd']
  ])
})

test('permutations generator ', t => {
  t.deepEqual(KOMB.permutations(['a']), [['a']])
  t.deepEqual(KOMB.permutations(['a', 'b']), [['a', 'b'], ['b', 'a']])
  let P = KOMB.permutations(['a', 'b', 'c'])
  t.deepEqual(P, [
    ['a', 'b', 'c'],
    ['b', 'a', 'c'],
    ['c', 'a', 'b'],
    ['a', 'c', 'b'],
    ['b', 'c', 'a'],
    ['c', 'b', 'a']
  ])
})

test('permutationsNK generator ', t => {
  t.deepEqual(KOMB.permutationsNK(['a'], 1), [['a']])
  t.deepEqual(KOMB.permutationsNK(['a', 'b'], 2), [['a', 'b'], ['b', 'a']])
  t.deepEqual(KOMB.permutationsNK(['a', 'b'], 1), [['a'], ['b']])
  let P = KOMB.permutationsNK(['a', 'b', 'c'], 3)
  t.deepEqual(P, [
    ['a', 'b', 'c'],
    ['b', 'a', 'c'],
    ['c', 'a', 'b'],
    ['a', 'c', 'b'],
    ['b', 'c', 'a'],
    ['c', 'b', 'a']
  ])

  P = KOMB.permutationsNK(['a', 'b', 'c'], 2)
  t.deepEqual(P, [['a', 'b'], ['b', 'a'], ['a', 'c'], ['c', 'a'], ['b', 'c'], ['c', 'b']])
})

test('multiCombinations generator ', t => {
  let K = KOMB.multiCombinations(['a', 'b', 'c'], 3, 1)

  t.deepEqual(K, [['a', 'b', 'c']])
  t.deepEqual(KOMB.multiCombinations(['a', 'b', 'c', 'd'], 3, 1), [
    ['a', 'b', 'c'],
    ['a', 'b', 'd'],
    ['a', 'c', 'd'],
    ['b', 'c', 'd']
  ])

  K = KOMB.multiCombinations(['a', 'b', 'c', 'd'], 4, 3)
  t.is(K.length, 31)
  t.deepEqual(K, [
    ['a', 'a', 'a', 'b'],
    ['a', 'a', 'a', 'c'],
    ['a', 'a', 'a', 'd'],
    ['a', 'a', 'b', 'b'],
    ['a', 'a', 'b', 'c'],
    ['a', 'a', 'b', 'd'],
    ['a', 'a', 'c', 'c'],
    ['a', 'a', 'c', 'd'],
    ['a', 'a', 'd', 'd'],
    ['a', 'b', 'b', 'b'],
    ['a', 'b', 'b', 'c'],
    ['a', 'b', 'b', 'd'],
    ['a', 'b', 'c', 'c'],
    ['a', 'b', 'c', 'd'],
    ['a', 'b', 'd', 'd'],
    ['a', 'c', 'c', 'c'],
    ['a', 'c', 'c', 'd'],
    ['a', 'c', 'd', 'd'],
    ['a', 'd', 'd', 'd'],
    ['b', 'b', 'b', 'c'],
    ['b', 'b', 'b', 'd'],
    ['b', 'b', 'c', 'c'],
    ['b', 'b', 'c', 'd'],
    ['b', 'b', 'd', 'd'],
    ['b', 'c', 'c', 'c'],
    ['b', 'c', 'c', 'd'],
    ['b', 'c', 'd', 'd'],
    ['b', 'd', 'd', 'd'],
    ['c', 'c', 'c', 'd'],
    ['c', 'c', 'd', 'd'],
    ['c', 'd', 'd', 'd']
  ])

  K = KOMB.multiCombinations([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 7, 4)
  t.is(K.length, 49205)
})

test('combinationsMultiSets generator ', t => {
  //console.log(KOMB.combinationsMultiSets(["a", "a", "a", "b", "b", "b", "c", "c", "c", "d", "d", "d"], 4));

  t.deepEqual(KOMB.combinationsMultiSets(['a', 'b', 'c'], 3), [['a', 'b', 'c']])
  t.deepEqual(KOMB.combinationsMultiSets(['a', 'a', 'c'], 2), [['a', 'a'], ['a', 'c']])
  let K = KOMB.combinationsMultiSets(
    ['a', 'a', 'a', 'b', 'b', 'b', 'c', 'c', 'c', 'd', 'd', 'd'],
    4
  )
  t.is(K.length, 31)
  t.deepEqual(K, [
    ['a', 'a', 'a', 'b'],
    ['a', 'a', 'a', 'c'],
    ['a', 'a', 'a', 'd'],
    ['a', 'a', 'b', 'b'],
    ['a', 'a', 'b', 'c'],
    ['a', 'a', 'b', 'd'],
    ['a', 'a', 'c', 'c'],
    ['a', 'a', 'c', 'd'],
    ['a', 'a', 'd', 'd'],
    ['a', 'b', 'b', 'b'],
    ['a', 'b', 'b', 'c'],
    ['a', 'b', 'b', 'd'],
    ['a', 'b', 'c', 'c'],
    ['a', 'b', 'c', 'd'],
    ['a', 'b', 'd', 'd'],
    ['a', 'c', 'c', 'c'],
    ['a', 'c', 'c', 'd'],
    ['a', 'c', 'd', 'd'],
    ['a', 'd', 'd', 'd'],
    ['b', 'b', 'b', 'c'],
    ['b', 'b', 'b', 'd'],
    ['b', 'b', 'c', 'c'],
    ['b', 'b', 'c', 'd'],
    ['b', 'b', 'd', 'd'],
    ['b', 'c', 'c', 'c'],
    ['b', 'c', 'c', 'd'],
    ['b', 'c', 'd', 'd'],
    ['b', 'd', 'd', 'd'],
    ['c', 'c', 'c', 'd'],
    ['c', 'c', 'd', 'd'],
    ['c', 'd', 'd', 'd']
  ])
})

test('permutations multiset generator', t => {
  /*mutiset permutation returns in lexicograpic order*/
  let Pm = KOMB.permutationsMultiSets(['a', 'a', 'b', 'b', 'c'])
  t.deepEqual(Pm, [
    ['a', 'a', 'b', 'b', 'c'],
    ['a', 'a', 'b', 'c', 'b'],
    ['a', 'a', 'c', 'b', 'b'],
    ['a', 'b', 'a', 'b', 'c'],
    ['a', 'b', 'a', 'c', 'b'],
    ['a', 'b', 'b', 'a', 'c'],
    ['a', 'b', 'b', 'c', 'a'],
    ['a', 'b', 'c', 'a', 'b'],
    ['a', 'b', 'c', 'b', 'a'],
    ['a', 'c', 'a', 'b', 'b'],
    ['a', 'c', 'b', 'a', 'b'],
    ['a', 'c', 'b', 'b', 'a'],
    ['b', 'a', 'a', 'b', 'c'],
    ['b', 'a', 'a', 'c', 'b'],
    ['b', 'a', 'b', 'a', 'c'],
    ['b', 'a', 'b', 'c', 'a'],
    ['b', 'a', 'c', 'a', 'b'],
    ['b', 'a', 'c', 'b', 'a'],
    ['b', 'b', 'a', 'a', 'c'],
    ['b', 'b', 'a', 'c', 'a'],
    ['b', 'b', 'c', 'a', 'a'],
    ['b', 'c', 'a', 'a', 'b'],
    ['b', 'c', 'a', 'b', 'a'],
    ['b', 'c', 'b', 'a', 'a'],
    ['c', 'a', 'a', 'b', 'b'],
    ['c', 'a', 'b', 'a', 'b'],
    ['c', 'a', 'b', 'b', 'a'],
    ['c', 'b', 'a', 'a', 'b'],
    ['c', 'b', 'a', 'b', 'a'],
    ['c', 'b', 'b', 'a', 'a']
  ])

  t.deepEqual(KOMB.permutationsMultiSets(['a', 'b', 'c']), [
    ['a', 'b', 'c'],
    ['a', 'c', 'b'],
    ['b', 'a', 'c'],
    ['b', 'c', 'a'],
    ['c', 'a', 'b'],
    ['c', 'b', 'a']
  ])
})

test('permutationsNkmultisets generator', t => {
  let Pm = KOMB.permutationsNKMultiSets(['a', 'a', 'b', 'b', 'c'], 2)
  t.deepEqual(Pm, [
    ['a', 'a'],
    ['a', 'b'],
    ['b', 'a'],
    ['a', 'c'],
    ['c', 'a'],
    ['b', 'b'],
    ['b', 'c'],
    ['c', 'b']
  ])
  t.deepEqual(KOMB.permutationsNKMultiSets(['a', 'a', 'b', 'b', 'c'], 1), [['a'], ['b'], ['c']])
  t.deepEqual(KOMB.permutationsNKMultiSets(['a', 'b', 'c'], 1), [['a'], ['b'], ['c']])
  // console.log(Pm)
})

test('cross product generator', t => {
  let Cp = KOMB.crossProduct(['a', 'b', 'c'], 2)
  t.deepEqual(Cp, [
    ['a', 'a'],
    ['a', 'b'],
    ['a', 'c'],
    ['b', 'a'],
    ['b', 'b'],
    ['b', 'c'],
    ['c', 'a'],
    ['c', 'b'],
    ['c', 'c']
  ])

  Cp = KOMB.crossProduct(['a', 'b', 'c'], 1)
  t.deepEqual(Cp, [['a'], ['b'], ['c']])
  Cp = KOMB.crossProduct(['a', 'b', 'c'], 3)
  t.is(Cp.length, 27)
})
