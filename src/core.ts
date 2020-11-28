export abstract class BaseStyle<T>
{
    protected _element: HTMLElement;

    public constructor(element: HTMLElement)
    {
        this._element = element;
    }

    public abstract get(): T;
    public abstract set(value: T | null): void;
}
