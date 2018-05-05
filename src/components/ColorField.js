import React from "react";
import { noop } from "lodash";
import classNames from "classnames";
import "./ColorField.css";

const getColorMaskContent = isCorrect => ({
  __html: isCorrect ? "&#10004;" : "&#10060;"
});

const ColorMask = ({ isCorrect }) => {
  const classes = classNames("mask", {
    success: isCorrect,
    failure: !isCorrect
  });
  const label = isCorrect ? "Right" : "Wrong";
  const content = getColorMaskContent(isCorrect);

  return (
    <div className={classes}>
      <span role="img" aria-label={label} dangerouslySetInnerHTML={content} />
    </div>
  );
};

const ColorField = ({
  colorFormatted,
  isClicked,
  isDisabled,
  isCorrect,
  clickHandler
}) => {
  const className = isDisabled ? "color-field-disabled" : "color-field";
  const style = { backgroundColor: colorFormatted };
  const onClick = isDisabled ? noop : clickHandler;

  return (
    <div {...{ className, style, onClick }}>
      {isClicked ? <ColorMask {...{ isCorrect }} /> : null}
    </div>
  );
};

export default ColorField;
