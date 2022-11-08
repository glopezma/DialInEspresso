import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { selectCoffeeList } from "../../redux/coffeeStore/coffee.selector";
import { setCoffeeId } from "../../redux/headerButtonsStore/headerButtons.store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { CoffeeListItem } from "./CoffeeListItem";

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const dispatch = useAppDispatch();
  const coffeeList = useAppSelector(selectCoffeeList);

  const updateHomeHeader = (id: string | number[]) => {
    dispatch(setCoffeeId(id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        alwaysBounceVertical={false}
        data={coffeeList}
        renderItem={(data) => (
          <CoffeeListItem
            coffeeItem={data.item}
            navigation={navigation}
            onLongPress={updateHomeHeader}
          />
        )}
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
