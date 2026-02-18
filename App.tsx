import React, { useState, useEffect } from 'react';
import { Product, NavigationTab } from './types';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Shop from './components/Shop';
import CreationLab from './components/CreationLab';
import AdminPortal from './components/AdminPortal';
import About from './components/About';
import Contact from './components/Contact';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.Home);
  const [products, setProducts] = useState<Product[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (silent = false) => {
    try {
      if (!silent) setLoading(true);

      // Fetch Categories
      const { data: categoriesData, error: catError } = await supabase
        .from('categories')
        .select('name');

      if (catError) throw catError;

      const categoryNames = categoriesData.map(c => c.name);
      setAvailableCategories(categoryNames);

      // Fetch Products with many-to-many categories
      const { data: productsData, error: prodError } = await supabase
        .from('products')
        .select(`
          *,
          product_categories (
            categories (name)
          )
        `);

      if (prodError) throw prodError;

      const formattedProducts: Product[] = productsData.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        image: p.image,
        categories: p.product_categories
          ? p.product_categories.map((pc: any) => pc.categories?.name).filter(Boolean)
          : [],
        images: (p.details as any)?.images || [],
        videos: (p.details as any)?.videos || []
      }));

      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const logoutAdmin = async () => {
    await supabase.auth.signOut();
    setActiveTab(NavigationTab.Home);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
      );
    }

    switch (activeTab) {
      case NavigationTab.Home:
        return <Hero onShopClick={() => setActiveTab(NavigationTab.Shop)} onCustomClick={() => setActiveTab(NavigationTab.Custom)} />;
      case NavigationTab.Shop:
        return <Shop products={products} categories={availableCategories} />;
      case NavigationTab.Custom:
        return <CreationLab />;
      case NavigationTab.Admin:
        return (
          <AdminPortal
            products={products}
            categories={availableCategories}
            refreshData={fetchData}
            onLogout={logoutAdmin}
          />
        );
      case NavigationTab.About:
        return <About />;
      case NavigationTab.Contact:
        return <Contact />;
      default:
        return <Hero onShopClick={() => setActiveTab(NavigationTab.Shop)} onCustomClick={() => setActiveTab(NavigationTab.Custom)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505]">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow pt-20">
        {renderContent()}
      </main>
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
