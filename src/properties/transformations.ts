import { BaseStyle } from "../core";
import Axes3DValue, { Axes3D } from "../values/axes-3d";

export interface Transformations { rotate?: Axes3D | null, translate?: Axes3D | null }
export default class TransformationsProperty extends BaseStyle<Transformations> implements Transformations
{
    public readonly rotate: Axes3DValue;
    public readonly translate: Axes3DValue;

    public constructor(element: HTMLElement)
    {
        super(element);

        this.rotate = new Axes3DValue(element, "transform", "rotate", "deg");
        this.translate = new Axes3DValue(element, "transform", "translate");
    }

    public get(): Transformations
    {
        return { rotate: this.rotate.get(), translate: this.translate.get() };
    }
    public set(transform: Transformations | null): void
    {
        if (transform === null) { transform = { rotate: null, translate: null }; }
        if (transform.rotate !== undefined) { this.rotate.set(transform.rotate); }
        if (transform.translate !== undefined) { this.translate.set(transform.translate); }
    }
}
