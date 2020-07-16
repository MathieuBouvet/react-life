type Pair<T> = [T, T];

function pairOperation<T>(
  operation: (x: T, y: T) => T
): (p1: Pair<T>, p2: Pair<T>) => Pair<T> {
  return (p1, p2) => [operation(p1[0], p2[0]), operation(p1[1], p2[1])];
}

const addPair = pairOperation<number>((x, y) => x + y);
const substractPair = pairOperation<number>((x, y) => x - y);

export { addPair, substractPair };
