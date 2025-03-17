import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

/**
 * A test case that checks if the sum of 1+1 is equal to 2.
 * @returns None
 */
describe("A truthy statement", () => {
  it("should be equal to 2", () => {
    expect(1 + 1).toEqual(2);
  });
});
/**
 * Test case to render the App component and debug the screen.
 * @returns None
 */
describe("App", () => {
  it("renders the App component", () => {
    render(<App />);
    screen.debug(); // prints out the jsx in the App component unto the command line
  });
});
