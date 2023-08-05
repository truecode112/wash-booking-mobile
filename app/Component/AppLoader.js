import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';

interface Iprops {
  loading: Boolean;
}
const AppLoader = ({loading}: Iprops) => {
  return loading ? (
    <View style={styles.loaderView}>
      <ActivityIndicator size={'large'} color={'blue'} />
    </View>
  ) : null;
};

export default AppLoader;

const styles = StyleSheet.create({
  loaderView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
