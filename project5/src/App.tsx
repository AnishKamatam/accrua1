import React from 'react';
import { AuthProvider } from './components/auth/AuthContext';
import { useAuth } from './components/auth/AuthContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import DashboardLayout from './components/dashboard/DashboardLayout';

function AppContent() {
  const { user } = useAuth();

  if (user) {
    return <DashboardLayout />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;