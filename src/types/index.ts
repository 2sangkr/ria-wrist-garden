export type Category = 'summer' | 'classic' | 'nature' | 'custom';

export type SizeOption = {
  label: 'S' | 'M' | 'L';
  wrist_cm: number;
  stock: number;
};

export type Product = {
  id: string;
  slug: string;
  name_ko: string;
  name_en: string;
  category: Category;
  price: number;
  compare_at_price?: number;
  description: string;
  materials: string[];
  sizes: SizeOption[];
  images: string[];
  is_featured: boolean;
  is_new: boolean;
  created_at: string;
};

export type CartItem = {
  product: Product;
  size: SizeOption['label'];
  quantity: number;
  engraving?: string;
};

export type Order = {
  id: string;
  order_number: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shipping_address: {
    name: string;
    phone: string;
    zip: string;
    address1: string;
    address2?: string;
  };
  items: CartItem[];
  subtotal: number;
  shipping_fee: number;
  total: number;
  status: 'pending' | 'paid' | 'preparing' | 'shipped' | 'delivered' | 'canceled';
  payment_method: string;
  payment_id: string;
  memo?: string;
  created_at: string;
};
