import {
  StyleSheet,
  Text,
  View,
  Modal,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {COLORS} from '../config/Colors';
import {ScrollView} from 'react-native-gesture-handler';
const GoogleSearch = ({visible}) => {
  return (
    <Modal transparent animationType="slide" visible={visible}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: COLORS.APP_COLORS}}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.text}>Hide</Text>
          </TouchableOpacity>
        
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default GoogleSearch;

const styles = StyleSheet.create({
  btn: {
    height: 40,

    backgroundColor: COLORS.APP_ORANGE,
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {fontSize: 17, fontWeight: '700', color: '#fff', marginHorizontal: 10},
});
