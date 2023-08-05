import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {COLORS} from '../config/Colors';

interface Iprops {
  name: String;
  number: String;
  expiry: String;
  cvv: String;
}
const AtmCard = ({name, number, expiry, cvv}: Iprops) => {
  return (
    <View style={styles.cardImage}>
      <View style={styles.cardView}>
        <Image
          style={{height: '100%', width: '100%'}}
          resizeMode="contain"
          source={require('../../src/assets/card2.png')}
        />
      </View>
      <Image
        style={styles.visaText}
        resizeMode="contain"
        source={require('../../src/assets/visa.png')}
      />
      <View style={{flex: 1, marginLeft: 40, marginTop: 30}}>
        <Text style={styles.nameText}>
          {name == '' ? 'Card Holder Name' : name}
        </Text>
        <Text style={styles.cardNumber}>
          {number == '' ? 'XXXX XXXX XXXX XXXX' : number}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            marginBottom: 20,
          }}>
          <View>
            <Text style={[styles.nameText, {marginTop: -5}]}>
              Valid through
            </Text>
            <Text style={[styles.nameText, {marginTop: 5}]}>
              {expiry == '' ? 'MM/YY' : expiry}
            </Text>
          </View>
          <View style={{marginRight: 40}}>
            <Text style={[styles.nameText]}>CVV</Text>
            <Text style={[styles.nameText, {marginTop: 5}]}>
              {cvv == '' ? 'cvv' : cvv}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AtmCard;

const styles = StyleSheet.create({
  cardImage: {
    ...ifIphoneX(
      {
        width: '90%',
        // height: 231,
      },
      {
        width: '90%',
        height: 190,
      },
    ),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  cardView: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  visaText: {height: 40, width: 80, marginTop: 20, marginLeft: 30},
  nameText: {fontSize: 14, color: COLORS.APP_WHITE, fontWeight: '400'},
  cardNumber: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.APP_WHITE,
    marginTop: 10,
  },
});
