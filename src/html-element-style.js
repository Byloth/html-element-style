import { PropertyException } from "./exceptions";

import { StringProperty } from "./properties";
import { PROPERTIES } from "./properties/constants";

export default class HTMLElementStyle
{
    static DEFAULT_OPTS = {

        // Make values assignable to properties in a various different ways...
        // Automatically parse strings or integers transforming it in the right
        //  object to assign or raising exceptions when types are invalid.
        //
        typeCheck: true,

        // Enables congruity checks on values before assignments
        //  raising exceptions when values are invalid.
        //
        valueCheck: true
    };

    static IsKebabCase(value)
    {
        return value.includes("-");
    }
    static ToCamelCase(value)
    {
        return value.replace(/-[a-z]/gi, (match) => match[1].toUpperCase());
    }

    static NormalizePropertyName(property)
    {
        if (HTMLElementStyle.IsKebabCase(property))
        {
            return HTMLElementStyle.ToCamelCase(property);
        }

        return property;
    }
    static NormalizePropertyValue(property, value)
    {
        if ((value === "") || (value === undefined))
        {
            return null;
        }

        return value;
    }

    static InitializeProperty(property, element, options = undefined)
    {
        if (!(property in element.style))
        {
            throw new PropertyException(`The CSS property named "${property}" doesn't exists.`);
        }

        if (property in PROPERTIES)
        {
            return PROPERTIES[property](element, property, options);
        }
        else
        {
            // eslint-disable-next-line no-console
            console.warn(
                `The CSS property named "${property}" doesn't have a initializer specified. ` +
                "Falling back on the default one..."
            );

            return StringProperty(element, property);
        }
    }
    static GetPropertyReady(instance, property, element, options = undefined)
    {
        if (!(property in instance))
        {
            instance[property] = HTMLElementStyle.InitializeProperty(property, element, options);
        }

        return instance[property];
    }

    get [Symbol.toStringTag]()
    {
        return "HTMLElementStyle";
    }

    constructor(element, options = undefined)
    {
        options = { ...HTMLElementStyle.DEFAULT_OPTS, ...options };

        return new Proxy(this, {
            get: (target, property, receiver) =>
            {
                if (typeof property === "string")
                {
                    property = HTMLElementStyle.NormalizePropertyName(property);

                    HTMLElementStyle.GetPropertyReady(target, property, element, options);
                }

                return target[property];
            },
            set: (target, property, value, receiver) =>
            {
                if (typeof property === "string")
                {
                    property = HTMLElementStyle.NormalizePropertyName(property);
                    value = HTMLElementStyle.NormalizePropertyValue(property, value);

                    HTMLElementStyle.GetPropertyReady(target, property, element, options);
                }

                target[property].value = value;

                return true;
            }
        });
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
