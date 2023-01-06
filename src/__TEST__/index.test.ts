import { getApple } from "../index";

describe("apple", () => {
  it("should do stuff", function () {
    expect(getApple("szampion", "yellow")).toEqual({
      name: "szampion apple",
      color: "yellow",
    });
  });
});
