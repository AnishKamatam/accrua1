import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from './ui/Button';

const HeroSection: React.FC = () => {
  return (
    <section className="pt-32 pb-24 md:pt-48 md:pb-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Streamline your financial workflow with <span className="text-teal-400">Accrua</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300">
              Intelligent financial management designed for modern businesses. 
              Automate reconciliation, gain insights, and make informed decisions faster.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="secondary" size="lg">
                Watch Demo
              </Button>
            </div>
            <div className="pt-6">
              <p className="text-slate-400 text-sm">
                Trusted by 2,000+ companies worldwide
              </p>
              <div className="flex flex-wrap gap-8 items-center mt-4">
                {/* Company logos would go here */}
                <div className="h-8 w-24 bg-white/10 rounded"></div>
                <div className="h-8 w-32 bg-white/10 rounded"></div>
                <div className="h-8 w-28 bg-white/10 rounded"></div>
                <div className="h-8 w-20 bg-white/10 rounded"></div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-8 -left-8 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-medium text-white">Financial Overview</h3>
                    <p className="text-sm text-slate-400">Last 30 days</p>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-8 bg-white/10 rounded-md"></div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-24 bg-teal-500/30 rounded-md"></div>
                    <div className="h-24 bg-blue-500/30 rounded-md"></div>
                    <div className="h-24 bg-purple-500/30 rounded-md"></div>
                  </div>
                  <div className="h-32 bg-white/10 rounded-md"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-teal-500/20 to-teal-500/10 p-4 rounded-xl">
                  <div className="h-4 w-16 bg-white/20 rounded mb-2"></div>
                  <div className="h-6 w-24 bg-white/20 rounded mb-4"></div>
                  <div className="h-12 bg-white/10 rounded"></div>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/10 p-4 rounded-xl">
                  <div className="h-4 w-16 bg-white/20 rounded mb-2"></div>
                  <div className="h-6 w-24 bg-white/20 rounded mb-4"></div>
                  <div className="h-12 bg-white/10 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;