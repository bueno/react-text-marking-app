import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders React Text Highlighter App header", () => {
  render(<App />);
  const headerElement = screen.getByText(/React Text Highlighter App/i);
  expect(headerElement).toBeInTheDocument();
});
