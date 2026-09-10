export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
  createdAt: string;
};

export type UsersFilters = {
  search?: string;
  page?: number;
};
