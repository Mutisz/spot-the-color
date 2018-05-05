import { get, curry } from "lodash";

export const GameState = {
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE"
};

export const Difficulty = {
  EASY: "EASY",
  MEDIUM: "MEDIUM",
  HARD: "HARD",
  EXTREME: "EXTREME"
};

export const Representation = {
  RGB: "RGB",
  HSL: "HSL",
  HEX: "HEX"
};

export const ColorCountByDifficulty = {
  [Difficulty.EASY]: 3,
  [Difficulty.MEDIUM]: 6,
  [Difficulty.HARD]: 9,
  [Difficulty.EXTREME]: 12
};

export const AttemptCountByDifficulty = {
  [Difficulty.EASY]: 1,
  [Difficulty.MEDIUM]: 2,
  [Difficulty.HARD]: 3,
  [Difficulty.EXTREME]: 4
};

export const DifficultyDefault = Difficulty.MEDIUM;
export const RepresentationDefault = Representation.RGB;

const getRequired = (collection, index) => {
  const value = get(collection, index, null);
  if (value === null) {
    throw new Error("Index not found in collection");
  }

  return value;
};

export const getColorCount = curry(getRequired)(ColorCountByDifficulty);
export const getAttemptCount = curry(getRequired)(AttemptCountByDifficulty);
