import Product, { emptyProduct } from "../components/product/Product";
import http from "../repository/http-common";

interface ProductService {
  listAll: () => Product[] | null;
  getOne: (id: string) => Product;
  addProduct: (p: Product) => Product;
}

export default ProductService;

class ProductServiceImpl implements ProductService {
  addProduct(p: Product): Product {
    http.post<Product>(`/inventory/save`, p).then((r) => {
      return r.data;
    });
    return p;
  }

  listAll() {
    http.get<Product[]>(`/inventory/list`).then((r) => {
      return r.data;
    });
    return null;
  }

  getOne(id: string): Product {
    http.get<Product>(`/inventory/${id}`).then((r) => {
      return r.data;
    });
    return emptyProduct;
  }
}
