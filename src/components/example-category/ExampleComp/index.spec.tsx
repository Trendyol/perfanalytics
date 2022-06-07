import { render, screen } from "@testing-library/react";
import ExampleComp from "./index";

describe("<ExampleComp /> specs", () => {
  test("should render correctly", () => {
    render(<ExampleComp />);

    expect(screen.getByTestId("example-comp")).toBeInTheDocument();
  });
});
