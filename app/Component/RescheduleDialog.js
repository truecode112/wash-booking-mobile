import moment from "moment";
import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Keyboard,
  ScrollView,
} from "react-native";

const RescheduleDialog = ({
  visible,
  onClose,
  checkAvailabilityData,
  preSelectValue,
  onSelectDate,
  onSubmit,
}) => (
  <Modal animationType={"fade"} transparent={true} visible={visible}>
    <TouchableOpacity
      style={styles.main_container}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
    >
      <View style={styles.container}>
        <Text style={{ fontSize: 16 }}>{"Availability"}</Text>
        <View style={styles.inputView}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              {Object.keys(checkAvailabilityData).map((item) => {
                return (
                  <View style={{ paddingHorizontal: 15 }}>
                    {/* <Text style={styles.days}>Next Day</Text> */}
                    <View>
                      <Text
                        style={[
                          styles.weeks,
                          { fontWeight: "bold", fontSize: 14 },
                        ]}
                      >
                        {moment(new Date(item)).format("dddd")}
                      </Text>
                      <Text style={styles.weeks}>
                        {moment(new Date(item)).format("MMMM DD")}
                      </Text>

                      {checkAvailabilityData[item].map((element) => (
                        <Text
                          style={[
                            styles.time,
                            preSelectValue == element.time && {
                              color: "#122D8F",
                              fontWeight: "800",
                            },
                          ]}
                          onPress={() => onSelectDate(element.time)}
                        >
                          {moment(new Date(element.time)).format("hh:mm A")}
                        </Text>
                      ))}
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.text}>{"Submit"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ position: "absolute", right: -5, top: -5 }}
          onPress={onClose}
        >
          <Image
            source={require("../../src/assets/close.png")}
            style={styles.closeIcon}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  </Modal>
);
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: Dimensions.get("window").width - 40,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 5,
  },
  inputView: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    borderColor: "#999",
  },
  button: {
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#082B94",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },

  text: {
    textAlign: "center",
    color: "#ffffff",
  },
  weeks: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.2,
    fontWeight: "500",
    color: "#000000",
    paddingHorizontal: 2,
    textAlign: "center",
  },
  time: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2,
    fontWeight: "400",
    color: "#000000",
    paddingHorizontal: 5,
    paddingVertical: 3,
    alignSelf: "center",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
  },

  icon: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    marginEnd: 10,
  },
  closeIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
});
export default RescheduleDialog;
