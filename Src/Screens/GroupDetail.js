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
import app from "..//Firebase";

const GroupDetail = ({ navigation, route }) => {
  const [isShow, setisShow] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [items, setitem] = useState(undefined);
  const [member, setmember] = useState([]);
  const [TextReaded, setTextReaded] = useState("");
  const db = getFirestore(app);

  const getItem = async () => {
    const docRef = doc(db, "Item", route?.params?.GrouName);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };

  const getMember = async () => {
    const docRef = doc(db, "Permission", route?.params?.GrouName);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };

  useEffect(() => {
    getItem().then((res) => {
      setitem(res);
    });
    getMember().then((res) => {
      setmember(res?.users);
    });
  }, []);

  let permember=0
   if(items==undefined){
permember=0
  }else{
    permember=items?.price / member?.length;
  } 



  console.log(items);
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
        <Text style={styles.myGroup}>{route?.params?.GrouName}</Text>
        <View style={styles.MyGroupSpace}>
          <Text style={{ ...styles.myGroup, fontSize: 18 }}>Transactions</Text>
          <View
            style={{
              height: "26%",
              backgroundColor: "#EAF0F7",
              elevation: 1,
              borderRadius: 10,
              top: 5,
              justifyContent: "center",
            }}
          >
            <Text style={{ left: 20,marginTop:10 }}>{items?.paid+" "+"Paid for"+"\n "}</Text>
            <ScrollView>
              {items != undefined
                ?items?.item?.map((val)=>{
            return(<Text style={{ left: 20 }}>
              {val?.name}
            </Text>)
               
                })
                : items == undefined
                ? <Text>"There are no transactions to display"</Text>
                : ""}
            </ScrollView>
            
          </View>

          <Text style={{ ...styles.myGroup, fontSize: 16, marginTop: 15 }}>
            Settle Debts
          </Text>
          <View
            style={{
              height: "26%",
              backgroundColor: "#EAF0F7",
              elevation: 1,
              borderRadius: 10,
              top: 5,
              justifyContent: "center",
            }}
          >
            <ScrollView>
              {member?.map((member) => {
                // console.log(member?.name, "....");
                return (
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{ left: 20, marginTop: 10 }}
                    >{`${items?.paid}>>>>>-${member?.name}`}</Text>
                    <Text style={{ marginTop: 10 ,right:10}}>{"$" + permember}</Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          <Text style={{ ...styles.myGroup, fontSize: 16, marginTop: 20 }}>
            Total Expense
          </Text>
          <View
            style={{
              height: 50,
              backgroundColor: "#EAF0F7",
              elevation: 1,
              borderRadius: 10,
              top: 5,
              justifyContent: "center",
            }}
          >
            <Text style={{ left: 20 }}>
              {items != undefined ? "$" + items?.price : "$0"}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("AddExpense", route?.params)}
          style={styles.PlusButton}
        >
          <FontAwesome5Icon name="plus" size={25} color={"#4461F2"} />
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

export default GroupDetail;

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
    // backgroundColor: "#b0c4de",
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
});
