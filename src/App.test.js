import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders banner tagline", () => {
  render(<App />);
  const tagline = screen.getByText(/welcome to my portfolio/i);
  expect(tagline).toBeInTheDocument();
});
