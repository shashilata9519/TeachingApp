import axios, { formToJSON } from "axios";
import React, { useDebugValue, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  RefreshControl,
} from "react-native";
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
} from "../../Services/NetworkingService";
import LoginModal from "../../components/LoginModal";
import { useIsFocused } from "@react-navigation/native";
import TestingCard from "../../components/TestingCard";
import TestingCard2 from "../../components/TestingCard2";
// import TestingCard3 from "../../components/TeacherResourse";
import TestingCard4 from "../../components/TestingCard4";
import tw from "twrnc";

import StudentResourseCard from "../../components/StudentResourceCard";
// import TeacherResourseCard from "../../components/TeacherResourse";

function ResourcesScreen(props) {
  const [token, setToken] = useState();

  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused &&
      AsyncStorage.getItem("token")
        .then(setToken)
        .catch((error) => console.log(error));
  }, [isFocused]);
  const [refreshing, setRefreshing] = React.useState(false);
  var instance = axios.create({
    baseURL: "https://beta.xcool.in/api/",
  });
  const [resourse, setResourse] = useState([]);
  useEffect(() => {
    fetchMeetings();
  }, [isFocused, token]);

  function fetchMeetings() {
    setRefreshing(true);
    console.log(refreshing, "refreshing", token);
    if (token) {
      console.log(refreshing, "refreshing2");
      instance
        .get("getMyResources", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          setRefreshing(false);
          console.log(response?.data["data"]?.length, "resourse");
          setResourse(response?.data["data"]);
        })
        .catch((error) => {
          setRefreshing(false);
          console.log(error);
        });
    }
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchMeetings();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [token]);
  const ContentView = () => {
    return (
      <View>
        
        {/* Schedule */}
        {/* <ScrollView style={{ paddingTop: 6, width: "100%" }}>

          <TeacherResourse key={1} />
        </ScrollView> */}
        <ScrollView
          style={{ paddingTop: 6, width: "100%" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View
            style={{
              // padding: 16,
              // backgroundColor: "#FFF",
              borderRadius: 12,
              margin: 10,
              marginTop: 8,
              marginBottom: 8,
              width: 350,
            }}
          >
         
            {/* file 1 */}
            <View style={{ paddingBottom: 10, paddingTop: 10 }}>
              {/* <TouchableOpacity
                style={{
                  // paddingRight: ,
                  justifyContent: "center",

                  marginLeft: 0,
                }}
              > */}
                {resourse?.map((item, index) => {
                  return <StudentResourseCard key={index} data={item} />;
                })}
                {resourse?.length == 0 && <Text>None available</Text>}
              {/* </TouchableOpacity> */}
            </View>
          </View>
        </ScrollView>
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

export default withNavigation(ResourcesScreen);
