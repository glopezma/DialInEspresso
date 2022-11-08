import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { IconButton } from "@react-native-material/core";
import React from "react";
import { View } from "react-native";
import { globalStyles } from "../../../styles";

interface CreateCoffeeProps {
  deleteAction?: () => void;
  editAction?: () => void;
}

export const EditCoffeeButtons = ({
  deleteAction,
  editAction,
}: CreateCoffeeProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <IconButton
        icon={(props) => (
          <Icon
            name="delete"
            {...props}
            color={globalStyles.primary.normal.textColor}
          />
        )}
        onPress={() => {
          deleteAction?.();
        }}
      />
      <IconButton
        icon={(props) => (
          <Icon
            name="pencil"
            {...props}
            color={globalStyles.primary.normal.textColor}
          />
        )}
        onPress={() => {
          editAction?.();
        }}
      />
    </View>
  );
};
