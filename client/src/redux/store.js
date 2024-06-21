import { configureStore } from "@reduxjs/toolkit";
import contractSlice from "./contractSlice";
import { combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  contractSlice,
});

const persistConfig = {
  key: "root", // Key for the root of storage
  storage, // Storage system to use (e.g., localStorage, AsyncStorage)
  // Optionally, you can configure blacklist or whitelist options
  // blacklist: ['someReducer'], // Reducers to ignore
  // whitelist: ['someReducer'], // Only persist specified reducers
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});
const persistor = persistStore(store); // Create persistor object

export { store, persistor };
