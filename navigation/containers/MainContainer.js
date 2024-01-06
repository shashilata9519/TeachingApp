import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import TeacherStackScreen from "./TeacherStackScreen";
import ChatStackScreen from "./ChatStackScreen";
import CourseStackScreen from "./CourseStackScreen";
import MainDrawer from "./MainDrawer";
import ProfileStackScreen from "./ProfileStackScreen";
import HomeStackScreen from "./../containers/HomeStackScreen";
import TestScreen from "../screens/TestScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import JoinMeetingView from "../screens/JoinMeetingScreen";


import ChatListScreen from "../screens/ChatListScreen";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const homeScreenName = "Home";
const coursesScreenName = "Courses";
const profileScreenName = "Menu";
const teachersScreenName = "Teachers";
const chatListName = "Chat";
const joinMeetingScreen = "Join Class";

function MainContainer() {
  const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const hideOnScreens = [SCREENS.REVIEW_ORDER, SCREENS.ORDER_PAYMENT]; // put here name of screen where you want to hide tabBar
    return hideOnScreens.indexOf(routeName) <= -1;
  };
  return (
    <>
      {/* <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStackScreen} />
        <Drawer.Screen name="Notifications" component={HomeStackScreen} />
      </Drawer.Navigator> */}
      <Tab.Navigator
        initialRouteName={homeScreenName}
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "#EAF5FB",
          tabBarItemStyle: { marginTop: 5, marginBottom: 5 },
          tabBarStyle: [
            { backgroundColor: "#003b43", borderTopColor: "#003b43" },
          ],
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;
            if (rn === homeScreenName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === coursesScreenName) {
              iconName = focused ? "list" : "list-outline";
            } else if (rn === teachersScreenName) {
              iconName = focused ? "people" : "people-outline";
            } else if (rn === chatListName) {
              iconName = focused ? "chatbox-ellipses" : "chatbox-ellipses-outline";
            } else if (rn === profileScreenName) {
              iconName = focused ? "person" : "person-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          unmountOnBlur:true
        })}
      >
        {/* <Tab.Screen name={homeScreenName} component={TestScreen} options={{ headerShown: false }} /> */}
        <Tab.Screen
          name={homeScreenName}
          component={HomeStackScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={coursesScreenName}
          component={CourseStackScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={teachersScreenName}
          component={TeacherStackScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen name={chatListName} component={ChatStackScreen} options={{ headerShown: false }} />
        <Tab.Screen
          name={profileScreenName}
          component={MainDrawer}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={joinMeetingScreen}
          component={JoinMeetingView}
          options={({ route }) => ({
            tabBarVisible: undefined,
            headerShown: false,
            tabBarStyle: { display: "none" },
            tabBarButton: () => null,
          })}
        />
      </Tab.Navigator>
    </>
  );
}

export default MainContainer;
