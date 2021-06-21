import { TypeException, ValueException } from "@/exceptions";

import StringProperty from "./string-property";

export default class IntegerProperty extends StringProperty
{
    _value = undefined;

    _checkType = (value) => value;
    _checkValue = (value) => value;

    get value()
    {
        return this._value;
    }
    set value(integer)
    {
        integer = this._checkType(integer);
        integer = this._checkValue(integer);

        this._value = integer;

        this._setStyle();
    }

    get [Symbol.toStringTag]()
    {
        return "IntegerProperty";
    }

    constructor(element, name, options = undefined)
    {
        super(element, name);

        this._value = 0;

        if (options?.typeCheck)
        {
            this._checkType = (value) =>
            {
                const type = typeof value;

                if (type === "number")
                {
                    value = Math.trunc(value);
                }
                else if (type === "string")
                {
                    value = parseInt(value);
                }
                else
                {
                    throw new TypeException("The type of the value you're trying to assign is invalid. " +
                                            `It should be a valid "number" or, at least, a parsable "string".`);
                }

                return value;
            };
        }
        if (options?.valueCheck)
        {
            this._checkValue = (value) =>
            {
                if (!isFinite(value) || isNaN(value))
                {
                    throw new ValueException(`The value "${value}" you're trying to assign is invalid. ` +
                                             `It should be a valid "number" or, at least, a parsable "string".`);
                }

                return value;
            };
        }
    }

    _setStyle()
    {
        if (this._value !== null)
        {
            this._element.style[this._name] = `${this._value}`;
        }
        else
        {
            this._element.style[this._name] = "";
        }
    }

    refresh()
    {
        const integer = parseInt(this._element.style[this._name]);

        this._value = integer;
    }

    [Symbol.toPrimitive](hint)
    {
        if (hint === "string") { return `${this._value}`; }

        return this._value;
    }
}
