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
import React, { useEffect, useState, useRef } from "react";
import BottomLayer from "..//Assets/BottomLayer.svg";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Logo from "../Assets/Logo.svg";
import LeftArrow from "../Assets/LeftArrow.svg";
import CameraIcon from "../Assets/CameraIcon.svg";
import HomeImage from "../Assets/HomeImage.svg";
import ProfileImage from "../Assets/ProfileImage.svg";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { Camera } from "expo-camera";
import { manipulateAsync } from "expo-image-manipulator";

import uuid from "uuid";
import { getReceiptInfo } from "./Sources";
import { extractData } from "./ExtractData";

const ScannedSlip = ({ navigation, route }) => {
  const [isLoading, setisLoading] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [TextReaded, setImageUrl] = useState("");
  const [ImageUrl, setTextReaded] = useState("");

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync();
      const manipResult = await manipulateAsync(
        data?.uri,
        [{ resize: { width: 450, height: 600 } }],
        { format: "jpeg", base64: true }
      );
      if (manipResult.uri != undefined) {
        const firebaseURL = await uploadImageAsync(manipResult.uri);
        console.log(firebaseURL);
        var imageData = await getReceiptInfo(firebaseURL);
        console.log(imageData, "/////");
        var extractedData = await extractData(imageData);
        console.log(imageData[0],'/....');
        if (extractedData) {
          navigation?.navigate("Calculatingsummary", {
            item: route?.params,
            ScannedText: extractedData,
            title:imageData[0]
          });
        }
      }
    }

    async function uploadImageAsync(uri) {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      const fileRef = ref(getStorage(), uuid.v4());
      const result = await uploadBytes(fileRef, blob);
      blob.close();
      return await getDownloadURL(fileRef);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
          // backgroundColor: "#EAF0F7",
        }}
      >
        <View style={styles.Logo}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <LeftArrow style={{ right: 100 }} />
          </TouchableOpacity>
          <Logo />
        </View>
        <Text style={styles.myGroup}>{route?.params?.GrouName}</Text>
        <View style={styles.MyGroupSpace}>
          {capturedImage != null ? (
            <Image source={{ uri: capturedImage }} style={styles.camera} />
          ) : (
            <Camera ref={cameraRef} style={styles.camera} type={type}></Camera>
          )}
        </View>
        <TouchableOpacity
          onPress={() => takePicture()}
          style={styles.PlusButton}
        >
          <CameraIcon style={{ alignSelf: "center", top: 20 }} />
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

export default ScannedSlip;

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
    justifyContent: "space-around",
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
