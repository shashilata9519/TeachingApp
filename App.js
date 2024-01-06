import React, { useDebugValue, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Image, View } from "react-native";
import MainDrawer from "./navigation/containers/MainDrawer";
import MainContainer from "./navigation/containers/MainContainer";
import ProfileStackScreen from "./navigation/containers/ProfileStackScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useDrawerStatus } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useIsDrawerOpen } from '@react-navigation/drawer'
const Drawer = createDrawerNavigator();
import Icon from "./assets/icon.png";
import TestScreen from "./navigation/screens/TestScreen";
import { getDrawerStatusFromState } from '@react-navigation/drawer';
export default function App() {
  
  return (
    <NavigationContainer>
      {/* <Drawer.Navigator
        screenOptions={{
          headerShown: true,
          headerTitle: "",
          headerRight: () => (
            <View>
              <Image
                source={Icon}
                style={{
                  width: 80,
                  height: 44,
                  marginLeft: 16,
                  backgroundColor: "#fff",
                }}
              />
            </View>
          ),
        }}
      >
        <Drawer.Screen component={MainContainer} name={"Home"} />

        {token ? (
          <Drawer.Screen component={TestScreen} name={"Profile"} />
        ) : (
          <Drawer.Screen component={MainContainer} name={"Login"} />
        )}
      </Drawer.Navigator> */}
     {/* <MainDrawer /> */}
     <MainContainer />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
