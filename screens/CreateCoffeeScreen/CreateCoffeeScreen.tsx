import { Button, Snackbar, TextInput } from "@react-native-material/core";
import React from "react";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import uuid from "react-native-uuid";
import { navigationNames } from "../../enums";
import { selectCoffeeById } from "../../redux/coffeeStore/coffee.selector";
import { addCoffee, updateCoffee } from "../../redux/coffeeStore/coffee.store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { globalStyles } from "../../styles";

interface CreateCoffeeProps {
  navigation: any;
  route: any;
}

export const CreateCoffeeScreen = ({
  navigation,
  route,
}: CreateCoffeeProps) => {
  const dispatch = useAppDispatch();

  const coffeeToEdit = useAppSelector((state) =>
    selectCoffeeById(state, route.params?.coffeeId || "")
  );
  const editMode = !!coffeeToEdit;

  const [name, setName] = React.useState<string>(coffeeToEdit?.name || "");
  const [region, setRegion] = React.useState<string>(
    coffeeToEdit?.region || ""
  );
  const [flavorNotes, setFlavorNotes] = React.useState<string>(
    coffeeToEdit?.flavorNotes?.join(", ") || ""
  );
  const [snackbarVisible, setSnackbarVisible] = React.useState<boolean>(false);

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
        value={flavorNotes}
        onChange={(event) => {
          const flavorNotes = event.nativeEvent.text;
          setFlavorNotes(flavorNotes);
        }}
      />
      <Button
        title={editMode ? "Update" : "Create"}
        uppercase={false}
        style={{ backgroundColor: globalStyles.secondary.dark.backgroundColor }}
        onPress={(_: GestureResponderEvent) => {
          if (!name) {
            setSnackbarVisible(true);
            return;
          }
          editMode
            ? dispatch(
                updateCoffee({
                  id: coffeeToEdit?.id || "",
                  name,
                  region,
                  flavorNotes: flavorNotes
                    .replace(/([,;])/g, " ")
                    .split(" ")
                    .map((item) => item.trim())
                    .filter((item) => item),
                })
              )
            : dispatch(
                addCoffee({
                  id: uuid.v4(),
                  name,
                  region,
                  flavorNotes: flavorNotes
                    .replace(/([,;])/g, " ")
                    .split(" ")
                    .map((item) => item.trim())
                    .filter((item) => item),
                })
              );
          navigation.navigate(navigationNames.Home);
        }}
      />
      {snackbarVisible && (
        <View style={{ flex: 1 }}>
          <Snackbar
            message="Name must be entered."
            action={
              <Button
                variant="text"
                title="Dismiss"
                color={globalStyles.secondary.light.backgroundColor}
                compact
                onPress={() => setSnackbarVisible(false)}
              />
            }
            style={{ position: "absolute", start: 16, end: 16, bottom: 16 }}
          />
        </View>
      )}
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
