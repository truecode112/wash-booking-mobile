import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
  FlatList,
  Alert,
  // Image
} from "react-native";
import React from "react";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { useRoute } from "@react-navigation/native";
import { COLORS } from "../config/Colors";

const OTSExtra = ({ navigation }) => {
  const route = useRoute();
  console.log("route>><<",route)
  let packages = route.params?.package;
  let packageName = route.params.packagetitle;
  let Address = route.params?.Address;
  let Type = route.params?.Type;
  let Make = route.params?.Make;
  let Model = route.params?.Model;
  let Area = route.params?.Area;
  let VehicleType = route.params?.VehicleType;
  let user_id = route.params.user_id
  let appointmentTypeID = route.params?.appointmentTypeID;
  console.log(Type, "---->type");
  const data = [
    {
      id: 1,
      name: "Air-Freshener 3 Pack",
      price: 5,
      isChecked: false,
    },
    {
      id: 2,
      name: "Washer Fluid",
      price: 10,
      isChecked: false,
    },
    {
      id: 3,
      name: "OTS Car Deodorizer",
      price: 20,
      isChecked: false,
    },
    {
      id: 4,
      name: "Steamer",
      price: 20,
      isChecked: false,
    },
    {
      id: 5,
      name: "Truck Bed",
      price: 20,
      isChecked: false,
    },
    {
      id: 6,
      name: "Headliner Restoration",
      price: 20,
      isChecked: false,
    },
    {
      id: 7,
      name: "Headlight Restoration",
      price: 40,
      isChecked: false,
    },
    {
      id: 8,
      name: "Clay Bar & Decontamination",
      price: 50,
      isChecked: false,
    },
    {
      id: 9,
      name: "Engine Bay Detailing",
      price: 50,
      isChecked: false,
    },
  ];
  const [products, setProducts] = React.useState(data);
  const [total, setTotal] = React.useState(packages);

  const handleChange = (id, index) => {
    var _products = [...products];
    // var _productsData ={..._products}
    var _total = total;
    _products[index].isChecked = !_products[index].isChecked;
    if (_products[index].isChecked) {
      _total = products[index].price + _total;
      console.log(_total);
      setTotal(_total);
    } else {
      _total = _total - products[index].price;
      console.log(_total);
      setTotal(_total);
    }
    setProducts(_products);
    console.log(_products);
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={{
          width: 70,
          height: 50,
          // marginTop:35,
          // backgroundColor:'red',
          ...ifIphoneX(
            {
              width: 70,
              height: 50,
              marginTop: 35,
            },
            {
              width: 70,
              // height: 30,
              marginTop: 20,
            }
          ),
        }}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.arrow}
          source={require("../../src/assets/Vector.png")}
        />
      </TouchableOpacity>
      <ScrollView
        style={{ marginBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            alignItems: "center",
            width: 340,
            height: 30,
            marginBottom: 20,
          }}
        >
          <Text style={styles.heading}>Choose Your OTS Extras</Text>
        </View>
        <View style={{ width: "100%", height: "100%", alignItems: "center" }}>
          <View style={styles.container}>
            {/* <View>
              <Image
                style={{
                  width: "100%",
                  height: 232,
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  resizeMode: "cover",
                }}
                source={require("../../src/assets/car1.png")}
              />
            </View> */}
            {products.map((item, index, i) => {
              return (
                <>
                  <TouchableOpacity
                    onPress={() => handleChange(item.id, index)}
                    key={item.id}
                    style={styles.priceView}
                  >
                    <View style={styles.checkbox}>
                      {item.isChecked ? (
                        <Image
                          style={{
                            width: 10,
                            height: 10,
                            resizeMode: "contain",
                            tintColor: "#fff",
                          }}
                          source={require("../../src/assets/checkbox.png")}
                        />
                      ) : (
                        ""
                      )}
                    </View>
                    <View style={styles.packageName}>
                      <View style={{ width: 180, height: 20 }}>
                        <Text style={styles.serviceName}>{item.name}</Text>
                      </View>
                      <View style={{ width: 80, height: 20 }}>
                        <Text style={styles.servicePrice}>
                          ${item.price}.00
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.line} />
                </>
              );
            })}
            {/* <FlatList
            //  style={styles.priceView}
            data={products}
            renderItem={({item, index}) => (
              <View style={styles.priceView}>
                <TouchableOpacity
                  onPress={() => handleChange(item.id, index)}
                  style={styles.checkbox}>
                  {item.isChecked ? (
                    <Image
                      style={{
                        width: 10,
                        height: 10,
                        resizeMode: 'contain',
                        tintColor: '#fff',
                      }}
                      source={require('../../src/assets/checkbox.png')}
                    />
                  ) : (
                    ''
                  )}
                </TouchableOpacity>
                <View style={styles.packageName}>
                  <View style={{width: 180, height: 20}}>
                    <Text style={styles.serviceName}>{item.name}</Text>
                  </View>
                  <View style={{width: 80, height: 20}}>
                    <Text style={styles.servicePrice}>{item.price}</Text>
                  </View>
                </View>
                <View style={styles.line} />
              </View>
            )}
            keyExtractor={item => 'key-' + item.id}
          /> */}
            {/* <View style={styles.OTSButton}>
              <Text style={styles.OTSText}>OTS Extras</Text>
            </View> */}
          </View>

          <TouchableOpacity
            onPress={() => {
              let _arr = [];
              products.filter((item) => {
                return item.isChecked ? _arr.push(item) : [];
              });
              console.log(JSON.stringify(_arr));
              navigation.navigate("CheckOut", {
                total: total,
                products: JSON.stringify(_arr),
                packages: packageName,
                price: packages,
                Address: Address,
                Type: Type,
                Make: Make,
                Model: Model,
                user_id:user_id,
                Area: Area,
                VehicleType: VehicleType,
                appointmentTypeID:appointmentTypeID
              });
            }}
            style={styles.button}
          >
            <Text style={styles.buttontext}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default OTSExtra;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.APP_COLORS,
    // backgroundColor: '#F5F5F5',
  },
  arrow: {
    width: 21,
    height: 25,
    resizeMode: "contain",
    marginTop: 20,
    marginLeft: 25,
    bottom: 10,
    ...ifIphoneX(
      {
        marginTop: 28,
      },
      {
        marginTop: 30,
      }
    ),
  },
  heading: {
    // width: 340,
    // height: 30,
    fontSize: 23,
    lineHeight: 33,
    fontWeight: "700",
    color: "#122D8F",
    marginLeft: 55,
    ...ifIphoneX(
      {
        marginLeft: 55,
      },
      {
        marginLeft: 35,
      }
    ),
    // marginBottom: 10,
    // textAlign:'center'
  },
  container: {
    width: "80%",
    paddingVertical:10,
    marginVertical:15,
    borderRadius: 30,
    backgroundColor: "#FF6703",
    alignSelf: "center",
  },
  priceView: {
    marginTop: 16,
    marginLeft: 20,
    flexDirection: "row",
    // justifyContent:'space-between'
  },
  serviceName: {
    fontSize: 13.5,
    fontWeight: "900",
    // lineHeight: 18,
    color: "#FFFFFF",
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: "400",
    // lineHeight: 21,
    color: "#FFFFFF",
    marginLeft: 25,
  },
  line: {
    borderBottomWidth: 1,
    width: "60%",
    marginTop: 2,
    // marginBottom: 8,
    alignSelf: "center",
    borderBottomColor: "#FFFFFF",
    opacity: 0.1,
    marginLeft: 20,
    // margin: 10,
  },
  packageName: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginRight: 30,
    marginLeft: 17,
    // justifyContent:'space-between'
  },
  OTSButton: {
    position: "absolute",
    width: 275,
    height: 61,
    backgroundColor: "#FF6703",
    borderRadius: 15,
    alignSelf: "center",
    top: 10,
    alignItems: "center",
  },
  OTSText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    lineHeight: 27,
    paddingTop: 16,
  },
  button: {
    width: "90%",
    height: 65,
    backgroundColor: "#082B94",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    marginLeft: 20,

    ...ifIphoneX(
      {
        marginLeft: 20,
        marginRight: 18,
      },
      {
        marginLeft: 10,
        marginBottom: 20,
      }
    ),
  },
  buttontext: {
    color: "white",
    fontSize: 17,
    fontWeight: "800",
  },
  checkbox: {
    width: "5%",
    height: 15,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    // marginLeft:10
  },
});
