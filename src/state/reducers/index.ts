import { combineReducers } from "redux";
import productEditReducer from "./productEditReducer";

const reducers = combineReducers({
  editingProduct: productEditReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
