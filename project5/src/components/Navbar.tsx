import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Button from './ui/Button';
import { useAuth } from './auth/AuthContext';
import AuthModal from './auth/AuthModal';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAuthClick = async () => {
    if (user) {
      try {
        await signOut();
      } catch (error) {
        console.error('Error during sign out:', error);
        // The AuthContext will handle the cleanup even if there's an error
      }
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">
        <a href="/" className="flex items-center">
          <span className="text-2xl font-bold text-teal-600">accrua</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-slate-700 hover:text-teal-600 transition-colors">Features</a>
          <a href="#testimonials" className="text-slate-700 hover:text-teal-600 transition-colors">Testimonials</a>
          <a href="#pricing" className="text-slate-700 hover:text-teal-600 transition-colors">Pricing</a>
          <a href="#about" className="text-slate-700 hover:text-teal-600 transition-colors">About</a>
          {user ? (
            <>
              <span className="text-slate-700">{user.email}</span>
              <Button variant="outline" onClick={handleAuthClick}>Log out</Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleAuthClick}>Log in</Button>
              <Button onClick={() => setIsAuthModalOpen(true)}>Get Started</Button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-slate-700 hover:text-teal-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#testimonials" 
              className="text-slate-700 hover:text-teal-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <a 
              href="#pricing" 
              className="text-slate-700 hover:text-teal-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <a 
              href="#about" 
              className="text-slate-700 hover:text-teal-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <div className="flex flex-col space-y-2 pt-2">
              {user ? (
                <>
                  <span className="text-slate-700">{user.email}</span>
                  <Button variant="outline" onClick={handleAuthClick}>Log out</Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={handleAuthClick}>Log in</Button>
                  <Button onClick={() => setIsAuthModalOpen(true)}>Get Started</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
};

export default Navbar;