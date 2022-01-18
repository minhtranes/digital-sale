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
  switch (action.type) {
    case ProductListActionNames.PRODUCT_LIST_COMPLETE_LOADING:
      state.products = action.products;
      return state;
    default:
      return state;
  }
};

export default productListReducer;
