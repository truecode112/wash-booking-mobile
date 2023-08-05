import {Alert, Image, StyleSheet, Text, Touchable, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PlusIcon from './Component/PlusIcon';
import Icons from './Component/Icons';

const CustomTab = ({state, navigation}) => {
  return (
    <View style={{backgroundColor: '#fff'}}>
      <View style={styles.tabView}>
        <Icons
          left={20}
          source={require('../src/assets/home.png')}
          onPress={() => {
            navigation.navigate(state.routes[0].name);
          }}
        />
        <PlusIcon
          onPress={() => {
            navigation.navigate('Booking');
          }}
        />
        <Icons
          right={20}
          source={require('../src/assets/setting.png')}
          onPress={() => {
            navigation.navigate('Setting');
          }}
        />
      </View>
    </View>
  );
};

export default CustomTab;

const styles = StyleSheet.create({
  tabView: {
    height: 65,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#082B94',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});
