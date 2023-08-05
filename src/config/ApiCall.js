import AsyncStorage from '@react-native-community/async-storage';
import {Platform} from 'react-native';

export const ApiCall = async (parms, method, callback) => {
  const authToken = await AsyncStorage.getItem('authToken');
  console.log(parms);
  var methodss = 'http://18.190.122.171/public/api/';
  fetch(methodss, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization: authToken,
    },
    body: parms,
  })
    .then(response => response.json())
    .then(responseJson => {
      callback({data: responseJson});
    })
    .catch(error => {
      callback({data: error});
    });
};
