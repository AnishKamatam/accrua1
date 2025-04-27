import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import DashboardSidebar from './DashboardSidebar';
import BusinessOverview from './BusinessOverview';
import TasksPanel from './TasksPanel';
import QuickActions from './QuickActions';
import RecentActivity from './RecentActivity';
import FinancesSection from './sections/FinancesSection';
import InventorySection from './sections/InventorySection';
import InvoicesSection from './sections/InvoicesSection';
import CustomersSection from './sections/CustomersSection';
import SettingsSection from './sections/SettingsSection';

type Section = 'dashboard' | 'finances' | 'inventory' | 'invoices' | 'customers' | 'settings';

const DashboardLayout: React.FC = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>('dashboard');

  if (!user) {
    return null;
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <BusinessOverview />
              <div className="mt-8">
                <QuickActions />
              </div>
            </div>
            <div>
              <TasksPanel />
            </div>
            <div className="lg:col-span-3">
              <RecentActivity />
            </div>
          </div>
        );
      case 'finances':
        return <FinancesSection />;
      case 'inventory':
        return <InventorySection />;
      case 'invoices':
        return <InvoicesSection />;
      case 'customers':
        return <CustomersSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="ml-64 p-8">
        {renderSection()}
      </div>
    </div>
  );
};

export default DashboardLayout;