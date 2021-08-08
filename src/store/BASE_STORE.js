const prs = [
  {
    id: 1,
    name: 'AP-1',
    assignee: 'Dabe',
    reviewers: ['Borb', 'Miek'],
    reviewCount: 3,
    openDate: '2021-08-07',
    approvals: 0,
  },
  {
    id: 2,
    name: 'AP-2',
    assignee: 'Tarry',
    reviewers: ['Borb', 'Dabe'],
    reviewCount: 2,
    openDate: '2021-08-02',
    approvals: 1,
  },
  {
    id: 3,
    name: 'AP-3',
    assignee: 'Miek',
    reviewers: ['Borb'],
    reviewCount: 2,
    openDate: '2021-07-22',
    approvals: 0,
  },
  {
    id: 4,
    name: 'AP-4',
    assignee: 'Borb',
    reviewers: ['Miek', 'Dabe', 'Tarry'],
    reviewCount: 3,
    openDate: '2021-08-04',
    approvals: 3,
  },
  {
    id: 5,
    name: 'AP-5',
    assignee: 'Dabe',
    reviewers: ['Tarry', 'Miek'],
    reviewCount: 2,
    openDate: '2021-08-03',
    approvals: 1,
  },
];

const organization = {
  users: ['Borb', 'Miek', 'Dabe', 'Tarry', 'Chrus'],
  name: 'DorcNetwark',
  warningThreshold: 4,
};

export default {
  prs,
  organization,
};
