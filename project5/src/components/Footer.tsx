import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Accrua</h3>
            <p className="mb-4">
              Intelligent financial management designed for modern businesses.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-teal-400 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-teal-400 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-teal-400 transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-teal-400 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Home</a></li>
              <li><a href="#features" className="hover:text-teal-400 transition-colors">Features</a></li>
              <li><a href="#testimonials" className="hover:text-teal-400 transition-colors">Testimonials</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Contact Sales</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Partners</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-teal-400 flex-shrink-0 mt-0.5" />
                <span>123 Finance St, Suite 100<br />San Francisco, CA 94107</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-teal-400 flex-shrink-0" />
                <span>(925) 549-0603</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-teal-400 flex-shrink-0" />
                <span>hello@accrua.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {currentYear} Accrua. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-teal-400 text-sm">Terms of Service</a>
            <a href="#" className="text-slate-400 hover:text-teal-400 text-sm">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-teal-400 text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;