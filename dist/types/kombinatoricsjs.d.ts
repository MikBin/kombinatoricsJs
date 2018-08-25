declare type genericListFn = <S>(list: S[], ...args: any[]) => S[][];
export declare const factorial: (n: number) => number;
/**
 *@method
 *
 *@param
 *@return
 */
export declare const cNK: (n: number, k: number) => number;
/**
 *@method
 *
 *@param
 *@return
 */
export declare const pNK: (n: number, k: number) => number;
export declare const matrixToArray: <S>(matrix: S[][]) => S[];
declare type combinatoricsFn = (...args: number[]) => number;
export declare const memoize_factorial: combinatoricsFn;
export declare const memoize_pNK: combinatoricsFn;
export declare const memoize_cNK: combinatoricsFn;
/**
 *@method
 *
 *@param
 *@return
 */
export declare const shuffle: (ar: any[]) => void;
/**
 *@method
 *
 *@param
 *@return
 */
export declare const boxMullerShuffle: (ar: any[]) => void;
/**
 *@method
 *
 *@param
 *@return
 */
export declare const normalRandom: {
    BoxMuller: () => number[];
    CentralLimit: () => number;
};
/**
 *@method
 *
 *@param
 *@return
 */
export declare const indexArray: (l: number) => number[];
/**
 *@method
 *
 *@param
 *@return
 */
export declare const binomIncrement: (idxVector: number[], maxVal: number) => false | 1 | 0;
export declare const combinationsIterator: (list: any[], k: number) => {
    next: () => 1 | 0;
    getComb: (cnt?: number) => any[] | 0;
    getIndex: () => number[];
    getCount: () => number;
    reset: () => void;
};
export declare const pick: (n: number, got: any[], pos: number, from: any[], limit: number, cntLimit: number, callBack: Function) => number;
/**
 *@method
 *
 *@param
 *@return
 */
export declare const combinations: genericListFn;
export declare const pickMulti: (n: number, got: any[], pos: number, from: any[], limit: number[], limitCount: number[], callBack: Function) => number;
/**
 *@method
 *
 *@param
 *@return
 */
export declare const multiCombinations: (_collection: any[], n: number, repetition: number) => any[][];
/**
 *@method
 *
 *@param
 *@return
 */
export declare const combinationsMultiSets: (_collection: any[], n: number) => any[][];
export declare const heapPermute: (n: number, items: any[], callBack: Function) => void;
export declare const permutations: (list: any[]) => any[][];
export declare const permutationsNK: (list: any[], k: number) => any[][];
export declare const permutationsIterator: (list: any[]) => {
    next: () => 1 | 0;
    getPerm: (cnt?: number) => any[] | 0;
    getIndex: () => number[];
    getCount: () => number;
    reset: () => void;
};
export declare const permutationsMultiSets: (list: any[]) => any[][];
export declare const permutationsNKMultiSets: (list: any[], k: number) => any[][];
export declare const crossProduct: (list: any[], k: number) => any[][];
export declare const version = 1;
export {};
