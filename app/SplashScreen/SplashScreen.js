import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    setTimeout(() => {
      handleGetToken();
    }, 3000);
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
    
  }, [fadeAnim]);

  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem('Token');
    if (!dataToken) {
      navigation.replace('Login');
    } else {
      navigation.replace('Bottom');
    }
  };

  // setTimeout(()=>{
  //   navigation.nav('Login')
  // },1800)
  return (
    <View style={styles.maincontiner}>
      <ImageBackground
        source={require('../../src/assets/Splash.png')}
        resizeMode="cover"
        style={styles.image}>
        <Animated.View // Special animatable View
          style={{
            // width: 150,
            height: 150,
            alignItems:"center",
            opacity: fadeAnim, // Bind opacity to animated value
          }}>
          <Image
            source={require('../../src/assets/logo.png')}
            resizeMode={'contain'}
            style={styles.logo}
          />
           <Text style={styles.text}>Bringing The Car Wash To You</Text>
        </Animated.View>

       
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  maincontiner: {
    flex: 1,

    // backgroundColor:'red'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  text: {
    // height:60,
    // width:260,
    color: '#092B95',
    fontSize: 19,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 30,
    marginTop: 20,
  },
});
