import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Linking,
} from 'react-native';
import React from 'react';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-community/async-storage';
import {COLORS} from '../config/Colors';

const Setting = ({navigation}) => {
  const handleLogOut = () => {
    AsyncStorage.removeItem('Token');
    setTimeout(() => {
      navigation.navigate('Login');
    }, 100);
  };
  return (
    <View style={styles.maincontainer}>
      <TouchableOpacity
        style={{
          width: 70,
          height: 30,
          marginLeft: 20,
          // backgroundColor:'red',
          marginTop: 60,
          ...ifIphoneX(
            {
              marginTop: 80,
            },
            {
              marginTop: 40,
            },
          ),
        }}
        onPress={() => navigation.goBack()}>
        <Image
          style={styles.arrow}
          source={require('../../src/assets/Vector.png')}
        />
      </TouchableOpacity>
      <View style={{}}>
        <Text style={styles.heading}>Settings</Text>
      </View>
      <View style={styles.container}>
        <View style={{}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Past');
            }}>
            <Text style={styles.text}>Past Washes</Text>
            <Image
              style={styles.righticon}
              source={require('../../src/assets/Right.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('About');
            }}
            style={[styles.button, {marginTop: 20}]}>
            <Text style={styles.text}>About Us</Text>
            <Image
              style={styles.righticon}
              source={require('../../src/assets/Right.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Contactus');
              
            }}
            style={[styles.button, {marginTop: 20}]}>
            <Text style={styles.text}>Contact Us</Text>
            <Image
              style={styles.righticon}
              source={require('../../src/assets/Right.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{}}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                'https://www.onthespotwashers.com/ots-terms-conditions-',
              );
              // navigation.navigate('Conditions');
            }}
            style={[styles.button, {marginTop: 20}]}>
            <Text style={styles.text}>Terms & Conditions</Text>
            <Image
              style={styles.righticon}
              source={require('../../src/assets/Right.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{}}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                'https://www.freeprivacypolicy.com/live/e6deacdc-4c55-4bab-88a7-abdcc38eca3c',
              );
              // navigation.navigate('Privacy');
            }}
            style={[styles.button, {marginTop: 20}]}>
            <Text style={styles.text}>Privacy Policy</Text>
            <Image
              style={styles.righticon}
              source={require('../../src/assets/Right.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{}}>
          <TouchableOpacity
            onPress={() => handleLogOut()}
            style={{
              height: 60,
              width: '60%',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.APP_ORANGE,
              borderRadius: 10,
              marginVertical: 70,
            }}>
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: COLORS.APP_COLORS,
  },
  arrow: {
    width: 21,
    height: 25,
    resizeMode: 'contain',
    // marginLeft: 25,
    // bottom: 10,
    // ...ifIphoneX(
    //   {
    //     marginTop: 60,
    //   },
    //   {
    //     marginTop: 50,
    //   },
    // ),
  },
  heading: {
    width: 340,
    height: 40,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '700',
    color: '#082B94',
    textAlign: 'center',
    marginLeft: 20,
    marginBottom: 10,
    // marginTop:-30,
    ...ifIphoneX(
      {
        // marginTop:40,
      },
      {
        // marginTop:30,
      },
    ),
    // backgroundColor:'red'
  },
  container: {
    // flex: 1,
    backgroundColor: '#082B94',
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 30,
  },
  text: {
    fontSize: 16.5,
    lineHeight: 24,
    fontWeight: '400',
    color: '#FFFFFF',
    // marginTop: 13,
  },
  button: {
    height: 40,
    // width: 350,
    justifyContent: 'space-between',
    marginTop: 30,
    marginLeft: 20,

    // borderWidth:1,
    flexDirection: 'row',
    // marginBottom: -20,
  },
  righticon: {
    height: 15,
    width: 15,
    marginRight: 20,
    resizeMode: 'contain',
    // marginTop: 20,
  },
  about: {
    height: 55,
    width: 335,
    marginTop: 30,
    marginLeft: 20,
    // borderWidth:1,
    flexDirection: 'row',
    marginBottom: -20,
  },
  righticon1: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    marginLeft: 250,
    marginTop: 20,
  },
  righticon2: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    marginLeft: 235,
    marginTop: 20,
  },
  righticon3: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    marginLeft: 173,
    marginTop: 20,
  },
  righticon4: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    marginLeft: 215,
    marginTop: 20,
  },
});
