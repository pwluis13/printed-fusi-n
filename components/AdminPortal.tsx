import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { supabase } from '../lib/supabase';

interface AdminPortalProps {
  products: Product[];
  categories: string[];
  refreshData: (silent?: boolean) => Promise<void>;
  onLogout: () => Promise<void>;
}

const AdminPortal: React.FC<AdminPortalProps> = ({
  products,
  categories,
  refreshData,
  onLogout
}) => {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showCatManager, setShowCatManager] = useState(false);
  const [newCatInput, setNewCatInput] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    image: '',
    images: [] as string[],
    videos: [] as string[],
    categories: [] as string[] // Changed from category string to categories array
  });
  const [uploading, setUploading] = useState(false);

  // Delete Confirmation State
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    type: 'product' | 'category' | null;
    id: string | null;
    name: string | null;
  }>({
    isOpen: false,
    type: null,
    id: null,
    name: null
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutAction = async () => {
    await onLogout();
  };

  const uploadFile = async (file: File, folder: string = 'products') => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(folder)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(folder).getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    const url = await uploadFile(e.target.files[0], 'products');
    if (url) {
      setFormData({ ...formData, image: url });
    }
    setUploading(false);
  };

  const handleMultiUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'images' | 'videos') => {
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files);
    // Limits
    const currentCount = formData[field].length;
    const maxCount = field === 'images' ? 10 : 3;

    if (currentCount + files.length > maxCount) {
      alert(`Limite excedido! Máximo de ${maxCount} ${field === 'images' ? 'imagens' : 'vídeos'}.`);
      return;
    }

    setUploading(true);
    const newUrls: string[] = [];

    for (const file of files) {
      // Validate type roughly
      if (field === 'images' && !file.type.startsWith('image/')) continue;
      if (field === 'videos' && !file.type.startsWith('video/')) continue;

      const url = await uploadFile(file, 'products');
      if (url) newUrls.push(url);
    }

    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ...newUrls]
    }));
    setUploading(false);

    // Reset input
    e.target.value = '';
  };

  const toggleCategory = (cat: string) => {
    setFormData(prev => {
      const exists = prev.categories.includes(cat);
      if (exists) {
        return { ...prev, categories: prev.categories.filter(c => c !== cat) };
      } else {
        return { ...prev, categories: [...prev.categories, cat] };
      }
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.categories.length === 0) {
      alert("Por favor, selecione pelo menos uma categoria.");
      return;
    }

    setLoading(true);
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        image: formData.image,
        // category_id deprecated but we can set the first one or null. 
        // Let's set the first one for legacy compatibility if needed, or null if schema allows.
        // Assuming schema allows updates without it if we are using junction table.
        // But to be safe, maybe we fetch the ID of the first category?
        // Actually, we should just ignore it if possible, but the column exists.
        // Let's set it to null or the first category ID to keep old apps working if any. 
        // For this app, simply not sending it is fine if Supabase allows (it's nullable).
        details: {
          images: formData.images,
          videos: formData.videos
        }
      };

      let productId: string;

      if (editingProduct) {
        productId = editingProduct.id;
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', productId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert([productData])
          .select()
          .single();
        if (error) throw error;
        productId = data.id;
      }

      // Handle Categories Relation
      // First, get IDs for selected category names
      const { data: catIds, error: catIdError } = await supabase
        .from('categories')
        .select('id, name')
        .in('name', formData.categories);

      if (catIdError) throw catIdError;

      // Prepare junction data
      const junctionData = catIds.map(cat => ({
        product_id: productId,
        category_id: cat.id
      }));

      // Delete existing relations for this product
      const { error: deleteError } = await supabase
        .from('product_categories')
        .delete()
        .eq('product_id', productId);

      if (deleteError) throw deleteError;

      // Insert new relations
      if (junctionData.length > 0) {
        const { error: insertError } = await supabase
          .from('product_categories')
          .insert(junctionData);
        if (insertError) throw insertError;
      }

      await refreshData(true);
      resetForm();
    } catch (err: any) {
      console.error(err);
      alert('Erro ao guardar produto: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const requestDelete = (type: 'product' | 'category', idOrName: string, name?: string) => {
    setDeleteConfirmation({
      isOpen: true,
      type,
      id: type === 'product' ? idOrName : null,
      name: type === 'category' ? idOrName : (name || null)
    });
  };

  const confirmDelete = async () => {
    const { type, id, name } = deleteConfirmation;
    if (!type) return;

    try {
      if (type === 'product' && id) {
        console.log('Deleting product:', id);
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) throw error;
        alert('Produto eliminado com sucesso.');
      } else if (type === 'category' && name) {
        console.log('Deleting category:', name);
        const { error } = await supabase.from('categories').delete().eq('name', name);
        if (error) throw error;
        alert('Categoria eliminada com sucesso.');
      }

      await refreshData(true);
      setDeleteConfirmation({ isOpen: false, type: null, id: null, name: null });
    } catch (err: any) {
      console.error('Delete exception:', err);
      alert('Erro ao eliminar: ' + err.message);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, type: null, id: null, name: null });
  };

  const handleAddCatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatInput.trim()) return;

    try {
      const slug = newCatInput.trim().toLowerCase().replace(/\s+/g, '-');
      const { error } = await supabase.from('categories').insert([{
        name: newCatInput.trim(),
        slug: slug
      }]);
      if (error) throw error;
      await refreshData(true);
      setNewCatInput('');
    } catch (err: any) {
      alert('Erro ao criar categoria: ' + err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      image: '',
      images: [],
      videos: [],
      categories: []
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      images: product.images || [],
      videos: product.videos || [],
      categories: product.categories || []
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeArrayItem = (field: 'images' | 'videos', index: number) => {
    setFormData({ ...formData, [field]: formData[field].filter((_, i) => i !== index) });
  };

  if (!session) {
    return (
      <div className="max-w-md mx-auto mt-20 px-4 py-12 bg-[#0a0a0a] border border-gray-800 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-cyan-500/10 border border-cyan-500/30">
            <span className="text-2xl text-cyan-500">⏻</span>
          </div>
          <h2 className="text-2xl font-tech font-bold uppercase tracking-tighter">Terminal Admin</h2>
          <p className="text-gray-500 text-[10px] mt-2 uppercase tracking-[0.2em] font-bold">Supabase Auth</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          {error && <div className="text-red-500 text-xs text-center">{error}</div>}
          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-gray-800 rounded-lg px-4 py-4 text-white focus:border-cyan-500 outline-none transition-all font-mono"
              placeholder="Email de Administrador..."
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-gray-800 rounded-lg px-4 py-4 text-white focus:border-cyan-500 outline-none transition-all font-mono"
              placeholder="Password..."
              required
            />
          </div>
          <button disabled={loading} type="submit" className="w-full py-4 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-all glow-cyan uppercase tracking-widest text-xs disabled:opacity-50">
            {loading ? 'A verificar...' : 'Sincronizar'}
          </button>
        </form>
        <button
          onClick={() => onLogout()}
          className="w-full mt-6 text-[10px] uppercase font-bold text-gray-600 hover:text-gray-400 tracking-widest transition-colors"
        >
          Voltar para a Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500 relative">
      {/* Delete Confirmation Modal */}
      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border border-red-900/50 p-8 rounded-2xl max-w-md w-full shadow-2xl space-y-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">Confirmar Eliminação</h3>
            <p className="text-gray-400">
              Tem a certeza que deseja eliminar {deleteConfirmation.type === 'product' ? 'o produto' : 'a categoria'} <span className="text-white font-bold">"{deleteConfirmation.name || 'Selecionado'}"</span>?
              <br />
              <span className="text-xs text-red-500 mt-2 block">Esta ação é irreversível.</span>
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-400 hover:text-white font-bold uppercase text-xs tracking-widest"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg uppercase text-xs tracking-widest shadow-[0_0_15px_rgba(220,38,38,0.4)]"
              >
                Sim, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center justify-between mb-12 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-tech font-bold text-cyan-400 uppercase tracking-tight">Consola de Inventário</h2>
          <p className="text-gray-500">Gestão via Supabase</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              const newState = !showCatManager;
              setShowCatManager(newState);
              if (newState) setShowForm(false);
            }}
            className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${showCatManager
              ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.1)]'
              : 'border-gray-800 text-gray-500 hover:text-white'
              }`}
          >
            Gerir Categorias
          </button>
          <button
            onClick={() => {
              if (showForm) {
                resetForm();
              } else {
                setShowForm(true);
                setShowCatManager(false);
              }
            }}
            className={`px-6 py-2 font-bold rounded-lg transition-all flex items-center space-x-2 ${showForm
              ? 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
              : 'bg-cyan-500 text-black glow-cyan hover:bg-cyan-400'
              }`}
          >
            <span>{showForm ? 'Cancelar' : 'Novo Produto'}</span>
          </button>
          <button onClick={handleLogoutAction} className="px-4 py-2 border border-red-900/50 text-red-500 font-bold rounded-lg hover:bg-red-500/10 transition-all text-xs uppercase tracking-widest">
            Sair
          </button>
        </div>
      </div>

      {/* Gestor de Categorias */}
      {showCatManager && (
        <div className="mb-12 bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8">
          <h3 className="text-sm font-tech font-bold text-white mb-6 uppercase tracking-widest">Base de Dados de Categorias</h3>
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map(cat => (
              <div key={cat} className="flex items-center space-x-2 bg-black border border-gray-800 px-3 py-1 rounded-full group">
                <span className="text-xs text-gray-400">{cat}</span>
                <button
                  onClick={() => requestDelete('category', cat)}
                  className="text-gray-700 hover:text-red-500 transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <form onSubmit={handleAddCatSubmit} className="flex space-x-2 max-w-sm">
            <input
              placeholder="Nova categoria..."
              value={newCatInput}
              onChange={e => setNewCatInput(e.target.value)}
              className="flex-grow bg-black border border-gray-800 rounded-lg px-4 py-2 text-xs focus:border-cyan-500 outline-none"
            />
            <button type="submit" className="px-4 py-2 bg-cyan-500 text-black text-xs font-bold rounded-lg hover:bg-cyan-400">
              Adicionar
            </button>
          </form>
        </div>
      )}

      {showForm && (
        <div className="mb-12 bg-[#0a0a0a] border border-cyan-500/30 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-black/40 p-6 rounded-xl border border-gray-800 space-y-4">
                <h4 className="text-[10px] uppercase font-bold text-cyan-500 tracking-widest">Informação Principal</h4>
                <input required placeholder="Nome do Produto" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none" />
                <input required type="number" step="0.01" placeholder="Preço (€)" value={formData.price || ''} onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })} className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none" />

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-gray-500 block">Categorias (Selecione Várias)</label>
                  <div className="flex flex-wrap gap-2 bg-black border border-gray-800 rounded-lg p-3 min-h-[50px]">
                    {categories.map(cat => {
                      const isSelected = formData.categories.includes(cat);
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => toggleCategory(cat)}
                          className={`px-3 py-1 rounded-full text-[10px] border transition-all ${isSelected
                              ? 'bg-cyan-500 text-black border-cyan-500 font-bold'
                              : 'bg-black text-gray-500 border-gray-800 hover:border-gray-600'
                            }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <textarea required placeholder="Descrição..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none resize-none h-24" />

                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">Capa Principal</label>
                  <div className="flex space-x-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/10 file:text-cyan-500 hover:file:bg-cyan-500/20"
                    />
                  </div>
                  {uploading && <p className="text-xs text-cyan-500 mt-2 animate-pulse">A enviar imagem...</p>}
                  <input readOnly placeholder="URL da imagem..." value={formData.image} className="w-full bg-black border border-gray-800 rounded-lg px-4 py-2 mt-2 text-xs font-mono focus:border-cyan-500 outline-none opacity-50" />
                </div>
              </div>

              <button disabled={loading} type="submit" className="w-full py-4 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-all uppercase text-xs tracking-widest glow-cyan">
                {loading ? 'A Guardar...' : (editingProduct ? 'Guardar Alterações' : 'Adicionar ao Catálogo')}
              </button>
            </div>

            <div className="lg:col-span-6 space-y-6">
              {/* Images Extra - Multi Upload */}
              <div className="bg-black/40 p-6 rounded-xl border border-gray-800 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Galeria Extra (Max 10)</h4>
                  <div className="relative">
                    <input
                      type="file"
                      id="multi-image-upload"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleMultiUpload(e, 'images')}
                      className="hidden"
                    />
                    <label
                      htmlFor="multi-image-upload"
                      className="cursor-pointer text-cyan-500 text-[10px] font-bold hover:underline"
                    >
                      + UPLOAD IMAGENS
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                  {formData.images.map((url, i) => (
                    <div key={i} className="relative group aspect-square bg-black border border-gray-800 rounded overflow-hidden">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('images', i)}
                        className="absolute top-1 right-1 bg-red-600/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                      </button>
                    </div>
                  ))}
                  {uploading && <div className="flex items-center justify-center p-4"><span className="animate-spin text-cyan-500">⟳</span></div>}
                </div>
              </div>

              {/* Videos - Multi Upload */}
              <div className="bg-black/40 p-6 rounded-xl border border-gray-800 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Vídeos (Max 3)</h4>
                  <div className="relative">
                    <input
                      type="file"
                      id="multi-video-upload"
                      multiple
                      accept="video/*"
                      onChange={(e) => handleMultiUpload(e, 'videos')}
                      className="hidden"
                    />
                    <label
                      htmlFor="multi-video-upload"
                      className="cursor-pointer text-cyan-500 text-[10px] font-bold hover:underline"
                    >
                      + UPLOAD VÍDEOS
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  {formData.videos.map((url, i) => (
                    <div key={i} className="flex items-center space-x-2 bg-black border border-gray-800 p-2 rounded">
                      <span className="text-[10px] text-gray-500 truncate flex-grow">{url.split('/').pop()}</span>
                      <button
                        type="button"
                        onClick={() => removeArrayItem('videos', i)}
                        className="text-red-500 hover:text-red-400"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {uploading && <p className="text-[10px] text-cyan-500 animate-pulse">A carregar ficheiros...</p>}
                </div>
              </div>

              {/* Preview Main Image */}
              {formData.image && (
                <div className="bg-black rounded-xl border border-gray-800 aspect-video overflow-hidden relative">
                  <span className="absolute top-2 left-2 bg-black/50 px-2 py-1 rounded text-[10px] text-white backdrop-blur-sm">Capa</span>
                  <img src={formData.image} alt="Preview" className="w-full h-full object-contain" />
                </div>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Tabela de Inventário */}
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black border-b border-gray-800 text-[10px] uppercase font-bold text-gray-500 tracking-widest">
              <tr>
                <th className="px-6 py-5">Produto</th>
                <th className="px-6 py-5">Categoria</th>
                <th className="px-6 py-5 text-right">Preço</th>
                <th className="px-6 py-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-900">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-cyan-500/[0.02] transition-colors">
                  <td className="px-6 py-4 flex items-center space-x-4">
                    {product.image && <img src={product.image} alt="" className="w-8 h-8 rounded object-cover" />}
                    <span className="font-bold text-sm text-gray-300">{product.name}</span>
                  </td>
                  <td className="px-6 py-4 flex flex-col space-y-1">
                    {product.categories && product.categories.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {product.categories.map(c => (
                          <span key={c} className="text-[10px] bg-gray-900 px-2 py-1 rounded text-gray-400">{c}</span>
                        ))}
                      </div>
                    ) : <span className="text-gray-600">-</span>}
                    <span className="text-[9px] font-mono text-gray-600 bg-black px-2 py-1 rounded w-fit">
                      IMG:{product.images?.length || 0} | VID:{product.videos?.length || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-cyan-400">{product.price.toFixed(2)}€</td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <button onClick={() => startEdit(product)} className="text-[10px] font-bold text-cyan-500 uppercase">Editar</button>
                    <button onClick={() => requestDelete('product', product.id, product.name)} className="text-[10px] font-bold text-red-500 uppercase">Apagar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
