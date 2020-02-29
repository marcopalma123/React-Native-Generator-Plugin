const { generateGraphicNodeStyles } = require("./generateGraphicNodeStyles");
const { generateContainerCode } = require("./generateContainerCode");
const { getNodeChildren } = require("../helpers/getNodeChildren/index");
const {
  pixelUnitPreprocessor
} = require("../preprocessors/pixelUnitPreprocessor");

/**
 * generates code for rectangle element
 * @param {*} rectangle an instance of Rectangle
 * @returns string ui code
 */
function generateRectangleCode(rectangle) {
  const style = generateGraphicNodeStyles(rectangle);

  const { width, height, hasRoundedCorners, effectiveCornerRadii } = rectangle;

  style.width = pixelUnitPreprocessor(width);
  style.height = pixelUnitPreprocessor(height);

  if (hasRoundedCorners) {
    const { topLeft, topRight, bottomRight, bottomLeft } = effectiveCornerRadii;

    if (
      [topLeft, topRight, bottomRight, bottomLeft].every(
        (value, index, array) => value === array[0]
      )
    ) {
      // all values are equal
      style.borderRadius = pixelUnitPreprocessor(topLeft);
    } else {
      style.borderTopStartRadius = pixelUnitPreprocessor(topLeft);
      style.borderTopEndRadius = pixelUnitPreprocessor(topRight);
      style.borderBottomEndRadius = pixelUnitPreprocessor(bottomRight);
      style.borderBottomStartRadius = pixelUnitPreprocessor(bottomLeft);
    }
  }

  const children = getNodeChildren(rectangle);

  if (children.length) {
    return generateContainerCode(children, style);
  }

  return `<View style={${JSON.stringify(style)}}/>\n`;
}

module.exports = {
  generateRectangleCode
};
