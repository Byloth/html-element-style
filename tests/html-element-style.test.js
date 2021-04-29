import HTMLElementStyle from "@/html-element-style";

const style = new HTMLElementStyle(document.body);

test("Valorize 'margin-top' to '10px'", () =>
{
    style["margin-top"] = 10;

    expect(+style.marginTop).toBe(10);
    expect(`${style.marginTop}`).toBe("10px");
});
