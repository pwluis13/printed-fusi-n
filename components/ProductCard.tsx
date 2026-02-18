
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeMedia, setActiveMedia] = useState({ url: product.image, type: 'image' });
  const [imageError, setImageError] = useState(false);

  const allMedia = [
    { url: product.image, type: 'image' },
    ...(product.images || []).map(url => ({ url, type: 'image' })),
    ...(product.videos || []).map(url => ({ url, type: 'video' }))
  ].filter(item => !!item.url);

  const openDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMedia({ url: product.image, type: 'image' });
    setShowModal(true);
  };

  return (
    <>
      <div 
        onClick={openDetails}
        className="group bg-[#0a0a0a] border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-500 hover:-translate-y-2 cursor-pointer shadow-lg"
      >
        <div className="relative aspect-square overflow-hidden bg-[#050505]">
          {!imageError ? (
            <img 
              src={product.image} 
              alt={product.name} 
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-800 p-4 text-center">
              <span className="text-4xl mb-2 opacity-20">📷</span>
              <span className="text-[10px] uppercase font-bold tracking-widest">Média Offline</span>
            </div>
          )}
          <div className="absolute top-3 right-3 flex flex-wrap gap-1 justify-end max-w-[80%]">
            {product.categories?.slice(0, 2).map(cat => (
              <span key={cat} className="px-2 py-0.5 bg-black/80 backdrop-blur-md rounded text-cyan-400 text-[8px] font-bold border border-cyan-500/30 uppercase tracking-widest">
                {cat}
              </span>
            ))}
            {product.categories?.length > 2 && (
              <span className="px-2 py-0.5 bg-black/80 backdrop-blur-md rounded text-cyan-400 text-[8px] font-bold border border-cyan-500/30 uppercase tracking-widest">
                +{product.categories.length - 2}
              </span>
            )}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-tech font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10 leading-relaxed">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-auto border-t border-gray-900 pt-4">
            <span className="text-2xl font-bold text-white font-tech tracking-tighter">
              {product.price.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}
            </span>
            <div className="flex items-center space-x-2">
               <span className="text-[9px] font-bold text-cyan-500 uppercase tracking-widest group-hover:mr-2 transition-all">Explorar</span>
               <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
               </svg>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/98 backdrop-blur-2xl" onClick={() => setShowModal(false)}></div>
          
          <div className="relative w-full max-w-6xl bg-[#050505] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/5 hover:bg-red-500/20 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 transition-all border border-white/10"
            >
              ✕
            </button>

            {/* Visualizador de Média */}
            <div className="w-full md:w-3/5 bg-black flex flex-col relative border-b md:border-b-0 md:border-r border-gray-800">
              <div className="flex-grow flex items-center justify-center p-8">
                {activeMedia.type === 'image' ? (
                  <img src={activeMedia.url} className="max-w-full max-h-[50vh] object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-500" alt="" />
                ) : (
                  <div className="w-full h-full max-h-[50vh] aspect-video bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center">
                    <iframe 
                      className="w-full h-full"
                      src={activeMedia.url.includes('youtube') ? activeMedia.url.replace('watch?v=', 'embed/') : activeMedia.url}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
              
              {/* Miniaturas */}
              <div className="p-6 bg-black/50 border-t border-gray-900 flex space-x-3 overflow-x-auto custom-scrollbar">
                {allMedia.map((media, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveMedia(media)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all relative ${activeMedia.url === media.url ? 'border-cyan-500 scale-110' : 'border-gray-800 opacity-60 hover:opacity-100'}`}
                  >
                    {media.type === 'image' ? (
                      <img src={media.url} className="w-full h-full object-cover" alt="" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-red-950/20">
                        <span className="text-xl">▶</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Info do Produto */}
            <div className="w-full md:w-2/5 p-10 flex flex-col bg-gradient-to-br from-[#080808] to-[#030303] overflow-y-auto">
              <div className="mb-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.categories?.map(cat => (
                    <div key={cat} className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.3em]">{cat}</span>
                    </div>
                  ))}
                </div>
                <h2 className="text-4xl font-tech font-bold mb-6 text-glow-cyan leading-tight">{product.name}</h2>
                <p className="text-gray-400 text-lg leading-relaxed font-light">
                  {product.description}
                </p>
              </div>

              <div className="mt-auto pt-10 border-t border-gray-900">
                <span className="text-gray-600 text-[10px] uppercase font-bold tracking-widest block mb-2">Valor Base de Produção</span>
                <span className="text-6xl font-bold text-white font-tech tracking-tighter">
                  {product.price.toFixed(2)}€
                </span>
                
                <div className="mt-12 p-6 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl">
                  <p className="text-xs text-cyan-500/70 font-bold uppercase tracking-widest leading-relaxed">
                    Personalização disponível em São João da Madeira.<br/>Contacte o estúdio para materiais técnicos ou orçamentos em massa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
