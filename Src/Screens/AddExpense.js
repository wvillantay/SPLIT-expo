import {
    SafeAreaView,
    StyleSheet,
    View,
    Dimensions,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import BottomLayer from "..//Assets/BottomLayer.svg";
  import Logo from "../Assets/Logo.svg";
  import LeftArrow from "../Assets/LeftArrow.svg";

  import HomeImage from "../Assets/HomeImage.svg";
  import ProfileImage from "../Assets/ProfileImage.svg";
  import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
  import PermissionPop from "../Components/AlertModal";

  const AddExpense = ({ navigation,route }) => {
    const [isShow, setisShow] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [allGroups, setallGroups] = useState([]);
    const [image, setimage] = useState(null);
    const [TextReaded, setTextReaded] = useState("");
      
    
   
  
  console.log(route?.params,"...");
    
  
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
            <TouchableOpacity
            onPress={()=>navigation.goBack()}
            >
            <LeftArrow
            style={{right:100}}
            />
            </TouchableOpacity>
            <Logo />
          </View>
          <Text style={styles.myGroup}>Add Expense</Text>
          <View style={styles.MyGroupSpace}>
          
          <TouchableOpacity style={{height:50,width:"90%",backgroundColor:"#4461F2",alignSelf:"center",borderRadius:8,alignItems:"center",justifyContent:"center"}}>
<Text style={{textAlign:"center",color:"white",}}>Add manually</Text>
          </TouchableOpacity>
<Text style={{textAlign:"center",fontSize:22,fontWeight:"bold"}}>OR</Text>
          <TouchableOpacity 
          onPress={()=>{
            navigation?.navigate("ScannedSlip",route?.params)
          }}
          style={{height:50,width:"90%",backgroundColor:"#4461F2",alignSelf:"center",borderRadius:8,alignItems:"center",justifyContent:"center"}}>
<Text style={{textAlign:"center",color:"white",}}>Scan a Receipt</Text>
          </TouchableOpacity>

          </View>
  
       
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
  
  export default AddExpense;
  
  const styles = StyleSheet.create({
    Logo: {
      height: "10%",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
      flexDirection:"row"
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
      height: "68%",
      backgroundColor: "#EAF0F7",
      width: "90%",
      marginTop: 15,
      borderRadius: 20,
      alignSelf: "center",
      justifyContent:"space-around"
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
  });
  