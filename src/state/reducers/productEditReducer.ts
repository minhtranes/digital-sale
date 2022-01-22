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
  console.info(action.type);
  switch (action.type) {
    case EditProductActionNames.EDIT_PRODUCT_BEGIN:
      var visible = action.visible;
      var product = action.product;
      var temporaryProduct = state.product;
      return { ...state, product, visible, temporaryProduct };

    case EditProductActionNames.EDIT_PRODUCT_SAVE:
      var visible = action.visible;
      var product: Product = emptyProduct;

      return { ...state, product, visible };

    case EditProductActionNames.EDIT_PRODUCT_ABORT:
      var visible = action.visible;
      return { ...state, visible };

    case EditProductActionNames.EDIT_PRODUCT_EDIT:
      var field = action.field;
      var value = action.value;
      return { ...state, [field]: value };

    default:
      return { ...state };
  }
};

export default editProductReducer;
