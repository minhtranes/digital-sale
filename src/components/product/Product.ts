interface Product {
  id: number;
  idString: string;
  name: string;
  retailDepartment: string;
  city: number;
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
export default Product;

export const emptyProduct: Product = {
  id: 0,
  idString: "",
  name: "",
  retailDepartment: "",
  city: 0,
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
