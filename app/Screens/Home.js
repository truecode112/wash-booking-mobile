import {
  Alert,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import { COLORS } from "../config/Colors";
import Logo from "../Component/Logo";
import HomeList from "../Component/HomeList";
import NoData from "../Component/NoData";
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";

const Home = ({ route, navigation }) => {
  const [list, setList] = useState([]);

  const _getData = async () => {
    var myHeaders = new Headers();
    const Token = await AsyncStorage.getItem("Token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", Token);

    var formdata = new FormData();
    formdata.append("data", "upcoming");
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
          // if()
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
          navigation.navigate("Details", { data: item, screenType: "home" });
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
        <Logo top={20} bottom={20} />
        <Text style={styles.text}>
          {list.length > 0 ? "Upcoming Wash" : "No Upcoming Washes Yet"}
        </Text>
        {list.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={list}
            renderItem={memoized}
          />
        ) : (
          <NoData description={"Click on the “+” icon below to book now."} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.APP_COLORS,
  },

  text: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.APP_BLUE,
    textAlign: "center",
  },
});
