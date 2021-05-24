import { TypeException, ValueException } from "@/exceptions";

import StringProperty from "./string-property";

export default class IntegerProperty extends StringProperty
{
    _value = undefined;

    get value()
    {
        return this._value;
    }
    set value(integer)
    {
        if (integer === null)
        {
            integer = 0;
        }

        const type = typeof integer;

        if (type === "number")
        {
            integer = Math.trunc(integer);
        }
        else if (type === "string")
        {
            integer = parseInt(integer);
        }
        else
        {
            throw new TypeException("The type of the value you're trying to assign is invalid. " +
                                    `It should be a valid "number" or, at least, a parsable "string".`);
        }

        if (!isFinite(integer) || isNaN(integer))
        {
            throw new ValueException(`The value "${integer}" you're trying to assign is invalid. ` +
                                     `It should be a valid "number" or, at least, a parsable "string".`);
        }

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

        this._value = null;
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
