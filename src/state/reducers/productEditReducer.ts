import { Product, emptyProduct } from "../../components/inventory/product";
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

const editProductReducer = (
  state: EditingProduct = initialState,
  action: EditProductAction
): EditingProduct => {
  switch (action.type) {
    case EditProductActionNames.EDIT_PRODUCT_BEGIN:
      state.visible = action.visible;
      state.product = action.product;
      state.temporaryProduct = action.product;
      console.log(
        "Type = " +
          action.type +
          " Product = " +
          action.product.id +
          " Visible = " +
          action.visible
      );
      return state;
    case EditProductActionNames.EDIT_PRODUCT_SAVE:
      state.visible = action.visible;
      state.product = state.temporaryProduct;
      return state;
    case EditProductActionNames.EDIT_PRODUCT_ABORT:
      state.visible = action.visible;
      return state;
    case EditProductActionNames.EDIT_PRODUCT_EDIT:
      console.info(
        "Updating field [%s] with value [%s]",
        action.field,
        action.value
      );
      state.product.name = action.value;
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

export default editProductReducer;
