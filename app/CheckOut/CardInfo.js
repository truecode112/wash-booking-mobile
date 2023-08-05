import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  Platform,
  Linking,
} from "react-native";
import React, { useRef, useState } from "react";
import { ifIphoneX } from "react-native-iphone-x-helper";
import AsyncStorage from "@react-native-community/async-storage";
import { useRoute } from "@react-navigation/native";
import moment from "moment";
import AppLoader from "../Component/AppLoader";
import AtmCard from "../Component/AtmCard";
import { COLORS } from "../config/Colors";
import { getTimeZone } from "react-native-localize";
import { StripeProvider } from '@stripe/stripe-react-native';
import Payment from "../Payment/Payment";
import { KEY } from '@env';
import { CardField, useStripe, createToken, confirmPayment, useConfirmPayment } from '@stripe/stripe-react-native';



// import {Secret_key, STRIPE_PUBLISHABLE_KEY} from '../../keys';
const CardInfo = ({ navigation }) => {
  let pay = "pi_3NZYe7SFtXus5FS00LeZoDiT_secret_ETR3OQlpszZRC1gSpWHyc7qpY"

  const route = useRoute();

  console.log("routess", route.params.user_id)
  const amount = route.params?.Total;
  const product = route.params?.product;
  const packages = route.params?.packages;
  const Address = route.params?.Address;
  const type = route.params?.Type;
  const make = route.params?.Make;
  const model = route.params?.Model;
  const area = route.params?.Area;
  const vehicleType = route.params?.VehicleType;
  const bookingTime = route.params?.bookingTime;
  const appointmentTypeID = route.params?.appointmentTypeID;
  const user_id = route.params.user_id;

  // console.log(product, '---->Area')
  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [expire, setExpire] = useState("");
  const [cvv, setCVV] = useState("");
  const [loader, setLoader] = useState(false);
  const HolderName = useRef();
  const expiry = useRef();
  const digit = useRef();
  const button = useRef();

  const [iAgree, setIAgree] = useState(false);
  const [carddetails, setCardDetails] = useState(false);


  const CURRENCY = "USD";
  var CARD_TOKEN = null;

  // const getCreditCardToken = creditCardData => {
  //   const card = {
  //     'card[number]': cardNumber.replace(/ /g, ''),
  //     'card[exp_month]': expire.split('/')[0],
  //     'card[exp_year]': expire.split('/')[1],
  //     'card[cvc]': cvv,
  //   };
  //   return fetch('https://api.stripe.com/v1/tokens', {
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
  //     },
  //     method: 'post',
  //     body: Object.keys(card)
  //       .map(key => key + '=' + card[key])
  //       .join('&'),
  //   })
  //     .then(response => response.json())
  //     .catch(error => console.log(error));
  // };

  // function subscribeUser(creditCardToken) {
  //   return new Promise(resolve => {
  //     console.log('Credit card token\n', creditCardToken);
  //     CARD_TOKEN = creditCardToken.id;
  //     console.log(CARD_TOKEN, '------->');
  //     setTimeout(() => {
  //       resolve({status: true});
  //     }, 1000);
  //   });
  // }

  // const charges = async () => {
  //   const card = {
  //     amount: amount*100,
  //     currency: CURRENCY,
  //     source: CARD_TOKEN,
  //   };

  //   return fetch('https://api.stripe.com/v1/charges', {
  //     headers: {
  //       Accept: 'application/json',

  //       'Content-Type': 'application/x-www-form-urlencoded',

  //       Authorization: `Bearer ${Secret_key}`,
  //     },
  //     method: 'post',
  //     body: Object.keys(card)
  //       .map(key => key + '=' + card[key])
  //       .join('&'),
  //   }).then(response => response.json());
  // };

  const handleSubmit = async () => {
    let reg = /^((?:[A-Za-z]+ ?){1,3})$/;
    if (cardNumber == "") {
      Alert.alert("", "Please enter valid card number.");
    } else if (cardNumber.length < 16) {
      Alert.alert("", "Please Enter 16digit");
    } else if (holderName == "") {
      Alert.alert("", "Please enter card holder name.");
    } else if (reg.test(holderName) === false) {
      Alert.alert("", "Please enter correct name.");
    } else if (expire == "") {
      Alert.alert("", "Please enter the expire date.");
    } else if (cvv == "") {
      Alert.alert("", "Please enter the cvv.");
    } else if (cvv.length < 3) {
      Alert.alert("", "Please Enter 3digit ");
    } else {
      setLoader(true);

      try {
        const Token = await AsyncStorage.getItem("Token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", Token);

        var formdata = new FormData();
        formdata.append("address", Address.toString());
        formdata.append("address_type", type.toString());
        formdata.append("make", make.toString());
        formdata.append("model", model.toString());
        formdata.append("service_area", area.toString());
        formdata.append("vehicle_type", vehicleType.toString());
        formdata.append("ots_package", packages);
        formdata.append("ots_extra", product);
        formdata.append(
          "date",
          moment(new Date(bookingTime)).format("YYYY-MM-DD")
        );
        formdata.append(
          "time",
          moment(new Date(bookingTime)).format("hh:mm A")
        );
        formdata.append("appointmentTypeID", appointmentTypeID);
        formdata.append("datetime", bookingTime);
        formdata.append("timezone", getTimeZone());
        formdata.append("total_price", amount);
        formdata.append("new_total_price", amount);
        formdata.append("card_number", cardNumber);
        formdata.append("card_holder_name", holderName);
        formdata.append("expiry_date", expire);
        formdata.append("cvv", cvv);

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };

        fetch("http://18.190.122.171/public/api/car-details", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.status == true) {
              console.log(result, "purchase");
              setLoader(false);
              navigation.replace("Confirmation");
            } else {
              setLoader(false);
              console.log("result", result);
              if (result.message == "User Not Found") {
                AsyncStorage.removeItem("Token");
                setTimeout(() => {
                  navigation.replace("Login");
                  Alert.alert(
                    "Alert ",
                    "Session Expired You Have to Login Again",
                    [
                      {
                        text: "OK",
                        style: "cancel",
                      },
                    ]
                  );
                }, 100);
              } else {
                Alert.alert("Alert", result.message);
              }
            }
          })
          .catch((error) => {
            console.log("error", error);
            Alert.alert("", "Please Enter the Valid Credit Card.");
          });
      } catch (error) {
        console.log("error", error);
        Alert.alert("", "Please Enter the Valid Credit Card.");
      }

      /////--------------------////////
      // let CardInput ={
      //   cardNumber,
      //   expire,
      //   cvv
      // }
      // let creditCardToken;
      // try {
      //   creditCardToken = await getCreditCardToken(CardInput);
      //   // console.log("creditCardToken", creditCardToken)
      //   if (creditCardToken.error) {
      //     alert('creditCardToken error');
      //     return;
      //   }
      // } catch (e) {
      //   console.log('e', e);
      //   return;
      // }

      // const {error} = await subscribeUser(creditCardToken);
      // if (error) {
      //   alert(error);
      // } else {
      //   let pament_data = await charges();
      //   console.log('pament_data', pament_data);

      //   if (pament_data.status == 'succeeded') {
      //     alert('Payment Successfully');
      //   } else {
      //     alert('Payment failed');
      //   }
      // }
    }
  };

  //  Handling On Card Number Format
  function cc_format(value) {
    const v = value
      .replace(/\s+/g, "")
      .replace(/[^0-9]/gi, "")
      .substr(0, 16);
    const parts = [];

    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substr(i, 4));
    }

    return parts.length > 1 ? parts.join(" ") : value;
  }

  console.log("data of key", KEY)


  const handleAuth = async () => {


    console.log("true", user_id)
    console.log("true", amount)
    // let user = "11"

    try {
      var formdata = new FormData();
      formdata.append("user_id", user_id);
      formdata.append("amount", amount);



      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch('https://otg.applatus.com/public/api/getPaymentIntent', requestOptions)
        .then((response) => response.json())
        .then((result) => {

          // if(result.)
          console.log(result.response.paymentIntent, "----login");

          if (result.response.paymentIntent) {

            const billingDetails = {
              email: 'email@stripe.com',
              phone: '+48888000888',
              addressCity: 'Houston',
              addressCountry: 'US',
              addressLine1: '1459  Circle Drive',
              addressLine2: 'Texas',
              addressPostalCode: '77063',
            };
            const booking = confirmPayment(result.response.paymentIntent, {

              paymentMethodType: 'Card',
              paymentMethodData: {
                billingDetails,
              }
            }).then((result) => {

              console.log("result", result)
              Alert.alert("Result", (result.paymentIntent?.status));
            })
              ;



          }


        })
        .catch((error) => {
          // console.log('error', error);
          Alert.alert("Alert", error);

        });
    } catch (e) {
      console.log('--', e);
      Alert.alert("", "Please Enter the Valid Phone Number and Email.");

    }

  };


  const fetchCardDetails = (cardDetails) => {

    console.log("card details", cardDetails.complete)
    if (cardDetails.complete) {
      setCardDetails(cardDetails)
    } else {
      setCardDetails(null)
    }
  }

  const onDone = async () => {


    const billingDetails = {
      email: 'email@stripe.com',
      phone: '+48888000888',
      addressCity: 'Houston',
      addressCountry: 'US',
      addressLine1: '1459  Circle Drive',
      addressLine2: 'Texas',
      addressPostalCode: '77063',
    };

    const booking = await confirmPayment(pay, {

      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails,
      }
    });

    console.log("booking data", booking)
  }
  return (
    <SafeAreaView style={styles.maincontainer}>
      <KeyboardAvoidingView
        style={styles.maincontainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableOpacity
          style={{
            width: 70,
            height: 50,
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.arrow}
            source={require("../../src/assets/Vector.png")}
          />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.heading}>Payment Method</Text>
          </View>
          <View style={styles.container}>
            <AtmCard
              name={holderName}
              number={cc_format(cardNumber)}
              expiry={expire}
              cvv={cvv}
            />

            <StripeProvider
              publishableKey= "pk_test_51NYqkKSFtXus5FS0NCYg2Mp7LFicpCdVnrSc7GcNconqiKVND6bfJZrTKsOXfibYCKfME4UUZnG6Jk78FHFBW4Q100Injy3ulI"//{KEY}
              merchantIdentifier="merchant.identifier" // required for Apple Pay
              urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
            // throwIfNamespace:false


            >
              {/* <View style={{ width: "100%", height: 300, marginTop: 10 }}>
              <View style={styles.CardView}>
                <Text style={styles.headingtext}>Card Number</Text>
                <View style={styles.CardBox}>
                  <View>
                    <TextInput
                      maxLength={19}
                      placeholder="1234-1234-1234-1234"
                      style={styles.cardInput}
                      value={cc_format(cardNumber)}
                      onChangeText={(val) => {
                        const regxs = /(\d)\s+(?=\d)/g;
                        const str = `${val}`;
                        const subst = `$1`;

                        const result = str.replace(regxs, subst);

                        return setCardNumber(result);
                      }}
                      keyboardType="numeric"
                      onSubmitEditing={() => {
                        HolderName.current.focus();
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.CardView}>
                <Text style={styles.headingtext}>Card Holder Name</Text>
                <View style={styles.CardBox}>
                  <View>
                    <TextInput
                      maxLength={20}
                      placeholder="Name"
                      style={styles.cardInput}
                      value={holderName}
                      onChangeText={(val) => setHolderName(val)}
                      ref={HolderName}
                      onSubmitEditing={() => {
                        expiry.current.focus();
                      }}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "90%",
                  alignSelf: "center",
                }}
              >
                <View style={styles.CardView1}>
                  <Text style={styles.headingtext}>Exp Date</Text>
                  <TouchableOpacity style={styles.CardBox1}>
                    <View>
                      <TextInput
                        placeholder="09/23"
                        style={styles.cardInputExpire}
                        value={expire}
                        ref={expiry}
                        onChangeText={(val) => {
                          const moment = require("moment");
                          let textTemp = val;
                          if (textTemp[0] !== "1" && textTemp[0] !== "0") {
                            textTemp = "";
                          }
                          if (
                            textTemp.length === 2 &&
                            textTemp.length > expire.length
                          ) {
                            if (
                              parseInt(textTemp.substring(0, 2)) > 12 ||
                              parseInt(textTemp.substring(0, 2)) == 0
                            ) {
                              textTemp = textTemp[0];
                            } else if (textTemp.length === 2) {
                              textTemp += "/";
                            } else if (newDate) {
                            }
                          } else if (
                            textTemp.length < expire.length &&
                            expire.endsWith("/")
                          ) {
                            textTemp = textTemp.substring(
                              0,
                              textTemp.length - 1
                            );
                          }
                          if (
                            textTemp.length >= 4 &&
                            textTemp.length > expire.length
                          ) {
                            let dateArr = textTemp.split("/");
                            let year = dateArr[1];
                            if (
                              (year != "1" && year.length == 1) ||
                              parseInt(year) >= parseInt(moment().format("YY"))
                            ) {
                              setExpire(textTemp);
                            }
                          } else {
                            setExpire(textTemp);
                          }
                        }}
                        keyboardType="numeric"
                        onSubmitEditing={() => {
                          digit.current.focus();
                        }}
                        maxLength={5}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.CardView2}>
                  <Text style={styles.headingtext1}>CVV</Text>
                  <View style={styles.CardBox2}>
                    <View>
                      <TextInput
                        placeholder="***"
                        style={styles.cardInputCVV}
                        value={cvv}
                        onChangeText={(val) => setCVV(val)}
                        keyboardType="numeric"
                        ref={digit}
                        maxLength={3}
                        onSubmitEditing={() => {
                          button.current.focus();
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View> */}

              <CardField
                postalCodeEnabled={false}
                placeholders={{
                  number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                  backgroundColor: '#FFFFFF',
                  textColor: '#000000',
                }}
                style={{
                  width: '100%',
                  height: 80,
                  marginVertical: 30,
                }}
                onCardChange={(cardDetails) => {
                  fetchCardDetails(cardDetails)
                  //   console.log('cardDetails', cardDetails);
                }}
                onFocus={(focusedField) => {
                  console.log('focusField', focusedField);
                }}
              />

              {/* <Payment /> */}

            </StripeProvider>
            <View style={{ flexDirection: "row", marginTop: 40 }}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => {
                  setIAgree(!iAgree);
                }}
              >
                {iAgree ? (
                  <Image
                    style={{
                      width: 10,
                      height: 10,
                      resizeMode: "contain",
                    }}
                    source={require("../../src/assets/checkbox.png")}
                  />
                ) : (
                  ""
                )}
              </TouchableOpacity>
              <Text style={{ marginStart: 10 }}>{"I agree to the "}</Text>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    "https://www.onthespotwashers.com/ots-terms-conditions-"
                  );
                }}
              >
                <Text style={styles.term}>Terms & Conditions*</Text>
                <View
                  style={{
                    borderBottomWidth: 0.5,
                    width: "90%",
                    alignSelf: "center",
                    borderBottomColor: "#222222",
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                ref={button}
                // onPress={() => {
                //   if (iAgree) {
                //     handleSubmit();
                //   }
                // }}

                onPress={handleAuth}
                style={[
                  styles.button,
                  !iAgree ? { backgroundColor: "grey" } : {},
                ]}
              >
                <Text style={styles.buttontext}>Book Now!</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.noteView}>
              <Text style={styles.notedown}>
                Note: The card on file will be charged the{"\n"} day of the wash.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <AppLoader loading={loader} />
    </SafeAreaView>
  );
};

export default CardInfo;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: COLORS.APP_COLORS,
    // backgroundColor: '#F5F5F5',
  },
  arrow: {
    width: 21,
    height: 25,
    resizeMode: "contain",
    marginTop: 10,
    marginLeft: 25,
    bottom: 10,
    ...ifIphoneX(
      {
        marginTop: 20,
      },
      {
        marginTop: 30,
      }
    ),
  },
  heading: {
    width: 340,
    height: 40,
    fontSize: 21,
    lineHeight: 30,
    fontWeight: "700",
    color: "#082B94",
    alignSelf: "center",
    marginLeft: 180,
    marginBottom: 10,
  },
  cardImage: {
    // width:560,
    // height:231,
    // width: 350,
    // height: 211,
    ...ifIphoneX(
      {
        width: "90%",
        height: 231,
      },
      {
        width: "90%",
        height: 190,
      }
    ),
    resizeMode: "contain",
    alignSelf: "center",
  },
  CardView: {
    width: "90%",
    height: 85,
    marginTop: 20,
    alignSelf: "center",
  },
  CardBox: {
    height: 56,
    width: "98%",
    backgroundColor: "#082B9414",
    marginTop: 10,
    borderRadius: 7,
    flexDirection: "row",
    shadowOffset: { width: 4, height: 4 },
    shadowColor: "#00000008",
    alignSelf: "center",
  },
  cardInput: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.2,
    fontWeight: "500",
    color: "#222222",
    paddingLeft: 15,
    // paddingTop: ,
    height: 56,
    width: 330,
    // backgroundColor:'red'
  },
  cardInputCVV: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.2,
    fontWeight: "500",
    color: "#222222",
    paddingLeft: 15,

    height: 56,
    width: 160,
    // backgroundColor:'red'
  },
  cardInputExpire: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.2,
    fontWeight: "500",
    color: "#222222",
    paddingLeft: 15,
    // paddingTop: ,
    height: 56,
    width: 160,
    // backgroundColor:'red'
  },
  headingtext: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    color: "#222222",
    letterSpacing: 0.3,
    marginLeft: 10,
  },
  term: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "400",
    color: "#222222",
    letterSpacing: 0.3,
    textAlign: "center",
    // marginLeft: 15,
  },
  CardView1: {
    width: "50%",
    marginTop: 20,
    // marginLeft: 12,
  },
  CardView2: {
    width: "50%",
    height: 85,
    marginTop: 20,
  },
  CardBox1: {
    height: 56,
    width: "95%",
    backgroundColor: "#082B9414",
    marginTop: 10,
    borderRadius: 7,
    flexDirection: "row",
    shadowOffset: { width: 4, height: 4 },
    shadowColor: "#00000008",
  },
  CardBox2: {
    height: 56,
    width: "95%",
    backgroundColor: "#082B9414",
    marginTop: 10,
    borderRadius: 7,
    flexDirection: "row",
    shadowOffset: { width: 4, height: 4 },
    shadowColor: "#00000008",
    alignSelf: "center",
  },
  headingtext1: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    color: "#222222",
    letterSpacing: 0.3,
    marginLeft: 10,
    // marginLeft: -15,
  },
  button: {
    width: "90%",
    alignSelf: "center",
    height: 65,
    backgroundColor: "#082B94",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 5,
  },
  buttontext: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
  },
  notedown: {
    fontWeight: "800",
    fontSize: 17,
    lineHeight: 24,
    color: "#222222",
  },
  noteView: {
    width: "90%",
    marginLeft: 20,
    marginTop: 8,
    // alignSelf: 'center',
  },
  container: {
    // width:'100%',
    // height:'100%',
    // alignItems:"center"
  },
  checkbox: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: "#082B94",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
});
