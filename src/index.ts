import { Apple } from "./types";

export function getApple(name: string, color: Apple["color"]): Apple {
  const apple: Apple = {
    name: name + " apple",
    color,
  };

  return apple;
}

export function logStuff(...params: any[]): void {
  console.log("logging stuff");
  console.log(...params);
}
