import React from 'react';
import { useAuth } from '../auth/AuthContext';
import {
  LayoutDashboard,
  DollarSign,
  Package,
  FileText,
  Users,
  Settings,
  LogOut
} from 'lucide-react';

type Section = 'dashboard' | 'finances' | 'inventory' | 'invoices' | 'customers' | 'settings';

interface DashboardSidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeSection, onSectionChange }) => {
  const { signOut } = useAuth();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', value: 'dashboard' as Section },
    { icon: <DollarSign size={20} />, label: 'Finances', value: 'finances' as Section },
    { icon: <Package size={20} />, label: 'Inventory', value: 'inventory' as Section },
    { icon: <FileText size={20} />, label: 'Invoices', value: 'invoices' as Section },
    { icon: <Users size={20} />, label: 'Customers', value: 'customers' as Section },
    { icon: <Settings size={20} />, label: 'Settings', value: 'settings' as Section },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-teal-600">accrua</h1>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.value}
            onClick={() => onSectionChange(item.value)}
            className={`w-full flex items-center px-6 py-3 text-slate-600 hover:bg-slate-50 ${
              activeSection === item.value ? 'bg-slate-50 text-teal-600' : ''
            }`}
          >
            {item.icon}
            <span className="ml-3">{item.label}</span>
          </button>
        ))}
      </nav>

      <button
        onClick={() => signOut()}
        className="absolute bottom-8 left-6 right-6 flex items-center px-4 py-2 text-slate-600 hover:text-slate-900"
      >
        <LogOut size={20} />
        <span className="ml-3">Log Out</span>
      </button>
    </div>
  );
};

export default DashboardSidebar;