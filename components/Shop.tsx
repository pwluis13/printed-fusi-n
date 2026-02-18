
import React, { useState } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ShopProps {
  products: Product[];
  categories: string[];
}

const Shop: React.FC<ShopProps> = ({ products, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas as Categorias');

  const filteredProducts = selectedCategory === 'Todas as Categorias'
    ? products
    : products.filter(p => p.categories?.includes(selectedCategory));

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-l-4 border-cyan-500 pl-6">
        <div>
          <h2 className="text-4xl font-tech font-bold">Catálogo de Produtos</h2>
          <p className="text-gray-400 mt-2">Soluções prontas a imprimir para o teu setup ou projetos.</p>
        </div>
        <div className="mt-6 md:mt-0">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#111] border border-gray-800 text-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-cyan-500 uppercase text-xs font-bold tracking-widest"
          >
            <option>Todas as Categorias</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#0a0a0a] rounded-xl border border-dashed border-gray-800">
          <p className="text-gray-500 italic">Nenhum produto encontrado nesta categoria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Shop;
