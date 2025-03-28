import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button component", () => {
  test("renders a button element with default props", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click Me");

    expect(button.className).toMatch(/bg-zinc-100/);
    expect(button.className).toMatch(/px-4 py-2/);
  });

  test("applies the secondary variant classes", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/bg-zinc-800/);
    expect(button.className).toMatch(/text-white/);
  });

  test("applies tertiary variant classes", () => {
    render(<Button variant="tertiary">Tertiary</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/bg-green-500/);
    expect(button.className).toMatch(/text-white/);
  });

  test("applies danger variant classes", () => {
    render(<Button variant="danger">Danger</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/bg-red-500/);
    expect(button.className).toMatch(/text-white/);
  });

  test("applies custom className", () => {
    render(<Button className="custom-class">With Custom Class</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/custom-class/);
  });

  test("applies size classes for small, medium, and large", () => {
    const { rerender } = render(<Button size="small">Small</Button>);
    let button = screen.getByRole("button");
    expect(button.className).toMatch(/px-2 py-1/);

    rerender(<Button size="medium">Medium</Button>);
    button = screen.getByRole("button");
    expect(button.className).toMatch(/px-4 py-2/);

    rerender(<Button size="large">Large</Button>);
    button = screen.getByRole("button");
    expect(button.className).toMatch(/px-6 py-3/);
  });

  test("applies active class when isActive is true", () => {
    render(<Button isActive>Active Button</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/border border-zinc-900/);
  });

  test("spreads additional props to the button element", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Clickable</Button>);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
