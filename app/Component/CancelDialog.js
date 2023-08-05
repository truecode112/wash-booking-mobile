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
} from "react-native";

const CancelDialog = ({ visible, onClose, value, onChange, onSubmit }) => (
  <Modal animationType={"fade"} transparent={true} visible={visible}>
    <TouchableOpacity
      style={styles.main_container}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
    >
      <View style={styles.container}>
        <Text style={{ fontSize: 16 }}>{"Message"}</Text>
        <View style={styles.inputView}>
          <TextInput
            importantForAutofill="no"
            placeholder={"Type a message..."}
            placeholderTextColor={"#333"}
            value={value}
            multiline={true}
            style={{ height: 100 }}
            onChangeText={onChange}
          />
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
export default CancelDialog;
