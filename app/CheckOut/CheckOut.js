import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Button
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { COLORS } from '../config/Colors'
import moment from 'moment'
import { getTimeZone } from 'react-native-localize'

const CheckOut = ({ navigation }) => {
  const route = useRoute()

  console.log('data of params', route.params.user_id)
  const id = route.params?.total
  const price = route.params?.price
  const product = route.params?.products
  const packages = route.params?.packages
  let Address = route.params?.Address
  let Type = route.params?.Type
  let Make = route.params?.Make
  let Model = route.params?.Model
  let Area = route.params?.Area
  let VehicleType = route.params?.VehicleType
  let appointmentTypeID = route.params?.appointmentTypeID
  let user_id = route.params.user_id

  const [checkAvailabilityData, setCheckAvailabilityData] = useState({})
  const [bookingTime, setBookingTime] = useState('')
  const [loader, setLoader] = useState(false)

  const hanldeCheckOut = async () => {
    if (bookingTime == '') {
      Alert.alert('', 'Please select the availabile time.')
    } else {
      navigation.navigate('CardInfo', {
        Address: Address,
        Type: Type,
        Make: Make,
        Model: Model,
        Area: Area,
        Total: id,
        packages: packages,
        product: product,
        VehicleType: VehicleType,
        bookingTime: bookingTime,
        appointmentTypeID: appointmentTypeID,
        user_id: user_id
      })
    }
  }

  const checkAvailability = () => {
    setLoader(true)

    var formdata = new FormData()
    formdata.append('appointmentTypeID', appointmentTypeID)
    formdata.append('calendarID', '5395401')
    formdata.append('timezone', getTimeZone())

    fetch('https://otg.applatus.com/public/api/availability', {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setCheckAvailabilityData(result)
        setLoader(false)
      })
  }

  useEffect(() => {
    checkAvailability()
  }, [])

  // const
  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity
        style={{
          width: 70,
          height: 50,
          paddingLeft: 25
        }}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.arrow}
          source={require('../../src/assets/Vector.png')}
        />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.heading}>Open Availability</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.dayView}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around'
                }}
              >
                {Object.keys(checkAvailabilityData).map(item => {
                  return (
                    <View style={{ paddingHorizontal: 15 }}>
                      {/* <Text style={styles.days}>Next Day</Text> */}
                      <View>
                        <Text
                          style={[
                            styles.weeks,
                            { fontWeight: 'bold', fontSize: 14 }
                          ]}
                        >
                          {moment(new Date(item)).format('dddd')}
                        </Text>
                        <Text style={styles.weeks}>
                          {moment(new Date(item)).format('MMMM DD')}
                        </Text>

                        {checkAvailabilityData[item].map(element => (
                          <Text
                            style={[
                              styles.time,
                              bookingTime == element.time && {
                                color: '#122D8F',
                                fontWeight: '800'
                              }
                            ]}
                            onPress={() => setBookingTime(element.time)}
                          >
                            {moment(new Date(element.time)).format('hh:mm A')}
                          </Text>
                        ))}
                      </View>
                    </View>
                  )
                })}
              </View>
            </ScrollView>
          </View>

          <View
            style={{
              width: '90%',
              backgroundColor: '#082B9414',
              marginTop: 10,
              padding: 20,
              borderRadius: 7,
              shadowOffset: { width: 4, height: 4 },
              shadowColor: '#00000008',
              alignSelf: 'center'
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                alignSelf: 'flex-start'
              }}
            >
              OTS Package
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '400',
                  color: '#000'
                }}
              >
                {packages}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '400',
                  color: '#000',
                  textTransform: 'capitalize'
                }}
              >
                {'$' + price + '.00'}
              </Text>
            </View>

            {JSON.parse(product).length > 0 && (
              <>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    alignSelf: 'flex-start',
                    marginTop: 8
                  }}
                >
                  OTS Extras
                </Text>

                {JSON.parse(product).map(item => (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '400',
                        color: '#000'
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '400',
                        color: '#000',
                        textTransform: 'capitalize'
                      }}
                    >
                      {'$' + item.price + '.00'}
                    </Text>
                  </View>
                ))}
              </>
            )}
          </View>

          {/* <View style={styles.priceView}>
            <Text style={styles.headingtext}>Total Price</Text>
            <View style={styles.priceBox}>
              <View>
                <Image
                  style={{
                    width: 23.5,
                    height: 22.5,
                    marginTop: 19,
                    marginLeft: 15,
                  }}
                  source={require("../../src/assets/circle.png")}
                />
                <Image
                  style={{
                    position: "absolute",
                    width: 8,
                    height: 13.5,
                    marginTop: 23,
                    marginLeft: 23,
                  }}
                  source={require("../../src/assets/Dollar.png")}
                />
              </View>
              <View>
                <Text style={styles.pricetext}>{id}.00</Text>
              </View>
            </View>
          </View> */}

          <View style={styles.priceView}>
            <Text style={styles.headingtext}>Promo Code</Text>
            <View style={styles.priceBox}>
              <View>
                <Image
                  style={{
                    width: 22.5,
                    height: 22.5,
                    marginTop: 18,
                    marginLeft: 15
                  }}
                  source={require('../../src/assets/Promo.png')}
                />
              </View>
              <View>
                <TextInput style={styles.promocode} placeholder='123ER-12233' />
              </View>
            </View>
          </View>
          <View style={styles.priceView}>
            <Text style={styles.headingtext}>Total Price</Text>
            <View style={styles.priceBox}>
              <View>
                <Image
                  style={{
                    width: 23.5,
                    height: 22.5,
                    marginTop: 19,
                    marginLeft: 15
                  }}
                  source={require('../../src/assets/circle.png')}
                />
                <Image
                  style={{
                    position: 'absolute',
                    width: 7,
                    height: 13.5,
                    marginTop: 23,
                    marginLeft: 23
                  }}
                  source={require('../../src/assets/Dollar.png')}
                />
              </View>
              <View>
                <Text style={styles.pricetext}>{id}.00</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              hanldeCheckOut()
            }}
            style={styles.button}
          >
            <Text style={styles.buttontext}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {loader && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ActivityIndicator size='large' color='#082B94' />
        </View>
      )}
    </SafeAreaView>
  )
}

export default CheckOut

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.APP_COLORS
    // backgroundColor: '#F5F5F5',
  },
  arrow: {
    width: 21,
    height: 25,
    resizeMode: 'contain',
    marginTop: 10,
    bottom: 10,
    ...ifIphoneX(
      {
        marginTop: 25
      },
      {
        marginTop: 30
      }
    )
  },
  heading: {
    height: 40,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '700',
    color: '#122D8F',
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
    ...ifIphoneX(
      {
        fontSize: 22
      },
      {
        fontSize: 20
      }
    )
  },
  container: {
    width: '100%',
    // height: 700,
    //  backgroundColor:'pink',
    alignItems: 'center'
  },
  dayView: {
    width: '90%',
    backgroundColor: '#082B9414',
    borderRadius: 7,
    paddingVertical: 20,
    paddingHorizontal: 10,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: '#00000008',
    alignSelf: 'center'
  },
  days: {
    fontSize: 15,
    lineHeight: 21,
    letterSpacing: 0.02,
    fontWeight: '500',
    color: '#000000'
  },
  weeks: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.2,
    fontWeight: '500',
    color: '#000000',
    paddingHorizontal: 2,
    textAlign: 'center'
  },
  time: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2,
    fontWeight: '400',
    color: '#000000',
    paddingHorizontal: 5,
    paddingVertical: 3,
    alignSelf: 'center',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5
  },
  week1: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.2,
    fontWeight: '400',
    color: '#000000',
    paddingTop: 28,
    paddingHorizontal: 2
  },
  time1: {
    fontSize: 11.5,
    lineHeight: 16,
    letterSpacing: 0.2,
    fontWeight: '400',
    color: '#000000',
    paddingHorizontal: 5,
    paddingTop: 8
  },
  priceView: {
    width: '90%',
    height: 85,
    marginTop: 20
  },
  priceBox: {
    height: 56,
    width: '100%',
    backgroundColor: '#082B9414',
    marginTop: 10,
    borderRadius: 7,
    flexDirection: 'row',
    shadowOffset: { width: 4, height: 4 },
    shadowColor: '#00000008',
    alignSelf: 'center'
  },
  pricetext: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 1,
    marginLeft: 105,
    marginTop: 18
  },
  promocode: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 1,
    alignSelf: 'center',
    marginTop: 15,
    width: '90%',
    marginLeft: 140
  },
  headingtext: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: '#222222',
    letterSpacing: 0.3
  },
  button: {
    width: '90%',
    height: 65,
    backgroundColor: '#082B94',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    marginBottom: 30,
    ...ifIphoneX(
      {
        marginTop: 80
      },
      {
        marginTop: 30
      }
    )
  },
  buttontext: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24
  }
})
