import StringProperty from "./string-property";

export default class DimensionProperty extends StringProperty
{
    static ParseProperty(value)
    {
        const regex = /^([0-9]+(?:\.[0-9]+)?)([cm]m|ch|e[mx]|in|p[ctx]|rem|v[hw]|v(?:max|min)|%)?$/i;
        const matches = value.match(regex);

        return { value: parseFloat(matches[1]), unit: matches[2] };
    }

    _value = undefined;
    _unit = undefined;

    _checkType = (value) => value;

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

        property = this._checkType(property);

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
        return "DimensionProperty";
    }

    constructor(element, name, unit = "px", options = undefined)
    {
        super(element, name);

        this._value = null;
        this._unit = unit;

        if (options?.typeCheck)
        {
            this._checkType = (value) =>
            {
                const type = typeof value;

                if (type === "number")
                {
                    value = { value };
                }
                else if (type === "string")
                {
                    value = DimensionProperty.ParseProperty(value);
                }

                return value;
            };
        }
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
        const property = DimensionProperty.ParseProperty(this._element.style[this._name]);

        this._value = property.value;
        if (property.unit)
        {
            this._unit = property.unit;
        }
    }

    [Symbol.toPrimitive](hint)
    {
        if (hint === "string")
        {
            if (this._value)
            {
                return `${this._value}${this._unit}`;
            }

            return "";
        }

        return this._value;
    }
}
