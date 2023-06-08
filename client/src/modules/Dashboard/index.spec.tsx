import { render, screen } from "@testing-library/react";
import Home from "./index";

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
    components: {},
    isFallback: false,
    basePath: "",
    locale: "en",
    locales: ["en", "tr"],
    defaultLocale: "en",
    isReady: true,
    isPreview: false,
    isLocaleDomain: false,
    events: {},
  }),
}));

describe("<Home /> specs", () => {
  test("should render correctly", () => {
    render(<Home />);

    expect(screen.getByTestId("home-dashboard")).toBeInTheDocument();
  });
});
``
