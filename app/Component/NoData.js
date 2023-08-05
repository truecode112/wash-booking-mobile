import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Logo from './Logo';
import {COLORS} from '../config/Colors';

interface Iprops {
  description: String;
}

const NoData = ({description}: Iprops) => {
  return (
    <View style={styles.container}>
      {/* <Image
        style={{height: 190, width: 257}}
        source={require('../../src/assets/data.jpeg')}
      /> */}
      <Text style={styles.des}>{description}</Text>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  des: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.APP_BLUE,
    lineHeight: 25,
    // marginTop: Dimensions.get('window').height / 14,
    textAlign: 'center',
  },
});
