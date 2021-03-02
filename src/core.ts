export abstract class BaseStyle<T = unknown>
{
    protected _element: HTMLElement;

    public constructor(element: HTMLElement)
    {
        this._element = element;
    }

    public abstract get(): T;
    public abstract set(value: T | null): void;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}
