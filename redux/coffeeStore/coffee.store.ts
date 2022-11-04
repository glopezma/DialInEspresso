import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";

export interface Dial {
  id: string | number[];
  grams?: number;
  time?: number;
  grind?: number;
  yield?: number;
  temperature?: number;
  favorite?: boolean;
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
  coffeeList: [
    {
      id: uuid.v4(),
      name: "Gabe's favorite coffee",
      price: 15.99,
      region: "Yirgacheffe, Ethiopia",
      flavorNotes: ["Citrus", "Floral", "Chocolate"],
      dials: [
        {
          id: uuid.v4(),
          grams: 18,
          time: 30,
          grind: 15,
          yield: 30,
          temperature: 200,
          favorite: true,
        },
        {
          id: uuid.v4(),
          grams: 18,
          time: 30,
          grind: 11,
          yield: 30,
          temperature: 200,
        },
      ],
    },
    {
      id: uuid.v4(),
      name: "Guatemala Antigua",
      price: 15.99,
      flavorNotes: ["Citrus", "Floral", "Chocolate"],
    },
    {
      id: uuid.v4(),
      name: "Kenya AA",
      price: 15.99,
      region: "Kenya",
    },
    {
      id: uuid.v4(),
      name: "Ethiopia Yirgacheffe",
      price: 15.99,
      region: "Yirgacheffe, Ethiopia",
      flavorNotes: ["Citrus", "Floral", "Chocolate"],
      dials: [],
    },
    {
      id: uuid.v4(),
      name: "Guatemala Antigua",
      price: 15.99,
      region: "Antigua, Guatemala",
      flavorNotes: ["Citrus", "Floral", "Chocolate"],
    },
    {
      id: uuid.v4(),
      name: "Kenya AA",
      price: 15.99,
      region: "Kenya",
      flavorNotes: ["Citrus", "Floral", "Chocolate"],
    },
    {
      id: uuid.v4(),
      name: "Ethiopia Yirgacheffe",
      price: 15.99,
      region: "Yirgacheffe, Ethiopia",
      flavorNotes: ["Citrus", "Floral", "Chocolate"],
      dials: [],
    },
    {
      id: uuid.v4(),
      name: "Guatemala Antigua",
      price: 15.99,
      region: "Antigua, Guatemala",
      flavorNotes: ["Citrus", "Floral", "Chocolate"],
    },
    {
      id: uuid.v4(),
      name: "Kenya AA",
      price: 15.99,
      region: "Kenya",
      flavorNotes: ["Citrus", "Floral", "Chocolate"],
    },
    {
      id: uuid.v4(),
      name: "Ethiopia Yirgacheffe",
      price: 15.99,
      region: "Yirgacheffe, Ethiopia",
      flavorNotes: ["Citrus", "Floral", "Chocolate"],
      dials: [],
    },
    {
      id: uuid.v4(),
      name: "Guatemala Antigua",
      price: 15.99,
      region: "Antigua, Guatemala",
      flavorNotes: ["Citrus", "Floral", "Chocolate"],
    },
    {
      id: uuid.v4(),
      name: "Kenya AA",
      price: 15.99,
      region: "Kenya",
      flavorNotes: ["Citrus", "Floral", "Chocolate"],
    },
    {
      id: uuid.v4(),
      name: "Ethiopia Yirgacheffe",
      price: 15.99,
      region: "Yirgacheffe, Ethiopia",
      flavorNotes: ["Citrus", "Floral", "Chocolate"],
      dials: [],
    },
    {
      id: uuid.v4(),
      name: "Guatemala Antigua",
      price: 15.99,
      region: "Antigua, Guatemala",
      flavorNotes: ["Citrus", "Floral", "Chocolate"],
    },
    {
      id: uuid.v4(),
      name: "Kenya AA",
      price: 15.99,
      region: "Kenya",
      flavorNotes: ["Citrus", "Floral", "Chocolate"],
    },
    {
      id: uuid.v4(),
      name: "Ethiopia Yirgacheffe",
      price: 15.99,
      region: "Yirgacheffe, Ethiopia",
      flavorNotes: ["Citrus", "Floral", "Chocolate"],
      dials: [],
    },
    {
      id: uuid.v4(),
      name: "Guatemala Antigua",
      price: 15.99,
      region: "Antigua, Guatemala",
      flavorNotes: ["Citrus", "Floral", "Chocolate"],
    },
    {
      id: uuid.v4(),
      name: "Kenya AA",
      price: 15.99,
      region: "Kenya",
      flavorNotes: ["Citrus", "Floral", "Chocolate"],
    },
    {
      id: uuid.v4(),
      name: "Ethiopia Yirgacheffe",
      price: 15.99,
      region: "Yirgacheffe, Ethiopia",
      flavorNotes: ["Citrus", "Floral", "Chocolate"],
      dials: [],
    },
    {
      id: uuid.v4(),
      name: "Guatemala Antigua",
      price: 15.99,
      region: "Antigua, Guatemala",
      flavorNotes: ["Citrus", "Floral", "Chocolate"],
    },
    {
      id: uuid.v4(),
      name: "Kenya AA",
      price: 15.99,
      region: "Kenya",
      flavorNotes: ["Citrus", "Floral", "Chocolate"],
    },
  ],
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
    removeCoffee: (state, action: PayloadAction<string>) => {
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
          ...(state.selectedCoffee.dials ? state.selectedCoffee.dials : []),
        ];
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
        console.log("set favorite dial", state.coffeeList[coffeeIndex].dials);
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
  setFavoriteDial,
} = coffeeSlice.actions;
export default coffeeSlice.reducer;
