import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface Iprops {
  top: Number;
  bottom: Number;
}
const Logo = ({top, bottom}: Iprops) => {
  return (
    <View style={[styles.logoView, {marginTop: top, marginBottom: bottom}]}>
      <Image
        style={{height: 110, width: 110}}
        resizeMode="contain"
        source={require('../../src/assets/logo.png')}
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logoView: {
    // height: 100,
    // width: 100,
    alignSelf: 'center',
  },
});
