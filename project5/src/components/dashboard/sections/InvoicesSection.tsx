import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Invoice } from '../../../types/database';
import { FileText, Plus, Search, Filter } from 'lucide-react';
import Button from '../../ui/Button';

const InvoicesSection: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const fetchInvoices = async () => {
      const { data } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setInvoices(data);
      }
      setLoading(false);
    };

    fetchInvoices();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-50';
      case 'overdue':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.customer_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalAmount = filteredInvoices.reduce((sum, invoice) => sum + Number(invoice.amount), 0);
  const overdueAmount = filteredInvoices
    .filter(invoice => invoice.status === 'overdue')
    .reduce((sum, invoice) => sum + Number(invoice.amount), 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Invoices</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Total Outstanding</h3>
            <FileText className="w-5 h-5 text-teal-500" />
          </div>
          <p className="text-2xl font-bold mt-2">
            ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Overdue Amount</h3>
            <FileText className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-2xl font-bold mt-2 text-red-600">
            ${overdueAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Total Invoices</h3>
            <FileText className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold mt-2">{invoices.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold">Invoice List</h3>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {loading ? (
            <div className="p-6 text-center text-slate-500">Loading invoices...</div>
          ) : filteredInvoices.length === 0 ? (
            <div className="p-6 text-center text-slate-500">No invoices found</div>
          ) : (
            filteredInvoices.map((invoice) => (
              <div key={invoice.id} className="p-6 flex items-center justify-between">
                <div>
                  <p className="font-medium">{invoice.customer_name}</p>
                  <p className="text-sm text-slate-500">
                    Due: {new Date(invoice.due_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-8">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                  <p className="font-semibold">
                    ${Number(invoice.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoicesSection;