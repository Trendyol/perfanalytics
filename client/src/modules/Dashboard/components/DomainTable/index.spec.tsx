import { render, screen } from '@testing-library/react';
import DomainTable from './index';

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

describe('DomainTable', () => {
  it('renders the table with the correct column labels', () => {
    render(<DomainTable />);

    const nameColumnLabel = screen.getByText('Name');
    const urlColumnLabel = screen.getByText('Url');
    const overallScoreColumnLabel = screen.getByText('Overall Score');
    const totalReportColumnLabel = screen.getByText('# of Total Report');
    const lastReportDateColumnLabel = screen.getByText('Last Report Date');

    expect(nameColumnLabel).toBeInTheDocument();
    expect(urlColumnLabel).toBeInTheDocument();
    expect(overallScoreColumnLabel).toBeInTheDocument();
    expect(totalReportColumnLabel).toBeInTheDocument();
    expect(lastReportDateColumnLabel).toBeInTheDocument();
  });
});
