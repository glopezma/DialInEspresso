import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectShowActionHeader = createSelector(
  (state: RootState) => state.headerButtonsReducer.update,
  (update) => update
);

export const selectCoffeeId = createSelector(
  (state: RootState) => state.headerButtonsReducer.coffeeId,
  (coffeeId) => coffeeId
);
