import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Greeting from "./Greeting";

afterEach(cleanup);

jest.mock("greeting-time", () => jest.fn(() => "Howdy"));

describe.each([
  ["empty", ""],
  ["null", null],
  ["undefined", undefined]
])("when %s is provided for name", (_, value) => {
  test(`should show input`, () => {
    const { getByTestId } = render(<Greeting name="" />);
    expect(getByTestId("greeting-text")).toHaveAttribute("value", "");
  });
});

test("should render the provided name", () => {
  const { getByTestId } = render(<Greeting name="Elijah" />);
  expect(getByTestId("greeting-label")).toHaveTextContent("Howdy, Elijah!");
});

test("should render an input when header is double-clicked", async () => {
  const { getByTestId } = render(<Greeting name="Elijah" />);
  fireEvent.doubleClick(getByTestId("greeting-label"));
  const greetingTextNode = await waitForElement(() =>
    getByTestId("greeting-text")
  );
  expect(greetingTextNode).toHaveAttribute("value", "Elijah");
});

describe("when rendering an input", () => {
  test("should toggle editing when enter is pressed", async () => {
    const { getByTestId } = render(<Greeting name="Test" />);
    fireEvent.doubleClick(getByTestId("greeting-label"));
    const input = await waitForElement(() => getByTestId("greeting-text"));
    fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });
    const label = await waitForElement(() => getByTestId("greeting-label"));
    expect(label).toHaveTextContent("Howdy, Test!");
  });

  test("should toggle editing when field is blurred", async () => {
    const { getByTestId } = render(<Greeting name="Test" />);
    fireEvent.doubleClick(getByTestId("greeting-label"));
    const input = await waitForElement(() => getByTestId("greeting-text"));
    fireEvent.blur(input);
    const label = await waitForElement(() => getByTestId("greeting-label"));
    expect(label).toHaveTextContent("Howdy, Test!");
  });

  test("should trigger onChange when value changes", async () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Greeting name="Initial" onChange={onChange} />
    );
    fireEvent.doubleClick(getByTestId("greeting-label"));
    const greetingTextNode = await waitForElement(() =>
      getByTestId("greeting-text")
    );
    fireEvent.change(greetingTextNode, { target: { value: "Test" } });
    expect(onChange).toHaveBeenCalledWith("Test");
  });
});
