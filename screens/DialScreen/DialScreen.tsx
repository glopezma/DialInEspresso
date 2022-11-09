import { AntDesign } from "@expo/vector-icons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { IconButton, ListItem } from "@react-native-material/core";
import React from "react";
import {
  FlatList,
  GestureResponderEvent,
  StyleSheet,
  View,
} from "react-native";
import { navigationNames } from "../../enums";
import { selectSelectedCoffee } from "../../redux/coffeeStore/coffee.selector";
import { setFavoriteDial } from "../../redux/coffeeStore/coffee.store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { globalStyles } from "../../styles";

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
                <AntDesign
                  name={favorite ? "heart" : "hearto"}
                  size={24}
                  color={globalStyles.secondary.normal.backgroundColor}
                />
              }
              trailing={(props) => <Icon name="chevron-right" {...props} />}
            />
          );
        }}
      />
      <View style={{ width: 90, height: 90, alignSelf: "flex-end" }}>
        <IconButton
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
          }}
          icon={(props) => <Icon name="plus" {...props} />}
          color="white"
          contentContainerStyle={{
            backgroundColor: globalStyles.secondary.dark.backgroundColor,
          }}
          onPress={(_: GestureResponderEvent) => {
            navigation.navigate(navigationNames.CreateDial);
          }}
        />
      </View>
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
