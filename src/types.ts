export interface CustomField {
  id: string;
  label: string;
  type: "text" | "select";
  placeholder?: string;
  options?: string[];
}

export interface Variant {
  id: string;
  name: string;
  price: number | null;
  volume?: string;
}

export interface Addon {
  id: string;
  name: string;
  price: number | null;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number | null;
  emoji: string;
  image: string;
  available: boolean;
  featured: boolean;
  order: number;
  variants: Variant[];
  addons: Addon[];
  customFields: CustomField[];
}

export interface Category {
  id: string;
  name: string;
  shortName: string;
  description: string;
  visible: boolean;
  order: number;
}

export interface CartItemDetail {
  id: string;
  label: string;
  value: string;
}

export interface CartItem {
  cartKey: string;
  id: string;
  name: string;
  price: number | null;
  basePrice: number | null;
  quantity: number;
  emoji: string;
  image: string;
  details: CartItemDetail[];
  selectedVariant?: Variant;
  selectedAddons: Addon[];
  customFieldValues: Record<string, string>;
}

export interface CustomerData {
  name: string;
  type: "delivery" | "pickup";
  address: string;
  complement: string;
  reference: string;
  payment: string;
  note: string;
}

export interface Order {
  id: string;
  timestamp: string;
  items: CartItem[];
  customer: CustomerData;
  total: number | null;
  status: "Pendente" | "Confirmado" | "Cancelado";
}

export interface StoreInfo {
  name: string;
  whatsappDisplay: string;
  whatsappNumber: string;
  instagramUser: string;
  instagramUrl: string;
  address: string;
  openingHour: number;
  closingHour: number;
  openingText: string;
  deliveryInfo: string;
  deliveryFee: number | null;
  paymentInfo: string;
  paymentOptions: string[];
  pix: string;
}
