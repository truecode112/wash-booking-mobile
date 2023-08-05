import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  // TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {TextInput} from 'react-native-gesture-handler';
import {ApiCall} from '../../src/config/ApiCall';
import {CommonActions, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {COLORS} from '../config/Colors';
import {BASE_URL} from '@env';
import { OTP_VERIFY } from '../Endpoints/Endpoints';


const OTS = ({route, navigation}) => {
  // const route = useRoute();
  const OTP = route.params?.otp;
  const email = route.params?.email;
  const phoneNo = route.params?.phoneNo;
  const countryCode = route.params?.countryCode;
  // console.log('countryCode', countryCode)
  let textInput = useRef(null);
  const lengthInput = 5;
  const [internalval, setInternalval] = useState('');
  const [invalidCode, setInvalidCode] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(59);
  const [disable, setDisable] = useState(false);
  const onChangeText = val => {
    console.log(val);
    setInternalval(val);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDisable(true);
      if (seconds > 0) {
        setSeconds(seconds - 1);
        setDisable(false);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  useEffect(() => {
    Alert.alert(
      'Verification Code',
      `Your one-Time Password(OTP) is: ${route.params?.otp}`,
    );
    // textInput.focus();
  }, []);
  const handleVerify = async () => {
    // const Email = await AsyncStorage.getItem('Email');
    // const phone = await AsyncStorage.getItem('phoneNo');
    if (internalval === '') {
      Alert.alert('Please enter the OTP');
    } else if (internalval.length < 5) {
      Alert.alert('Please enter the 5 digi code');
    } else {
      try {
        console.log(internalval, '---');
        var formdata = new FormData();
        formdata.append('email', email);
        formdata.append('otp', internalval);
        formdata.append('mobile_no', phoneNo);
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow',
        };

        await fetch(
          BASE_URL + OTP_VERIFY,
          requestOptions,
        )
          .then(response => response.json())
          .then(result => {
            const token = result.response;
            const user_id = result.user_id
            console.log("data of user id",user_id)
            AsyncStorage.setItem('Token', token);
            console.log(result);
            if (result.status == true || result.response == null) {
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{name: 'Bottom',user_id:user_id}],
                }),
              );
            } else {
              Alert.alert('Invalid OTP');
            }
          })
          .catch(error => console.log('error', error));
      } catch (e) {
        console.log('--', e);
        Alert.alert('Please Enter Valid OTP.');
      }
    }
  };

  const ResendOTP = async () => {
    setSeconds(59);

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var formdata = new FormData();
    formdata.append('email', email);
    formdata.append('country_code', countryCode);
    formdata.append('mobile_no', phoneNo);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('http://18.190.122.171/public/api/resendOpt', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("otp",result)
        const OTP = result.response.otp;
        Alert.alert(JSON.stringify(OTP));
        console.log(result);
      })
      .catch(error => console.log('error', error));
  };

  return (
    <KeyboardAvoidingView
      style={styles.maincontainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#00BCD4"
        translucent={true}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.Iconcontainer}>
            <View style={styles.icon}>
              <Image
                style={styles.image1}
                source={require('../../src/assets/text-4.png')}
              />
              <Image
                style={styles.image2}
                source={require('../../src/assets/bubbles-2.png')}
              />
              <Image
                style={styles.image3}
                source={require('../../src/assets/car-1.png')}
              />

              <Image
                style={styles.image4}
                source={require('../../src/assets/text-3.png')}
              />
            </View>
          </View>
          <View>
            <Text style={styles.otstext}>Enter Verification Code</Text>
          </View>

          <View style={styles.otsbox}>
            <View>
              <Text style={styles.heading}>
                We have a code 5 digit code on registered number ******1234{' '}
              </Text>
              {/* <TextInput
                ref={input => (textInput = input)}
                onChangeText={onChangeText}
                style={{width: 0, height: 0}}
                value={internalval}
                maxLength={lengthInput}
                returnKeyType="done"
                placeholder="0"
              /> */}

              <OTPInputView
                style={{width: '100%', height: 80, marginTop: 20}}
                pinCount={5}
                editable={true}
                placeholderCharacter="0"
                autoFocusOnLoad={true}
                placeholderTextColor={'black'}
                code={internalval}
                onCodeChanged={onChangeText}
                codeInputFieldStyle={{
                  backgroundColor: COLORS.APP_COLORS,
                  borderRadius: 10,
                  height: 60,
                  width: 60,
                  color: COLORS.APP_BLACK,
                }}
                // codeInputHighlightStyle={styles.underlineStyleHighLighted}
              />

              {/* {Array(lengthInput)
                  .fill()
                  .map((data, index) => (
                    <View key={index} style={styles.input}>
                      <Text
                        onPress={() => textInput.focus()}
                        style={styles.celltext}>
                        {internalval && internalval.length > 0
                          ? internalval[index]
                          : ' '}
                      </Text>
                    </View>
                  ))} */}
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                handleVerify();
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!disable}
              onPress={() => {
                ResendOTP();
              }}
              style={{
                marginTop: 8,
              }}>
              <Text style={styles.resend}>Resend OTP?</Text>
            </TouchableOpacity>
            {seconds > 0 || minutes > 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: '#082B94',
                    fontSize: 12,
                    fontWeight: '500',
                  }}>
                  Time Remaining:-
                </Text>
                <Text
                  style={{
                    color: '#082B94',
                    fontSize: 12,
                  }}>
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </Text>
              </View>
            ) : (
              ''
            )}
          </View>
          {invalidCode && <Text style={styles.error}>Incorrect code.</Text>}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OTS;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    width: '100%',
    height: '100%',
  },
  Iconcontainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    ...ifIphoneX(
      {
        height: 300,
      },
      {
        height: 230,
      },
    ),
  },
  icon: {
    width: '80%',
    height: 200,
    marginTop: 70,
  },
  image1: {
    width: '35%',
    height: 40,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  image2: {
    width: '30%',
    height: 40,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: -25,
  },
  image3: {
    width: '28%',
    height: 70,
    alignSelf: 'center',
    marginTop: -15,
    resizeMode: 'contain',
  },

  image4: {
    width: 80,
    height: 85,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: -25,
  },
  otstext: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0.5,
    textAlign: 'center',
    color: '#092B95',
    marginBottom: 30,
    lineHeight: 33,
    marginTop: -10,
  },
  otsbox: {
    width: '90%',
    height: 170,
    alignSelf: 'center',
  },
  heading: {
    paddingLeft: 20,
    paddingTop: 5,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '400',
  },
  button: {
    width: '85%',
    height: 65,
    backgroundColor: '#082B94',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  input: {
    height: 59,
    width: '17%',
    backgroundColor: '#082B9414',
    borderRadius: 14,
  },
  celltext: {
    fontSize: 19,
    fontWeight: '800',
    paddingLeft: 22,
    paddingTop: 18,
  },
  error: {
    textAlign: 'center',
    color: 'red',
    paddingTop: 10,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  resend: {
    color: '#082B94',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 15,
    letterSpacing: 0.1,
  },
});
