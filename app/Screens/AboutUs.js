import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {ifIphoneX} from 'react-native-iphone-x-helper';

const AboutUs = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <TouchableOpacity
          style={{
            width: 70,
            height: 80,
          }}
          onPress={() => navigation.goBack()}>
          <Image
            style={styles.vectorImage}
            source={require('../../src/assets/Vector.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={{width: '90%', marginTop: 20, alignSelf: 'center'}}>
        <Text style={styles.heading}>Customer Oriented Service:</Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', marginTop: 30}}>
        <View style={{width: '90%'}}>
          <Text
            style={{
              // fontSize: 18,
              // lineHeight: 25,
              fontWeight: '500',
              // marginTop: 10,
              letterSpacing: 1,
              textAlign:"justify",
              ...ifIphoneX(
                {
                  letterSpacing: 1,
                  lineHeight: 25,
                  fontSize: 18,
                },
                {
                  lineHeight: 25,
                  lineHeight: 25,
                  fontSize: 17,
                  // letterSpacing:1,
                },
              ),
              // textAlign:"center"
            }}>
            On The Spot: Premium Car Washers has revolutionized the car washing
            industry by eliminating the hassle traveling to your average car
            wash. Since 2021, we have changed the game of convenience by
            bringing the entire wash to you! Our team of certified detailers
            carry all the neceessary equipment to transform your car from
            whereever you are. Booking on our app or website only takes a couple
            minutes. Once you've finished booking, you can rest assured that we
            handle the rest. Never drive to a car wash again, On The Spot:
            Premium Car Washers has you covered.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '700',
    color: '#082B94',
    alignSelf: 'center',
  },
  vectorImage: {
    width: 21,
    height: 20,
    resizeMode: 'contain',
    marginTop: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
});
