import { emptyProduct, Product } from "../../components/product/Product";
import { EditProductActionNames } from "../action-types";
import { EditProductAction } from "../actions";

export type EditingProduct = {
  visible: boolean;
  product: Product;
  temporaryProduct: Product;
};

const initialState: EditingProduct = {
  visible: false,
  product: emptyProduct,
  temporaryProduct: emptyProduct,
};

const reducer = (
  state: EditingProduct = initialState,
  action: EditProductAction
): EditingProduct => {
  switch (action.type) {
    case EditProductActionNames.EDIT_PRODUCT_BEGIN:
      state.visible = action.visible;
      state.product = action.product;
      state.temporaryProduct = action.product;
      return state;
    case EditProductActionNames.EDIT_PRODUCT_SAVE:
      state.visible = action.visible;
      state.product = state.temporaryProduct;
      return state;
    case EditProductActionNames.EDIT_PRODUCT_ABORT:
      state.visible = action.visible;
      return state;
    case EditProductActionNames.EDIT_PRODUCT_EDIT:
      return state;
    default:
      return state;
  }
};

export default reducer;
