export type User = {
  email: string;
  name: string;
}

export type Preferences = {
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
  position: number;
  amount: number;
  bg_color: string;
}

export type Category = {
  id: string;
  position: number;
  title: string;
  bg_color: string;
}

export type Record = {
  id: string;
  created_at: string;
  amount: number;
  category: string;
  category_bg_color: string;
  note: string;
}

export type DashboardData = {
  total_amount: number;
  amount_by_category: Map<string,number>;
  category_color: Map<string,string>;
  records: Record[];
}