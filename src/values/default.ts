import { BaseStyle } from "../core";

export interface Default { value?: number | string | null; unit?: string }
export default class DefaultValue extends BaseStyle<Default> implements Default
{
    public static readonly DEFAULT_UNIT = "px";

    protected _x: number | null;
    protected _y: number | null;
    protected _z: number | null;

    protected _unit: string;

    protected _setter: (coord: string, value: number | null) => void;

    public get x(): number | null
    {
        return this._x;
    }
    public set x(value: number | null)
    {
        this._x = value;

        this._setter("X", value);
    }

    public get y(): number | null
    {
        return this._y;
    }
    public set y(value: number | null)
    {
        this._y = value;

        this._setter("Y", value);
    }

    public get z(): number | null
    {
        return this._z;
    }
    public set z(value: number | null)
    {
        this._z = value;

        this._setter("Z", value);
    }

    public get unit(): string
    {
        return this._unit;
    }
    public set unit(value: string)
    {
        this._unit = value;

        this.x = this._x;
        this.y = this._y;
        this.z = this._z;
    }

    public constructor(element: HTMLElement, property: string, name: string,
        unit = Axes3DValue.DEFAULT_UNIT)
    {
        super(element);

        this._x = null;
        this._y = null;
        this._z = null;

        this._unit = unit;

        this._setter = (coord: string, value: number | null): void =>
        {
            const matchingRegexp = new RegExp(`${name}${coord}\\(([-0-9\\.]+)([a-z]+)\\)`, "gi");
            const propertyValue = element.style.getPropertyValue(property);

            const replacingValue = (value !== null) ? `${name}${coord}(${value}${this._unit})` : "";

            const matches = matchingRegexp.exec(propertyValue);
            if (matches)
            {
                const replacedValue = propertyValue.replace(matchingRegexp, replacingValue).replace(/^\s|\s$/gi, "");

                if (propertyValue !== replacedValue)
                {
                    element.style.setProperty(property, replacedValue);
                }
            }
            else
            {
                const replacedValue = `${propertyValue} ${replacingValue}`.replace(/^\s|\s$/gi, "");

                if (propertyValue !== replacedValue)
                {
                    element.style.setProperty(property, replacedValue);
                }
            }
        };
    }

    public get(): Default
    {
        return { x: this._x, y: this._y, z: this._z, unit: this._unit };
    }
    public set(axes: Default | null): void
    {
        if (axes === null) { axes = { x: null, y: null, z: null }; }
        if (axes.unit !== undefined) { this._unit = axes.unit; }
        if (axes.x !== undefined) { this.x = axes.x; }
        if (axes.y !== undefined) { this.y = axes.y; }
        if (axes.z !== undefined) { this.z = axes.z; }
    }
}
