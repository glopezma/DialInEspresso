import React from "react";
import { Button, GestureResponderEvent } from "react-native";
import { navigationNames } from "../../../enums";

interface CreateCoffeeProps {
  navigation: any;
}

export const CreateCoffeeButton = ({ navigation }: CreateCoffeeProps) => (
  <Button
    title="Create Coffee"
    color="#fff"
    onPress={(_: GestureResponderEvent) => {
      navigation.navigate(navigationNames.CreateCoffee);
    }}
  />
);
