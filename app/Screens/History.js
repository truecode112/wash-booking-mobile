import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

const History = ({navigation}) => {
  const [slectedTab, setSelectedTab] = useState('0');
  const [userData, setUserData] = useState([]);
  const [status, setStatus] = useState(false);
  
  const past = [
    {
      id: '1',
      name: 'Car Wash',
      place: 'London',
      date: '11-apr-2023',
    },
    {
      id: '2',
      name: 'Car Wash',
      place: 'London',
      date: '11-apr-2023',
    },
  ];

  const _getData = async () => {
    var myHeaders = new Headers();
    const Token = await AsyncStorage.getItem('Token');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', Token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('http://18.190.122.171/public/api/get-all-details', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result.response, '---allgetData');
        // console.log(result.response?.address);
        if(result.status == true){
          setUserData(result.response);
          const history = result.status;
          setStatus(history);
        }else{
          if(result.status == false){
            AsyncStorage.removeItem('Token');
            setTimeout(() => {
              navigation.navigate('Login');
              Alert.alert("Alert ", "Session Expired You Have to Login Again", [
                {
                  text: "OK",
                  style: "cancel",
                },
              ])
            }, 100);
          }
        }

      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    _getData();
  }, []);
  const renderItem = ({item, index}) => (
    <View style={styles.itemView}>
      <View
        style={{
          width: 200,
          height: 60,
          // borderWidth:1
        }}>
        <Text style={styles.service}>Car Wash</Text>
        <View style={styles.item2}>
          <Text style={styles.place}>London</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          console.log(item.ots_extra);
          navigation.navigate('Details', {
            data: item,
          });
        }}
        style={styles.button}>
        <Text style={styles.buttondetails}>Details</Text>
        <Image
          style={styles.buttonImage}
          source={require('../../src/assets/RightArrow.png')}
        />
      </TouchableOpacity>
    </View>
  );

  const renderItemPast = ({item}) => (
    <View style={styles.itemView}>
      <View
        style={{
          width: 200,
          height: 60,
          // borderWidth:1
        }}>
        <Text style={styles.service}>Car Wash</Text>
        <View style={styles.item2}>
          <Text style={styles.place}>London</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          console.log(item.ots_extra);
          navigation.navigate('Details', {
            data: item,
          });
        }}
        style={styles.button}>
        <Text style={styles.buttondetails}>Details</Text>
        <Image
          style={styles.buttonImage}
          source={require('../../src/assets/RightArrow.png')}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.maincontainer}>
      <TouchableOpacity
        style={{
          width: 70,
          height: 50,
        }}
        onPress={() => navigation.goBack()}>
        <Image
          style={styles.arrow}
          source={require('../../src/assets/Vector.png')}
        />
      </TouchableOpacity>
      <View style={styles.headingView}>
        <Text style={styles.heading}>History</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.buttonView}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('0');
            }}
            style={{
              width: '45%',
              height: 56,
              backgroundColor: slectedTab == 0 ? '#082B94' : '#EAEAF7',
              borderRadius: 12,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 24,
                fontWeight: '500',
                letterSpacing: 1,
                paddingTop: 14,
                color: slectedTab == 0 ? '#FFFFFF' : '#222222',
                // color: '#222222',
              }}>
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab('1');
            }}
            style={{
              width: '45%',
              height: 56,
              backgroundColor: slectedTab == 1 ? '#082B94' : '#EAEAF7',
              borderRadius: 12,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 24,
                fontWeight: '500',
                letterSpacing: 1,
                paddingTop: 14,
                color: slectedTab == 0 ? '#222222' : '#FFFFFF',
                // color: '#222222',
              }}>
              Past
            </Text>
          </TouchableOpacity>
        </View>
        {slectedTab == 0 ? (
          <View style={{marginTop: 25,flex:1}}>
            <FlatList
              style={{width: '100%',}}
              data={userData}
              renderItem={renderItem}
              keyExtractor={index => index[0]}
            />
          </View>
        ) : (
          <View style={{marginTop: 25}}>
            <FlatList
              style={{width: '100%', height: '100%'}}
              data={past}
              renderItem={renderItemPast}
              keyExtractor={index => index[1]}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default History;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  arrow: {
    width: 21,
    height: 25,
    resizeMode: 'contain',
    marginTop: 25,
    marginLeft: 25,
    bottom: 10,
  },
  heading: {
    fontSize: 21,
    lineHeight: 30,
    fontWeight: '700',
    color: '#0B2B97',
    textAlign: 'center',
    marginLeft: 20,
    marginBottom: 10,
    // backgroundColor: 'red',
  },
  headingView: {
    height: 300,
    height: 50,
  },
  container: {
    height: '100%',
    width: '100%',
  },
  buttontext1: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    letterSpacing: 1,
    color: '#FFFFFF',
    paddingTop: 14,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  item: {
    borderWidth: 1,
    width: 100,
    height: 20,
  },
  itemView: {
    height: 65,
    width: '90%',
    backgroundColor: '#EAE9F5',
    shadowOffset: {width: 6, height: 0},
    shadowColor: '#0000000d',
    shadowOpacity: 30,
    alignSelf: 'center',
    borderRadius: 14,
    marginTop: 15,
    flexDirection: 'row',
  },
  item2: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
    // backgroundColor:"red",
    width: 200,
  },
  service: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '500',
    color: '#222222',
    letterSpacing: 1.3,
    marginTop: 8,
    marginLeft: 15,
    marginBottom: 4,
  },
  place: {
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 15,
    letterSpacing: 0.5,
    marginLeft: 19,
  },
  date: {
    fontSize: 13.5,
    fontWeight: '300',
    lineHeight: 15,
    letterSpacing: 0.5,
    marginLeft: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 100,
    height: 65,
    marginLeft: 40,
  },
  buttonImage: {
    width: 10,
    height: 17,
    resizeMode: 'contain',
    marginTop: 22,
  },
  buttondetails: {
    marginTop: 24,
    fontSize: 14,
    lineHeight: 15,
    letterSpacing: 0.5,
    color: '#082B94',
    fontWeight: '400',
  },
});
