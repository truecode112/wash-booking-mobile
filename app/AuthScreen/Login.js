import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  StatusBar,
  Platform,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { ifIphoneX } from "react-native-iphone-x-helper";
import CountryPicker from "rn-country-picker";
import * as RNLocalize from "react-native-localize";
import {BASE_URL} from '@env';
import { LOGIN } from "../Endpoints/Endpoints";

const Login = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const lastNameRef = useRef();

  const [loading, setLoading] = useState(false);

  // console.log(countryCode);
  const handleAuth = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    var names = /^[a-zA-Z]+ [a-zA-Z]+$/;

    if (phoneNo === "" || email === "" || fname == "" || lname == "") {
      Alert.alert("", "Phone No. and Email are mandatory.");
    } else if (phoneNo.length < 5 || phoneNo.length > 13) {
      Alert.alert("", "The number must be between 5 and 13");
    } else if (reg.test(email) === false) {
      Alert.alert("", "Please enter valid email.");
    } else {
      setLoading(true);
      try {
        var formdata = new FormData();
        formdata.append("email", email);
        formdata.append("country_code", "+" + countryCode);
        formdata.append("mobile_no", phoneNo);
        formdata.append("first_name", fname);
        formdata.append("last_name", lname);

        console.log(formdata);
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };

        fetch(BASE_URL + LOGIN, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result, "----login");
            const status = result.status;
            const id = result.response.email;
            const phoneno = result.response.mobile_no;
            const otp = result.response.otp;
            const country = result.response.country_code;
            // console.log('country', country)
            // AsyncStorage.setItem('Email', id);
            // AsyncStorage.setItem('phoneNo', phoneno);
            if (status == true) {
              setLoading(false);
              setTimeout(() => {
                navigation.navigate("OTP", {
                  otp: otp,
                  email: email,
                  phoneNo: phoneNo,
                  countryCode: country,
                });

                // Alert.alert(JSON.stringify(otp));
              }, 500);
            } else {
              setLoading(false);
              Alert.alert("Alert", result.message);
            }
          })
          .catch((error) => {
            // console.log('error', error);
            Alert.alert("Alert", error);
            setTimeout(() => {
              setLoading(false);
            }, 100);
          });
      } catch (e) {
        // console.log('--', e);
        Alert.alert("", "Please Enter the Valid Phone Number and Email.");
        setTimeout(() => {
          setLoading(false);
        }, 100);
      }
    }
  };

  const handleRegion = () => {
    const country = require("../config/region.json");
    const region = RNLocalize.getCountry();

    country.map((item, index) => {
      if (item.code.includes(region)) {
        setCountryCode(item.dial_code.substring(1, item.dial_code.length));
      }
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setEmail("");
      setPhoneNo("");
      setCountryCode("1");
      handleRegion();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={styles.maincontainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#00BCD4"
        translucent={true}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.Iconcontainer}>
          <View style={styles.icon}>
            <Image
              style={styles.image1}
              source={require("../../src/assets/text-4.png")}
            />
            <Image
              style={styles.image2}
              source={require("../../src/assets/bubbles-2.png")}
            />
            <Image
              style={styles.image3}
              source={require("../../src/assets/car-1.png")}
            />
            <Image
              style={styles.image4}
              source={require("../../src/assets/text-3.png")}
            />
          </View>
        </View>
        {!loading == false && (
          <View
            style={{
              flex: 1,
              // position:'absolute',
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="large" color="#082B94" />
          </View>
        )}
        <View style={styles.container}>
          {/* <View>
            <Text style={styles.otstext}>Welcome to OTS </Text>
          </View> */}
          <View style={styles.logBox}>
            <View
              style={{
                width: "90%",
                height: 50,
                //backgroundColor:'red',
              }}
            >
              <Text style={styles.heading}>
                Please enter your mobile number{"\n"}and email for verification
                purposes.
              </Text>
            </View>
            <View style={styles.inputView1}>
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 16,
                  paddingHorizontal: 4,
                  paddingVertical: 6,
                  lineHeight: 18,
                }}
              >
                Phone No.
              </Text>
              <View style={styles.inputBox}>
                <View style={styles.inputimage}>
                  {countryCode != "" ? (
                    <CountryPicker
                      disable={false}
                      language="en"
                      hideCountryFlag={false}
                      searchBarStyle={styles.searchBarStyle}
                      selectedValue={(value) => setCountryCode(value)}
                      countryCode={countryCode}
                      hideCountryCode={true}
                    />
                  ) : null}
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    height: 34,
                    borderColor: "#FF6703",
                    // marginTop: 7,
                  }}
                />
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        paddingTop: 17,
                        paddingLeft: 19,
                        fontSize: 14,
                        fontWeight: "500",
                        color: "#FF6703",
                      }}
                    >
                      {"+" + countryCode}
                    </Text>
                    <TextInput
                      style={styles.input1}
                      placeholder="123-123-4444"
                      placeholderTextColor="#FF6703"
                      keyboardType="number-pad"
                      value={phoneNo}
                      // maxLength={}
                      onChangeText={(value) => {
                        setPhoneNo(value);
                      }}
                      onSubmitEditing={() => {
                        lastNameRef.current.focus();
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.inputView2}>
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 16,
                  paddingHorizontal: 4,
                  paddingVertical: 6,
                  lineHeight: 18,
                  fontWeight: 400,
                  paddingTop: -15,
                }}
              >
                Email
              </Text>
              <View style={styles.inputBox}>
                {/* <View style={{width:90}}/> */}
                <TextInput
                  style={styles.input2}
                  placeholder="example@example.com"
                  placeholderTextColor="#FF6703"
                  value={email}
                  onChangeText={(value) => setEmail(value.toLowerCase())}
                  ref={lastNameRef}
                  textAlign="center"
                />
              </View>
            </View>

            <View style={styles.inputView2}>
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 16,
                  paddingHorizontal: 4,
                  paddingVertical: 6,
                  lineHeight: 18,
                  fontWeight: 400,
                  paddingTop: -15,
                }}
              >
                First Name
              </Text>
              <View style={styles.inputBox}>
                {/* <View style={{width:90}}/> */}
                <TextInput
                  style={styles.input2}
                  placeholder="First Name"
                  placeholderTextColor="#FF6703"
                  value={fname}
                  onChangeText={(value) => setFname(value.toLowerCase())}
                  ref={lastNameRef}
                  textAlign="center"
                />
              </View>
            </View>

            <View style={styles.inputView2}>
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 16,
                  paddingHorizontal: 4,
                  paddingVertical: 6,
                  lineHeight: 18,
                  fontWeight: 400,
                  paddingTop: -15,
                }}
              >
                Last Name
              </Text>
              <View style={styles.inputBox}>
                {/* <View style={{width:90}}/> */}
                <TextInput
                  style={styles.input2}
                  placeholder="Last Name"
                  placeholderTextColor="#FF6703"
                  value={lname}
                  onChangeText={(value) => setLname(value.toLowerCase())}
                  ref={lastNameRef}
                  textAlign="center"
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              handleAuth();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* </View> */}
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    width: "100%",
    height: "100%",
  },
  Iconcontainer: {
    width: "100%",
    // height: 300,
    ...ifIphoneX(
      {
        height: 300,
      },
      {
        height: 220,
      }
    ),
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'pink',
  },
  icon: {
    width: "50%",
    height: 200,
    ...ifIphoneX(
      {
        marginTop: 60,
      },
      {
        marginTop: 50,
      }
    ),
  },
  image1: {
    width: 100,
    height: 40,
    alignSelf: "center",
    resizeMode: "contain",
  },
  image2: {
    width: 80,
    height: 40,
    alignSelf: "center",
    resizeMode: "contain",
    marginTop: -25,
  },
  image3: {
    width: 80,
    height: 70,
    alignSelf: "center",
    marginTop: -15,
    resizeMode: "contain",
  },

  image4: {
    width: 80,
    height: 85,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: -26,
  },
  otstext: {
    // width:150,
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0.5,
    textAlign: "center",
    color: "#092B95",
    lineHeight: 50,
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "red",
    alignItems: "center",
  },
  logBox: {
    width: "90%",
    // height: 300,
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "#FF6703",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,

    ...ifIphoneX(
      {
        height: 300,
      },
      {
        height: 510,
      }
    ),
  },
  heading: {
    // justifyContent: 'center',
    fontSize: 17,
    paddingLeft: 8,
    fontWeight: "800",
    color: "white",
    lineHeight: 24,
    // textAlign:"center",
    // letterSpacing:1
  },
  inputView1: {
    height: 80,
    width: "87%",
    // borderWidth: 1,
    alignSelf: "center",
    marginTop: 20,
  },
  country: {},
  inputBox: {
    width: "100%",
    height: 49,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  input1: {
    height: 50,
    width: 180,
    paddingLeft: 10,
    fontSize: 14,
    fontWeight: "500",
    // backgroundColor:'red'
  },
  inputView2: {
    height: 80,
    width: "87%",
    // alignSelf: 'center',
    marginTop: 20,
    textAlign: "center",
  },
  input2: {
    height: 50,
    flex: 1,
    // width: 390,
    fontSize: 16,
    fontWeight: "500",
    // paddingBottom: 5,
    // paddingLeft: 70,
    // paddingRight:60,
    // textAlign:"center"
  },
  button: {
    width: "90%",
    height: 65,
    backgroundColor: "#082B94",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    ...ifIphoneX(
      {
        margin: 20,
      },
      {
        margin: 15,
      }
    ),
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
  },
  inputimage: {
    // marginTop: 10,
    marginLeft: 20,
    marginRight: 10,
  },
  searchBarStyle: {
    height: 20,
    width: 20,
  },
});
