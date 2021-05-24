/* eslint-disable dot-notation */

import HTMLElementStyle from "@/html-element-style";

const body = document.body;
const style = new HTMLElementStyle(body);

describe("Property defaults:", () =>
{
    test("Default value...", () => expect(+style.width).toBe(0));
    test.todo("Check of `style` attribute value..."); // body.style["padding-top"]; -> undefined / null / 0
});
describe("Property assignment:", () =>
{
    describe("Invalid assignment:", () =>
    {
        test.todo("Fail on NaN assignment..."); // style.left = NaN;
        test.todo("Fail on Infinity assignment..."); // style.left = Infinity;
        test.todo("Fail on invalid string assignment..."); // style.left = "bar";
        test.todo("Fail on invalid object assignment..."); // style.left = { foo: "bar" };
        test.todo("Fail on invalid 'value' object assignment..."); // style.left = { value: "123px" };
        test.todo("Fail on invalid 'unit' object assignment..."); // style.left = { unit: "bar" };
        test.todo("Fail on invalid unit assignment..."); // style.left.unit = "bar";
        test.todo("Fail on invalid value assignment..."); // style.left.value = "foo";

        test.todo("Fail on invalid shorthand operation..."); // style.left *= "bar";
    });
    describe("Valid assignment:", () =>
    {
        test("`string` assignment...", () =>
        {
            style["left"] = "50%";

            expect(`${style.left}`).toBe("50%");
        });
        test("`number` re-assignment...", () =>
        {
            style.left = 33.333;

            expect(`${style["left"]}`).toBe("33.333%");
        });
        test("Partial 'value' object assignment...", () =>
        {
            style["left"] = { value: 25 };

            expect(`${style.left}`).toBe("25%");
        });
        test("Partial 'unit' object assignment...", () =>
        {
            style.left = { unit: "in" };

            expect(`${style["left"]}`).toBe("25in");
        });
        test("Complete object re-assignment...", () =>
        {
            style["left"] = { value: 100, unit: "vw" };

            expect(`${style.left}`).toBe("100vw");
        });

        test("`number` assignment...", () =>
        {
            style.paddingRight = 100;

            expect(`${style["padding-right"]}`).toBe("100px");
        });
        test("'unit' property assignment...", () =>
        {
            style["padding-right"].unit = "vh";

            expect(`${style.paddingRight}`).toBe("100vh");
        });
        test("'value' property assignment...", () =>
        {
            style.paddingRight.value = 75;

            expect(`${style["padding-right"]}`).toBe("75vh");
        });
        test("String re-assignment...", () =>
        {
            style["padding-right"] = "10rem";

            expect(`${style.paddingRight}`).toBe("10rem");
        });

        test("Shorthand operation...", () =>
        {
            style.paddingRight += 30;

            expect(`${style["padding-right"]}`).toBe("40rem");
        });
        test("Incrementation on 'value' property...", () =>
        {
            style["padding-right"].value++;

            expect(`${style.paddingRight}`).toBe("41rem");
        });
        test("Decrementation...", () =>
        {
            style.paddingRight--;

            expect(`${style["padding-right"]}`).toBe("40rem");
        });
        test("Shorthand operation on 'value' property...", () =>
        {
            style["padding-right"].value /= 2;

            expect(`${style.paddingRight}`).toBe("20rem");
        });

        test.todo("Unit assignment..."); // style.height.unit = "vmax"; // -> "0vmax"
    });
});
describe("Value parsing:", () =>
{
    test.todo("Valid string..."); // DimensionProperty.ParseProperty("10px");
    test.todo("Invalid string..."); // DimensionProperty.ParseProperty("10rip");
});
describe("Value representation:", () =>
{
    style["margin-top"] = 10;

    test("Value as `number`...", () => expect(+style.marginTop).toBe(10));
    test("Value as `default` (+ `string`)...", () => expect(style.marginTop + "cm").toBe("10cm"));
    test("Value as `default` (+ `number`)...", () => expect(style.marginTop + 15).toBe(25));
    test("Value as `string`...", () => expect(`${style.marginTop}`).toBe("10px"));
    test.todo("Value as is (`object`)");
});
describe("Final checks:", () =>
{
    test.todo("Re-check of `style` attribute value...");
});
