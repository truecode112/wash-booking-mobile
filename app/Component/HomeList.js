import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS } from "../config/Colors";

interface Iprops {
  label: String;
  address: String;
  date: String;
  onPress: () => void;
}

const HomeList = ({ label, address, date, onPress }: Iprops) => {
  return (
    <View style={styles.listView}>
      <View style={{ flex: 1, marginHorizontal: 15 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>{label}</Text>
        <Text style={{ fontSize: 10, marginTop: 5 }}>{address}</Text>
        <Text style={{ fontSize: 10, marginTop: 5 }}>{date}</Text>
      </View>

      <TouchableOpacity
        onPress={onPress}
        style={{ flexDirection: "row", alignItems: "center", marginRight: 15 }}
      >
        <Text style={{ fontSize: 12, color: COLORS.APP_BLUE, marginRight: 10 }}>
          Details
        </Text>
        <Image
          style={{ height: 15, width: 15 }}
          resizeMode="contain"
          source={require("../../src/assets/RightArrow.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeList;

const styles = StyleSheet.create({
  listView: {
    paddingVertical: 10,
    width: "90%",
    alignSelf: "center",
    backgroundColor: COLORS.APP_COLORS,
    marginBottom: 15,
    shadowColor: COLORS.APP_BLACK,
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    borderRadius: 10,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
});
