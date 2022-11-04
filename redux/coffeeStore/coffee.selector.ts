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

export const selectCoffeeById = createSelector(
  [
    (state: RootState) => state.coffeeReducer.coffeeList,
    (state: RootState, selectedCoffeeId) => selectedCoffeeId,
  ],
  (coffeeList, selectedCoffeeId) => {
    return coffeeList.find((coffee) => coffee.id === selectedCoffeeId);
  }
);
