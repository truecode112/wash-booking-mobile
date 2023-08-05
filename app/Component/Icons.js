import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const Icons = ({source, onPress, left, right}: Iprops) => {
  return (
    <TouchableOpacity activeOpacity={1}
      style={[styles.iconView, {marginLeft: left, marginRight: right}]}
      onPress={onPress}>
      <Image style={{height: 25, width: 25}} source={source} />
    </TouchableOpacity>
  );
};

export default Icons;

const styles = StyleSheet.create({
  iconView: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
