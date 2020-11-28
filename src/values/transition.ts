import { BaseStyle } from "../core";

export interface Transition { duration?: number | null; timingFunction?: string; delay?: number; unit?: string }
export default class TransitionValue extends BaseStyle<Transition> implements Transition
{
    public static readonly DEFAULT_TIMING_FUNCTION = "linear";
    public static readonly DEFAULT_DELAY = 0;
    public static readonly DEFAULT_UNIT = "ms";

    protected _duration: number | null;

    protected _timingFunction: string;
    protected _delay: number;
    protected _unit: string;

    protected _setter: () => void;

    public get duration(): number | null
    {
        return this._duration;
    }
    public set duration(value: number | null)
    {
        this._duration = value;

        this._setter();
    }

    public get timingFunction(): string
    {
        return this._timingFunction;
    }
    public set timingFunction(value: string)
    {
        this._timingFunction = value;

        this._setter();
    }

    public get delay(): number
    {
        return this._delay;
    }
    public set delay(value: number)
    {
        this._delay = value;

        this._setter();
    }

    public get unit(): string
    {
        return this._unit;
    }
    public set unit(value: string)
    {
        this._unit = value;

        this._setter();
    }

    public constructor(element: HTMLElement, property: string, name: string,
        timingFunction = TransitionValue.DEFAULT_TIMING_FUNCTION,
        delay = TransitionValue.DEFAULT_DELAY,
        unit = TransitionValue.DEFAULT_UNIT)
    {
        super(element);

        const matchingRegexp = new RegExp(`${name} ([0-9\\.]+)([a-z]+)(?: ([a-z-]+))?(?: ([0-9\\.]+)([a-z]+))?`, "gi");

        this._duration = 0;

        this._timingFunction = timingFunction;
        this._delay = delay;
        this._unit = unit;

        this._setter = (): void =>
        {
            const propertyValue = element.style.getPropertyValue(property);

            let replacingValue = "";

            if (this._duration !== null)
            {
                replacingValue = `${name} ${this._duration}${this._unit}`;

                if (this._timingFunction !== TransitionValue.DEFAULT_TIMING_FUNCTION)
                {
                    replacingValue += ` ${this._timingFunction}`;
                }
                if (this._delay !== TransitionValue.DEFAULT_DELAY)
                {
                    replacingValue += ` ${this._delay}${this._unit}`;
                }
            }

            const matches = matchingRegexp.exec(propertyValue);
            if (matches)
            {
                const replacedValue = propertyValue.replace(matchingRegexp, replacingValue).replace(/^,\s|,\s$/gi, "");

                if (propertyValue !== replacedValue)
                {
                    element.style.setProperty(property, replacedValue);
                }
            }
            else
            {
                const replacedValue = `${propertyValue}, ${replacingValue}`.replace(/^,\s|,\s$/gi, "");

                if (propertyValue !== replacedValue)
                {
                    element.style.setProperty(property, replacedValue);
                }
            }
        };
    }

    public get(): Transition
    {
        return { duration: this._duration, timingFunction: this._timingFunction, delay: this._delay, unit: this._unit };
    }
    public set(transition: Transition | null): void
    {
        if (transition === null) { transition = { duration: null }; }
        if (transition.duration !== undefined) { this._duration = transition.duration; }
        if (transition.timingFunction !== undefined) { this._timingFunction = transition.timingFunction; }
        if (transition.delay !== undefined) { this._delay = transition.delay; }
        if (transition.unit !== undefined) { this._unit = transition.unit; }

        this._setter();
    }
}
