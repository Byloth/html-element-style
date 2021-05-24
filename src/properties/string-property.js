export default class StringProperty
{
    _element = undefined;
    _name = undefined;

    get value()
    {
        return this._element.style[this._name];
    }
    set value(property)
    {
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
    }

    [Symbol.toPrimitive](hint)
    {
        return this.value;
    }
}
