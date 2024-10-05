export interface Product {
  images: string[]; // Array of images
  name: string;
  originalPrice: number;
  salePrice?: number; // Optional
  onSale?: boolean; // Optional
  stock?: number;
  availability?: string;
  customersViewing?: number;
}
  