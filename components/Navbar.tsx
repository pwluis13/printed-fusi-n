
import React, { useState } from 'react';
import { NavigationTab } from '../types';

interface NavbarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: NavigationTab.Home, label: 'Home' },
    { id: NavigationTab.Shop, label: 'Loja' },
    { id: NavigationTab.Custom, label: 'Personalizar' },
    { id: NavigationTab.About, label: 'Sobre' },
    { id: NavigationTab.Contact, label: 'Contacto' },
  ];

  const handleNavigate = (tab: NavigationTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-cyan-900/30">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => handleNavigate(NavigationTab.Home)}
        >
          <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:rotate-12 glow-cyan">
            <span className="text-black font-bold text-xl">⏻</span>
          </div>
          <span className="text-2xl font-tech font-bold tracking-tighter">
            PRINTED <span className="text-cyan-400">FUSI⏻N</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleNavigate(tab.id)}
              className={`text-sm font-semibold tracking-wide transition-all duration-200 hover:text-cyan-400 ${activeTab === tab.id ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1' : 'text-gray-400'
                }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            onClick={() => handleNavigate(NavigationTab.Admin)}
            className={`p-2 rounded-full border border-gray-800 hover:border-cyan-500 transition-colors ${activeTab === NavigationTab.Admin ? 'text-cyan-400 border-cyan-400' : 'text-gray-500'
              }`}
            title="Área de Administração"
            aria-label="Área de Administração"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050505]/95 backdrop-blur-xl border-t border-cyan-900/20 px-4 pb-6 pt-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleNavigate(tab.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all ${activeTab === tab.id
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            onClick={() => handleNavigate(NavigationTab.Admin)}
            className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all ${activeTab === NavigationTab.Admin
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
          >
            🛡️ Administração
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

