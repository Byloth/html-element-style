import DimensionProperty from "./dimension-property";
import IntegerProperty from "./integer-property";
import StringProperty from "./string-property";

export const PROPERTIES = {
    "alignContent": (element, name, options = undefined) => new StringProperty(element, name, options),
    "alignItems": (element, name, options = undefined) => new StringProperty(element, name, options),
    "alignSelf": (element, name, options = undefined) => new StringProperty(element, name, options),
    "bottom": (element, name, options = undefined) => new DimensionProperty(element, name, undefined, options),
    "clear": (element, name, options = undefined) => new StringProperty(element, name, options),
    "content": (element, name, options = undefined) => new StringProperty(element, name, options),
    "cursor": (element, name, options = undefined) => new StringProperty(element, name, options),
    "display": (element, name, options = undefined) => new StringProperty(element, name, options),
    "float": (element, name, options = undefined) => new StringProperty(element, name, options),
    "height": (element, name, options = undefined) => new DimensionProperty(element, name, undefined, options),
    "justifyContent": (element, name, options = undefined) => new StringProperty(element, name, options),
    "justifyItems": (element, name, options = undefined) => new StringProperty(element, name, options),
    "justifySelf": (element, name, options = undefined) => new StringProperty(element, name, options),
    "left": (element, name, options = undefined) => new DimensionProperty(element, name, undefined, options),
    "lineHeight": (element, name, options = undefined) => new DimensionProperty(element, name, undefined, options),
    "marginBottom": (element, name, options = undefined) => new DimensionProperty(element, name, undefined, options),
    "marginLeft": (element, name, options = undefined) => new DimensionProperty(element, name, undefined, options),
    "marginRight": (element, name, options = undefined) => new DimensionProperty(element, name, undefined, options),
    "marginTop": (element, name, options = undefined) => new DimensionProperty(element, name, undefined, options),
    "maxHeight": (element, name, options = undefined) => new DimensionProperty(element, name, undefined, options),
    "maxWidth": (element, name, options = undefined) => new DimensionProperty(element, name, undefined, options),
    "minHeight": (element, name, options = undefined) => new DimensionProperty(element, name, undefined, options),
    "minWidth": (element, name, options = undefined) => new DimensionProperty(element, name, undefined, options),
    "paddingBottom": (element, name, options = undefined) => new DimensionProperty(element, name, undefined, options),
    "paddingLeft": (element, name, options = undefined) => new DimensionProperty(element, name, undefined, options),
    "paddingRight": (element, name, options = undefined) => new DimensionProperty(element, name, undefined, options),
    "paddingTop": (element, name, options = undefined) => new DimensionProperty(element, name, undefined, options),
    "position": (element, name, options = undefined) => new StringProperty(element, name, options),
    "right": (element, name, options = undefined) => new DimensionProperty(element, name, undefined, options),
    "top": (element, name, options = undefined) => new DimensionProperty(element, name, undefined, options),
    "whiteSpace": (element, name, options = undefined) => new StringProperty(element, name, options),
    "width": (element, name, options = undefined) => new DimensionProperty(element, name, undefined, options),
    "zIndex": (element, name, options = undefined) => new IntegerProperty(element, name, options)
};
