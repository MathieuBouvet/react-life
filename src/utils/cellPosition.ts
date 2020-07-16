import { Pair } from "../utils/pairOperations";

function positionToStr(position: Pair<number>): string {
  return `${position[0]};${position[1]}`;
}

function positionFrom(str: string): Pair<number> {
  const toArray = str.split(";").map(str => parseInt(str, 10));
  return [toArray[0], toArray[1]];
}

export { positionToStr, positionFrom };
