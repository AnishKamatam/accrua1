import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Transaction } from '../../../types/database';
import { DollarSign, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import Button from '../../ui/Button';

const FinancesSection: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });

      if (data) {
        setTransactions(data);
      }
      setLoading(false);
    };

    fetchTransactions();
  }, []);

  const totalRevenue = transactions
    .filter(t => t.type === 'sale')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Finances</h2>
        <div className="space-x-4">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Filter by Date
          </Button>
          <Button>
            <DollarSign className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold mt-2">
            ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Total Expenses</h3>
            <TrendingDown className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-2xl font-bold mt-2">
            ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Net Profit</h3>
            <DollarSign className="w-5 h-5 text-teal-500" />
          </div>
          <p className="text-2xl font-bold mt-2">
            ${(totalRevenue - totalExpenses).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {loading ? (
            <div className="p-6 text-center text-slate-500">Loading transactions...</div>
          ) : transactions.length === 0 ? (
            <div className="p-6 text-center text-slate-500">No transactions found</div>
          ) : (
            transactions.map((transaction) => (
              <div key={transaction.id} className="p-6 flex items-center justify-between">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-slate-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
                <div className={`font-semibold ${
                  transaction.type === 'sale' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'sale' ? '+' : '-'}$
                  {Number(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancesSection;