import { render, screen } from '@testing-library/react';
import DomainTable from './index';

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
