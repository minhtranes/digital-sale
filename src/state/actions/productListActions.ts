import { Product } from "../../components/inventory/product";
import { ProductListActionNames } from "../action-types";

interface CompleteLoadingAction {
  type: ProductListActionNames.PRODUCT_LIST_COMPLETE_LOADING;
  products: Product[];
  totalElements: number;
}

export type ProductListAction = CompleteLoadingAction;
