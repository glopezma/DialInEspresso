import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectCoffeeList = createSelector(
  (state: RootState) => state.coffeeReducer.coffeeList,
  (coffeeList) => coffeeList
);

export const selectSelectedCoffee = createSelector(
  (state: RootState) => state.coffeeReducer.selectedCoffee,
  (selectedCoffee) => selectedCoffee
);
