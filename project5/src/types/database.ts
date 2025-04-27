export interface Business {
  id: string;
  name: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  business_id: string;
  type: 'sale' | 'expense';
  amount: number;
  description: string;
  date: string;
  created_at: string;
}

export interface Product {
  id: string;
  business_id: string;
  name: string;
  description: string;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface Inventory {
  id: string;
  product_id: string;
  quantity: number;
  reorder_threshold: number;
  updated_at: string;
}

export interface Invoice {
  id: string;
  business_id: string;
  customer_name: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  due_date: string;
  created_at: string;
}

export interface Task {
  id: string;
  business_id: string;
  title: string;
  description: string;
  due_date: string | null;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed';
  created_at: string;
}

export interface ActivityLog {
  id: string;
  business_id: string;
  user_id: string;
  action_type: string;
  entity_type: string;
  entity_id: string;
  description: string;
  created_at: string;
}