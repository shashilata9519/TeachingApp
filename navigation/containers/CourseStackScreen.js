import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CourseListScreen from "../screens/CourseListScreen";
import CourseDetailScreen from "../screens/CourseDetailScreen";
import CourseApplyScreen from "../screens/CourseApplyScreen";
import { Image } from "react-native";
import Icon from '../../assets/icon.png'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TeacherDetailScreen from "../screens/TeacherDetailScreen";

const coursesScreenName = 'Courses List';
const coursDetailScreenName = 'Course Details'
const applyCourseScreenName = 'Apply Course Screen'
const teacherDetailScreenName = 'Teacher Details'
const CourseStack = createStackNavigator();

export default function CourseStackScreen() {
    return <CourseStack.Navigator initialRouteName={coursesScreenName}>
        <CourseStack.Screen name={coursesScreenName} component={CourseListScreen} options={{ headerTitle: '', headerLeft: () => <Image source={Icon} style={{ width: 80, height: 44, marginLeft: 16, backgroundColor: '#fff' }} /> }} />
        <CourseStack.Screen name={coursDetailScreenName} component={CourseDetailScreen} options={{ headerShown: false}} />
        <CourseStack.Screen name={applyCourseScreenName} component={CourseApplyScreen} />
        <CourseStack.Screen name={teacherDetailScreenName} component={TeacherDetailScreen} options={{ headerShown: false}} />
    </CourseStack.Navigator>
}