import React from "react";
import { connect } from "react-redux";
import { map } from "lodash";
import { startNewGame, changeRepresentation } from "../actions";
import { colorCount } from "../selectors";
import { Difficulty, Representation } from "../utilities/gameUtility";
import "./GameMenu.css";

const mapStateToProps = state => ({
  difficulty: state.difficulty,
  representation: state.representation,
  colorCount: colorCount(state)
});

const GameMenuOptionDropdownItem = ({ value, clickHandler }) => (
  <div value={value} className="dropdown-item" onClick={clickHandler}>
    {value}
  </div>
);

const GameMenuOptionDropdownItemList = ({ valueList, clickHandler }) =>
  map(valueList, value => (
    <GameMenuOptionDropdownItem {...{ key: value, value, clickHandler }} />
  ));

const GameMenuOptionDropdown = ({
  label,
  selected,
  valueList,
  clickHandler
}) => (
  <div className="game-menu-item">
    <div className="label">{label}</div>
    <div className="dropdown">
      <div className="dropdown-button">{selected}</div>
      <div className="dropdown-content">
        <GameMenuOptionDropdownItemList {...{ valueList, clickHandler }} />
      </div>
    </div>
  </div>
);

const GameMenuButton = ({ label, clickHandler }) => (
  <div className="game-menu-item">
    <div className="button" onClick={clickHandler}>
      {label}
    </div>
  </div>
);

const GameMenu = ({ difficulty, representation, colorCount, dispatch }) => (
  <div className="game-menu">
    <GameMenuButton
      label="NEW GAME"
      clickHandler={() => dispatch(startNewGame(difficulty))}
    />
    <GameMenuOptionDropdown
      label="DIFFICULTY"
      selected={difficulty}
      valueList={Difficulty}
      clickHandler={event =>
        dispatch(startNewGame(event.target.getAttribute("value")))
      }
    />
    <GameMenuOptionDropdown
      label="REPRESENTATION"
      selected={representation}
      valueList={Representation}
      clickHandler={event =>
        dispatch(changeRepresentation(event.target.getAttribute("value")))
      }
    />
  </div>
);

export default connect(mapStateToProps)(GameMenu);
