import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ListItem } from "@react-native-material/core";
import React from "react";
import {
  FlatList,
  GestureResponderEvent,
  StyleSheet,
  View,
} from "react-native";
import { Constants, navigationNames } from "../../enums";
import { setSelectedCoffee } from "../../redux/coffeeStore/coffee.store";
import { selectCoffeeList } from "../../redux/coffeeStore/cofffee.selector";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const dispatch = useAppDispatch();
  const coffeeList = useAppSelector(selectCoffeeList);

  return (
    <View style={styles.container}>
      <FlatList
        alwaysBounceVertical={false}
        data={coffeeList}
        renderItem={(data) => {
          const { name, flavorNotes, region, dials } = data.item;
          const favoriteDial = dials?.find((dial) => dial.favorite) || null;
          return (
            <ListItem
              title={name}
              secondaryText={`${region} - ${flavorNotes?.join(
                ", "
              )}\r\ngrams:\t${
                favoriteDial ? favoriteDial.grams : Constants.NA
              }\t\t\tgrind:\t${
                favoriteDial ? favoriteDial.grind : Constants.NA
              }`}
              onPress={(_: GestureResponderEvent) => {
                const { id: coffeeId } = data.item;
                dispatch(setSelectedCoffee(coffeeId));
                navigation.navigate(navigationNames.DialInCoffee);
              }}
              onLongPress={(_) => {
                console.log("edit", data.item);
              }}
              trailing={(props) => <Icon name="chevron-right" {...props} />}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 15,
  },
});
