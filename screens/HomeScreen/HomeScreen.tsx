import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { selectCoffeeList } from "../../redux/coffeeStore/coffee.selector";
import { useAppSelector } from "../../redux/hooks";
import { CoffeeListItem } from "./CoffeeListItem";

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const coffeeList = useAppSelector(selectCoffeeList);

  return (
    <View style={styles.container}>
      <FlatList
        alwaysBounceVertical={false}
        data={coffeeList}
        renderItem={(data) => (
          <CoffeeListItem coffeeItem={data.item} navigation={navigation} />
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
