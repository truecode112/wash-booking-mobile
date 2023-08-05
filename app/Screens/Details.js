import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ifIphoneX } from "react-native-iphone-x-helper";
import AsyncStorage from "@react-native-community/async-storage";
import { CommonActions, useRoute } from "@react-navigation/native";
import { COLORS } from "../config/Colors";
import moment from "moment";
import CancelDialog from "../Component/CancelDialog";
import AppLoader from "../Component/AppLoader";
import { getTimeZone } from "react-native-localize";
import RescheduleDialog from "../Component/RescheduleDialog";

const Details = ({ navigation }) => {
  const route = useRoute();
  const data = route.params?.data;

  const [message, setMessage] = useState("Cancle");
  const [showCancleDialog, setShowCancleDialog] = useState(false);
  const [loader, setLoader] = useState(false);

  const [checkAvailabilityData, setCheckAvailabilityData] = useState({});
  const [bookingTime, setBookingTime] = useState("");
  const [showRescheduleDialogDialog, setShowRescheduleDialogDialog] =
    useState(false);

  const checkAvailability = () => {
    if (Object.keys(checkAvailabilityData).length > 0) {
      setShowRescheduleDialogDialog(true);
    } else {
      setLoader(true);

      var formdata = new FormData();
      formdata.append("appointmentTypeID", data.appointmentTypeID);
      formdata.append("calendarID", "5395401");
      formdata.append("timezone", getTimeZone());

      fetch("http://18.190.122.171/public/api/availability", {
        method: "POST",
        body: formdata,
        redirect: "follow",
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setCheckAvailabilityData(result);
          setLoader(false);
          setShowRescheduleDialogDialog(true);
        })
        .catch((err) => {
          setLoader(false);
          Alert.alert("Error :", err);
        });
    }
  };

  const onCancleSubmit = async () => {
    if (message != "") {
      setShowCancleDialog(false);
      setLoader(true);

      const Token = await AsyncStorage.getItem("Token");
      var myHeaders = new Headers();
      myHeaders.append("Authorization", Token);

      var formdata = new FormData();
      formdata.append("reason", message);
      formdata.append("clientBookingId", data.clientBookingId);

      fetch("http://18.190.122.171/public/api/booking-cancel", {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      })
        .then((response) => response.json())
        .then((result) => {
          setLoader(false);
          if (result.status) {
            setMessage("");
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{ name: "Bottom" }],
              })
            );
          }
          Alert.alert("Alert", result.message);
        })
        .catch((err) => {
          setLoader(false);
          Alert.alert("Error :", err);
        });
    }
  };

  const onRescheduleSubmit = async () => {
    if (bookingTime != "") {
      setShowRescheduleDialogDialog(false);
      setLoader(true);

      const Token = await AsyncStorage.getItem("Token");
      var myHeaders = new Headers();
      myHeaders.append("Authorization", Token);

      var formdata = new FormData();
      formdata.append(
        "date",
        moment(new Date(bookingTime)).format("YYYY-MM-DD")
      );
      formdata.append("time", moment(new Date(bookingTime)).format("hh:mm A"));
      formdata.append("datetime", bookingTime);
      formdata.append("timezone", getTimeZone());
      formdata.append("clientBookingId", data.clientBookingId);

      fetch("http://18.190.122.171/public/api/booking-reschedule", {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setLoader(false);
          if (result.status) {
            setBookingTime("");
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{ name: "Bottom" }],
              })
            );
          }
          Alert.alert("Alert", result.message);
        })
        .catch((err) => {
          setLoader(false);
          Alert.alert("Error :", err);
        });
    }
  };

  const changePhoneFormat = (phone) => {
    if (phone.length <= 3) {
      return `${phone}`;
    } else if (phone.length > 3 && phone.length <= 6) {
      match = phone.match(/(\d{3})(\d{1,3})$/);
      if (match) {
        return `${match[1]}-${match[2]}`;
      }
    } else if (phone.length > 6 && phone.length <= 10) {
      match = phone.match(/(\d{3})(\d{3})(\d{1,4})$/);
      if (match) {
        return `${match[1]}-${match[2]}-${match[3]}`;
      }
    } else if (phone.length > 10) {
      match = phone.match(/(\d{3})(\d{3})(\d{3})(\d{1,4})$/);
      if (match) {
        return `${match[1]}-${match[2]}-${match[3]}-${match[4]}`;
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{
            marginTop: 30,
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.arrow}
            source={require("../../src/assets/Vector.png")}
          />
        </TouchableOpacity>
        <View style={styles.maincontainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.icon, { alignSelf: "center" }]}>
              <Image
                style={styles.image1}
                source={require("../../src/assets/logo.png")}
              />
            </View>
            <View style={styles.container}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "800",
                  color: "#0B2B97",
                  alignSelf: "center",
                  textTransform: "uppercase",
                }}
              >
                User details
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                >
                  Email :
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                    lineHeight: 20,
                    letterSpacing: 0.6,
                  }}
                >
                  {data.email}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                >
                  Phone Number :
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                >
                  {changePhoneFormat(data.mobile_no)}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "800",
                  color: "#0B2B97",
                  textTransform: "uppercase",
                  alignSelf: "center",
                  marginTop: 18,
                }}
              >
                Car details
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                >
                  Address :
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                    textAlign: "right",
                    width: 200,
                    // textTransform: "capitalize",
                  }}
                >
                  {data.address.toUpperCase()}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                >
                  Location Type :
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                >
                  {data.address_type}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                >
                  Make :
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                >
                  {data.make}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                >
                  Model :
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  {data.model}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                >
                  Service Area :
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                >
                  {data.service_area}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "800",
                  color: "#0B2B97",
                  alignSelf: "center",
                  textTransform: "uppercase",
                  marginTop: 15,
                }}
              >
                Packages
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  OTS Package :
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                >
                  {data.ots_package}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  OTS Extras :
                </Text>

                <Text
                  style={{
                    fontSize: 14,
                    width: 200,
                    textAlign: "right",
                    fontWeight: "600",
                    color: "#000",
                    // textTransform: "capitalize",
                  }}
                >
                  {data.ots_extra.length > 0
                    ? data.ots_extra?.map((item) => item.name).join("\n")
                    : "NA"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  Booking Date :
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  {moment(data.date).format("MMMM DD, YYYY")}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  Booking Time :
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  {data.time}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  Total Price :
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  ${data.total_price}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "800",
                  color: "#0B2B97",
                  textTransform: "uppercase",
                  alignSelf: "center",
                  marginTop: 15,
                }}
              >
                card Details
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  Card Holder Name :
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                >
                  {data.card_holder_name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  Card Number :
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  {data.card_number}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
                  Expiration Date :
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#000",
                    marginLeft: 8,
                    textTransform: "capitalize",
                  }}
                >
                  {data.expiry_date}
                </Text>
              </View>

              {route.params?.screenType == "home" && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <TouchableOpacity
                    style={styles.btn1}
                    onPress={() => {
                      Alert.alert(
                        "Message",
                        "Are you sure you want to cancel?",
                        [
                          {
                            text: "Don't Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                          },
                          {
                            text: "Yes Cancel",
                            onPress: () => onCancleSubmit(),
                            // setShowCancleDialog(true),
                          },
                        ]
                      );
                    }}
                  >
                    <Text style={styles.btn1Text}>{"Cancel"}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btn2}
                    onPress={checkAvailability}
                  >
                    <Text style={styles.btn2Text}>{"Rescheduled"}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
      <CancelDialog
        value={message}
        onChange={(value) => setMessage(value)}
        visible={showCancleDialog}
        onClose={() => {
          setMessage("");
          setShowCancleDialog(false);
        }}
        onSubmit={onCancleSubmit}
      />

      <RescheduleDialog
        checkAvailabilityData={checkAvailabilityData}
        preSelectValue={bookingTime}
        onSelectDate={(value) => setBookingTime(value)}
        visible={showRescheduleDialogDialog}
        onClose={() => {
          setBookingTime("");
          setShowRescheduleDialogDialog(false);
        }}
        onSubmit={onRescheduleSubmit}
      />
      <AppLoader loading={loader} />
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  arrow: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    marginTop: 0,
    marginLeft: 25,
    bottom: 8,
    // backgroundColor:"red",
  },
  heading: {
    fontSize: 21,
    lineHeight: 30,
    fontWeight: "600",
    color: "#0B2B97",
    textAlign: "center",
    // marginLeft: 10,
    marginBottom: 10,
    // backgroundColor: 'red',
  },
  container: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: COLORS.APP_COLORS,
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  Iconcontainer: {
    width: "100%",
    // marginTop:30,
    // height: 300,
    ...ifIphoneX(
      {
        height: 120,
      },
      {
        height: 120,
      }
    ),
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'pink',
  },
  icon: {
    width: 120,
    height: 120,
    // backgroundColor:'red'
  },
  image1: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    resizeMode: "contain",
  },
  image2: {
    width: 70,
    height: 30,
    alignSelf: "center",
    resizeMode: "contain",
    marginTop: -20,
  },
  image3: {
    width: 70,
    height: 60,
    alignSelf: "center",
    marginTop: -13,
    resizeMode: "contain",
  },

  image4: {
    width: 70,
    height: 75,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: -25,
  },
  btn1: {
    borderRadius: 10,
    backgroundColor: "#0B2B97",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 35,
    marginEnd: 25,
  },
  btn2: {
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#0B2B97",
    marginTop: 35,
    marginStart: 25,
  },
  btn1Text: {
    color: "#fff",
    fontSize: 16,
  },
  btn2Text: {
    color: "#0B2B97",
    fontSize: 16,
  },
  //   DetailsContainer: {
  //     width: '100%',
  //     height: '100%',
  //     backgroundColor: 'red',
  //   },
});
