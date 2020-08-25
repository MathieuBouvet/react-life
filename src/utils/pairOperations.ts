export type Pair<T> = [T, T];

function isPair<T>(p: any): p is Pair<T> {
  return p.length === 2 && typeof p[0] === typeof p[1];
}

function pairOperation<T>(
  operation: (x: T, y: T) => T
): (p1: Pair<T>, p2: Pair<T> | T) => Pair<T> {
  return (p1, p2) => {
    const secondOperand = !isPair(p2) ? ([p2, p2] as Pair<T>) : p2;
    return [
      operation(p1[0], secondOperand[0]),
      operation(p1[1], secondOperand[1]),
    ];
  };
}

function unaryOperation<T>(operation: (x: T) => T): (p: Pair<T>) => Pair<T> {
  return p => [operation(p[0]), operation(p[1])];
}

const addPair = pairOperation<number>((x, y) => x + y);
const substractPair = pairOperation<number>((x, y) => x - y);
const dividePair = pairOperation<number>((x, y) => x / y);
const ceilPair = unaryOperation<number>(Math.ceil);

function arePairsEqual(p1: Pair<any>, p2: Pair<any>): boolean {
  return p1[0] === p2[0] && p1[1] === p2[1];
}
function arePairsDifferent(p1: Pair<any>, p2: Pair<any>): boolean {
  return !arePairsEqual(p1, p2);
}

export {
  addPair,
  substractPair,
  dividePair,
  ceilPair,
  arePairsEqual,
  arePairsDifferent,
};
