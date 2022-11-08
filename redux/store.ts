import coffeeReducer from "./coffeeStore/coffee.store";
import headerButtonsReducer from "./headerButtonsStore/headerButtons.store";
import { configureStore } from "@reduxjs/toolkit";

export const createStore = (initialState: any = {}) =>
  configureStore({
    preloadedState: { ...initialState },
    reducer: {
      coffeeReducer,
      headerButtonsReducer,
    },
  });

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
