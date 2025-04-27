import React from 'react';
import Button from '../ui/Button';
import { 
  PlusCircle, 
  MinusCircle, 
  FileText, 
  Package,
  BarChart2
} from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    { icon: <PlusCircle className="h-5 w-5" />, label: 'Add Sale' },
    { icon: <MinusCircle className="h-5 w-5" />, label: 'Add Expense' },
    { icon: <FileText className="h-5 w-5" />, label: 'Create Invoice' },
    { icon: <Package className="h-5 w-5" />, label: 'Add Product' },
    { icon: <BarChart2 className="h-5 w-5" />, label: 'Generate Report' },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="secondary"
            className="h-24 flex-col space-y-2"
          >
            {action.icon}
            <span>{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;