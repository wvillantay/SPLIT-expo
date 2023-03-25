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
  import { Input } from "react-native-elements";
  import React, { useEffect, useState } from "react";
  import BottomLayer from "..//Assets/BottomLayer.svg";
  import Logo from "../Assets/Logo.svg";
  import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
   import app from "..//Firebase";

  import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    doc,
    getDoc,
    updateDoc
  } from "firebase/firestore";
  const AddMember = ({navigation,route}) => {
    const [userName, setname] = useState("");
    const [name, setn] = useState("");
    const db = getFirestore(app);


console.log(route?.params);

    // await setDoc(doc(db, "data", "one"), docData);
    const addmember= async()=>{
      if(userName==""){
        alert("enter user email")
      }else{

        const docRef = doc(db, "Permission", route?.params?.GrouName);
        const docSnap = await getDoc(docRef);        
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          const users=docSnap.data()?.users
          users.push({name:name,email:userName})
          await updateDoc(doc(db, "Permission", route?.params?.GrouName), {
          users:users,
          })
            .then((res)=>{
              const params={
                ...route?.params,
                FriendsList:[...route?.params?.FriendsList,{email:userName}]
              }
              setDoc(doc(db, "groups", route?.params?.uid), 
                params
              ).then(()=>{
             Alert.alert("Success !","Member added")
             navigation?.navigate("Home")
  
              })
           setname("")
          }).catch((e)=>{
            console.log(e,"ee");
          })
        } else {
          await setDoc(doc(db, "Permission", route?.params?.GrouName), {
            users : [{name:name,email:userName}]
          })
          .then((res)=>{
            const params={
              ...route?.params,
              FriendsList:[...route?.params?.FriendsList,{email:userName}]
            }
            setDoc(doc(db, "groups", route?.params?.uid), 

              params
            ).then(()=>{
           Alert.alert("Success !","Member added")
           navigation?.navigate("Home")


            })
              
           setname("")
          }).catch((e)=>{
            console.log(e,"ee");
          })
          console.log("No such document!");
        }


       
      }
     
    }
   
  
 
  
  
    
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
          <Text style={styles.myGroup}> {"Edit Member to"+" "+route?.params?.groupname} </Text>
          <View style={{ height: "65%", top: 15 }}>
            <ScrollView style={{width:"90%",alignSelf:"center"}}>
            <Input
            onChangeText={(e) => setname(e)}
            placeholder="Enter Member Email Account"
            inputContainerStyle={{
              borderBottomWidth: 0,
              alignSelf: "center",
              height: 20,
              borderRadius: 10,
              marginTop: 15,
            }}
            value={userName}
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

<View
style={{height:30}}
/>
<Input
            onChangeText={(e) => setn(e)}
            placeholder="Enter Name"
            inputContainerStyle={{
              borderBottomWidth: 0,
              alignSelf: "center",
              height: 20,
              borderRadius: 10,
              marginTop: 15,
            }}
            value={name}
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
            addmember()
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
  
  export default AddMember;
  
  const styles = StyleSheet.create({
    Logo: {
      height: "10%",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
    },
    myGroup: { color: "black", fontWeight: "bold", left: 25, fontSize: 16 },
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
  