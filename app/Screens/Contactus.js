import {
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {COLORS} from '../config/Colors';

const Contactus = ({navigation}) => {
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
        <Text style={styles.heading}>Contact Us</Text>
      </View>
      <View style={{width: '100%', marginTop: 40}}>
        <View
          style={{
            height: 150,
            width: '90%',
            alignSelf: 'center',
            borderRadius: 20,
            overflow: 'hidden',
          }}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('tel:9738513361');
            }}
            style={{
              height: 60,
              width: '90%',
              alignItems: 'center',
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              backgroundColor: COLORS.APP_BLUE,
            }}>
            <Image
              style={{height: 20, width: 20, tintColor: '#fff'}}
              source={require('../../src/assets/phone.png')}
            />
            <Text
              style={{
                fontSize: 20,
                color: '#fff',
                marginLeft: 20,
                fontWeight: '700',
              }}>
              Call Us
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                'mailto:info@onthespotwashers.com?subject=&body=',
              );
            }}
            style={{
              height: 60,
              width: '90%',
              alignItems: 'center',
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              backgroundColor: COLORS.APP_BLUE,
              marginTop: 20,
            }}>
            <Image
              style={{height: 25, width: 25, tintColor: '#fff'}}
              source={require('../../src/assets/email.png')}
            />
            <Text
              style={{
                fontSize: 20,
                color: '#fff',
                marginLeft: 20,
                fontWeight: '700',
              }}>
              Email
            </Text>
          </TouchableOpacity>
        </View>
        {/* <Button
          onPress={() =>
            Linking.openURL(
              'mailto:Admine@example.com?subject=SendMail&body=Description',
            )
          }
          title="support@example.com"
        /> */}
      </View>
    </View>
  );
};

export default Contactus;

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
  },
  heading: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '700',
    color: '#082B94',
    alignSelf: 'center',
  },
});
