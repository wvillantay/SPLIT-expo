import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions,StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './Src/Screens/Splash';
import Login from './Src/Screens/Login';
import Signup from './Src/Screens/Signup';
import Home from './Src/Screens/Home';
import app from "./Src/Firebase"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import CreateGroup from './Src/Screens/CreateGroup';
import GroupDetail from './Src/Screens/GroupDetail';
import AddExpense from './Src/Screens/AddExpense';
import ScannedSlip from './Src/Screens/ScannedSlip';
import Calculatingsummary from './Src/Screens/Calculatingsummary';
import AddMannully from './Src/Screens/AddMannully';
import ItemForms from './Src/Screens/ItemsForms';
import AddMember from './Src/Screens/AddMember';
import AddMannullybyUSer from './Src/Screens/AddMunallybyuser';
export default function App() {
  const [loading, setisloading] = useState(true);
  const [user, setUser] = useState(null);
  const Stack = createNativeStackNavigator();
const auth =getAuth(app)


useEffect(()=>{
setTimeout(() => {
  setisloading(false)
}, 4000);
},[])


function onAuthStateChanged(user) {
  setUser(user);
  // if (loading) setisloading(false);
}
useEffect(() => {
  const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
  return subscriber; // unsubscribe on unmount
}, []);



console.log(user?.email);

  if (loading) return <Splash />

  return (
   <>
   <StatusBar barStyle={'dark-content'} backgroundColor="white" />
      <View style={{height: Dimensions.get('window').height}}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="CreateGroup" component={CreateGroup} />
            <Stack.Screen name="GroupDetail" component={GroupDetail} />
            <Stack.Screen name="AddExpense" component={AddExpense} />
            <Stack.Screen name="ScannedSlip" component={ScannedSlip} />
            <Stack.Screen name="Calculatingsummary" component={Calculatingsummary} />
            <Stack.Screen name="AddMannully" component={AddMannully} />
            <Stack.Screen name="ItemForms" component={ItemForms} />
            <Stack.Screen name="AddMember" component={AddMember} />
            <Stack.Screen name="AddMannullybyUSer" component={AddMannullybyUSer} />







          </Stack.Navigator>
        </NavigationContainer>
      </View>
   </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
