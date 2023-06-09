import { render, screen } from "@testing-library/react";
import Home from "./index";

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn().mockReturnValue({
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    components: {},
    isFallback: false,
    basePath: '',
    locale: 'en',
    locales: ['en', 'tr'],
    defaultLocale: 'en',
    isReady: true,
    isPreview: false,
    isLocaleDomain: false,
    events: {},
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    isLocaleDomainInternal: jest.fn(),
    isSsr: true,
    isReadyInternal: true,
  }),
}));

describe("<Home /> specs", () => {
  test("should render correctly", () => {
    render(<Home />);

    expect(screen.getByTestId("home-dashboard")).toBeInTheDocument();
  });
});
``
