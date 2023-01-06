import { Apple } from "./types";

export function getApple(name: string, color: Apple["color"]): Apple {
  const apple: Apple = {
    name: name + " apple",
    color,
  };

  return apple;
}
