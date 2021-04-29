import { DimensionStyleProperty } from "./properties";

function isKebabCase(value)
{
    return value.includes("-");
}
function toCamelCase(value)
{
    return value.replace(/-[a-z]/gi, (match) => match[1].toUpperCase());
}

function normalizePropertyName(property)
{
    if (isKebabCase(property))
    {
        return toCamelCase(property);
    }

    return property;
}
function normalizePropertyValue(property, value)
{
    if ((value === "") || (value === undefined))
    {
        return null;
    }

    return value;
}

function initializePropertyIfNotExists(target, property, element)
{
    if (!(property in target))
    {
        target[property] = new DimensionStyleProperty(element, property);
    }

    return target[property];
}

export default class HTMLElementStyle
{
    constructor(element)
    {
        return new Proxy(this, {
            get: (target, property, receiver) =>
            {
                if (typeof property === "string")
                {
                    property = normalizePropertyName(property);
                    initializePropertyIfNotExists(target, property, element);
                }

                return target[property];
            },
            set: (target, property, value, receiver) =>
            {
                if (typeof property === "string")
                {
                    property = normalizePropertyName(property);
                    initializePropertyIfNotExists(target, property, element);
                    value = normalizePropertyValue(property, value);
                }
                
                target[property].value = value;

                return true;
            }
        });
    }

    get [Symbol.toStringTag]()
    {
        return "HTMLElementStyle";
    }

    [Symbol.toPrimitive](hint)
    {
        if (hint === "string")
        {
            const properties = [];

            for (const property in this)
            {
                properties.push(`${property}(${this[property]})`);
            }

            return `HTMLElementStyle { ${properties.sort().join(", ")} }`.replace("  ", " ");
        }

        return this;
    }
}
