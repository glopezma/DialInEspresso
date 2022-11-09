import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Button, TextInput } from "@react-native-material/core";
import { useFormik } from "formik";
import React from "react";
import {
  GestureResponderEvent,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import uuid from "react-native-uuid";
import * as yup from "yup";
import { navigationNames } from "../../enums";
import {
  addDial,
  Dial,
  updateDial,
} from "../../redux/coffeeStore/coffee.store";
import { useAppDispatch } from "../../redux/hooks";
import { globalStyles } from "../../styles";

interface CreateCoffeeProps {
  navigation: any;
  route?: any;
}

export const CreateDialScreen = ({ navigation, route }: CreateCoffeeProps) => {
  const dispatch = useAppDispatch();

  const dial: Dial | null = route?.params?.dial
    ? { ...route.params.dial }
    : null;

  let validationSchema = yup.object().shape({
    grams: yup.number().required().min(1).label("Grams"),
    grindSize: yup.number().required().min(1).label("Grind Size"),
    time: yup.number().label("Time"),
    yield: yup.number().label("Yield"),
    temperature: yup.number().label("Temperature"),
    favorite: yup.boolean().label("Favorite"),
    notes: yup.string().label("Notes"),
  });

  const formik = useFormik({
    initialValues: {
      grams: dial?.grams || 0,
      grindSize: dial?.grind || 0,
      time: dial?.time || 0,
      yield: dial?.yield || 0,
      temperature: dial?.temperature || 0,
      favorite: dial?.favorite || false,
      notes: dial?.notes || "",
    },
    validationSchema,
    onSubmit: (values) => {
      const id = uuid.v4();
      dial
        ? dispatch(
            updateDial({
              ...values,
              id: dial.id,
              grind: values.grindSize,
            })
          )
        : dispatch(
            addDial({
              ...values,
              id,
              grind: values.grindSize,
            })
          );
      navigation.navigate(navigationNames.ShotsList);
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{ paddingTop: 15, paddingHorizontal: 16 }}
      >
        <View style={styles.fieldGroup}>
          <TextInput
            label="Grams"
            style={styles.doubleFieldItem}
            variant="standard"
            keyboardType="numeric"
            value={formik.values.grams.toString()}
            onChange={(event) => {
              const tempGrams = event.nativeEvent.text;
              formik.setFieldValue("grams", tempGrams);
            }}
          />
          <TextInput
            label="Grind Size"
            style={styles.doubleFieldItem}
            variant="standard"
            keyboardType="numeric"
            value={formik.values.grindSize.toString()}
            onChange={(event) => {
              const tempGrindSize = event.nativeEvent.text;
              formik.setFieldValue("grindSize", tempGrindSize);
            }}
          />
        </View>
        <View style={styles.fieldGroup}>
          <TextInput
            style={styles.doubleFieldItem}
            label="Time"
            variant="standard"
            keyboardType="numeric"
            value={formik.values.time.toString()}
            onChange={(event) => {
              const tempTime = event.nativeEvent.text;
              formik.setFieldValue("time", tempTime);
            }}
          />
          <TextInput
            style={styles.doubleFieldItem}
            label="Yield"
            variant="standard"
            keyboardType="numeric"
            value={formik.values.yield.toString()}
            onChange={(event) => {
              const tempYield = event.nativeEvent.text;
              formik.setFieldValue("yield", tempYield);
            }}
          />
        </View>
        <View style={styles.fieldGroup}>
          <TextInput
            style={styles.doubleFieldItem}
            label="Temperature"
            variant="standard"
            keyboardType="numeric"
            value={formik.values.temperature.toString()}
            onChange={(event) => {
              const tempTemperature = event.nativeEvent.text;
              formik.setFieldValue("temperature", tempTemperature);
            }}
          />
          <Button
            style={{
              ...styles.doubleFieldItem,
              backgroundColor: globalStyles.primary.normal.backgroundColor,
              padding: 8,
            }}
            title="Favorite"
            onPress={(event: GestureResponderEvent) => {
              formik.setFieldValue("favorite", !formik.values.favorite);
            }}
            trailing={(props) =>
              formik.values.favorite ? (
                <AntDesign
                  name={"heart"}
                  size={24}
                  color={globalStyles.secondary.normal.backgroundColor}
                />
              ) : (
                <Ionicons
                  name={"heart-dislike-outline"}
                  size={24}
                  color={globalStyles.secondary.normal.backgroundColor}
                />
              )
            }
          />
        </View>
        <View
          style={{
            ...styles.notesItem,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TextInput
            style={{
              width: "90%",
            }}
            label="Notes"
            variant="outlined"
            value={formik.values.notes}
            multiline={true}
            onChange={(event) => {
              const tempNotes = event.nativeEvent.text;
              formik.setFieldValue("notes", tempNotes);
            }}
          />
        </View>
      </ScrollView>
      <Button
        title={dial ? "Update" : "Create"}
        uppercase={false}
        style={{
          backgroundColor:
            formik.isValid && (dial || formik.dirty)
              ? globalStyles.secondary.dark.backgroundColor
              : "lightgrey",
          padding: 10,
          margin: 16,
        }}
        onPress={(_: GestureResponderEvent) => {
          if (formik.isValid) {
            formik.handleSubmit();
          }
        }}
        disabled={!formik.isValid || (!dial && !formik.dirty)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  fieldGroup: {
    marginBottom: 16,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  doubleFieldItem: {
    width: "40%",
  },
  singleFieldItem: {
    width: "90%",
  },
  notesItem: {
    marginTop: 16,
    marginBottom: 16,
  },
  button: {
    flex: 1,
  },
});
