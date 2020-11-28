import { BaseStyle } from "./core";

import TransformationsProperty, { Transformations } from "./properties/transformations";
import TransitionsProperty, { Transitions } from "./properties/transitions";

export interface CSSProperties { transform?: Transformations | null; transition?: Transitions | null }
export default class HTMLElementStyle extends BaseStyle<CSSProperties> implements CSSProperties
{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static readonly AVAILABLE_PROPERTIES: Record<string, new(element: HTMLElement) => any> = {
        "transform": TransformationsProperty,
        "transition": TransitionsProperty
    };

    public readonly transform: TransformationsProperty | null;
    public readonly transition: TransitionsProperty | null;

    public constructor(element: HTMLElement, enabledProperties: string[] = [])
    {
        super(element);

        this.transform = null;
        this.transition = null;

        for (const property of enabledProperties)
        {
            this.enable(property);
        }
    }

    public enable(property: string): void
    {
        const Property = HTMLElementStyle.AVAILABLE_PROPERTIES[property];

        if (Property)
        {
            this[property] = new Property(this._element);
        }
        else
        {
            throw new Error(`You cannot enable unknown or unsupported "${property}" CSS property.`);
        }
    }

    public get(): CSSProperties
    {
        return { transform: this.transform?.get(), transition: this.transition?.get() };
    }
    public set(style: CSSProperties): void
    {
        if (style === null) { style = { transform: null, transition: null }; }
        if (style.transform !== undefined) { this.transform?.set(style.transform); }
        if (style.transition !== undefined) { this.transition?.set(style.transition); }
    }

    // eslint-disable-next-line no-undef
    [key: string]: keyof HTMLElementStyle;
}
