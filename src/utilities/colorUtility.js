import { map, sample, flow } from "lodash";
import tinycolor from "tinycolor2";
import { Representation, getColorCount } from "./gameUtility";

export function formatColor(color, representation) {
  const tinycolorObject = tinycolor(color);
  switch (representation) {
    case Representation.RGB:
      return tinycolorObject.toRgbString();
    case Representation.HSL:
      return tinycolorObject.toHslString();
    case Representation.HEX:
      return tinycolorObject.toHexString();
    default:
      throw new Error("Unknown representation");
  }
}

export function generate(difficulty) {
  const colorCount = getColorCount(difficulty);
  const colorsAll = map(
    Array(colorCount),
    flow(tinycolor.random, color => color.toRgb())
  );
  const colorTarget = sample(colorsAll);
  return {
    colorsAll,
    colorTarget
  };
}
