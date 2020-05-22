interface MappableIterable<T> extends Iterable<T> {
  map<U>(
    this: MappableIterable<T>,
    mapFn: (item: T, index: number) => U
  ): Array<U>;
}

/**
 * @description Return a mappable iterable representing a number sequence
 * from 'from' (included) to 'to' (excluded), including values spaced by 'step'.
 * @param {number} from The sequence starting value, defaults to 0
 * @param {number} to The sequence end value.
 * @param {number} step The step, defaults to 1.
 * @returnType MappableIterable<number>
 */
function range(
  from: number,
  to: number,
  step?: number
): MappableIterable<number>;

function range(to: number): MappableIterable<number>;

function range(
  from: number,
  to: number = 0,
  step: number = 1
): MappableIterable<number> {
  if (step <= 0) {
    throw new Error("argument 'step' must be greater than zero");
  }
  if (arguments.length < 2) {
    [to, from] = [from, to];
  }
  const increasing = from <= to;
  return {
    *[Symbol.iterator]() {
      let value = from;
      while (increasing ? value < to : value > to) {
        yield value;
        value += increasing ? step : -step;
      }
    },
    map<U>(
      this: MappableIterable<number>,
      mapWith: (item: number, index: number) => U
    ) {
      return Array.from(this, mapWith);
    },
  };
}

export default range;
