import { combineReducers } from "redux";
import reducer from "./productEditReducer";

const reducers = combineReducers({
  editingProduct: reducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
