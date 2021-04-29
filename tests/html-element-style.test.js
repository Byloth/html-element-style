import HTMLElementStyle from "@/html-element-style";

const body = document.body;
const style = new HTMLElementStyle(body);

describe("Property initialization:", () =>
{
    test.todo("Fail on invalid property..."); // style["foo"]; -> ERROR

    test.todo("Valid property initialization..."); // style.paddingTop;
    test.todo("Property name case conversion..."); // style.paddingTop === style["padding-top"];
});
describe("Property defaults:", () =>
{
    test.todo("Default value..."); // style.paddingTop; -> null / 0
    test.todo("Check of `style` attribute value..."); // body.style["padding-top"]; -> undefined / null / 0
});
describe("Property assignment:", () =>
{
    test.todo("Fail on invalid string assignment..."); // style.left = "bar";
    test.todo("Fail on invalid object assignment..."); // style.left = { foo: "bar" };
    test.todo("Fail on invalid 'value' object assignment..."); // style.left = { value: "123px" };
    test.todo("Fail on invalid 'unit' object assignment..."); // style.left = { unit: "bar" };
    test.todo("Fail on invalid unit assignment..."); // style.left.unit = "bar";
    test.todo("Fail on invalid value assignment..."); // style.left.value = "foo";

    test.todo("Fail on invalid shorthand operation..."); // style.left *= "bar";

    test.todo("Valid string assignment..."); // style.left = "50%";
    test.todo("Valid number assignment..."); // style.left = 33.333;
    test.todo("Valid partial 'value' object assignment..."); // style.left = { value: 50 };
    test.todo("Valid partial 'unit' object assignment..."); // style.left = { unit: "in" };
    test.todo("Valid complete object assignment..."); // style.left = { value: 100, unit: "vw" };
    test.todo("Valid unit assignment..."); // style.left.unit = "vh";
    test.todo("Valid value assignment..."); // style.left.value = 250;
    test.todo("Valid string reassignment..."); // style.left = "50rem";

    test.todo("Valid shorthand operation..."); // style.left *= 3;
    test.todo("Valid decrementation..."); // - style.left--;
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
