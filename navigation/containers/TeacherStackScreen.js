import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import TeacherListScreen from "../screens/TeacherListScreen";
import TeacherDetailScreen from "../screens/TeacherDetailScreen";
import CourseDetailScreen from '../screens/CourseDetailScreen'
import CourseApplyWithTeacherScreen from "../screens/CourseApplyWithTeacherScreen";
import { Image } from "react-native";
import Icon from '../../assets/icon.png'
import { useSafeAreaInsets } from "react-native-safe-area-context";

const teachersScreenName = 'Teachers List';
const teacherDetailScreenName = 'Teacher Details'
const courseDetailScreenName = 'Course Details'
const courseApplyWithTeacherScreenName = 'Apply Course with Teacher Screen'

const TeacherStack = createStackNavigator();

function TeacherStackScreen() {
    return (
      <TeacherStack.Navigator initialRouteName={teachersScreenName}>
        <TeacherStack.Screen name={teachersScreenName} component={TeacherListScreen} options={{ headerTitle: '', headerLeft: () => <Image source={Icon} style={{ width: 80, height: 44, marginLeft: 16, backgroundColor: '#fff' }} /> }} />
        <TeacherStack.Screen name={teacherDetailScreenName} component={TeacherDetailScreen} options={{ headerShown: false}} />
        <TeacherStack.Screen name={courseDetailScreenName} component={CourseDetailScreen} options={{ headerShown: false}} />
        <TeacherStack.Screen name={courseApplyWithTeacherScreenName} component={CourseApplyWithTeacherScreen} />
      </TeacherStack.Navigator>
    );
}

export default TeacherStackScreen;