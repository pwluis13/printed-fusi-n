
import React from 'react';
import { NavigationTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: NavigationTab) => void;
}

const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
           <div className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center glow-cyan">
              <span className="text-black font-bold text-lg">⏻</span>
            </div>
            <span className="text-xl font-tech font-bold tracking-tighter">
              PRINTED <span className="text-cyan-400">FUSI⏻N</span>
            </span>
          </div>
          <p className="text-gray-500 max-w-sm">
            Estúdio profissional de impressão 3D focado em prototipagem industrial, peças de substituição e design paramétrico. Transformamos bit em átomos com precisão.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Acesso Rápido</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><button onClick={() => setActiveTab(NavigationTab.Home)} className="hover:text-cyan-400 transition-colors">Homepage</button></li>
            <li><button onClick={() => setActiveTab(NavigationTab.Shop)} className="hover:text-cyan-400 transition-colors">Loja de Produtos</button></li>
            <li><button onClick={() => setActiveTab(NavigationTab.Custom)} className="hover:text-cyan-400 transition-colors">Laboratório de Criação</button></li>
            <li><button onClick={() => setActiveTab(NavigationTab.About)} className="hover:text-cyan-400 transition-colors">Sobre o Estúdio</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Contacto</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li>printed.fusion3d@gmail.com</li>
            <li>São João da Madeira, Portugal</li>
            <li className="flex space-x-4 pt-4">
              <a href="https://www.instagram.com/printedfusion_3d?igsh=MXNnZ2liemYxdWlrbw==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.246 2.242 1.308 3.607.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.246-3.607 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.246-2.242-1.308-3.607-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.246 3.607-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.277.057-2.152.261-2.915.558-.791.307-1.462.72-2.131 1.389-.668.669-1.082 1.34-1.389 2.131-.297.763-.501 1.638-.558 2.915-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.057 1.277.261 2.152.558 2.915.307.791.72 1.462 1.389 2.131.669.668 1.34 1.082 2.131 1.389.763.297 1.638.501 2.915.558 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.277-.057 2.152-.261 2.915-.558.791-.307 1.462-.72 2.131-1.389.668-.669 1.082-1.34 1.389-2.131.297-.763.501-1.638.558-2.915.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.057-1.277-.261-2.152-.558-2.915-.307-.791-.72-1.462-1.389-2.131-.669-.668-1.34-1.082-2.131-1.389-.763-.297-1.638-.501-2.915-.558-1.28-.058-1.688-.072-4.947-.072zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://wa.me/351914526662" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.313 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.821-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-600 text-xs">© 2025 Printed Fusi⏻N. Todos os direitos reservados. Made for Innovation.</p>
        <p className="text-gray-600 text-xs mt-2 md:mt-0">Desenvolvido para Excelência 3D.</p>
      </div>
    </footer>
  );
};

export default Footer;
