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

const addPair = pairOperation<number>((x, y) => x + y);
const substractPair = pairOperation<number>((x, y) => x - y);
const dividePair = pairOperation<number>((x, y) => x / y);

export { addPair, substractPair, dividePair };
