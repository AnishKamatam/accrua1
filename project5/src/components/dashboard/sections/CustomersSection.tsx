import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Invoice } from '../../../types/database';
import { Users, Plus, Search, Filter } from 'lucide-react';
import Button from '../../ui/Button';

interface Customer {
  name: string;
  totalSpent: number;
  invoiceCount: number;
  lastPurchase: string;
}

const CustomersSection: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data: invoices } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });

      if (invoices) {
        const customerMap = new Map<string, Customer>();
        
        invoices.forEach((invoice: Invoice) => {
          const existing = customerMap.get(invoice.customer_name);
          if (existing) {
            customerMap.set(invoice.customer_name, {
              name: invoice.customer_name,
              totalSpent: existing.totalSpent + Number(invoice.amount),
              invoiceCount: existing.invoiceCount + 1,
              lastPurchase: new Date(Math.max(
                new Date(existing.lastPurchase).getTime(),
                new Date(invoice.created_at).getTime()
              )).toISOString(),
            });
          } else {
            customerMap.set(invoice.customer_name, {
              name: invoice.customer_name,
              totalSpent: Number(invoice.amount),
              invoiceCount: 1,
              lastPurchase: invoice.created_at,
            });
          }
        });

        setCustomers(Array.from(customerMap.values()));
      }
      setLoading(false);
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCustomers = customers.length;
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const averageRevenue = totalCustomers > 0 ? totalRevenue / totalCustomers : 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Customers</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Total Customers</h3>
            <Users className="w-5 h-5 text-teal-500" />
          </div>
          <p className="text-2xl font-bold mt-2">{totalCustomers}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold mt-2">
            ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Average Revenue</h3>
            <Users className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-2xl font-bold mt-2">
            ${averageRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Customer List</h3>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {loading ? (
            <div className="p-6 text-center text-slate-500">Loading customers...</div>
          ) : filteredCustomers.length === 0 ? (
            <div className="p-6 text-center text-slate-500">No customers found</div>
          ) : (
            filteredCustomers.map((customer) => (
              <div key={customer.name} className="p-6 flex items-center justify-between">
                <div>
                  <p className="font-medium">{customer.name}</p>
                  <p className="text-sm text-slate-500">
                    Last purchase: {new Date(customer.lastPurchase).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-8">
                  <div>
                    <p className="text-sm text-slate-500">Invoices</p>
                    <p className="font-semibold text-center">{customer.invoiceCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Total Spent</p>
                    <p className="font-semibold">
                      ${customer.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomersSection;