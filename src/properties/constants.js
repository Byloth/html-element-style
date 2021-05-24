import DimensionProperty from "./dimension-property";
import IntegerProperty from "./integer-property";

export const PROPERTIES = {
    "bottom": (element, name, options = undefined) => new DimensionProperty(element, name, undefined, options),
    "height": (element, name, options = undefined) => new DimensionProperty(element, name, undefined, options),
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
    "right": (element, name, options = undefined) => new DimensionProperty(element, name, undefined, options),
    "top": (element, name, options = undefined) => new DimensionProperty(element, name, undefined, options),
    "width": (element, name, options = undefined) => new DimensionProperty(element, name, undefined, options),
    "zIndex": (element, name, options = undefined) => new IntegerProperty(element, name, options)
};
