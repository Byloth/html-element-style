import StyleProperty from "./style-property";

function parseProperty(value)
{
    const regex = /^([0-9]+(?:\.[0-9]+)?)([cm]m|ch|e[mx]|in|p[ctx]|rem|v[hw]|v(?:max|min)|%)?$/i;
    const matches = value.match(regex);

    return { value: parseFloat(matches[1]), unit: matches[2] };
}

// top
// bottom
// right
// left

// width
// height
// maxWidth
// maxHeight
// minWidth
// minHeight

// marginTop
// marginBottom
// marginRight
// marginLeft

// paddingTop
// paddingBottom
// paddingRight
// paddingLeft

export default class DimensionStyleProperty extends StyleProperty
{
    _value = undefined;
    _unit = undefined;

    get value()
    {
        return this._value;
    }
    set value(property)
    {
        if (property === null)
        {
            property = { value: null };
        }

        const type = typeof property;

        if (type === "number")
        {
            property = { value: property };
        }
        else if (type === "string")
        {
            property = parseProperty(property);
        }
        
        this._value = property.value;
        if (property.unit)
        {
            this._unit = property.unit;
        }

        if (this._value !== null)
        {
            this._element.style[this._name] = `${this._value}${this._unit}`;
        }
        else
        {
            this._element.style[this._name] = "";
        }
    }

    get [Symbol.toStringTag]()
    {
        return "DimensionStyleProperty";
    }

    constructor(element, name, unit = "px")
    {
        super(element, name);

        this._value = null;
        this._unit = unit;
    }

    refresh()
    {
        const property = parseProperty(this._element.style[this._name]);
        
        this._value = property.value;
        if (value.unit)
        {
            this._unit = property.unit;
        }
    }

    [Symbol.toPrimitive](hint)
    {
        if (hint === "string") { return `${this._value}${this._unit}`; }

        return this._value;
    }
}
