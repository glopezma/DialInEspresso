import { AntDesign } from "@expo/vector-icons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ListItem } from "@react-native-material/core";
import React from "react";
import {
  FlatList,
  GestureResponderEvent,
  StyleSheet,
  View,
} from "react-native";
import { navigationNames } from "../../enums";
import { setFavoriteDial } from "../../redux/coffeeStore/coffee.store";
import { selectSelectedCoffee } from "../../redux/coffeeStore/cofffee.selector";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

interface DialScreenProps {
  navigation: any;
}

export const DialScreen = ({ navigation }: DialScreenProps) => {
  const dispatch = useAppDispatch();
  const coffee = useAppSelector(selectSelectedCoffee);

  return (
    <View style={styles.container}>
      <FlatList
        alwaysBounceVertical={false}
        data={coffee?.dials || []}
        renderItem={(data) => {
          const { grams, grind, id, favorite } = data.item;
          return (
            <ListItem
              title={"Entry 1, stars: 5"}
              secondaryText={`grams:\t${grams}\t\t\tgrind:\t${grind}`}
              onPress={(event: GestureResponderEvent) => {
                console.log("edit", data.item);
                navigation.navigate(navigationNames.CreateDial, {
                  dial: data.item,
                });
              }}
              onLongPress={(event: GestureResponderEvent) => {
                if (coffee?.id) {
                  dispatch(
                    setFavoriteDial({ coffeeId: coffee?.id, dialId: id })
                  );
                }
              }}
              leading={
                <AntDesign name={favorite ? "star" : "staro"} size={24} />
              }
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
