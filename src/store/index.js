import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { postReduser } from "./reducers/post";

const rootReduces = combineReducers({
  post: postReduser,
});

export default createStore(rootReduces, applyMiddleware(thunk));
