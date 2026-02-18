
import { Product } from './types';

export const INITIAL_CATEGORIES: string[] = [
  'Acessórios',
  'Organização',
  'Decoração',
  'Hardware',
  'Industrial',
  'Arte'
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Suporte Headphones Geométrico',
    description: 'Design ergonómico impresso em PLA texturizado de alta densidade.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop',
    images: [],
    videos: [],
    categories: ['Acessórios', 'Organização']
  },
  {
    id: '2',
    name: 'Organizador Tech V2',
    description: 'Módulo de gestão de cabos futurista com encaixe magnético.',
    price: 24.50,
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop',
    images: [],
    videos: [],
    categories: ['Organização', 'Hardware']
  },
  {
    id: '3',
    name: 'Candeeiro Voronoi',
    description: 'Peça de arte funcional com padrão orgânico complexo.',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1543163353-d442c2227693?q=80&w=800&auto=format&fit=crop',
    images: [],
    videos: [],
    categories: ['Decoração', 'Arte']
  },
  {
    id: '4',
    name: 'Suporte de GPU RGB',
    description: 'Estrutura reforçada em ABS para gráficas de grande porte.',
    price: 15.90,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=800&auto=format&fit=crop',
    images: [],
    videos: [],
    categories: ['Hardware', 'Industrial']
  }
];

