import { combineReducers } from "redux";
import editProductReducer from "./productEditReducer";
import productListReducer from "./ProductListReducer";

const reducers = combineReducers({
  editingProduct: editProductReducer,
  productList: productListReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
