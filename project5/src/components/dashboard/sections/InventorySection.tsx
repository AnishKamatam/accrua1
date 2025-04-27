import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Product, Inventory } from '../../../types/database';
import { Package, AlertTriangle, Plus, Search } from 'lucide-react';
import Button from '../../ui/Button';

interface InventoryItem extends Product {
  inventory: Inventory;
}

const InventorySection: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchInventory = async () => {
      const { data: products } = await supabase
        .from('products')
        .select(`
          *,
          inventory (*)
        `);

      if (products) {
        setInventory(products as InventoryItem[]);
      }
      setLoading(false);
    };

    fetchInventory();
  }, []);

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockItems = inventory.filter(item => 
    item.inventory?.quantity <= item.inventory?.reorder_threshold
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Inventory Management</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Total Products</h3>
            <Package className="w-5 h-5 text-teal-500" />
          </div>
          <p className="text-2xl font-bold mt-2">{inventory.length}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Low Stock Items</h3>
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold mt-2">{lowStockItems.length}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Total Value</h3>
            <Package className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold mt-2">
            ${inventory.reduce((sum, item) => sum + (Number(item.price) * (item.inventory?.quantity || 0)), 0)
              .toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Inventory List</h3>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {loading ? (
            <div className="p-6 text-center text-slate-500">Loading inventory...</div>
          ) : filteredInventory.length === 0 ? (
            <div className="p-6 text-center text-slate-500">No products found</div>
          ) : (
            filteredInventory.map((item) => (
              <div key={item.id} className="p-6 flex items-center justify-between">
                <div className="flex-grow">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.description}</p>
                </div>
                <div className="flex items-center space-x-8">
                  <div>
                    <p className="text-sm text-slate-500">In Stock</p>
                    <p className="font-semibold">{item.inventory?.quantity || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Price</p>
                    <p className="font-semibold">
                      ${Number(item.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Value</p>
                    <p className="font-semibold">
                      ${(Number(item.price) * (item.inventory?.quantity || 0))
                        .toLocaleString('en-US', { minimumFractionDigits: 2 })}
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

export default InventorySection;