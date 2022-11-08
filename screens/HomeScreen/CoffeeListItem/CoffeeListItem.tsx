import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ListItem } from "@react-native-material/core";
import React from "react";
import { GestureResponderEvent } from "react-native";
import { Constants, navigationNames } from "../../../enums";
import {
  Coffee,
  setSelectedCoffee,
} from "../../../redux/coffeeStore/coffee.store";
import { setCoffeeId } from "../../../redux/headerButtonsStore/headerButtons.store";
import { useAppDispatch } from "../../../redux/hooks";

interface CoffeeListItemProps {
  coffeeItem: Coffee;
  navigation: any;
  onLongPress?: (id: string | number[]) => void;
}

export const CoffeeListItem = ({
  coffeeItem,
  navigation,
  onLongPress,
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
        dispatch(setCoffeeId(""));
        navigation.navigate(navigationNames.ShotsList);
      }}
      onLongPress={() => onLongPress?.(id)}
      trailing={(props) => <Icon name="chevron-right" {...props} />}
    />
  );
};
