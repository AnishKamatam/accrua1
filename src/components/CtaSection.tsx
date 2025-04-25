import React, { useState } from 'react';
import Button from './ui/Button';
import { Check } from 'lucide-react';

const CtaSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      // In a real app, you would send this to your API
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your financial operations?</h2>
          <p className="text-lg md:text-xl text-slate-300 mb-8">
            Join thousands of businesses already using Accrua to streamline their financial workflows.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              'Free 14-day trial', 
              'No credit card required', 
              'Cancel anytime'
            ].map((item, index) => (
              <div 
                key={index}
                className="flex items-center justify-center space-x-2 bg-white/5 rounded-lg py-3 px-4"
              >
                <Check className="h-5 w-5 text-teal-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          
          {isSubmitted ? (
            <div className="bg-teal-500/20 border border-teal-500/30 rounded-lg p-6 animate-fade-in max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-2">Thank you for your interest!</h3>
              <p>We've sent an email with instructions to get started with your free trial.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-grow px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-500 text-white placeholder-slate-400"
              />
              <Button type="submit" size="lg">Get Started</Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CtaSection;