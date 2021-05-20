import { PropertyException } from "./exceptions";

import { PROPERTIES } from "./properties/constants";

import StyleProperty from "./properties/default";
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

function initializeStyleProperty(property, element)
{
    if (!(property in element.style))
    {
        throw new PropertyException(`The CSS property named "${property}" doesn't exists.`);
    }

    if (property in PROPERTIES)
    {
        return PROPERTIES[property](element, property);
    }
    else
    {
        // eslint-disable-next-line no-console
        console.warn(`The CSS property named "${property}" doesn't have a initializer specified. Falling back on the default one...`);

        return StyleProperty(element, property);
    }
}
function initializePropertyIfNotExists(target, property, element)
{
    if (!(property in target))
    {
        target[property] = initializeStyleProperty(property, element);
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
