import React from 'react';
// Make sure you have lucide-react installed: npm install lucide-react
import { Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    // UPDATED: Changed background to match the HomePage for a consistent look
    <footer className="bg-[#0a0518] border-t border-white/10">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} Nexus Meet. All rights reserved.
          </p>
          <div className="flex mt-4 md:mt-0 space-x-6">
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-fuchsia-500 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
