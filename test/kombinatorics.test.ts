import * as KOMB from '../src/kombinatoricsjs'
import { test, expect } from 'vitest'

test('factorial numeric value', () => {
  expect(KOMB.factorial(0)).toBe(1)
  expect(KOMB.factorial(1)).toBe(1)
  expect(KOMB.factorial(5)).toBe(120)

  expect(KOMB.memoize_factorial(0)).toBe(1)
  expect(KOMB.memoize_factorial(1)).toBe(1)
  expect(KOMB.memoize_factorial(5)).toBe(120)
})

test('permutations numeric value', () => {
  expect(KOMB.pNK(0, 0)).toBe(1)
  expect(KOMB.pNK(1, 0)).toBe(1)
  expect(KOMB.pNK(1, 1)).toBe(1)
  expect(KOMB.pNK(3, 2)).toBe(6)

  expect(KOMB.memoize_pNK(0, 0)).toBe(1)
  expect(KOMB.memoize_pNK(1, 0)).toBe(1)
  expect(KOMB.memoize_pNK(1, 1)).toBe(1)
  expect(KOMB.memoize_pNK(3, 2)).toBe(6)
})

test('combinations numeric value', () => {
  expect(KOMB.cNK(0, 0)).toBe(1)
  expect(KOMB.cNK(1, 0)).toBe(1)
  expect(KOMB.cNK(1, 1)).toBe(1)
  expect(KOMB.cNK(3, 2)).toBe(3)
  expect(KOMB.cNK(5, 2)).toBe(10)
  expect(KOMB.cNK(10, 4)).toBe(210)

  expect(KOMB.memoize_cNK(0, 0)).toBe(1)
  expect(KOMB.memoize_cNK(1, 0)).toBe(1)
  expect(KOMB.memoize_cNK(1, 1)).toBe(1)
  expect(KOMB.memoize_cNK(3, 2)).toBe(3)
  expect(KOMB.memoize_cNK(5, 2)).toBe(10)
  expect(KOMB.memoize_cNK(10, 4)).toBe(210)
})

test('matrix to array', () => {
  expect(KOMB.matrixToArray([[1, 2], [3, 4], [5, 6]])).toEqual([1, 2, 3, 4, 5, 6])
  expect(KOMB.matrixToArray([[1, 2]])).toEqual([1, 2])
})

test('combinations iterator', () => {
  let index = KOMB.indexArray(5)
  expect(index).toEqual([0, 1, 2, 3, 4])

  let iterator = KOMB.combinationsIterator(['a', 'b', 'c', 'd'], 2)
  expect(iterator.getCount()).toBe(0)
  expect(iterator.getIndex()).toEqual([0, 1])
  expect(iterator.getComb()).toEqual(['a', 'b'])
  iterator.next()
  expect(iterator.getCount()).toBe(1)
  expect(iterator.getIndex()).toEqual([0, 2])
  expect(iterator.getComb(5)).toEqual(['c', 'd'])

  iterator.reset()
  expect(iterator.getCount()).toBe(0)
  expect(iterator.getIndex()).toEqual([0, 1])
  expect(iterator.getComb()).toEqual(['a', 'b'])

  expect(iterator.getComb(5)).toEqual(['c', 'd'])
})

test('permutations iterator', () => {
  let iterator = KOMB.permutationsIterator(['a', 'b', 'c'])
  expect(iterator.getCount()).toBe(0)
  expect(iterator.getIndex()).toEqual([0, 1, 2])
  expect(iterator.getPerm()).toEqual(['a', 'b', 'c'])
  iterator.next()
  expect(iterator.getCount()).toBe(1)
  expect(iterator.getIndex()).toEqual([0, 2, 1])
  expect(iterator.getPerm(5)).toEqual(['c', 'b', 'a'])
  expect(iterator.getIndex()).toEqual([2, 1, 0])

  iterator.reset()
  expect(iterator.getCount()).toBe(0)
  expect(iterator.getIndex()).toEqual([0, 1, 2])
  expect(iterator.getPerm()).toEqual(['a', 'b', 'c'])

  expect(iterator.getPerm(5)).toEqual(['c', 'b', 'a'])
})

test('generateFirstMultiSetIndex', () => {
  let res = KOMB.generateFirstMultiSetIndex(5, 4, [3, 3, 3, 3, 3])
  expect(res).toEqual(
    {
      limitsCounter: [3, 1, 0, 0, 0],
      index: [0, 0, 0, 1]
    }
  )
})

test('combination multi set iterator next function', () => {
  let startIdx = [0, 0, 0, 1]
  let limitsCounter = [3, 1, 0, 0, 0]
  let next = KOMB.multiSetCombinationsStep(startIdx, 4, [3, 3, 3, 3, 3], limitsCounter)
  expect(next).toEqual([0, 0, 0, 2])
  let all = [[0, 0, 0, 1], [0, 0, 0, 2]]
  while (next) {
    next = KOMB.multiSetCombinationsStep(startIdx, 4, [3, 3, 3, 3, 3], limitsCounter)
    if (next) all.push(next.slice())
  }
  expect(all).toEqual([
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

test('combinations generator ', () => {
  let C = KOMB.combinations(['a', 'b', 'c'], 1)

  expect(C).toEqual([['a'], ['b'], ['c']])
  expect(KOMB.combinations(['a', 'b', 'c'], 3)).toEqual([['a', 'b', 'c']])
  expect(KOMB.combinations(['a', 'b', 'c', 'd'], 3)).toEqual([
    ['a', 'b', 'c'],
    ['a', 'b', 'd'],
    ['a', 'c', 'd'],
    ['b', 'c', 'd']
  ])
})

test('permutations generator ', () => {
  expect(KOMB.permutations(['a'])).toEqual([['a']])
  expect(KOMB.permutations(['a', 'b'])).toEqual([['a', 'b'], ['b', 'a']])
  let P = KOMB.permutations(['a', 'b', 'c'])
  expect(P).toEqual([
    ['a', 'b', 'c'],
    ['b', 'a', 'c'],
    ['c', 'a', 'b'],
    ['a', 'c', 'b'],
    ['b', 'c', 'a'],
    ['c', 'b', 'a']
  ])
})

test('permutationsNK generator ', () => {
  expect(KOMB.permutationsNK(['a'], 1)).toEqual([['a']])
  expect(KOMB.permutationsNK(['a', 'b'], 2)).toEqual([['a', 'b'], ['b', 'a']])
  expect(KOMB.permutationsNK(['a', 'b'], 1)).toEqual([['a'], ['b']])
  let P = KOMB.permutationsNK(['a', 'b', 'c'], 3)
  expect(P).toEqual([
    ['a', 'b', 'c'],
    ['b', 'a', 'c'],
    ['c', 'a', 'b'],
    ['a', 'c', 'b'],
    ['b', 'c', 'a'],
    ['c', 'b', 'a']
  ])

  P = KOMB.permutationsNK(['a', 'b', 'c'], 2)
  expect(P).toEqual([['a', 'b'], ['b', 'a'], ['a', 'c'], ['c', 'a'], ['b', 'c'], ['c', 'b']])
})

test('multiCombinations generator ', () => {
  let K = KOMB.multiCombinations(['a', 'b', 'c'], 3, 1)

  expect(K).toEqual([['a', 'b', 'c']])
  expect(KOMB.multiCombinations(['a', 'b', 'c', 'd'], 3, 1)).toEqual([
    ['a', 'b', 'c'],
    ['a', 'b', 'd'],
    ['a', 'c', 'd'],
    ['b', 'c', 'd']
  ])

  K = KOMB.multiCombinations(['a', 'b', 'c', 'd'], 4, 3)
  expect(K.length).toBe(31)
  expect(K).toEqual([
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
  expect(K.length).toBe(49205)
})

test('combinationsMultiSets generator ', () => {
  //console.log(KOMB.combinationsMultiSets(["a", "a", "a", "b", "b", "b", "c", "c", "c", "d", "d", "d"], 4));
  let K = KOMB.combinationsMultiSets(['a', 'b', 'c'], 3)
  expect(K).toEqual([['a', 'b', 'c']])
  K = KOMB.combinationsMultiSets(['a', 'a', 'c'], 2)
  expect(K).toEqual([['a', 'a'], ['a', 'c']])
  console.log(K)
  K = KOMB.combinationsMultiSets(['a', 'a', 'a', 'b', 'b', 'b', 'c', 'c', 'c', 'd', 'd', 'd'], 4)
  expect(K.length).toBe(31)
  expect(K).toEqual([
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

test('permutations multiset generator', () => {
  /*mutiset permutation returns in lexicograpic order*/
  let Pm = KOMB.permutationsMultiSets(['a', 'a', 'b', 'b', 'c'])
  expect(Pm).toEqual([
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

  expect(KOMB.permutationsMultiSets(['a', 'b', 'c'])).toEqual([
    ['a', 'b', 'c'],
    ['a', 'c', 'b'],
    ['b', 'a', 'c'],
    ['b', 'c', 'a'],
    ['c', 'a', 'b'],
    ['c', 'b', 'a']
  ])
})

test('permutationsNkmultisets generator', () => {
  let Pm = KOMB.permutationsNKMultiSets(['a', 'a', 'b', 'b', 'c'], 2)
  console.log(Pm)
  expect(Pm).toEqual([
    ['a', 'a'],
    ['a', 'b'],
    ['b', 'a'],
    ['a', 'c'],
    ['c', 'a'],
    ['b', 'b'],
    ['b', 'c'],
    ['c', 'b']
  ])
  expect(KOMB.permutationsNKMultiSets(['a', 'a', 'b', 'b', 'c'], 1)).toEqual([['a'], ['b'], ['c']])
  expect(KOMB.permutationsNKMultiSets(['a', 'b', 'c'], 1)).toEqual([['a'], ['b'], ['c']])
})

test('cross product generator', () => {
  let Cp = KOMB.crossProduct(['a', 'b', 'c'], 2)
  expect(Cp).toEqual([
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
  expect(Cp).toEqual([['a'], ['b'], ['c']])
  Cp = KOMB.crossProduct(['a', 'b', 'c'], 3)
  expect(Cp.length).toBe(27)
})

test('generic comparators', () => {
  const data = [
    { value: 'a' },
    { value: 'b' },
    { value: 'b' },
    { value: 'c' },
    { value: 'c' }
  ];

  const isEqual = (a: { value: string }, b: { value: string }) => a.value === b.value;

  const permMulti = KOMB.permutationsMultiSets(data, isEqual);
  expect(permMulti.length).toBe(30);

  const combMulti = KOMB.combinationsMultiSets(data, 2, isEqual);
  expect(combMulti.length).toBe(5);
});
