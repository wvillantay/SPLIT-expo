import {
    SafeAreaView,
    StyleSheet,
    View,
    Dimensions,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
  } from "react-native";
  import app from "..//Firebase";
  import { Input } from "react-native-elements";
  import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
  import React, { useEffect, useState } from "react";
  import BottomLayer from "..//Assets/BottomLayer.svg";
  import Logo from "../Assets/Logo.svg";
  import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
  import PermissionPop from "../Components/AlertModal";
  import { useIsFocused } from "@react-navigation/native";
  import * as ImagePicker from "expo-image-picker";
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    doc,
    getDoc,
    updateDoc,
  } from "firebase/firestore";
  const AddMannullybyUSer = ({ navigation, route }) => {
    const [isShow, setisShow] = useState(false);
    const [price, setprice] = useState(0);
    const [name, setname] = useState("item");
    const [GrouName, setGrouName] = useState("");
    const [Pascode, setPascode] = useState("");
    const [Name, setName] = useState("");
    const [Friend, setFriend] = useState("");
    const [FriendsList, setFriendsList] = useState([]);
    const Auth = getAuth(app);
    const db = getFirestore(app);
    const isFocused=useIsFocused()
  const {ScannedText}=route?.params
   console.log(ScannedText?.total);
  
    const addmember = async () => {
      
      if (price == 0) {
        alert("Enter Price");
      } else if (name == "") {
        alert("Enter Item name");
      } else {
        await setDoc(doc(db, "Item", route?.params?.GrouName), {
          item: [{
            name:name,
            price:price
          }],
        price: price,
        paid:Name?.name
        })
          .then((res) => {
            Alert.alert("Success !", "Item added");
            navigation?.navigate("Home")
       
          })
          .catch((e) => {
            console.log(e, "ee");
            Alert.alert("Sorry","something Wrong")
          });
      }
    };
  
  
  const getdata=async()=>{
      const docRef = doc(db, "userprofiles", getAuth(app)?.currentUser.uid);
          const docSnap = await getDoc(docRef);
          // console.log(docSnap.data());
          setName(docSnap.data())
  }
  
    useEffect(() => {
      setname(route?.params?.item==undefined?"item":route?.params?.item);
      setprice(route?.params?.total);
  
  getdata()
  
  
    }, [isFocused]);
  
  console.log(Name?.name);
  
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
          <Text style={styles.myGroup}>Add Expense</Text>
          <View style={{ height: "65%", top: 15 }}>
            <ScrollView style={{}}>
              {["1"].map((val) => {
                return (
                  <View
                    style={{
                      width: "90%",
                      height: 100,
                      borderWidth: 1,
                      alignSelf: "center",
                      flexDirection: "row",
                      marginTop:10
                    }}
                  >
                    <View
                      style={{
                        width: "35%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text>{name}</Text>
                    </View>
                    <View
                      style={{
                        width: "65%",
                        height: "100%",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Text>{"$" + price}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          navigation?.navigate("ItemForms", route?.params)
                        }
                      >
                        <FontAwesome5Icon name="pen" />
                      </TouchableOpacity>
  
                      <TouchableOpacity
                        onPress={() =>
                          navigation?.navigate("AddMember", route?.params)
                        }
                      >
                        <FontAwesome5Icon name="user" />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <TouchableOpacity
            onPress={() => addmember()
            }
            style={styles.PlusButton}
          >
            <FontAwesome5Icon name="arrow-right" size={25} color={"black"} />
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
  
  export default AddMannullybyUSer;
  
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
  