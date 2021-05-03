import StyleProperty from "./default";

function parseProperty(value)
{
    const regex = /^([0-9]+(?:\.[0-9]+)?)([cm]m|ch|e[mx]|in|p[ctx]|rem|v[hw]|v(?:max|min)|%)?$/i;
    const matches = value.match(regex);

    return { value: parseFloat(matches[1]), unit: matches[2] };
}

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

        if (property.value)
        {
            this._value = property.value;
        }
        if (property.unit)
        {
            this._unit = property.unit;
        }

        this._setStyle();
    }

    get unit()
    {
        return this._unit;
    }
    set unit(value)
    {
        this._unit = value;

        this._setStyle();
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

    _setStyle()
    {
        if (this._value !== null)
        {
            this._element.style[this._name] = `${this._value}${this._unit}`;
        }
        else
        {
            this._element.style[this._name] = "";
        }
    }

    refresh()
    {
        const property = parseProperty(this._element.style[this._name]);

        this._value = property.value;
        if (property.unit)
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
