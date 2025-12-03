
import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';

const Navbar: React.FC = () => {
  const { content, toggleLanguage, lang } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: content.nav.home, href: '#hero' },
    { name: content.nav.minghai, href: '#minghai' },
    { name: content.nav.skills, href: '#skills' },
    { name: content.nav.experience, href: '#experience' },
    { name: content.nav.freelance, href: '#freelance' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-700 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-game-secondary to-game-accent">
              DEV.PORTFOLIO
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-game-secondary transition-colors text-sm font-medium uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
            
            <button 
                onClick={toggleLanguage}
                className="flex items-center space-x-1 px-3 py-1 rounded border border-slate-700 bg-slate-800 text-xs font-mono hover:bg-slate-700 transition"
            >
                <Globe size={14} />
                <span>{lang === 'zh' ? 'EN' : '中文'}</span>
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button 
                onClick={toggleLanguage}
                className="px-2 py-1 rounded border border-slate-700 bg-slate-800 text-xs font-mono"
            >
                {lang === 'zh' ? 'EN' : 'ZH'}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 absolute w-full border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
