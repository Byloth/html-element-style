/* eslint-disable dot-notation */

import { PropertyException } from "@/exceptions";

import HTMLElementStyle from "@/html-element-style";

const body = document.body;
const style = new HTMLElementStyle(body);

describe("Property initialization:", () =>
{
    test("Fail on invalid property...", () => expect(() => style["foo"]).toThrow(PropertyException));

    test("Valid property initialization...", () => expect(style["margin-top"]).toBeDefined());
    test("Property name case conversion...", () => expect(style.marginTop).toBe(style["margin-top"]));
});
