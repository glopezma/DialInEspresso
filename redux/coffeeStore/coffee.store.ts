import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Dial {
  id: string | number[];
  grams?: number;
  time?: number;
  grind?: number;
  yield?: number;
  temperature?: number;
  favorite?: boolean;
  notes?: string;
}

export interface Coffee {
  id: string | number[];
  name: string;
  price?: number;
  region?: string;
  picture?: any;
  flavorNotes?: string[];
  dials?: Dial[];
}

export interface CoffeeState {
  coffeeList: Coffee[];
  selectedCoffee?: Coffee;
}

const initialState: CoffeeState = {
  coffeeList: [],
};

export const coffeeSlice = createSlice({
  name: "coffee",
  initialState,
  reducers: {
    addCoffee: (state, action: PayloadAction<Coffee>) => {
      state.coffeeList = [action.payload, ...state.coffeeList];
    },
    updateCoffee: (state, action: PayloadAction<Coffee>) => {
      const index = state.coffeeList.findIndex(
        (coffee) => coffee.id === action.payload.id
      );
      state.coffeeList[index] = action.payload;
    },
    removeCoffee: (state, action: PayloadAction<string | number[]>) => {
      state.coffeeList = state.coffeeList.filter(
        (coffee) => coffee.id !== action.payload
      );
    },
    setSelectedCoffee: (state, action: PayloadAction<string | number[]>) => {
      const index = state.coffeeList.findIndex(
        (coffee) => coffee.id === action.payload
      );
      state.selectedCoffee = state.coffeeList[index];
    },
    addDial: (state, action: PayloadAction<Dial>) => {
      if (state.selectedCoffee) {
        state.selectedCoffee.dials = [
          action.payload,
          ...(state.selectedCoffee.dials
            ? state.selectedCoffee.dials.map((dial) => {
                return {
                  ...dial,
                  favorite: action.payload.favorite ? false : dial.favorite,
                };
              })
            : []),
        ];
        state.coffeeList = state.coffeeList.map((coffee) => {
          return coffee.id === state.selectedCoffee?.id
            ? state.selectedCoffee
            : coffee;
        });
      }
    },
    updateDial: (state, action: PayloadAction<Dial>) => {
      if (state.selectedCoffee) {
        if (action.payload.favorite) {
          state.selectedCoffee.dials = state.selectedCoffee.dials?.map(
            (dial) => {
              return dial.id === action.payload.id
                ? action.payload
                : { ...dial, favorite: false };
            }
          );
        } else {
          state.selectedCoffee.dials = state.selectedCoffee.dials?.map(
            (dial) => {
              return dial.id === action.payload.id ? action.payload : dial;
            }
          );
        }
        state.coffeeList = state.coffeeList.map((coffee) => {
          return coffee.id === state.selectedCoffee?.id
            ? state.selectedCoffee
            : coffee;
        });
      }
    },
    removeDial: (state, action: PayloadAction<string | number[]>) => {
      if (state.selectedCoffee) {
        state.selectedCoffee.dials = state.selectedCoffee.dials?.filter(
          (dial) => dial.id !== action.payload
        );
        state.coffeeList = state.coffeeList.map((coffee) => {
          return coffee.id === state.selectedCoffee?.id
            ? state.selectedCoffee
            : coffee;
        });
      }
    },
    setFavoriteDial: (
      state,
      action: PayloadAction<{
        coffeeId: string | number[];
        dialId: string | number[];
      }>
    ) => {
      const coffeeList = [...state.coffeeList] || [];
      const coffeeIndex = state.coffeeList.findIndex(
        (coffee) => coffee.id === action.payload.coffeeId
      );

      if (state.coffeeList[coffeeIndex]) {
        const tempCoffeeList = coffeeList[coffeeIndex]?.dials?.map((dial) => ({
          ...dial,
          favorite: dial.id === action.payload.dialId,
        }));
        state.coffeeList[coffeeIndex].dials = tempCoffeeList;
        state.selectedCoffee = state.coffeeList[coffeeIndex];
      }
    },
  },
});

export const {
  addCoffee,
  updateCoffee,
  removeCoffee,
  setSelectedCoffee,
  addDial,
  updateDial,
  setFavoriteDial,
} = coffeeSlice.actions;
export default coffeeSlice.reducer;
