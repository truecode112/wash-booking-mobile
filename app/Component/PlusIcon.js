import { StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";

interface Iprops {
  onPress: () => void;
}
const PlusIcon = ({ onPress }): Iprops => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.plusView}
      activeOpacity={1}
    >
      <Image
        style={{ height: 90, width: 95, resizeMode: "contain" }}
        source={require("../../src/assets/plus.png")}
      />
    </TouchableOpacity>
  );
};

export default PlusIcon;

const styles = StyleSheet.create({
  plusView: {
    height: 80,
    borderRadius: 35,
    marginBottom: 90,
    alignItems: "center",
    justifyContent: "center",
  },
});
