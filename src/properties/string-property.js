import { TypeException } from "@/exceptions";

export default class StringProperty
{
    _element = undefined;
    _name = undefined;

    _checkType = (value) => value;

    get value()
    {
        return this._element.style[this._name];
    }
    set value(property)
    {
        property = this._checkType(property);

        this._element.style[this._name] = property;
    }

    get [Symbol.toStringTag]()
    {
        return "StringProperty";
    }

    constructor(element, name, options = undefined)
    {
        this._element = element;
        this._name = name;

        if (options?.typeCheck)
        {
            this._checkType = (value) =>
            {
                const type = typeof value;

                if (type !== "string")
                {
                    throw new TypeException("The type of the value you're trying to assign is invalid. " +
                                            `It should be a valid "string".`);
                }

                return value;
            };
        }
    }

    [Symbol.toPrimitive](hint)
    {
        if (hint === "number")
        {
            throw new TypeException("Cannot convert StringProperty to number value.");
        }

        return this.value;
    }
}
