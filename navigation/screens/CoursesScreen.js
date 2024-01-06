import axios, { formToJSON } from "axios";
import React, { useDebugValue, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import InfoView from "../../components/TeacherInfoView";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import CourseView from "../../components/CourseView";
import MeetingView from "../../components/MeetingView";
import { withNavigation } from "react-navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  joinClassOfTeacher,
  joinCustomClassLink,
  myCourses,
} from "../../Services/NetworkingService";
import LoginModal from "../../components/LoginModal";
import { useIsFocused } from "@react-navigation/native";
import TestingCard from "../../components/TestingCard";
import TestingCard2 from "../../components/TestingCard2";
import TestingCard3 from "../../components/TeacherResourse";
import TestingCard4 from "../../components/TestingCard4";
import tw from "twrnc";
import CourseCard from "../../components/CourseCard";

function CoursesScreen(props) {
  const [activeCourses, setActiveCourses] = useState([]);
  const [refresh,setRefresh]=useState(false)
  // console.log(activeCourses);

  useEffect(() => {
    myCourses()
      .then((response) => {
        setActiveCourses(response);
        setRefresh(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

  const ContentView = () => {
    return (
      <View>
        <View
          style={{
            width: useSafeAreaFrame().width,
          }}
        >
          {/* <Text style={{ color: "#000", fontSize: 20, fontWeight: 600, alignItems:"center", paddingTop:5 }}>   Courses</Text> */}
          <View
            style={{ flexDirection: "row", paddingTop: 20, paddingLeft: 10 }}
          >
            <View style={{ flexDirection: "row", paddingHorizontal: 8 }}>
              <TouchableOpacity
                style={tw`border-red-10 border rounded-full p-2 bg-blue-300  w-33`}
              >
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                  + Add Courses
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <FlatList
          style={{}}
          data={activeCourses}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return <CourseCard course={item} ActiveCourse={true} setRefresh={setRefresh} />;
          }}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        alignItems: "center",
        backgroundColor: "#EAF5FB",
      }}
    >
      <ContentView />
    </View>
  );
}

export default withNavigation(CoursesScreen);
