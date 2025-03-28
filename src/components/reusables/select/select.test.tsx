import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Select } from "./select";

describe("Select", () => {
  it("renders a select element", () => {
    const { container } = render(<Select />);
    const select = container.querySelector("select");
    expect(select).toBeInTheDocument();
  });

  it("applies default classes", () => {
    const { container } = render(<Select />);
    const select = container.querySelector("select");
    expect(select?.className).toContain("rounded-md");
    expect(select?.className).toContain("border");
  });

  it("appends additional class names", () => {
    const customClass = "custom-class";
    const { container } = render(<Select className={customClass} />);
    const select = container.querySelector("select");
    expect(select?.className).toContain(customClass);
  });

  it("spreads additional props to the select element", () => {
    const { getByRole } = render(
      <Select data-testid="custom-select" disabled />,
    );
    const select = getByRole("combobox");
    expect(select).toBeDisabled();
  });
});
