// store.ts or store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import paginationReducer from "../features/pagination/paginationSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  pagination: paginationReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
