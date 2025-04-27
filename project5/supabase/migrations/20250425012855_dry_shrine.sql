/*
  # Create Business Tables Migration

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `business_id` (uuid, foreign key to businesses)
      - `name` (text)
      - `description` (text, nullable)
      - `price` (numeric)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `transactions`
      - `id` (uuid, primary key)
      - `business_id` (uuid, foreign key to businesses)
      - `type` (text, check constraint: 'sale' or 'expense')
      - `amount` (numeric)
      - `description` (text, nullable)
      - `date` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to view their own business data
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id),
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS and create policy for products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'products' 
    AND policyname = 'Users can view their business products'
  ) THEN
    CREATE POLICY "Users can view their business products"
      ON products
      FOR SELECT
      TO authenticated
      USING (
        business_id IN (
          SELECT id FROM businesses WHERE owner_id = auth.uid()
        )
      );
  END IF;
END $$;

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id),
  type text NOT NULL CHECK (type IN ('sale', 'expense')),
  amount numeric NOT NULL,
  description text,
  date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS and create policy for transactions
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'transactions' 
    AND policyname = 'Users can view their business transactions'
  ) THEN
    CREATE POLICY "Users can view their business transactions"
      ON transactions
      FOR SELECT
      TO authenticated
      USING (
        business_id IN (
          SELECT id FROM businesses WHERE owner_id = auth.uid()
        )
      );
  END IF;
END $$;