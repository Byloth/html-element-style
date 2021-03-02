import { BaseStyle } from "./core";

import TransformationsProperty from "./properties/transformations";
import TransitionsProperty from "./properties/transitions";

export class ElementStyle extends BaseStyle
{
    public get(): Record<string, unknown>
    {
        throw new Error("Method not implemented.");
    }
    public set(value: Record<string, unknown> | null): void
    {
        throw new Error("Method not implemented.");
    }
}

export default class HTMLElementStyle extends Proxy<ElementStyle>
{
    protected static readonly _CUSTOM_PROPERTIES: Record<string, new(element: HTMLElement) => BaseStyle> = {
        "transform": TransformationsProperty,
        "transition": TransitionsProperty
    };

    protected _style: ElementStyle;

    public constructor(element: HTMLElement)
    {
        const style = new ElementStyle(element);

        const enable = (obj: ElementStyle, key: string): void =>
        {
            let Property: new(element: HTMLElement) => BaseStyle;

            if (key in HTMLElementStyle._CUSTOM_PROPERTIES)
            {
                Property = HTMLElementStyle._CUSTOM_PROPERTIES[key];
            }
            else
            {
                // TODO!
            }

            obj[key] = new Property(element);
        };

        super(style, {
            get: (obj: ElementStyle, key: string): unknown =>
            {
                if (!(key in obj))
                {
                    enable(obj, key);
                }

                return obj[key];
            },
            set: (obj: ElementStyle, key: string, value: unknown): boolean =>
            {
                if (!(key in obj))
                {
                    enable(obj, key);
                }

                obj[key] = value;

                return true;
            }
        });

        this._style = style;
    }

    public get(): Record<string, unknown>
    {
        return { transform: this.transform?.get(), transition: this.transition?.get() };
    }
    public set(style: Record<string, unknown> | null): void
    {
        if (style === null) { style = { transform: null, transition: null }; }
        if (style.transform !== undefined) { this.transform?.set(style.transform); }
        if (style.transition !== undefined) { this.transition?.set(style.transition); }
    }
}
