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
import TestingCard3 from "../../components/TeacherResourse";
import TestingCard4 from "../../components/TestingCard4";
import StudentBatchCard from "../../components/StudentBatchCard";
import TeacherBatchCard from "../../components/TeacherBatchCard";
import CompletedBatchCard from "../../components/CompletedBatchCard";

function BatchesScreenT(props) {
  const [token, setToken] = useState();
  const [isTeacher, setIsTeacher] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    isFocused &&
      AsyncStorage.getItem("token")
        .then(setToken)
        .catch((error) => console.log(error));
    AsyncStorage.getItem("type")
      .then(setIsTeacher)
      .catch((error) => console.log(error));
  }, [isFocused]);
  const [refreshing, setRefreshing] = React.useState(false);
  var instance = axios.create({
    baseURL: "https://beta.xcool.in/api/",
  });

  const [batches, setBatches] = useState([]);
  // console.log(batches,'batch')
  useEffect(() => {
    fetchMeetings();
  }, [isFocused, token]);
  function fetchMeetings() {
    setRefreshing(true);
    console.log(refreshing, "refreshing", token);
    if (token) {
      console.log(refreshing, "refreshing2");
      instance
        // .get(
        //   isTeacher ? "getTeacherCompletedBatches" : "getStudentCompletedBatch",
        //   {
        //     headers: { Authorization: "Bearer " + token },
        //   }
        //   )
          .get("getTeacherCompletedBatches", {
            headers: { Authorization: "Bearer " + token },
          })
        .then((response) => {
          setRefreshing(false);
          console.log(response?.data["data"]?.length, "batches");
          setBatches(response?.data["data"]);
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
        <View
          style={{
            width: useSafeAreaFrame().width,
          }}
        >
           {/* <Text style={{ color: "#000", fontSize: 20, fontWeight: 600, alignItems:"center",  paddingTop:5 }}>Batches</Text> */}
          
        </View>
        {/* Schedule */}
        <ScrollView
          style={{ paddingTop: 6, width: "100%" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {batches.map((batch, index) => {
            return (
              <CompletedBatchCard
              key={index}
              isTeacher={true}
              details={batch}
            />
              // <TestingCard key={index} />
              // <StudentBatchCard key={index} data={batch} />
              // <TeacherBatchCard 
              // key={1} />
            );
          })}
          
          {/* <TestingCard2
                key={1}
              />
              <TestingCard3
                key={1}
              />
              <TestingCard4
                key={1}
              /> */}
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

export default withNavigation(BatchesScreenT);
