import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Button, GestureResponderEvent } from "react-native";
import { Provider } from "react-redux";
import { navigationNames } from "./enums";
import { selectSelectedCoffee } from "./redux/coffeeStore/cofffee.selector";
import { useAppSelector } from "./redux/hooks";
import { store } from "./redux/store";
import { CreateCoffeeScreen } from "./screens/CreateCoffeeScreen";
import { CreateDialScreen } from "./screens/CreateDialScreen";
import { DialScreen } from "./screens/DialScreen";
import { HomeScreen } from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

const Root = () => {
  const selectedCoffee = useAppSelector(selectSelectedCoffee);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={navigationNames.Home}
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "My Coffees",
            headerRight: () => (
              <Button
                title="Create Coffee"
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
          options={{
            title: "Create Coffee",
          }}
        />
        <Stack.Screen
          name={navigationNames.DialInCoffee}
          component={DialScreen}
          options={({ navigation }) => ({
            title: selectedCoffee?.name || "Dial In",
            headerRight: () => (
              <Button
                title="Dial In"
                onPress={(_: GestureResponderEvent) => {
                  navigation.navigate(navigationNames.CreateDial);
                }}
              />
            ),
          })}
        />
        <Stack.Screen
          name={navigationNames.CreateDial}
          component={CreateDialScreen}
          options={{
            title: "Create Dial",
          }}
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
