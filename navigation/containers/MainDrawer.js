import { NavigationContainer } from "@react-navigation/native";
import React, { useDebugValue, useEffect, useState } from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TestScreen from "../screens/TestScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useDrawerStatus } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { getDrawerStatusFromState } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import axios, { formToJSON } from "axios";
import BatchesScreen from "../screens/BatchesScreen";
import BatchesScreenT from "../screens/BatchesScreenT";
import ApplicationsScreen from "../screens/ApplicationsScreen";
import ResourcesScreen from "../screens/ResourcesScreen";
import RequestScreen from "../screens/RequestScreen";

// import UpdateClassLinkScreen from "../screens/BatchesScreen";

// import TransactionsScreen from "../screens/TransactionsScreen";
// import LogoutScreen from "../screens/LogoutScreen";
import JoinMeetingView from "../screens/JoinMeetingScreen";
import { useIsFocused } from "@react-navigation/native";
import ProfileStackScreen from "./ProfileStackScreen";
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
import Icon from "../../assets/icon.png";
import ApplicationsScreenT from "../screens/ApplicationsScreenT";
import ResourceScreenT from "../screens/ResourceScreenT";
import CoursesScreen from "../screens/CoursesScreen";
import TransactionsScreen from "../screens/TransactionsScreen";
const homeScreenName = "Home";
const coursesScreenName = "Courses";
const profileScreenName = "Profile";
const teachersScreenName = "Teachers";
const chatScreenName = "Chat";

function MainDrawer() {
  const [token, setToken] = useState(AsyncStorage.getItem("token"));
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isTeacher, setIsTeacher] = useState(false);
  var instance = axios.create({
    baseURL: "https://beta.xcool.in/api/",
  });

  function fetchUserDetails() {
    instance
      .get("myself", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setIsTeacher(response?.data?.data?.is_teacher == 1);
        // console.log("type", response?.data?.data?.is_teacher == 1);
      })
      .catch((error) => console.log(error));
  }
  fetchUserDetails();
  // console.log(isTeacher, typeof isTeacher, "isTeacher");

  

  AsyncStorage.getItem("token")
    .then(setToken)
    .catch((error) => console.log(error));


  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          // unmountOnBlur: true,
          headerShown: true,
          // headerTitle: "",
          drawerPosition: "left",
          // headerLeft: () => (
          //   <View>
          //     <Image
          //       source={Icon}
          //       style={{
          //         width: 80,
          //         height: 44,
          //         marginLeft: 16,
          //         backgroundColor: "#fff",
          //       }}
          //     />
          //   </View>
          // ),
        }}
      >
        {token ? (
          isTeacher ? (
            <>
              {/* <Drawer.Screen
              component={ProfileStackScreen}
              name={"Ongoing Batches"}
            /> */}

              <Drawer.Screen
                component={ProfileStackScreen}
                name={"Ongoing Batches"}
              />
              <Drawer.Screen
                component={BatchesScreenT}
                name={"Completed Batches"}
              />
              <Drawer.Screen
                component={ApplicationsScreenT}
                name={"Applications"}
              />
              <Drawer.Screen component={ResourceScreenT} name={"Resources"} />
              <Drawer.Screen component={CoursesScreen} name={"Courses"} />
              <Drawer.Screen component={TransactionsScreen} name={"Transactions"} />
              {/* <Drawer.Screen component={ChatScreen} name={"Chat"} /> */}
              {/* <Drawer.Screen
                component={JoinMeetingView}
                name={"Join Class"}
                options={{
                  drawerItemStyle: { height: 0 },
                }}
              /> */}

              {/* <Drawer.Screen component={StudentProfile} name={"My Profile"} /> */}
              {/* <Drawer.Screen component={BatchesScreenT} name={"T Batches"} /> */}

              {/* <Drawer.Screen
                component={PurchaseHistoryScreen}
                name={"Purchase History"}
              /> */}
              {/* <Drawer.Screen component={ChatScreen} name={"Chat"} /> */}
            </>
          ) : (
            <>
              <Drawer.Screen
                component={ProfileStackScreen}
                name={"My Courses"}
              />
              <Drawer.Screen
                component={BatchesScreen}
                name={"Completed Courses"}
              />
              <Drawer.Screen component={RequestScreen} name={"Demo Requests"} />

              {/* <Drawer.Screen
                component={ApplicationsScreen}
                name={"Applications"}
              /> */}
              <Drawer.Screen component={ResourcesScreen} name={"Resources"} />
             
              {/* <Drawer.Screen
                component={JoinMeetingView}
                name={"Join Class"}
                options={{
                  drawerItemStyle: { height: 0 },
                }}
              /> */}

              {/* <Drawer.Screen component={ResourcesScreen} name={"Resources"} /> */}
            </>
          )
        ) : (
          <Drawer.Screen component={ProfileStackScreen} name={"Login"} />
        )}

        {/* <Drawer.Screen component={CoursesScreen} name={"Courses"} /> */}
        {/* <Drawer.Screen component={JoinClassScreen} name={"Join Class"} /> */}
        {/* <Drawer.Screen component={UpdateClassLinkScreen} name={"Update Class Link"} />
        
        <Drawer.Screen component={TransactionsScreen} name={"Transactions"} />
        <Drawer.Screen component={LogoutScreen} name={"Logout"} /> */}
      </Drawer.Navigator>
    </>
  );
}

export default MainDrawer;
