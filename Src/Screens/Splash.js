import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Logo from "../Assets/Logo.svg";

const Splash = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View
        style={{
          height: "40%",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Logo height={200} width={200} />
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
