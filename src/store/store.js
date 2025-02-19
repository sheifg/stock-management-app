import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { uiReducer } from "./ui";
import { categoriesReducer } from "./categories";
import { brandsReducer } from "./brands";
import { firmsReducer } from "./firms";
import { productsReducer } from "./products";
import { purchasesReducer } from "./purchases";
import { salesReducer } from "./sales";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    categories: categoriesReducer,
    brands: brandsReducer,
    firms: firmsReducer,
    products: productsReducer,
    purchases: purchasesReducer,
    sales: salesReducer,
  },
});
