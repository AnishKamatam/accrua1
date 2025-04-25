import React from 'react';
import { 
  BarChart3, 
  Clock, 
  FileText, 
  Shield, 
  Zap, 
  RefreshCw 
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
      <div className="bg-teal-50 p-3 rounded-lg w-fit mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <BarChart3 className="h-6 w-6 text-teal-600" />,
      title: "Intelligent Analytics",
      description: "Gain deep insights into your financial data with AI-powered analytics that highlight patterns and opportunities."
    },
    {
      icon: <Clock className="h-6 w-6 text-teal-600" />,
      title: "Real-time Reports",
      description: "Access up-to-the-minute financial reports and dashboards that update automatically as new data arrives."
    },
    {
      icon: <FileText className="h-6 w-6 text-teal-600" />,
      title: "Automated Bookkeeping",
      description: "Save hours each week with smart automation that categorizes transactions and reconciles accounts."
    },
    {
      icon: <Shield className="h-6 w-6 text-teal-600" />,
      title: "Bank-level Security",
      description: "Your financial data is protected with enterprise-grade encryption and security protocols."
    },
    {
      icon: <Zap className="h-6 w-6 text-teal-600" />,
      title: "Instant Reconciliation",
      description: "Match transactions across accounts in seconds instead of hours with our intelligent matching engine."
    },
    {
      icon: <RefreshCw className="h-6 w-6 text-teal-600" />,
      title: "Seamless Integrations",
      description: "Connect with your existing tools and platforms through our extensive API and integration library."
    },
  ];

  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful features to transform your financial operations</h2>
          <p className="text-lg text-slate-600">
            Our comprehensive suite of tools helps you streamline workflows, reduce errors, and make better financial decisions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="opacity-0 animate-fade-in" 
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'forwards' 
              }}
            >
              <FeatureCard 
                icon={feature.icon} 
                title={feature.title} 
                description={feature.description} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;