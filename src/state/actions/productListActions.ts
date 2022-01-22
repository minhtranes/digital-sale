import { Product } from "../../components/inventory/product";
import { ProductListActionNames } from "../action-types";

interface CompleteLoadingAction {
  type: ProductListActionNames.PRODUCT_LIST_COMPLETE_LOADING;
  products: Product[];
  totalElements: number;
}

interface RemoveElementsAction {
  type: ProductListActionNames.PRODUCT_LIST_REMOVE_ELEMENTS;
  removedProducts: Product[];
}

interface UpdateElementsAction {
  type: ProductListActionNames.PRODUCT_LIST_UPDATE_ELEMENTS;
  updatedProducts: Product[];
}

export type ProductListAction =
  | CompleteLoadingAction
  | RemoveElementsAction
  | UpdateElementsAction;
