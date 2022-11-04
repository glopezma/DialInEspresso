import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ListItem } from "@react-native-material/core";
import React from "react";
import { GestureResponderEvent } from "react-native";
import { Constants, navigationNames } from "../../../enums";
import {
  Coffee,
  setSelectedCoffee,
} from "../../../redux/coffeeStore/coffee.store";
import { useAppDispatch } from "../../../redux/hooks";

interface CoffeeListItemProps {
  coffeeItem: Coffee;
  navigation: any;
}

export const CoffeeListItem = ({
  coffeeItem,
  navigation,
}: CoffeeListItemProps) => {
  const dispatch = useAppDispatch();
  const { id, name, flavorNotes, region, dials } = coffeeItem;
  const favoriteDial = dials?.find((dial) => dial.favorite) || null;
  const flavorNotesString = flavorNotes?.join(", ");
  const showDash = flavorNotesString && region ? " - " : "";
  const subtitleNewline = flavorNotesString || region;

  return (
    <ListItem
      title={name}
      secondaryText={`${region || ""}${showDash}${flavorNotesString || ""}${
        subtitleNewline ? "\r\n" : ""
      }grams:\t${
        favoriteDial ? favoriteDial.grams : Constants.NA
      }\t\t\tgrind:\t${favoriteDial ? favoriteDial.grind : Constants.NA}`}
      onPress={(_: GestureResponderEvent) => {
        dispatch(setSelectedCoffee(id));
        navigation.navigate(navigationNames.ShotsList);
      }}
      onLongPress={(_: GestureResponderEvent) => {
        navigation.navigate(navigationNames.CreateCoffee, {
          coffeeId: id,
        });
      }}
      trailing={(props) => <Icon name="chevron-right" {...props} />}
    />
  );
};
