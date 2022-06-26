import { render, screen } from "@testing-library/react";
import Home from "./index";

describe("<Home /> specs", () => {
  test("should render correctly", () => {
    render(<Home />);

    expect(screen.getByTestId("home")).toBeInTheDocument();
  });
});
