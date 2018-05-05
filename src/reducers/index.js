import { combineReducers } from "redux";
import reduceReducers from "reduce-reducers";
import { assign, concat } from "lodash";
import {
  START_NEW_GAME,
  CHANGE_REPRESENTATION,
  SELECT_COLOR
} from "../actions";
import { gameState } from "../selectors";
import {
  GameState,
  DifficultyDefault,
  RepresentationDefault
} from "../utilities/gameUtility";
import { generate } from "../utilities/colorUtility";

// SINGLE STATE BRANCH REDUCERS

function difficulty(state = DifficultyDefault, action) {
  return action.type === START_NEW_GAME ? action.difficulty : state;
}

function representation(state = RepresentationDefault, action) {
  return action.type === CHANGE_REPRESENTATION ? action.representation : state;
}

function colorTarget(state = null, action) {
  if (action.type === START_NEW_GAME) {
    return action.colorTarget;
  }

  return state;
}

function colorsAll(state = [], action) {
  if (action.type === START_NEW_GAME) {
    return action.colorsAll;
  }

  return state;
}

function colorsClicked(state = [], action) {
  switch (action.type) {
    case START_NEW_GAME:
      return [];
    case SELECT_COLOR:
      return concat(state, action.color);
    default:
      return state;
  }
}

// CROSS-CUTTING REDUCERS

function calculateSuccessCount(state, action) {
  const isSuccess = gameState(state) === GameState.SUCCESS;
  const successCount =
    action.type === SELECT_COLOR && isSuccess
      ? state.successCount + 1
      : state.successCount;

  return { ...state, successCount };
}

function calculateFailureCount(state, action) {
  const isFailure = gameState(state) === GameState.FAILURE;
  const failureCount =
    action.type === SELECT_COLOR && isFailure
      ? state.failureCount + 1
      : state.failureCount;

  return { ...state, failureCount };
}

export const initialState = assign(
  {
    difficulty: DifficultyDefault,
    representation: RepresentationDefault,
    colorsClicked: [],
    successCount: 0,
    failureCount: 0
  },
  generate(DifficultyDefault)
);

export default reduceReducers(
  combineReducers({
    difficulty,
    representation,
    colorTarget,
    colorsAll,
    colorsClicked,
    successCount: (state = 0) => state,
    failureCount: (state = 0) => state
  }),
  calculateSuccessCount,
  calculateFailureCount
);
