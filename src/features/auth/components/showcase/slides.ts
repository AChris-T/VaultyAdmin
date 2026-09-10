import OverviewMock from './overview-mock';
import TransactionsMock from './transactions-mock';
import SecurityMock from './security-mock';

export const slides = [
  {
    eyebrow: 'Overview',
    title: 'Every account, one command center',
    description:
      'Monitor balances, transactions and customer activity across Vaultly in real time.',
    mock: OverviewMock,
  },
  {
    eyebrow: 'Transactions',
    title: 'Track every transaction, instantly',
    description:
      'Approve, flag or reconcile transactions the moment they happen — no more end-of-day surprises.',
    mock: TransactionsMock,
  },
  {
    eyebrow: 'Security',
    title: 'Bank-grade security, built in',
    description:
      'Role-based access, audit trails and 2FA keep every admin action accountable.',
    mock: SecurityMock,
  },
];
