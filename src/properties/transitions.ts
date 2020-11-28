import { BaseStyle } from "../core";
import TransitionValue, { Transition } from "../values/transition";

export interface Transitions { boxShadow?: Transition | null; transform?: Transition | null }
export default class TransitionsProperty extends BaseStyle<Transitions> implements Transitions
{
    public readonly boxShadow: TransitionValue;
    public readonly transform: TransitionValue;

    public constructor(element: HTMLElement)
    {
        super(element);

        this.boxShadow = new TransitionValue(element, "transition", "box-shadow");
        this.transform = new TransitionValue(element, "transition", "transform");
    }

    public get(): Transitions
    {
        return { boxShadow: this.boxShadow.get(), transform: this.transform.get() };
    }
    public set(transition: Transitions | null): void
    {
        if (transition === null) { transition = { boxShadow: null, transform: null }; }
        if (transition.boxShadow !== undefined) { this.boxShadow.set(transition.boxShadow); }
        if (transition.transform !== undefined) { this.transform.set(transition.transform); }
    }
}
