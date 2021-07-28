import { emptyProduct, Product } from "../../components/product/Product";
import { EditProductActionNames } from "../action-types";
import { EditProductAction } from "../actions";

export type EditingProduct = {
  visible: boolean;
  product: Product;
};

const initialState: EditingProduct = {
  visible: false,
  product: emptyProduct,
};

const reducer = (
  state: EditingProduct = initialState,
  action: EditProductAction
): EditingProduct => {
  switch (action.type) {
    case EditProductActionNames.EDIT_PRODUCT_BEGIN:
      return {
        visible: action.visible,
        product: action.product,
      };
    case EditProductActionNames.EDIT_PRODUCT_SAVE:
      return {
        visible: action.visible,
        product: action.product,
      };
    case EditProductActionNames.EDIT_PRODUCT_ABORT:
      return {
        visible: action.visible,
        product: state.product,
      };
    default:
      return state;
  }
};

export default reducer;
