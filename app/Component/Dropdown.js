import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

const Dropdown = ({
  data = [],
  value,
  placeholder = "Select Item",
  onSelect = () => {},
  selectArea = () => {},
  selectMake = () => {},
  selectmodal = () => {},
  width,
  height,
  marginTop,
  marginLeft,
  marginRight,
}) => {
  // console.log('selected value', !!value);
  const [showOption, setShowOption] = useState(false);
  const dropDownRef = React.useRef();

  const onSelectedItem = (val) => {
    // console.log(val);
    setShowOption(false);
    onSelect(val.name);
    selectArea(val.name);
    selectMake(val.name);
    selectmodal(val.name);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setShowOption(!showOption);
        }}
        style={[
          styles.dropdown,
          {
            height: height,
            width: width,
            marginTop: marginTop,
            marginLeft: marginLeft,
            marginRight: marginRight,
            // backgroundColor:'red'
          },
        ]}
      >
        <Text
          numberOfLines={1}
          style={{
            width: "82%",
            marginTop: 20,
            marginLeft: -12,
          }}
        >
          {value}
        </Text>
        <Image
          style={{
            height: 7,
            width: 14,
            marginTop: 25,
            right: 20,
            transform: [
              {
                rotate: showOption ? "180deg" : "0deg",
              },
            ],
          }}
          source={require("../../src/assets/options.png")}
        />
      </TouchableOpacity>
      {showOption && data.length > 0 && (
        <View
          style={[
            styles.optionpicker,
            { width: width, marginLeft: marginLeft },
          ]}
        >
          <ScrollView>
            {data.map((val, index) => {
              return (
                <TouchableOpacity
                  style={{
                    width: 340,
                    height: 21,
                    marginTop: 15,
                    marginLeft: 20,
                    // backgroundColor:'red',
                    marginLeft: 10,
                  }}
                  key={String(index)}
                  onPress={() => {
                    onSelectedItem(val);
                  }}
                >
                  <Text style={styles.textpicker}>{val.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  dropdown: {
    // width: 350,
    // height: 50,
    borderRadius: 7,
    backgroundColor: "#082B9414",
    marginTop: 10,
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  optionpicker: {
    // width: 350,
    height: 120,
    borderRadius: 7,
    backgroundColor: "#082B9414",
    marginTop: 5,
    alignSelf: "center",
    // position:'absolute'
  },
  textpicker: {
    fontSize: 15,
    lineHeight: 21,
    letterSpacing: 0.02,
    fontWeight: "400",
    color: "#222222",
  },
});
