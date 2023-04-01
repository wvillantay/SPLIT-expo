import {
    SafeAreaView,
    StyleSheet,
    View,
    Dimensions,
    Text,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
  import { Input } from "react-native-elements";
  import React, { useEffect, useState } from "react";
  import BottomLayer from "..//Assets/BottomLayer.svg";
  import Logo from "../Assets/Logo.svg";
  import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

  const ItemForms = ({navigation,route}) => {
    const [Name, setname] = useState("");
    const [Price, setPrice] = useState("");
    

   
  
  
  
  
    
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
            backgroundColor: "#f0f1f1",
          }}
        >
          <View style={styles.Logo}>
            <Logo />
          </View>
          <Text style={styles.myGroup}>Edit Expense</Text>
          <View style={{ height: "65%", top: 15 }}>
            <ScrollView style={{width:"90%",alignSelf:"center"}}>
            <Input
            onChangeText={(e) => setname(e)}
            placeholder="Item Name"
            inputContainerStyle={{
              borderBottomWidth: 0,
              alignSelf: "center",
              height: 20,
              borderRadius: 10,
              marginTop: 15,
            }}
            containerStyle={{
              backgroundColor: "#dfe9e9",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            rightIcon={
              <TouchableOpacity
                style={{
                  height: 20,
                  width: 20,
                  borderWidth: 1,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>X</Text>
              </TouchableOpacity>
            }
          />
          <View style={{height:20}}/>
            <Input
            onChangeText={(e) => setPrice(e)}
            placeholder="Item Price"
            inputContainerStyle={{
              borderBottomWidth: 0,
              alignSelf: "center",
              height: 20,
              borderRadius: 10,
              marginTop: 15,
            }}
            containerStyle={{
              backgroundColor: "#dfe9e9",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            rightIcon={
              <TouchableOpacity
                style={{
                  height: 20,
                  width: 20,
                  borderWidth: 1,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>X</Text>
              </TouchableOpacity>
            }
          />
            </ScrollView>
          </View>
          <TouchableOpacity
          onPress={()=>{
           navigation?.navigate("AddMannullybyUSer",{total:Price,item:Name,GrouName:route?.params?.GrouName})
          }}
            style={styles.PlusButton}
          >
            <FontAwesome5Icon name="arrow-right" size={25} color={"black"} />
          </TouchableOpacity>
          <View style={styles.bottomLayerConaner}>
            <BottomLayer />
          </View>
        </View>
       
      </SafeAreaView>
    );
  };
  
  export default ItemForms;
  
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
      height: "65%",
      width: "90%",
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
      height: "15%",
      justifyContent: "center",
      alignItems: "center",
      bottom: 10,
    },
  });
  