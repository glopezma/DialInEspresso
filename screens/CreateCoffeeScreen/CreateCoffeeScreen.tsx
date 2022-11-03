import React from "react";
import { View, StyleSheet, GestureResponderEvent } from "react-native";
import { TextInput, Button } from "@react-native-material/core";
import { useAppDispatch } from "../../redux/hooks";
import { addCoffee } from "../../redux/coffeeStore/coffee.store";
import uuid from "react-native-uuid";
import { navigationNames } from "../../enums";

interface CreateCoffeeProps {
  navigation: any;
}

export const CreateCoffeeScreen = ({ navigation }: CreateCoffeeProps) => {
  const dispatch = useAppDispatch();

  const [name, setName] = React.useState<string>("");
  const [region, setRegion] = React.useState<string>("");
  const [flavorProfile, setFlavorProfile] = React.useState<string[]>([]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.fieldItem}
        label="Name"
        variant="standard"
        value={name}
        onChange={(event) => {
          setName(event.nativeEvent.text);
        }}
      />
      <TextInput
        style={styles.fieldItem}
        label="Region"
        variant="standard"
        value={region}
        onChange={(event) => {
          setRegion(event.nativeEvent.text);
        }}
      />
      <TextInput
        style={styles.fieldItem}
        label="Flavor Profile"
        variant="standard"
        value={flavorProfile.join(" ")}
        onChange={(event) => {
          const flavorProfile = event.nativeEvent.text.split(" ");
          setFlavorProfile(flavorProfile);
        }}
      />
      <Button
        title="Create"
        uppercase={false}
        onPress={(_: GestureResponderEvent) => {
          dispatch(
            addCoffee({
              id: uuid.v4(),
              name,
              region: "Test",
              flavorNotes: ["Test"],
              dials: [],
            })
          );
          navigation.navigate(navigationNames.Home);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  fieldItem: {
    marginBottom: 16,
  },
});
