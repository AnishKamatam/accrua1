/*
  # Initial Schema Setup for Accrua

  1. New Tables
    - businesses
      - Basic business information
    - transactions
      - Financial transactions (sales, expenses)
    - products
      - Product catalog
    - inventory
      - Current stock levels
    - invoices
      - Customer invoices
    - tasks
      - Business tasks and alerts
    - activity_log
      - System activity tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  owner_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own businesses"
  ON businesses
  FOR SELECT
  TO authenticated
  USING (owner_id = auth.uid());

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id),
  type text NOT NULL CHECK (type IN ('sale', 'expense')),
  amount decimal NOT NULL,
  description text,
  date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their business transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (business_id IN (
    SELECT id FROM businesses WHERE owner_id = auth.uid()
  ));

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id),
  name text NOT NULL,
  description text,
  price decimal NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their business products"
  ON products
  FOR SELECT
  TO authenticated
  USING (business_id IN (
    SELECT id FROM businesses WHERE owner_id = auth.uid()
  ));

-- Create inventory table
CREATE TABLE IF NOT EXISTS inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id),
  quantity integer NOT NULL DEFAULT 0,
  reorder_threshold integer NOT NULL DEFAULT 10,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their business inventory"
  ON inventory
  FOR SELECT
  TO authenticated
  USING (product_id IN (
    SELECT id FROM products WHERE business_id IN (
      SELECT id FROM businesses WHERE owner_id = auth.uid()
    )
  ));

-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id),
  customer_name text NOT NULL,
  amount decimal NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
  due_date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their business invoices"
  ON invoices
  FOR SELECT
  TO authenticated
  USING (business_id IN (
    SELECT id FROM businesses WHERE owner_id = auth.uid()
  ));

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id),
  title text NOT NULL,
  description text,
  due_date timestamptz,
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their business tasks"
  ON tasks
  FOR SELECT
  TO authenticated
  USING (business_id IN (
    SELECT id FROM businesses WHERE owner_id = auth.uid()
  ));

-- Create activity_log table
CREATE TABLE IF NOT EXISTS activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id),
  user_id uuid REFERENCES auth.users(id),
  action_type text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their business activity logs"
  ON activity_log
  FOR SELECT
  TO authenticated
  USING (business_id IN (
    SELECT id FROM businesses WHERE owner_id = auth.uid()
  ));

-- Insert sample business data
INSERT INTO businesses (id, name, owner_id)
VALUES (
  'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  'Sample Business',
  auth.uid()
);

-- Insert sample products
INSERT INTO products (business_id, name, description, price)
VALUES
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Product A', 'Description for Product A', 99.99),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Product B', 'Description for Product B', 149.99),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Product C', 'Description for Product C', 199.99);

-- Insert sample inventory
INSERT INTO inventory (product_id, quantity, reorder_threshold)
SELECT id, 
  FLOOR(RANDOM() * 100 + 1)::integer as quantity,
  20 as reorder_threshold
FROM products;

-- Insert sample transactions
INSERT INTO transactions (business_id, type, amount, description)
VALUES
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'sale', 299.97, 'Sale of Product A x3'),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'expense', 150.00, 'Office supplies'),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'sale', 449.97, 'Sale of Product B x3');

-- Insert sample invoices
INSERT INTO invoices (business_id, customer_name, amount, status, due_date)
VALUES
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'John Doe', 299.97, 'pending', now() + interval '7 days'),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Jane Smith', 449.97, 'paid', now() - interval '7 days'),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Bob Johnson', 199.99, 'overdue', now() - interval '30 days');

-- Insert sample tasks
INSERT INTO tasks (business_id, title, description, priority, status)
VALUES
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Review Inventory', 'Check stock levels and place orders', 'high', 'pending'),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Follow up on overdue invoice', 'Contact Bob Johnson about payment', 'high', 'pending'),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Update product prices', 'Review and adjust product pricing', 'medium', 'pending');