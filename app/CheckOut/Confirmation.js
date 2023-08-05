import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { CommonActions, useRoute } from "@react-navigation/native";
import { COLORS } from "../config/Colors";
import Video from "react-native-video";

const Confirmation = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity
        style={{
          width: 70,
          height: 50,
        }}
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "Booking" }],
            })
          );
        }}
      >
        <Image
          style={styles.arrow}
          source={require("../../src/assets/Vector.png")}
        />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.imagecontainer}>
          {/* <Image
            style={styles.Ellipse}
            source={require('../../src/assets/Ellipse.png')}
          />
          <Image
            style={styles.Check}
            source={require('../../src/assets/Check.png')}
          /> */}

          <Video
            style={{ height: "100%", width: "100%" }}
            source={require("../../src/assets/car_wash.mp4")}
            paused={false}
            controls={false}
            resizeMode={"cover"}
            onLoad={(data) => {}}
            onProgress={(data) => {}}
            onEnd={() => {}}
          />
        </View>
        <View>
          <Text style={styles.text1}>Hooray!</Text>
          <Text style={styles.text2}>You've booked with OTS!</Text>
        </View>
        <View>
          <Text style={styles.text3}>
            Now sit back and let the car wash come to you!
          </Text>
          {/* <Text style={styles.text4}>We hope to see you soon!</Text> */}
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{ name: "Booking" }],
                })
              );
            }}
            style={styles.button}
          >
            <Text style={styles.buttontext}>Book Another Wash</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.APP_WHITE,
  },
  arrow: {
    width: 21,
    height: 25,
    resizeMode: "contain",
    marginTop: 25,
    marginLeft: 25,
    bottom: 10,
    ...ifIphoneX(
      {
        marginTop: 25,
      },
      {
        marginTop: 35,
      }
    ),
  },
  container: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  Ellipse: {
    resizeMode: "contain",
    ...ifIphoneX(
      {
        width: "77%",
        height: 170,
        alignSelf: "center",
      },
      {
        width: "78%",
        height: 150,
        alignSelf: "center",
      }
    ),
  },
  imagecontainer: {
    alignSelf: "center",
    height: "35%",
    width: "100%",
  },
  Check: {
    width: "55%",
    height: 110,
    position: "absolute",
    top: 20,
    // left:25,
    resizeMode: "contain",
    alignSelf: "center",
    ...ifIphoneX(
      {
        top: 30,
      },
      {
        top: 21,
        left: 34,
      }
    ),
  },
  text1: {
    fontSize: 32,
    textAlign: "center",
    color: "#FF6703",
    lineHeight: 80,
    fontWeight: 700,
    marginTop: 20,
  },
  text2: {
    fontSize: 20,
    textAlign: "center",
    color: "#FF6703",
    // lineHeight:-10,
    fontWeight: "700",
  },
  text3: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 24,
    color: "#0A2C96",
    marginTop: 30,
    marginHorizontal: 20,
  },
  text4: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 24,
    color: "#0A2C96",
    marginTop: 10,
  },
  button: {
    width: "90%",
    height: 65,
    backgroundColor: "#082B94",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    alignSelf: "center",
  },
  buttontext: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
  },
});
