import DimensionStyleProperty from "./dimension-style-property";
import IntegerStyleProperty from "./integer-style-property";

export const PROPERTIES = {
    "bottom": (element, name) => new DimensionStyleProperty(element, name),
    "height": (element, name) => new DimensionStyleProperty(element, name),
    "left": (element, name) => new DimensionStyleProperty(element, name),
    "lineHeight": (element, name) => new DimensionStyleProperty(element, name),
    "marginBottom": (element, name) => new DimensionStyleProperty(element, name),
    "marginLeft": (element, name) => new DimensionStyleProperty(element, name),
    "marginRight": (element, name) => new DimensionStyleProperty(element, name),
    "marginTop": (element, name) => new DimensionStyleProperty(element, name),
    "maxHeight": (element, name) => new DimensionStyleProperty(element, name),
    "maxWidth": (element, name) => new DimensionStyleProperty(element, name),
    "minHeight": (element, name) => new DimensionStyleProperty(element, name),
    "minWidth": (element, name) => new DimensionStyleProperty(element, name),
    "paddingBottom": (element, name) => new DimensionStyleProperty(element, name),
    "paddingLeft": (element, name) => new DimensionStyleProperty(element, name),
    "paddingRight": (element, name) => new DimensionStyleProperty(element, name),
    "paddingTop": (element, name) => new DimensionStyleProperty(element, name),
    "right": (element, name) => new DimensionStyleProperty(element, name),
    "top": (element, name) => new DimensionStyleProperty(element, name),
    "width": (element, name) => new DimensionStyleProperty(element, name),
    "zIndex": (element, name) => new IntegerStyleProperty(element, name)
};
