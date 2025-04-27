import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Transaction, Invoice, Product } from '../../types/database';

const BusinessOverview: React.FC = () => {
  const [revenue, setRevenue] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [overdueInvoices, setOverdueInvoices] = useState(0);
  const [topProducts, setTopProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchOverviewData = async () => {
      // Fetch revenue (sales transactions)
      const { data: salesData } = await supabase
        .from('transactions')
        .select('amount')
        .eq('type', 'sale')
        .gte('date', new Date(new Date().setDate(1)).toISOString());

      const totalRevenue = salesData?.reduce((sum, sale) => sum + Number(sale.amount), 0) || 0;
      setRevenue(totalRevenue);

      // Fetch expenses
      const { data: expensesData } = await supabase
        .from('transactions')
        .select('amount')
        .eq('type', 'expense')
        .gte('date', new Date(new Date().setDate(1)).toISOString());

      const totalExpenses = expensesData?.reduce((sum, expense) => sum + Number(expense.amount), 0) || 0;
      setExpenses(totalExpenses);

      // Fetch overdue invoices count
      const { count } = await supabase
        .from('invoices')
        .select('*', { count: 'exact' })
        .eq('status', 'overdue');

      setOverdueInvoices(count || 0);

      // Fetch top products
      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .limit(3);

      if (productsData) {
        setTopProducts(productsData);
      }
    };

    fetchOverviewData();
  }, []);

  const stats = [
    {
      label: 'Revenue (MTD)',
      value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(revenue),
      change: '+12.3%',
      changeType: 'positive'
    },
    {
      label: 'Expenses (MTD)',
      value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(expenses),
      change: '-2.3%',
      changeType: 'negative'
    },
    {
      label: 'Net Profit',
      value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(revenue - expenses),
      change: '+15.3%',
      changeType: 'positive'
    },
    {
      label: 'Overdue Invoices',
      value: overdueInvoices,
      change: '-5',
      changeType: 'positive'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Business Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-slate-600">{stat.label}</p>
            <p className="text-2xl font-semibold mt-2">{stat.value}</p>
            <p className={`text-sm mt-2 ${
              stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Top Products</h3>
        <div className="bg-white rounded-xl shadow-sm">
          <div className="divide-y divide-slate-100">
            {topProducts.map((product) => (
              <div key={product.id} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-slate-600">{product.description}</p>
                </div>
                <p className="font-semibold">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessOverview;