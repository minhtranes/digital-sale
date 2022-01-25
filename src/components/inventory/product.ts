export interface Product {
  id: number;
  idString: string;
  name: string;
  retailDepartment: string;
  city: string;
  phoneNumber: string;
  currency: string;
  businessAddress: string;
  importPrice: number;
  salePrice: number;
  shippingAddress: string;
  importDate: string;
  expirationDate: string;
  expired: boolean;
}

export const emptyProduct: Product = {
  id: 0,
  idString: "",
  name: "",
  retailDepartment: "",
  city: "",
  phoneNumber: "",
  currency: "",
  businessAddress: "",
  importPrice: 0,
  salePrice: 0,
  shippingAddress: "",
  importDate: "",
  expirationDate: "",
  expired: false,
};
