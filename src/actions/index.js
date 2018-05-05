import { assign } from "lodash";
import { generate } from "../utilities/colorUtility";

export const START_NEW_GAME = "START_NEW_GAME";
export const CHANGE_REPRESENTATION = "CHANGE_REPRESENTATION";
export const SELECT_COLOR = "SELECT_COLOR";

export const startNewGame = difficulty =>
  assign(
    {
      type: START_NEW_GAME,
      difficulty: difficulty
    },
    generate(difficulty)
  );

export const changeRepresentation = representation => ({
  type: CHANGE_REPRESENTATION,
  representation: representation
});

export const selectColor = color => ({
  type: SELECT_COLOR,
  color: color
});
