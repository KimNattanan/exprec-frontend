export type User = {
  email: string;
  name: string;
}

export type Preference = {
  theme: string;
}

export type Pagination = {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalRecords: number;
}

export type Price = {
  id: string;
  prev_id: string;
  next_id: string;
  amount: number;
  bg_color: string;
}

export type Category = {
  id: string;
  prev_id: string;
  next_id: string;
  title: string;
  bg_color: string;
}

export type Record = {
  id: string;
  created_at: Date;
  amount: number;
  category: string;
  category_bg_color: string;
  note: string;
}