import { createStore } from "redux";
import { appReducer } from "./app/appReducer";

const store = createStore(appReducer);

export default store;