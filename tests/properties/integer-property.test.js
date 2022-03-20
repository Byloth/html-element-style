/* eslint-disable dot-notation */

import HTMLElementStyle from "@/html-element-style";

const body = document.body;
const style = new HTMLElementStyle(body);

describe("Property defaults:", () =>
{
    test("Default value as `number`...", () => expect(+style.zIndex).toBe(0));
    test("Default value as `default`...", () => expect(style.zIndex + "").toBe("0"));
    test("Default value as `string`...", () => expect(`${style.zIndex}`).toBe("0"));

    test.todo("Check of `style` attribute value..."); // body.style["padding-top"]; -> undefined / null / 0
});
describe("Property assignment:", () =>
{
    describe("Invalid assignment:", () =>
    {
        test.todo("Fail on NaN assignment..."); // style.left = NaN;
        test.todo("Fail on Infinity assignment..."); // style.left = Infinity;
        test.todo("Fail on invalid `string` assignment..."); // style.left = "bar";
        test.todo("Fail on invalid `object` assignment..."); // style.left = { foo: "bar" };
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
            style["z-index"] = "50%";

            expect(`${style.zIndex}`).toBe("50%");
        });
        test("`number` re-assignment...", () =>
        {
            style.zIndex = 33.333;

            expect(`${style["z-index"]}`).toBe("33.333%");
        });
        test("Partial 'value' object assignment...", () =>
        {
            style["z-index"] = { value: 25 };

            expect(`${style.zIndex}`).toBe("25%");
        });
        test("Partial 'unit' object assignment...", () =>
        {
            style.zIndex = { unit: "in" };

            expect(`${style["z-index"]}`).toBe("25in");
        });
        test("Complete object re-assignment...", () =>
        {
            style["z-index"] = { value: 100, unit: "vw" };

            expect(`${style.zIndex}`).toBe("100vw");
        });

        test("`number` assignment...", () =>
        {
            style.zIndex = 100;

            expect(`${style["z-index"]}`).toBe("100px");
        });
        test("'unit' property assignment...", () =>
        {
            style["z-index"].unit = "vh";

            expect(`${style.zIndex}`).toBe("100vh");
        });
        test("'value' property assignment...", () =>
        {
            style.zIndex.value = 75;

            expect(`${style["z-index"]}`).toBe("75vh");
        });
        test("`string` re-assignment...", () =>
        {
            style["z-index"] = "10rem";

            expect(`${style.zIndex}`).toBe("10rem");
        });

        test("Shorthand operation...", () =>
        {
            style.zIndex += 30;

            expect(`${style["z-index"]}`).toBe("40rem");
        });
        test("Incrementation on 'value' property...", () =>
        {
            style["z-index"].value++;

            expect(`${style.zIndex}`).toBe("41rem");
        });
        test("Decrementation...", () =>
        {
            style.zIndex--;

            expect(`${style["z-index"]}`).toBe("40rem");
        });
        test("Shorthand operation on 'value' property...", () =>
        {
            style["z-index"].value /= 2;

            expect(`${style.zIndex}`).toBe("20rem");
        });

        test.todo("Unit assignment..."); // style.height.unit = "vmax"; // -> "0vmax"
    });
});
describe("Value parsing:", () =>
{
    test.todo("Valid `string`..."); // DimensionProperty.ParseProperty("10px");
    test.todo("Invalid `string`..."); // DimensionProperty.ParseProperty("10rip");
});
describe("Value representation:", () =>
{
    test("Value as `number`...", () =>
    {
        style["z-index"] = 10;

        expect(+style.zIndex).toBe(10);
    });
    test("Value as `default` (+ `string`)...", () => expect(style.zIndex + "cm").toBe("10cm"));
    test("Value as `default` (+ `number`)...", () => expect(style.zIndex + 15).toBe(25));
    test("Value as `string`...", () => expect(`${style.zIndex}`).toBe("10px"));
    test.todo("Value as is (`object`)");
});
describe("Final checks:", () =>
{
    test.todo("Re-check of `style` attribute value...");
});
