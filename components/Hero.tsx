
import React from 'react';

interface HeroProps {
  onShopClick: () => void;
  onCustomClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopClick, onCustomClick }) => {
  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background with futuristic vibe */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2000&auto=format&fit=crop" 
          alt="3D Printing Background" 
          className="w-full h-full object-cover opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]"></div>
        <div className="absolute inset-0 bg-cyan-900/10 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-block px-4 py-1 mb-6 border border-cyan-500/30 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase">
          Manufatura Digital Avançada
        </div>
        <h1 className="text-5xl md:text-7xl font-tech font-bold mb-6 leading-tight">
          Printed <span className="text-cyan-400 text-glow-cyan">Fusi⏻N</span>:<br /> 
          Ideias Prontas a Imprimir.
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Transformamos os teus ficheiros digitais em realidade física com precisão industrial e materiais de alta performance.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button 
            onClick={onShopClick}
            className="w-full sm:w-auto px-8 py-4 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-all transform hover:scale-105 glow-cyan"
          >
            Ver Produtos
          </button>
          <button 
            onClick={onCustomClick}
            className="w-full sm:w-auto px-8 py-4 border-2 border-cyan-500 text-cyan-500 font-bold rounded-lg hover:bg-cyan-500/10 transition-all"
          >
            Criar Peça Personalizada
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-12 rounded-full bg-gradient-to-t from-cyan-500 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
