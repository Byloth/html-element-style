import { InvalidPropertyException } from "./exceptions";

import PROPERTIES from "./properties/constants";
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

function getStylePropertyInitializer(property, element)
{
    if (!(property in element.style))
    {
        throw new InvalidPropertyException(`The CSS property named "${property}" doesn't exists.`);
    }

    if (PROPERTIES.DIMENSIONS.includes(property))
    {
        return DimensionStyleProperty;
    }
    else
    {
        // eslint-disable-next-line no-console
        console.warn(`The CSS property named "${property}" doesn't have a initializer specified. Falling back on the default one...`);

        return StyleProperty;
    }
}
function initializePropertyIfNotExists(target, property, element)
{
    if (!(property in target))
    {
        const StylePropertyInitializer = getStylePropertyInitializer(property, element);

        target[property] = new StylePropertyInitializer(element, property);
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
