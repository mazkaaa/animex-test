import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./input";

describe("Input component", () => {
  it("renders an input element", () => {
    render(<Input data-testid="custom-input" />);
    const inputElement = screen.getByTestId("custom-input");
    expect(inputElement.tagName).toBe("INPUT");
  });

  it("applies the type prop correctly", () => {
    render(<Input type="password" data-testid="password-input" />);
    const inputElement = screen.getByTestId(
      "password-input",
    ) as HTMLInputElement;
    expect(inputElement.type).toBe("password");
  });

  it("adds custom classes to the input element", () => {
    const customClass = "my-custom-class";
    render(<Input className={customClass} data-testid="class-input" />);
    const inputElement = screen.getByTestId("class-input");
    expect(inputElement.className).toContain(customClass);
  });

  it("handles onChange events", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} data-testid="input-event" />);
    const inputElement = screen.getByTestId("input-event");
    await user.type(inputElement, "test");
    expect(handleChange).toHaveBeenCalled();
  });
});
