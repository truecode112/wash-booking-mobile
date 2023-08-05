import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './AuthScreen/Login';
import OTP from './AuthScreen/OTP';
import Booking from './Booking/Booking';
import Package from './Package/Package';
import OTSExtra from './Package/OTSExtra';
import CheckOut from './CheckOut/CheckOut';
import CardInfo from './CheckOut/CardInfo';
import Confirmation from './CheckOut/Confirmation';
import Setting from './Screens/Setting';
import SplashScreen from './SplashScreen/SplashScreen';
import History from './Screens/History';
import AboutUs from './Screens/AboutUs';
import TermAndCondition from './Screens/TermAndCondition';
import PrivacyPolicy from './Screens/PrivacyPolicy';
import Contactus from './Screens/Contactus';
import Details from './Screens/Details';
import BottomTab from './BottomTab';
import PastWashes from './Screens/PastWashes';
import Payment from './Payment/Payment';
const Mainstack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Payment" component={Payment} />

        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="Booking" component={Booking} />
        <Stack.Screen name="Package" component={Package} />
        <Stack.Screen name="OTSExtra" component={OTSExtra} />
        <Stack.Screen name="CheckOut" component={CheckOut} />
        <Stack.Screen name="CardInfo" component={CardInfo} />
        <Stack.Screen name="Confirmation" component={Confirmation} />
        <Stack.Screen
          name="Bottom"
          component={BottomTab}
          // options={{animationDuration: 1000, animation: 'fade'}}
        />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="About" component={AboutUs} />
        <Stack.Screen name="Conditions" component={TermAndCondition} />
        <Stack.Screen name="Privacy" component={PrivacyPolicy} />
        <Stack.Screen name="Past" component={PastWashes} />
        <Stack.Screen name="Contactus" component={Contactus} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Mainstack;
