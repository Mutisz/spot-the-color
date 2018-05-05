import React from "react";
import { connect } from "react-redux";
import { map, find, curry, isEqual } from "lodash";
import classNames from "classnames";
import { selectColor } from "../actions";
import { gameState, attemptCount } from "../selectors";
import { formatColor } from "../utilities/colorUtility";
import { GameState, RepresentationDefault } from "../utilities/gameUtility";
import ColorField from "./ColorField";
import "./GamePanel.css";

const mapStateToProps = state => ({
  representation: state.representation,
  colorTarget: state.colorTarget,
  colorsAll: state.colorsAll,
  colorsClicked: state.colorsClicked,
  gameState: gameState(state),
  attemptCount: attemptCount(state)
});

const getColorFieldContent = curry(
  (colorTarget, colorsClicked, gameState, dispatch, color) => {
    const isClicked = find(colorsClicked, color);
    const isDisabled = isClicked || gameState !== GameState.IN_PROGRESS;
    const isCorrect = isEqual(color, colorTarget);

    const colorFormatted = formatColor(color, RepresentationDefault);
    const clickHandler = () => dispatch(selectColor(color));

    return (
      <ColorField
        {...{
          key: colorFormatted,
          colorFormatted,
          isClicked,
          isDisabled,
          isCorrect,
          clickHandler
        }}
      />
    );
  }
);

const getGameStatusDescriptionContent = (
  representation,
  colorTarget,
  colorsClicked,
  gameState,
  attemptCount
) => {
  switch (gameState) {
    case GameState.IN_PROGRESS:
      const attemptCountLeft = attemptCount - colorsClicked.length;
      return <h4>YOU HAVE {attemptCountLeft} ATTEMPTS LEFT</h4>;
    case GameState.SUCCESS:
      return <h4>YOU SUCCEEDED IN {colorsClicked.length} ATTEMPTS</h4>;
    case GameState.FAILURE:
      return <h4>SELECT NEW GAME TO TRY AGAIN OR LOWER DIFFICULTY SETTING</h4>;
    default:
      throw new Error("Unknown game state");
  }
};

const getGameStatusTitleContent = (representation, colorTarget, gameState) => {
  switch (gameState) {
    case GameState.IN_PROGRESS:
      const colorTargetFormatted = formatColor(colorTarget, representation);
      return (
        <h3>
          CAN YOU SPOT{" "}
          <span className="color-code">{colorTargetFormatted}</span> ?
        </h3>
      );
    case GameState.SUCCESS:
      return <h3>SUCCESS</h3>;
    case GameState.FAILURE:
      return <h3>FAILURE</h3>;
    default:
      throw new Error("Unknown game state");
  }
};

const ColorFieldList = ({
  colorTarget,
  colorsAll,
  colorsClicked,
  gameState,
  dispatch
}) => (
  <div className="color-field-list">
    {map(
      colorsAll,
      getColorFieldContent(colorTarget, colorsClicked, gameState, dispatch)
    )}
  </div>
);

const GameStatus = ({
  representation,
  colorTarget,
  colorsClicked,
  gameState,
  attemptCount
}) => {
  const isSuccess = gameState === GameState.SUCCESS;
  const isFailure = gameState === GameState.FAILURE;
  const classes = classNames("game-status", {
    success: isSuccess,
    failure: isFailure
  });

  return (
    <div className={classes}>
      {getGameStatusTitleContent(representation, colorTarget, gameState)}
      {getGameStatusDescriptionContent(
        representation,
        colorTarget,
        colorsClicked,
        gameState,
        attemptCount
      )}
    </div>
  );
};

const GamePanel = ({
  representation,
  colorTarget,
  colorsAll,
  colorsClicked,
  gameState,
  attemptCount,
  dispatch
}) => (
  <div className="game-panel">
    <GameStatus
      {...{
        representation,
        colorTarget,
        colorsClicked,
        gameState,
        attemptCount
      }}
    />
    <ColorFieldList
      {...{ colorTarget, colorsAll, colorsClicked, gameState, dispatch }}
    />
  </div>
);

export default connect(mapStateToProps)(GamePanel);
