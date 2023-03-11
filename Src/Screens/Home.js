import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import BottomLayer from "..//Assets/BottomLayer.svg";
import Logo from "../Assets/Logo.svg";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import PermissionPop from "../Components/AlertModal";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import {
  BallIndicator,
} from 'react-native-indicators';
const Home = () => {
  const [isShow, setisShow] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const [image, setimage] = useState(null);
  const [TextReaded, setTextReaded] = useState("");

  const onCamera = async () => {
    setisShow(false);
    setTimeout(async () => {
      setTimeout(async () => {
        ImagePicker.launchCameraAsync({
          quality: 1,
        }).then(async (response) => {
          setimage(response);
        });
      });
    }, 1000);
  };

  const onGallary = async () => {
    setisShow(false);
    setTimeout(async () => {
      ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      }).then(async (response) => {
        setimage(response);
      });
    }, 1000);
  };

  const ScannedImage = async () => {
    const formData = new FormData();
    formData.append("image", {
      uri: image?.assets[0].uri,
      type: "image/jpeg",
      name: "test.jpg",
    });
    setisLoading(true)
    try {
      const response = await fetch("https://tecnorn.online/api/V1/report/ocr", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const result = await response.json();
      console.log(result, "....rrrrr");
      setTextReaded(result);
    setisLoading(false)
      setimage(null)
    } catch (error) {
    setisLoading(false)
     alert(error?.message)
      console.error(error, "......");
    }
  };

  // console.log(TextReaded?.ParsedResults[0]?.ParsedText, "/////");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
          backgroundColor: "#EAF0F7",
        }}
      >
        <View style={styles.Logo}>
          <Logo />
        </View>
        <Text style={styles.myGroup}>My Group</Text>
        <View style={styles.MyGroupSpace}></View>
        <View style={styles.emptyContainer}>
        {
          isLoading&&<BallIndicator
          color="blue"
          size={50}
          style={{flex:1,alignSelf:"center"}}
          />
        }
        <ScrollView>
        {image != null && (
            <TouchableOpacity
              onPress={ScannedImage}
              style={{
                width: "100%",
                borderWidth: 1,
                borderRadius: 10,
                justifyContent:"center",
                alignItems:"center",
                padding:10
              }}
            >
             
              <Text style={{}}>{"Upload Image"}</Text>
            </TouchableOpacity>
          )}
          {
            image==null&&TextReaded!=""&&<Text style={{padding:5,textAlign:"center"}}>
              {TextReaded?.ParsedResults[0]?.ParsedText}
            </Text>
          }
        </ScrollView>
         
        </View>
        <TouchableOpacity
          onPress={() => setisShow(true)}
          style={styles.PlusButton}
        >
          <FontAwesome5Icon name="plus" size={25} color={"#4461F2"} />
        </TouchableOpacity>
        <View style={styles.bottomLayerConaner}>
          <BottomLayer />
        </View>
      </View>
      <PermissionPop
        isOpen={isShow}
        onCamera={() => onCamera()}
        onGallary={() => onGallary()}
        onClose={() => {
          setisShow(false);
        }}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  Logo: {
    height: "10%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
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
    top: 20,
    shadowColor: "#4461F2",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
  },
  MyGroupSpace: {
    height: "20%",
    backgroundColor: "#b0c4de",
    width: "80%",
    alignSelf: "center",
    marginTop: 15,
    borderRadius: 20,
    right: 20,
  },
  emptyContainer: {
    height: "36%",
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 20,
  },
  bottomLayerConaner: {
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
  },
});
