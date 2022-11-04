import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Button, GestureResponderEvent } from "react-native";
import { Provider } from "react-redux";
import { navigationNames } from "./enums";
import { selectSelectedCoffee } from "./redux/coffeeStore/coffee.selector";
import { useAppSelector } from "./redux/hooks";
import { store } from "./redux/store";
import { CreateCoffeeScreen } from "./screens/CreateCoffeeScreen";
import { CreateDialScreen } from "./screens/CreateDialScreen";
import { DialScreen } from "./screens/DialScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { globalStyles } from "./styles";

const Stack = createNativeStackNavigator();

const Root = () => {
  const selectedCoffee = useAppSelector(selectSelectedCoffee);
  const { backgroundColor: primaryBGColor } = globalStyles.primary.normal;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: primaryBGColor,
          },
          headerTitleStyle: {
            color: "#fff",
          },
        }}
      >
        <Stack.Screen
          name={navigationNames.Home}
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "My Coffees",
            headerRight: () => (
              <Button
                title="Create Coffee"
                color="#fff"
                onPress={(_: GestureResponderEvent) => {
                  navigation.navigate(navigationNames.CreateCoffee);
                }}
              />
            ),
          })}
        />
        <Stack.Screen
          name={navigationNames.CreateCoffee}
          component={CreateCoffeeScreen}
          options={({ navigation }) => ({
            title: "Create Coffee",
            headerLeft: () => (
              <Button
                title="Cancel"
                color="#fff"
                onPress={(_: GestureResponderEvent) => {
                  navigation.navigate(navigationNames.Home);
                }}
              />
            ),
          })}
        />
        <Stack.Screen
          name={navigationNames.ShotsList}
          component={DialScreen}
          options={({ navigation }) => ({
            title: selectedCoffee?.name || "Shot",
            headerLeft: () => (
              <Button
                title="Coffee List"
                color="#fff"
                onPress={(_: GestureResponderEvent) => {
                  navigation.navigate(navigationNames.Home);
                }}
              />
            ),
          })}
        />
        <Stack.Screen
          name={navigationNames.CreateDial}
          component={CreateDialScreen}
          options={({ navigation }) => ({
            title: "Create Dial",
            headerLeft: () => (
              <Button
                title="Cancel"
                color="#fff"
                onPress={(_: GestureResponderEvent) => {
                  navigation.navigate(navigationNames.ShotsList);
                }}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

export default App;
