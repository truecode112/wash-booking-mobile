import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Screens/Home';
import Setting from './Screens/Setting';
import Booking from './Booking/Booking';
import CustomTab from './CustomTab';

const Tab = createBottomTabNavigator();

export default function BottomTab({route}) {
  const data = route.user_id
  console.log("data of",route.user_id)
  
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomTab {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{freezeOnBlur: true}} />
      <Tab.Screen name="Booking" component={Booking}  initialParams={{user_id: data}}/>
      <Tab.Screen name="Settings" component={Setting} />
    </Tab.Navigator>
  );
}
