export type ApiError = {
  message: string;
  status: number;
  code?: string;
  errors?: Array<{ path: string; message: string }>;
};

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};

// The API wraps every success payload in `{ data: ... }`.
export type ApiEnvelope<T> = {
  data: T;
};
