import { createSelector } from "reselect";
import { find } from "lodash";
import {
  GameState,
  getColorCount,
  getAttemptCount
} from "../utilities/gameUtility";

const getDifficulty = state => state.difficulty;
const getColorsClicked = state => state.colorsClicked;
const getColorTarget = state => state.colorTarget;

export const colorCount = createSelector([getDifficulty], getColorCount);

export const attemptCount = createSelector([getDifficulty], getAttemptCount);

export const gameState = createSelector(
  [getColorsClicked, getColorTarget, attemptCount],
  (colorsClicked, colorTarget, attemptCount) => {
    if (find(colorsClicked, colorTarget)) {
      return GameState.SUCCESS;
    } else if (colorsClicked.length >= attemptCount) {
      return GameState.FAILURE;
    }

    return GameState.IN_PROGRESS;
  }
);
