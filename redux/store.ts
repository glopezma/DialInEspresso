import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import coffeeReducer from "./coffeeStore/coffee.store";
import headerButtonsReducer from "./headerButtonsStore/headerButtons.store";

const persistCoffeeConfig = {
  key: "coffee",
  storage: AsyncStorage,
};

const persistHeaderButtonsConfig = {
  key: "headerButtons",
  storage: AsyncStorage,
};

const persistedCoffeeReducer = persistReducer(
  persistCoffeeConfig,
  coffeeReducer
);

const persistedHeaderButtonsReducer = persistReducer(
  persistHeaderButtonsConfig,
  headerButtonsReducer
);

export const createStore = (initialState: any = {}) =>
  configureStore({
    preloadedState: { ...initialState },
    reducer: {
      coffeeReducer: persistedCoffeeReducer,
      headerButtonsReducer: persistedHeaderButtonsReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk],
  });

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
