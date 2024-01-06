import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import CourseDetailScreen from "../screens/CourseDetailScreen";
import CourseApplyScreen from "../screens/CourseApplyScreen";
import HomeScreen from "../screens/HomeScreen";
import { Image, View } from "react-native";
import Icon from "../../assets/icon.png";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TeacherDetailScreen from "../screens/TeacherDetailScreen";



const homeScreenName = "Courses List";
const coursDetailScreenName = "Course Details";
const applyCourseScreenName = "Apply Course Screen";
const teacherDetailScreenName = "Teacher Details";
const HomeStack = createStackNavigator();


export default function HomeStackScreen() {
    
  return (
    <HomeStack.Navigator initialRouteName={homeScreenName} screenOptions={{}}>
      <HomeStack.Screen
        name={homeScreenName}
        component={HomeScreen}
        options={{
          headerTitle: "",
          headerLeft: () => (
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
          )
        }}
      />
      
      <HomeStack.Screen
        name={coursDetailScreenName}
        component={CourseDetailScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name={applyCourseScreenName}
        component={CourseApplyScreen}
      />
      <HomeStack.Screen
        name={teacherDetailScreenName}
        component={TeacherDetailScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}
