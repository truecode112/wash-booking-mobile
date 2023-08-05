import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../config/Colors";
import { ifIphoneX } from "react-native-iphone-x-helper";
import NoData from "../Component/NoData";
import HomeList from "../Component/HomeList";
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";
import Logo from "../Component/Logo";

const PastWashes = ({ navigation }) => {
  const [list, setList] = useState([]);

  const _getData = async () => {
    var myHeaders = new Headers();
    const Token = await AsyncStorage.getItem("Token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", Token);

    var formdata = new FormData();
    formdata.append("data", "past");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: formdata,
    };

    fetch("http://18.190.122.171/public/api/get-all-details", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result, "---allgetData");
        // console.log(result.response?.address);
        if (result.status == true) {
          setList(result.response);
        } else {
          // AsyncStorage.removeItem('Token');
          // setTimeout(() => {
          //   navigation.navigate('Login');
          //   Alert.alert('Alert ', 'Session Expired You Have to Login Again', [
          //     {
          //       text: 'OK',
          //       style: 'cancel',
          //     },
          //   ]);
          // }, 100);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    _getData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <HomeList
        onPress={() => {
          navigation.navigate("Details", { data: item, screenType: "past" });
        }}
        label={item.make}
        address={item.address}
        date={moment(item.date).format("MMMM DD, YYYY") + ", " + item.time}
      />
    );
  };

  const memoized = useMemo(() => renderItem, [list]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.arrow}
            source={require("../../src/assets/Vector.png")}
          />
        </TouchableOpacity>
        <Logo top={0} bottom={20} />
        <Text style={styles.heading}>Past Washes</Text>

        {list.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={list}
            renderItem={memoized}
          />
        ) : (
          <NoData
            description={
              "You don’t have any bookings yet. Click on the “+” icon on home screen to schedule a booking."
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default PastWashes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.APP_COLORS,
  },
  backBtn: {
    width: 70,
    height: 30,
    marginLeft: 20,
    ...ifIphoneX(
      {
        marginTop: 20,
      },
      {
        marginTop: 40,
      }
    ),
  },
  arrow: {
    width: 21,
    height: 25,
    resizeMode: "contain",
  },
  heading: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "700",
    color: "#082B94",
    textAlign: "center",
    marginBottom: 20,
  },
});
