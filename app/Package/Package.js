import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { useRoute } from "@react-navigation/native";

const Package = ({ navigation }) => {
  const route = useRoute();

  console.log("route",route.params.user_id)
  const Address = route.params?.Address;
  const Type = route.params?.Type;
  const Make = route.params?.Make;
  const Model = route.params?.Model;
  const Area = route.params?.Area;
  const VehicleType = route.params?.VehicleType;
  const user_id = route.params.user_id

  console.log("data of user",user_id)

  const [selectIndex, setSelectIndex] = useState(-1);

  console.log(Address, "--->Address");
  // const [data, setData]= useState(DATA)
  const DATA = [
    {
      key: "Premium",
      title: "OTS Premium\nCar Wash",
      price:
        VehicleType == "Coupe/Sedan"
          ? 150
          : VehicleType == "2-Row SUV/Truck"
          ? 160
          : VehicleType == "3-Row SUV/Minivan"
          ? 180
          : 150,
      appointmentTypeID:
        VehicleType == "Coupe/Sedan"
          ? 30496509
          : VehicleType == "2-Row SUV/Truck"
          ? 30496524
          : VehicleType == "3-Row SUV/Minivan"
          ? 22126034
          : 30496509,
      image: require("../../src/assets/car1.png"),
      bgColor: "#FF6703",
    },
    {
      key: "Iterior",
      title: "OTS Interior Only",
      price:
        VehicleType == "Coupe/Sedan"
          ? 130
          : VehicleType == "2-Row SUV/Truck"
          ? 140
          : VehicleType == "3-Row SUV/Minivan"
          ? 160
          : 130,
      appointmentTypeID:
        VehicleType == "Coupe/Sedan"
          ? 22126380
          : VehicleType == "2-Row SUV/Truck"
          ? 22126430
          : VehicleType == "3-Row SUV/Minivan"
          ? 22628263
          : 22126380,
      image: require("../../src/assets/interior.png"),
      bgColor: "#082B94",
    },
    {
      key: "Exterior",
      title: "OTS Exterior Only",
      price:
        VehicleType == "Coupe/Sedan"
          ? 120
          : VehicleType == "2-Row SUV/Truck"
          ? 130
          : VehicleType == "3-Row SUV/Minivan"
          ? 150
          : 120,
      appointmentTypeID:
        VehicleType == "Coupe/Sedan"
          ? 22126276
          : VehicleType == "2-Row SUV/Truck"
          ? 22126315
          : VehicleType == "3-Row SUV/Minivan"
          ? 22628256
          : 22126276,
      image: require("../../src/assets/Exterior.png"),
      bgColor: "#0099CC",
    },
  ];

  const iteriorDescription =
    "- Deep Vacuum on All Surfaces\n- Wipedown on all Interior Plastic\n- Water Vacuum for Deep Stains\n- Leather Conditioning \n- Window Cleaning\n- Door Jamb\n- Mat Restoration";
  const exteriorDescription =
    "- Tire & Rim Cleaning\n- Pressure Wash\n- Foam Cannon\n- Hand Wash & Rinse\n- Towel & Blow Dry Entire Vehicle\n- Protectant Wax\n- Trim Restoration\n- Window Cleaning\n- Tire Shine";

  return (
    <SafeAreaView style={styles.maincontainer}>
      <TouchableOpacity
        style={{
          width: 70,
          height: 50,
        }}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.arrow}
          source={require("../../src/assets/Vector.png")}
        />
      </TouchableOpacity>
      <View
        style={{
          width: "90%",
          height: 30,
          //  backgroundColor:'red',
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <Text style={styles.heading}>Choose Your OTS Package</Text>
      </View>
      <FlatList
        style={{ flex: 1 }}
        data={DATA}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View style={[styles.container]}>
              <View
                style={[
                  styles.descView,
                  {
                    backgroundColor: item.bgColor,
                  },
                ]}
              >
                <View
                  style={{
                    ...ifIphoneX(
                      {
                        height: 164,
                      },
                      {
                        height: 140,
                      }
                    ),
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "800" }}>
                    {"Package Details"}
                  </Text>
                  <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={() => {
                      if (selectIndex == index) {
                        setSelectIndex(-1);
                      } else {
                        setSelectIndex(index);
                      }
                    }}
                  >
                    <Image
                      style={{
                        height: 15,
                        width: 15,
                        resizeMode: "contain",
                        tintColor: "#fff",
                        transform: [
                          { rotate: index == selectIndex ? "270deg" : "90deg" },
                        ],
                      }}
                      source={require("../../src/assets/RightArrow.png")}
                    />
                  </TouchableOpacity>
                </View>
                {index == selectIndex &&
                  (index == 0 ? (
                    <View>
                      <Text style={styles.descTitle}>
                        {"Interior Service :"}
                      </Text>
                      <Text style={styles.desc}>{iteriorDescription}</Text>
                      <Text style={styles.descTitle}>
                        {"Exterior Service :"}
                      </Text>
                      <Text style={styles.desc}>{exteriorDescription}</Text>
                    </View>
                  ) : index == 1 ? (
                    <Text style={styles.desc}>{iteriorDescription}</Text>
                  ) : index == 2 ? (
                    <Text style={styles.desc}>{exteriorDescription}</Text>
                  ) : null)}
              </View>
              <TouchableOpacity
                style={[
                  styles.premium,
                  {
                    backgroundColor: item.bgColor,
                  },
                ]}
                onPress={() => {
                  // handlePackage(console.log(item.title,item.price))
                  navigation.navigate("OTSExtra", {
                    package: item.price,
                    packagetitle: item.key,
                    Address: Address,
                    user_id:user_id,
                    Type: Type,
                    Make: Make,
                    Model: Model,
                    Area: Area,
                    VehicleType: VehicleType,
                    appointmentTypeID: item.appointmentTypeID,
                  });
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image style={styles.image} source={item.image} />

                  <View
                    style={{
                      marginLeft: 30,
                      marginTop: 25,
                    }}
                  >
                    <Text style={styles.text}>{item.title}</Text>
                    <View style={styles.priceView}>
                      <Text
                        style={[
                          styles.price,
                          { marginTop: index == 0 ? 0 : 28 },
                        ]}
                      >
                        ${item.price}.00
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      ></FlatList>
    </SafeAreaView>
  );
};

export default Package;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
    marginTop: 30,
    marginBottom: 5,
  },
  arrow: {
    width: 21,
    height: 20,
    resizeMode: "contain",
    marginTop: 15,
    marginLeft: 25,
    ...ifIphoneX(
      {
        width: 21,
        height: 20,
        // marginTop: 15,
      },
      {
        width: 21,
        height: 20,
        marginTop: 20,
      }
    ),
  },
  heading: {
    // width: 340,
    // height: 30,
    fontSize: 22,
    lineHeight: 33,
    fontWeight: "700",
    color: "#122D8F",
    // alignSelf: 'center',
    // marginLeft: 60,
    // marginTop: 5,
    ...ifIphoneX(
      {},
      {
        fontSize: 20,
        // marginLeft: 70,
        // marginTop: 10,
      }
    ),
  },
  descView: {
    width: "80%",
    borderRadius: 30,
    alignSelf: "center",
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  premium: {
    height: 164,
    width: "90%",
    borderRadius: 30,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    position: "absolute",
    elevation: 5,
    ...ifIphoneX(
      {
        height: 164,
      },
      {
        height: 140,
      }
    ),
  },
  image: {
    width: 138,
    height: 130,
    top: 17,
    left: 17,
    borderRadius: 20,
    ...ifIphoneX(
      {},
      {
        height: 110,
      }
    ),
  },
  text: {
    fontSize: 18,
    lineHeight: 27,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  text1: {
    fontSize: 18,
    lineHeight: 27,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  interior: {
    height: 164,
    width: "90%",
    borderRadius: 30,
    backgroundColor: "#082B94",
    alignSelf: "center",
    marginTop: 30,
    ...ifIphoneX(
      {},
      {
        height: 140,
      }
    ),
  },
  Exterior: {
    height: 164,
    width: "90%",
    borderRadius: 30,
    backgroundColor: "#0099CC",
    alignSelf: "center",
    marginTop: 30,
    ...ifIphoneX(
      {},
      {
        height: 140,
      }
    ),
  },
  price: {
    fontSize: 18,
    lineHeight: 27,
    fontWeight: 900,
    color: "#FFFFFF",
  },
  priceView: {
    marginTop: 40,
    ...ifIphoneX(
      {
        marginTop: 40,
      },
      {
        marginTop: 20,
      }
    ),
  },
  priceView1: {
    ...ifIphoneX(
      {
        marginTop: 60,
      },
      {
        marginTop: 45,
      }
    ),
  },
  descTitle: {
    color: "#fff",
    marginBottom: 5,
    fontWeight: "600",
  },
  desc: {
    color: "#fff",
    marginBottom: 10,
  },
});
