import { createSlice } from "@reduxjs/toolkit";

export interface HomeButtons {
  coffeeId: string | number[];
  update: boolean;
}

const initialState: HomeButtons = {
  coffeeId: "",
  update: false,
};

export const headerButtonsSlice = createSlice({
  name: "headerButtons",
  initialState,
  reducers: {
    setCoffeeId: (state, action) => {
      if (state.coffeeId === action.payload || !action.payload) {
        state.coffeeId = "";
        state.update = false;
      } else {
        state.update = true;
        state.coffeeId = action.payload;
      }
      console.log({
        ...state,
      });
    },
  },
});

export const { setCoffeeId } = headerButtonsSlice.actions;
export default headerButtonsSlice.reducer;
