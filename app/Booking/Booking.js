import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
  StatusBar,
  Platform,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { ifIphoneX } from "react-native-iphone-x-helper";
import Dropdown from "../Component/Dropdown";
import MapView, { MapMarker } from "react-native-maps";
import AsyncStorage from "@react-native-community/async-storage";
import Geolocation from "@react-native-community/geolocation";
import { CommonActions } from "@react-navigation/native";
import { COLORS } from "../config/Colors";
import {BASE_URL} from '@env';

// import GoogleSearch from "../Component/GoogleSearch";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const Booking = ({ navigation, setShowOption, route}) => {
const {user_id} = route.params

  console.log("routes>>>>",user_id)

  console.log("gdddtdty",BASE_URL);
  const [addressType, setAddressType] = useState("Select Address");
  const [serviceArea, setServiceArea] = useState("Select Area");
  const [vehicleType, setVehicleType] = useState("Select Vehicle Type");
  const [address, setAddress] = useState("");
  const [make, setMake] = useState("Select Item");
  const [modal, setModal] = useState("Select Item");
//   const [loader, setLoader] = useState(false);
  const [currentLongitude, setCurrentLongitude] = useState("...");
  const [currentLatitude, setCurrentLatitude] = useState("...");
  const [longitudeDelta, setLongnitudeDelta] = useState("");
  const [latitudeDelta, setLatitudeDelta] = useState("");
  // const [refreshing, setRefreshing] = useState(false);
//   const [toogle, setToogle] = useState(false);
  const [modelMake, setModelMake] = useState({});
  const [makecar, setMakecar] = useState([]);
  const [modalname, setModalname] = useState([]);

  const mapRef = useRef();
  const onSelect = (item) => {
    setAddressType(item);
    // console.log(item);
  };
  const selectArea = (item) => {
    setServiceArea(item);
  };
  const selectMake = (item) => {
    setModal("Select Item");

    var modal = [];
    modelMake[item].map((item, index) => {
      modal.push({
        id: index,
        name: item,
      });
    });
    setModalname(modal);
    setMake(item);
  };
  const selectmodal = (item) => {
    setModal(item);
  };

  const selectVehicleType = (item) => {
    setVehicleType(item);
  };

  let AddressType = [
    {
      id: 1,
      name: "Home",
    },
    {
      id: 2,
      name: "Work",
    },
    {
      id: 3,
      name: "Other",
    },
  ];

  let selectedOption = [
    {
      id: 1,
      name: "Driveway",
    },
    {
      id: 2,
      name: "Garage",
    },
    {
      id: 3,
      name: "Parking Lot",
    },
    {
      id: 4,
      name: "Non-Busy Side-Street",
    },
  ];

  let selectedVehicleTypeOption = [
    {
      id: 1,
      name: "Coupe/Sedan",
    },
    {
      id: 2,
      name: "2-Row SUV/Truck",
    },
    {
      id: 3,
      name: "3-Row SUV/Minivan",
    },
  ];

   const setMakeModel = () => {
     var mm = {};
     const modelMakeData = require("../config/model_make.json");
     modelMakeData.map((item, index) => {
       if (mm.hasOwnProperty(item.Make)) {
         mm[item.Make] = [...mm[item.Make], item.Model];
      } else {
         mm[item.Make] = [item.Model];
       }
   });
     setModelMake(mm);

    var make = [];
    Object.keys(mm).map((item, index) => {
      make.push({
        id: index,
        name: item,
      });
    });
    setMakecar(make);
  };

  const moveCurrentPosition = (currentPosition) => {
    if (mapRef != null && mapRef.current != null) {
      mapRef.current.animateCamera(
        { center: currentPosition, altitude: 1900, zoom: 15 },
        20000
      );
    }
  };

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {

        console.log("poso>>",position)
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
        moveCurrentPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        });
      },
      (error) => {
        console.log("error>>>>",error)
        // setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 3000,
        maximumAge: 1000,
      }
    );
  };

  const handleform = async () => {
    if (address == "") {
      Alert.alert("", "Please enter the Address");
    } else if (addressType == "Select Address") {
      Alert.alert("", "Please select the Address Type");
    } else if (make == "Select Item") {
      Alert.alert("", "Please Enter Make");
    } else if (modal == "Select Item") {
      Alert.alert("", "Please enter the Modal");
    } else if (serviceArea == "Select Area") {
      Alert.alert("", "Please select the Service Area");
    } else if (vehicleType == "Select Area") {
      Alert.alert("", "Please select the ");
    } else {
      navigation.navigate("Package", {
                  Address: address,
                  Type: addressType,
                  Make: make,
                  Model: modal,
                  Area: serviceArea,
                  VehicleType: vehicleType,
                  user_id:user_id
                });


      // var myHeaders = new Headers();
      // const Token = await AsyncStorage.getItem("Token");
      // var myHeaders = new Headers();
      // myHeaders.append("Authorization", Token);

      // var requestOptions = {
      //   method: "GET",
      //   headers: myHeaders,
      //   redirect: "follow",
      // };
      // try {
      //   fetch("http://18.190.122.171/public/api/get-data", requestOptions)
      //     .then((response) => response.json())
      //     .then((result) => {
      //       console.log("res",result);
      //       if (result.message == "User Not Found") {
      //         AsyncStorage.removeItem("Token");
      //         setTimeout(() => {
      //           navigation.replace("Login");
      //           Alert.alert(
      //             "Alert ",
      //             "Session Expired You Have to Login Again",
      //             [
      //               {
      //                 text: "OK",
      //                 style: "cancel",
      //               },
      //             ]
      //           );
      //         }, 100);
      //       } else {
      //         navigation.navigate("Package", {
      //           Address: address,
      //           Type: addressType,
      //           Make: make,
      //           Model: modal,
      //           Area: serviceArea,
      //           VehicleType: vehicleType,
      //         });
      //       }
      //     });
      // } catch (e) {
      //   console.log("e", e);
      // }

      
    }
  };

  useEffect(() => {
  console.log("data of",BASE_URL)

    setMakeModel();
    // getdata();
    const requestLocationPermission = async () => {
      if (Platform.OS === "ios") {
        getOneTimeLocation();
      }
    };
    requestLocationPermission();
  }, []);

  console.log("djfoisdjfovalue",address)

//   // const onRefresh = () => {
//   //   setRefreshing(true);

//   //   setTimeout(() => {
//   //     setRefreshing(false);
//   //   }, 2000);
//   // };

//   // const getdata = async () => {
//   //   var myHeaders = new Headers();
//   //   const Token = await AsyncStorage.getItem("Token");
//   //   var myHeaders = new Headers();
//   //   myHeaders.append("Authorization", Token);

//   //   var requestOptions = {
//   //     method: "GET",
//   //     headers: myHeaders,
//   //     redirect: "follow",
//   //   };
//   //   try {
//   //     fetch("http://18.190.122.171/public/api/get-data", requestOptions)
//   //       .then((response) => response.json())
//   //       .then((result) => {
//   //         console.log(result);
//   //         if (result.message == "User Not Found") {
//   //           AsyncStorage.removeItem("Token");
//   //           setTimeout(() => {
//   //             navigation.replace("Login");
//   //             Alert.alert("Alert ", "Session Expired You Have to Login Again");
//   //           }, 100);
//   //         }
//   //       });
//   //   } catch (e) {
//   //     console.log(e);
//   //   }
//   // };
//   return (
//     <KeyboardAvoidingView
//       // style={styles.maincontainer}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <View>
//         <StatusBar
//           // barStyle="dark-content"
//           hidden={false}
//           // backgroundColor="#00BCD4"
//           translucent={true}
//         />
//         <TouchableOpacity
          
//           // onPress={() => {
//           //   navigation.dispatch(
//           //     CommonActions.reset({
//           //       index: 1,
//           //       routes: [{ name: "Bottom" }],
//           //     })
//           //   );
//           // }}
//         >
//           <Image
        
//             source={require("../../src/assets/Vector.png")}
//           />
//         </TouchableOpacity>
//       </View>
//       <ScrollView
        
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps={"handled"}
//         refreshControl={
//           <RefreshControl
//             colors={"#082B94"}
//             refreshing={refreshing}
//             // onRefresh={onRefresh}
//           />
//         }
//       >
//         <View
//           style={{
//             width: "90%",
//             height: 30,
//             alignSelf: "center",
//           }}
//         >
//           <Text >Let's Book Your Wash</Text>
//         </View>
//         <View >
//           {!loader == false && (
//             <View
//               style={{
//                 // flex: 1,
//                 alignItems: "center",
//                 position: "absolute",
//                 top: -30,
//               }}
//             >
//               <ActivityIndicator size="large" color="#082B94" />
//             </View>
//           )}
{/* <View style={styles.mapView}> 
<MapView
  style={styles.Map}
  ref={mapRef}
  initialRegion={{
    latitude: currentLatitude,
    longitude: currentLongitude,
  }}
>
  <MapMarker
    coordinate={{
      latitude: currentLatitude,
      longitude: currentLongitude,
    }}
  />
</MapView> 
 </View> */}
//           <View >
//             <View>
//               <Text >Address</Text>
//               {/* <TouchableOpacity activeOpacity={0.8}
//                 onPress={()=>{}}
//                 style={[styles.inputView,{justifyContent:"center",paddingLeft:10}]}
//                 // placeholder="#90,Street 10,NewYork"
//                 // value={address}
//                 // onChangeText={value => }
//               >
//                 <Text style={{fontSize:14}}>Select address</Text>
//               </TouchableOpacity> */}
//               {/* <GooglePlacesAutocomplete
//                 styles={{
//                   container: {
//                     width: "90%",
//                     alignSelf: "center",
//                     borderRadius: 10,
//                   },
//                   textInput: {
//                     ...styles.inputView,
//                     marginTop: 0,
//                     paddingLeft: 10,
//                   },
//                 }}
//                 enablePoweredByContainer={true}
//                 fetchDetails
//                 placeholder="Address"
//                 onPress={(data, details = null) => {
//                   // 'details' is provided when fetchDetails = true
//                   console.log(details.formatted_address);
//                   setCurrentLatitude(details.geometry.location.lat);
//                   setCurrentLongitude(details.geometry.location.lng);
//                   setAddress(details.formatted_address);
//                   let r = {
//                     latitude: details.geometry.location.lat,
//                     longitude: details.geometry.location.lng,
//                   };
//                   mapRef.current.animateToRegion(r, 1200);
//                 }}
//                 query={{
//                   key: "AIzaSyD7sFMzErTVEIr0hHXZSbXKSO7bTTIPepY",
//                   language: "en",
//                 }}
//               /> */}
//             </View>
//             <View>
//               <Text >Location Type</Text>
//               {/* <Dropdown
//                 height={50}
//                 width={"90%"}
//                 value={addressType}
//                 data={AddressType}
//                 onSelect={onSelect}
//                 placeholder="Home"
//               /> */}
//             </View>
//             <View
//               style={{
//                 flexDirection: "row",
//                 width: "100%",
//                 justifyContent: "space-around",
//               }}
//             >
//               <View style={{ width: "40%" }}>
//                 <Text >Make</Text>
//                 {/* <Dropdown
//                   height={50}
//                   width={"100%"}
//                   value={make}
//                   data={makecar}
//                   VieWidth={null}
//                   onSelect={selectMake}
//                 /> */}
//               </View>
//               <View style={{ width: "40%" }}>
//                 <Text >Model</Text>
//                 {/* <Dropdown
//                   height={50}
//                   // width={170}
//                   width={"100%"}
//                   // marginLeft={-5}
//                   value={modal}
//                   data={modalname}
//                   onSelect={selectmodal}
//                 /> */}
//               </View>
//             </View>
//             <View>
//               <Text >Vehicle Type</Text>
//               {/* <Dropdown
//                 height={50}
//                 width={"90%"}
//                 value={vehicleType}
//                 data={selectedVehicleTypeOption}
//                 onSelect={selectVehicleType}
//               /> */}
//             </View>
//             <View>
//               <Text >Service Area</Text>
//               {/* <Dropdown
//                 height={50}
//                 width={"90%"}
//                 value={serviceArea}
//                 data={selectedOption}
//                 onSelect={selectArea}
//               /> */}
//             </View>
//             <TouchableOpacity
//               onPress={() => {
//                 handleform();
//               }}
//               // style={styles.button}
//             >
//               <Text >Proceed to Packages</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//       {/* <GoogleSearch visible={true}/> */}
//     </KeyboardAvoidingView>
//   );
// };

// export default Booking;

// // const styles = StyleSheet.create({
// //   maincontainer: {
// //     flex: 1,
// //     backgroundColor: "#F5F5F5",
// //   },
// //   vectorImage: {
// //     width: 21,
// //     height: 20,
// //     resizeMode: "contain",
// //     marginLeft: 20,
// //     ...ifIphoneX(
// //       {
// //         marginTop: 50,
// //         marginBottom: 20,
// //       },
// //       {
// //         marginTop: 35,
// //       }
// //     ),
// //   },
// //   heading: {
// //     fontSize: 20,
// //     lineHeight: 30,
// //     fontWeight: "700",
// //     color: "#082B94",
// //     textAlign: "center",
// //   },
// //   mapView: {
// //     width: "100%",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     // marginTop: 40,

// //     ...ifIphoneX(
// //       {
// //         height: 211,
// //       },
// //       {
// //         height: 150,
// //         marginTop: 30,
// //       }
// //     ),
// //   },
// //   Map: {
// //     width: "90%",
// //     height: 200,
// //     borderRadius: 30,
// //     alignItems: "center",
// //     // backgroundColor:'red'
// //   },

// //   container: {
// //     width: "100%",
// //     height: "90%",
// //     alignItems: "center",
// //     ...ifIphoneX(
// //       {
// //         marginTop: 20,
// //       },
// //       {
// //         marginTop: 20,
// //       }
// //     ),
// //     // backgroundColor:'red'
// //   },
// //   formContainer: {
// //     width: "100%",
// //     height: "100%",
// //     ...ifIphoneX(
// //       {
// //         marginTop: 20,
// //       },
// //       {
// //         marginTop: 10,
// //       }
// //     ),
// //   },
// //   text: {
// //     fontSize: 14,
// //     fontWeight: "500",
// //     lineHeight: 18,
// //     color: "#222222",
// //     marginTop: 20,
// //     left: 20,
// //     bottom: 5,
// //   },
// //   text1: {
// //     fontSize: 14,
// //     fontWeight: "500",
// //     lineHeight: 18,
// //     color: "#222222",
// //     marginTop: 20,
// //     marginLeft: 5,
// //     bottom: 5,
// //   },
// //   text2: {
// //     fontSize: 14,
// //     fontWeight: "500",
// //     lineHeight: 18,
// //     color: "#222222",
// //     marginTop: 20,
// //     marginLeft: 5,
// //     bottom: 5,
// //   },
// //   inputView: {
// //     width: "90%",
// //     height: 50,
// //     borderRadius: 7,
// //     backgroundColor: "#082B9414",
// //     marginTop: 10,
// //     fontWeight: "400",
// //     fontSize: 14,

// //     color: "#222222",
// //     letterSpacing: 0.02,
// //     paddingLeft: 20,
// //     alignSelf: "center",
// //     // backgroundColor:'red'
// //   },
// //   SelectImage: {
// //     height: 7,
// //     width: 14,
// //     marginTop: 35,
// //     right: 40,
// //   },
// //   inputView1: {
// //     width: 161,
// //     height: 50,
// //     borderRadius: 7,
// //     backgroundColor: "#082B9414",
// //     marginTop: 10,
// //     fontWeight: "400",
// //     fontSize: 15,
// //     lineHeight: 21,
// //     color: "#222222",
// //     letterSpacing: 0.02,
// //     paddingLeft: 20,
// //     marginLeft: 6,
// //   },
// //   SelectImage1: {
// //     marginTop: 35,
// //     height: 7,
// //     width: 14,
// //     right: 30,
// //   },
// //   button: {
// //     width: "90%",
// //     height: 65,
// //     backgroundColor: "#082B94",
// //     borderRadius: 15,
// //     alignItems: "center",
// //     justifyContent: "center",
// //     marginTop: 20,
// //     marginBottom: 40,
// //     alignSelf: "center",
// //     ...ifIphoneX(
// //       {},
// //       {
// //         marginBottom: 20,
// //       }
// //     ),
// //   },
// //   buttonText: {
// //     color: "white",
// //     fontSize: 16,
// //     fontWeight: "700",
// //   },
// // });


//  import {
//     Image,
//     StyleSheet,
//     Text,
//     TextInput,
//     View,
//     KeyboardAvoidingView,
//     ScrollView,
//     TouchableOpacity,
//     ActivityIndicator,
//     Alert,
//     RefreshControl,
//     StatusBar,
//     Platform,
//   } from "react-native";
// import React from 'react'

// const Booking = () => {
  return (
    <KeyboardAvoidingView
      style={styles.maincontainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >

<View>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#00BCD4"
          translucent={true}
        />
        <TouchableOpacity
          
          // onPress={() => {
          //   navigation.dispatch(
          //     CommonActions.reset({
          //       index: 1,
          //       routes: [{ name: "Bottom" }],
          //     })
          //   );
          // }}
        >
          <Image
        style={{width:30,height:30,marginTop:80}}
            source={require("../../src/assets/Vector.png")}
          />
        </TouchableOpacity>
      </View>
    

      <View
          style={{
            width: "90%",
            height: 30,
            alignSelf: "center",
          }}
        >
          <Text >Let's Book Your Wash</Text>
        </View>
     
        <View style={styles.mapView}> 
{/* <MapView
  style={styles.Map}
  ref={mapRef}
  initialRegion={{
    latitude: currentLatitude,
    longitude: currentLongitude,
  }}
>
  <MapMarker
    coordinate={{
      latitude: currentLatitude,
      longitude: currentLongitude,
    }}
  />
</MapView>  */}
 </View>
 {/* <View>
              <Text >Address</Text>

              <TextInput 
              
              
              
              />
                <TouchableOpacity activeOpacity={0.8}
                 onPress={()=>{}}
                 style={[styles.inputView,{justifyContent:"center",paddingLeft:10}]}
                //  placeholder="#90,Street 10,NewYork"
                //  value={address}
                //  onChangeText={value => }
               >
                 <Text style={{fontSize:14}}>Select address</Text>
               </TouchableOpacity> 
                <GooglePlacesAutocomplete
                 styles={{
                   container: {
                     width: "90%",
                     alignSelf: "center",
                     borderRadius: 10,
                     marginBottom:10
                   },
                   textInput: {
                     ...styles.inputView,
                     marginTop: 0,
                     paddingLeft: 10,
                   },
                 }}
                 enablePoweredByContainer={true}
                 fetchDetails
                 placeholder="Address"
                 onPress={(data, details = null) => {
                   // 'details' is provided when fetchDetails = true
                   console.log(details.formatted_address);
                   setCurrentLatitude(details.geometry.location.lat);
                   setCurrentLongitude(details.geometry.location.lng);
                   setAddress(details.formatted_address);
                   let r = {
                     latitude: details.geometry.location.lat,
                     longitude: details.geometry.location.lng,
                   };
                   mapRef.current.animateToRegion(r, 1200);
                 }}
                 query={{
                   key: "AIzaSyD7sFMzErTVEIr0hHXZSbXKSO7bTTIPepY",
                   language: "en",
                 }}
               /> 
             </View> */}

<ScrollView>
<View style={styles.inputView2}>
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 16,
                  paddingHorizontal: 4,
                  paddingVertical: 6,
                  lineHeight: 18,
                  fontWeight: 400,
                  paddingTop: -15,
                }}
              >
                Address
              </Text>
              <View style={styles.inputBox}>
                {/* <View style={{width:90}}/> */}
                <TextInput
                  style={styles.input2}
                  placeholder="address"
                  placeholderTextColor="black"
                  value={address}
                  onChangeText={(value) => setAddress(value.toLowerCase())}
                  // ref={lastNameRef}
                  textAlign="center"
                />
              </View>
            </View>


             <View>
              <Text >Location Type</Text>
                <Dropdown
                height={50}
                width={"90%"}
                value={addressType}
                data={AddressType}
                 onSelect={onSelect}
                 placeholder="Home"
               /> 
             </View>  

             <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
              <View style={{ width: "40%" }}>
                <Text >Make</Text>
                <Dropdown
                  height={50}
                  width={"100%"}
                  value={make}
                  data={makecar}
                  VieWidth={null}
                  onSelect={selectMake}
                />
              </View>
              <View style={{ width: "40%" }}>
                <Text >Model</Text>
                <Dropdown
                  height={50}
                  // width={170}
                  width={"100%"}
                  marginLeft={-5}
                  value={modal}
                  data={modalname}
                  onSelect={selectmodal}
                />
              </View>
            </View>

            <View>
              <Text >Vehicle Type</Text>
              <Dropdown
                 height={50}
                 width={"90%"}
                value={vehicleType}
                data={selectedVehicleTypeOption}
                onSelect={selectVehicleType}
               /> 
             </View>
             <View style={{marginBottom:20}}>
               <Text >Service Area</Text>
               <Dropdown
                 height={50}
                 width={"90%"}
                value={serviceArea}
                data={selectedOption}
                onSelect={selectArea}
               /> 
             </View>
             </ScrollView>
             <TouchableOpacity
               onPress={() => {
                 handleform();
               }}
              style={styles.button}
            >
              <Text >Proceed to Packages</Text>
             </TouchableOpacity>
            
      
    </KeyboardAvoidingView>
  )
}

export default Booking

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "white",
  },
  vectorImage: {
    width: 21,
    height: 20,
    resizeMode: "contain",
    marginLeft: 20,
    ...ifIphoneX(
      {
        marginTop: 50,
        marginBottom: 20,
      },
      {
        marginTop: 35,
      }
    ),
  },
  heading: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "700",
    color: "#082B94",
    textAlign: "center",
  },
  mapView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 40,

    ...ifIphoneX(
      {
        height: 211,
      },
      {
        height: 150,
        marginTop: 30,
      }
    ),
  },
  Map: {
    width: "90%",
    height: 200,
    borderRadius: 30,
    alignItems: "center",
    // backgroundColor:'red'
  },

  container: {
    width: "100%",
    height: "90%",
    alignItems: "center",
    ...ifIphoneX(
      {
        marginTop: 20,
      },
      {
        marginTop: 20,
      }
    ),
    // backgroundColor:'red'
  },
  formContainer: {
    width: "100%",
    height: "100%",
    ...ifIphoneX(
      {
        marginTop: 20,
      },
      {
        marginTop: 10,
      }
    ),
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    color: "#222222",
    marginTop: 20,
    left: 20,
    bottom: 5,
  },
  text1: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    color: "#222222",
    marginTop: 20,
    marginLeft: 5,
    bottom: 5,
  },
  text2: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    color: "#222222",
    marginTop: 20,
    marginLeft: 5,
    bottom: 5,
  },
  inputView: {
    width: "90%",
    height: 50,
    borderRadius: 7,
    backgroundColor: "#082B9414",
    marginTop: 10,
    fontWeight: "400",
    fontSize: 14,

    color: "#222222",
    letterSpacing: 0.02,
    paddingLeft: 20,
    alignSelf: "center",
    // backgroundColor:'red'
  },
  SelectImage: {
    height: 7,
    width: 14,
    marginTop: 35,
    right: 40,
  },
  inputView1: {
    width: 161,
    height: 50,
    borderRadius: 7,
    backgroundColor: "#082B9414",
    marginTop: 10,
    fontWeight: "400",
    fontSize: 15,
    lineHeight: 21,
    color: "#222222",
    letterSpacing: 0.02,
    paddingLeft: 20,
    marginLeft: 6,
  },
  SelectImage1: {
    marginTop: 35,
    height: 7,
    width: 14,
    right: 30,
  },
  button: {
    width: "90%",
    height: 65,
    backgroundColor: "#082B94",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 40,
    alignSelf: "center",
    ...ifIphoneX(
      {},
      {
        marginBottom: 20,
      }
    ),
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  inputView2: {
    height: 80,
    width: "87%",
    // alignSelf: 'center',
    marginTop: 20,
    textAlign: "center",
  },
  inputBox: {
    width: "100%",
    height: 49,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
  },
});
