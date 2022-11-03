import { TextInput } from "@react-native-material/core";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

interface CreateCoffeeProps {
  route?: any;
}

export const CreateDialScreen = ({ route }: CreateCoffeeProps) => {
  const [grams, setGrams] = useState<number | string>(0);
  const [grindSize, setGrindSize] = useState<number | string>(0);

  return (
    <View style={styles.container}>
      {route.params && <Text>{JSON.stringify(route.params.dial)}</Text>}
      <TextInput
        style={styles.container}
        label="Grams"
        variant="standard"
        keyboardType="numeric"
        value={grams.toString()}
        onChange={(event) => {
          const tempGrams = event.nativeEvent.text;
          setGrams(tempGrams);
        }}
      />
      <TextInput
        label="Grind Size"
        variant="standard"
        keyboardType="numeric"
        value={grindSize.toString()}
        onChange={(event) => {
          setGrindSize(parseInt(event.nativeEvent.text));
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
});
