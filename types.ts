
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string; // Capa / Thumbnail principal
  images: string[]; // Até 10 imagens adicionais
  videos: string[]; // Até 3 URLs de vídeo
  categories: string[]; // Alterado de category: string para categories: string[]
}

export interface CustomOrder {
  serviceType: string;
  material: string;
  color: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  instructions: string;
  files: File[];
}

export enum NavigationTab {
  Home = 'home',
  Shop = 'shop',
  Custom = 'custom',
  About = 'about',
  Contact = 'contact',
  Admin = 'admin'
}
