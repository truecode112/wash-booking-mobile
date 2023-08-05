import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {ifIphoneX} from 'react-native-iphone-x-helper';
const PrivacyPolicy = ({navigation}) => {
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
      <View>
        <Text style={styles.heading}>Privacy Policy</Text>
      </View>
      <View style={{width:'90%',marginTop:20,marginLeft:20}}>
        <Text style={{
             fontSize: 15,
             lineHeight: 25,
             fontWeight: '600',
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
          The difference between a privacy policy and terms and conditions is
          that a privacy policy protects your users' rights, while terms and
          conditions protect your website or app's rights. {'\n'}Privacy policies
          outline how you interact with user data, and terms and conditions
          outline the rules for using your site.
        </Text>
      </View>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  mainContainer: {
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
