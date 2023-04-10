import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import BottomLayer from "..//Assets/BottomLayer.svg";
import Logo from "../Assets/Logo.svg";
import Edit from "../Assets/Edit.svg";

import LeftArrow from "../Assets/LeftArrow.svg";
import HomeImage from "../Assets/HomeImage.svg";
import ProfileImage from "../Assets/ProfileImage.svg";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { BallIndicator } from "react-native-indicators";
import Order_light from "..//Assets/Order_light.svg";
const Calculatingsummary = ({ navigation, route }) => {
  const [TextReaded, setTextReaded] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  const { title, ScannedText, item } = route?.params;
  // const Texts = route?.params?.ScannedText?.ParsedResults[0]?.ParsedText;

  console.log(ScannedText, ".....");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
        }}
      >
        <View style={styles.Logo}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <LeftArrow style={{ right: 100 }} />
          </TouchableOpacity>
          <Logo />
        </View>
        <Text style={styles.myGroup}>{route?.params?.item?.GrouName}</Text>
        <View style={styles.MyGroupSpace}>
          <View
            style={{
              width: "80%",
              height: "20%",
              alignSelf: "center",
              backgroundColor: "#CBF6DC",
              borderRadius: 10,
              justifyContent: "center",
            }}
          >
            <Text
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
            >
              {title}
            </Text>
          </View>

          <View
            style={{
              width: "80%",
              height: "80%",
              alignSelf: "center",
              borderRadius: 10,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ height: "50%", marginTop: 15, width: "100%" }}>
              <ScrollView>
                {ScannedText?.items?.map((item) => {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                          letterSpacing: 1,
                          width: "40%",
                        }}
                      >
                        {item?.name}
                      </Text>
                      <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                        {item?.price + " " + "USD"}
                      </Text>
                      <TouchableOpacity>
                        {/* <Edit /> */}
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Total
              </Text>
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                { ScannedText?.total + " " + "USD"}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AddMannully", {
              total:1,
              item: "item",
              GrouName: route?.params?.item?.GrouName,
              ScannedText:ScannedText
            })
          }
          style={styles.PlusButton}
        >
          <Order_light />
        </TouchableOpacity>
        <View style={styles.bottomLayerConaner}>
          <BottomLayer />
        </View>
      </View>
      <View
        style={{
          height: 80,
          width: "100%",
          position: "absolute",
          bottom: -1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            height: "80%",
            width: "25%",
            left: 5,
            top: 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HomeImage />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: "80%",
            width: "25%",
            left: -5,
            top: 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ProfileImage />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Calculatingsummary;

const styles = StyleSheet.create({
  Logo: {
    height: "10%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    flexDirection: "row",
  },
  myGroup: { color: "black", fontWeight: "bold", left: 25, fontSize: 25 },
  PlusButton: {
    height: 60,
    width: 60,
    borderWidth: 3,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#4461F2",
    alignSelf: "center",
    top: 10,
    shadowColor: "#4461F2",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
  },
  MyGroupSpace: {
    height: "63%",
    backgroundColor: "#EAF0F7",
    width: "90%",
    marginTop: 15,
    borderRadius: 20,
    alignSelf: "center",
  },
  emptyContainer: {
    height: "36%",
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 20,
  },
  bottomLayerConaner: {
    height: "9%",
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
  },
  camera: {
    flex: 1,
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
