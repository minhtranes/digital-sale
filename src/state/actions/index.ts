import { Product } from "../../components/inventory/product";
import { EditProductActionNames } from "../action-types";

interface EditProductBeginAction {
  type: EditProductActionNames.EDIT_PRODUCT_BEGIN;
  visible: boolean;
  product: Product;
}

interface EditProductEndAction {
  type: EditProductActionNames.EDIT_PRODUCT_SAVE;
  visible: boolean;
  product: Product;
}

interface EditProductAbortAction {
  type: EditProductActionNames.EDIT_PRODUCT_ABORT;
  visible: boolean;
}

interface EditProductEditAction {
  type: EditProductActionNames.EDIT_PRODUCT_EDIT;
  field: string;
  value: any;
}

export type EditProductAction =
  | EditProductBeginAction
  | EditProductEndAction
  | EditProductAbortAction
  | EditProductEditAction;
