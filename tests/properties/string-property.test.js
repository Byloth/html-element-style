/* eslint-disable dot-notation */

import { TypeException } from "@/exceptions";

import HTMLElementStyle from "@/html-element-style";

const body = document.body;
const style = new HTMLElementStyle(body);

describe("Property defaults:", () =>
{
    test("Default value as `number`...", () => expect(() => +style.clear).toThrow(TypeException));
    test("Default value as `default`...", () => expect(style.content + "").toBe(""));
    test("Default value as `string`...", () => expect(`${style.cursor}`).toBe(""));

    test.todo("Check of `style` attribute value..."); // body.style["padding-top"]; -> undefined / null / 0
});
describe("Property assignment:", () =>
{
    describe("Invalid assignment:", () =>
    {
        test("Fail on invalid `number` assignment...", () =>
            expect(() => (style["align-self"] = 33.333)).toThrow(TypeException));

        test("Fail on invalid `object` assignment...", () =>
            expect(() => (style.alignSelf = { value: 25 })).toThrow(TypeException));

        test.todo("Fail on invalid shorthand operation..."); // style.alignSelf *= "bar";
        test.todo("Fail on incrementation..."); // style.alignSelf++;
    });
    describe("Valid assignment:", () =>
    {
        test("`string` assignment...", () =>
        {
            style["display"] = "block";

            expect(`${style.display}`).toBe("block");
        });
        test("`string` re-assignment...", () =>
        {
            style.display = "none";

            expect(`${style["display"]}`).toBe("none");
        });
    });
});
describe("Value representation:", () =>
{
    test("Value as `number`...", () =>
    {
        style["white-space"] = "nowrap";

        expect(() => +style.whiteSpace).toThrow(TypeException);
    });
    test("Value as `default` (+ `string`)...", () => expect(style.whiteSpace + " value").toBe("nowrap value"));
    test("Value as `default` (+ `number`)...", () => expect(style.whiteSpace + 2021).toBe("nowrap2021"));
    test("Value as `string`...", () => expect(`${style.whiteSpace}`).toBe("nowrap"));
    test.todo("Value as is (`object`)");
});
describe("Final checks:", () =>
{
    test.todo("Re-check of `style` attribute value...");
});
