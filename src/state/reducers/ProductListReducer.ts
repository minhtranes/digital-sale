import { Product } from "../../components/inventory/product";
import { ProductListActionNames } from "../action-types";
import { ProductListAction } from "../actions/productListActions";

export type ProductList = {
  products: Product[];
  totalElements: number;
};

const productListReducer = (
  state: ProductList = { products: [], totalElements: 0 },
  action: ProductListAction
): ProductList => {
  console.info(action.type);
  switch (action.type) {
    case ProductListActionNames.PRODUCT_LIST_COMPLETE_LOADING:
      // state.products = action.products;
      var products: Product[] = [];
      products.push(...action.products);

      return { ...state, products };
    case ProductListActionNames.PRODUCT_LIST_REMOVE_ELEMENTS:
      var products: Product[] = [...state.products];
      action.removedProducts.forEach((removedElement) => {
        products.forEach((product, index) => {
          if (product.id === removedElement.id) products.splice(index, 1);
        });
      });
      return { ...state, products };

    case ProductListActionNames.PRODUCT_LIST_UPDATE_ELEMENTS:
      var products: Product[] = [...state.products];
      action.updatedProducts.forEach((updatedElement) => {
        products.forEach((product, index) => {
          if (product.id === updatedElement.id) {
            products[index] = updatedElement;
          }
        });
      });
      return { ...state, products };
    default:
      return state;
  }
};

export default productListReducer;
