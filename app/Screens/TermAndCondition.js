import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {ifIphoneX} from 'react-native-iphone-x-helper';

const TermAndCondition = ({navigation}) => {
  return (
    <View style={styles.maincontainer}>
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
      {/* <View>
        <Text style={styles.heading}>Terms and Conditions continued:</Text>
      </View> */}
      <View style={{width:'90%',alignSelf:'center',marginTop:20}}>
      <View>
        <Text style={styles.heading}>Terms and Conditions continued:</Text>
      </View>
        <Text style={{
            fontSize: 15,
            lineHeight: 25,
            fontWeight: '500',
            marginTop: 10,
            letterSpacing:0.4,
            ...ifIphoneX(
              {
                fontSize: 16
              },
              {
                fontSize: 15
              },
            ),
        }}>
          You must disclose to us all defects, damage, or weakness in your
          vehicle, known or suspected by you, which may be affected by the
          services prior to our commencing with the cleaning process.{'\n'} We do not
          undertake to insure your vehicle against loss while it is in our
          possession. {'\n'}Insurance of your vehicle is at all times your
          responsibility. {'\n'}Any complaints about our work cannot be considered
          unless reported prior to departing the car park. {'\n'}You will be liable to
          us for any death, injury or damage suffered by us or our staff
          attributable to any defect in your vehicle or any harmful contents.
        </Text>
      </View>
    </View>
  );
};

export default TermAndCondition;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  vectorImage: {
    width: 21,
    height: 20,
    resizeMode: 'contain',
    marginTop: 50,
    marginLeft: 20,
    marginBottom: 20,
    ...ifIphoneX(
      {
        marginTop: 60,
      },
      {
        marginTop: 50,
      },
    ),
  },
  heading: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '700',
    color: '#082B94',
    alignSelf: 'center',
  },
});
