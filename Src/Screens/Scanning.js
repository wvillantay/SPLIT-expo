import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image ,Button} from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as ImagePicker from 'expo-image-picker';
import TesseractOcr, { LANG_ENGLISH } from 'react-native-tesseract-ocr';

export default function Scanning() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  };
  const takePicture = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === 'granted') {
      const { uri } = await cameraRef.takePictureAsync();
      setImage(uri);
    }
  };
  
  const recognizeText = async () => {
    const result = await TesseractOcr.recognize(image, LANG_ENGLISH, {});
    console.log(result);
  };
  
  const handleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{flex:1,marginTop:50}}>
      {image ? (
        <Image source={{ uri: image }} style={{width:100,height:100,resizeMode:"center"}} />
      ) : (
        <Camera  />
      )}
      <View style={{height:100,width:100}}>
        {image ? (
          <Button title="Recognize" onPress={recognizeText} />
        ) : (
          <Button title="Take Picture" onPress={takePicture} />
        )}
        <Button title="Pick Image" onPress={pickImage} />
      </View>
    </View>
  );
  
}
