import axios, { formToJSON } from "axios";
import React, { useDebugValue, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Pressable,RefreshControl } from "react-native";
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
import StudentApplicationsCard from "../../components/StudentApplicationsCard";
import tw from "twrnc";
import TeacherApplicationsCard from "../../components/TeacherApplicationsCard";

function ApplicationsScreenT(props) {
  // getStudentApplications

  const [token, setToken] = useState();
  const [selectedTab, setSelectedTab] = useState("Paid");
  const isFocused = useIsFocused();
  // console.log(selectedTab,"selectedTab");
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

  const [applications, setApplications] = useState([]);
  useEffect(() => {
    fetchApplications(selectedTab);
  }, [isFocused, token, selectedTab]);

  // function fetchMeetings() {
  //   setRefreshing(true);
  //   console.log(refreshing, "refreshing", token);
  //   if (token) {
  //     console.log(refreshing, "refreshing2");
  //     instance
  //       .get("getTeacherApplications", {
  //         headers: { Authorization: "Bearer " + token },
  //       })
  //       .then((response) => {
  //         setRefreshing(false);
  //         console.log(response?.data["data"]?.length, "batches");
  //         setApplications(response?.data["data"]);
  //       })
  //       .catch((error) => {
  //         setRefreshing(false);
  //         console.log(error);
  //       });
  //   }
  // }
  
  const fetchApplications = (tab) => {
    setRefreshing(true);

    // Define different API endpoints for each tab
    // let endpoint;
    // switch (tab) {
    //   case "Pending":
    //     endpoint = "getTeacherApplications";
    //     break;
    //   case "Paid":
    //     endpoint = "getTeacherApplicationsPaid";
    //     break;
    //   case "Archived":
    //     endpoint = "getTeacherApplicationsArchive";
    //     break;
    //   default:
    //     endpoint = "getTeacherApplications"; // Default to Pending
    //     break;
    // }

    if (token) {
      instance
        .get("getTeacherApplicationsPaid", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          setRefreshing(false);
          // console.log(response?.data["data"]?.length, "applications");
          setApplications(response?.data["data"]);
        })
        .catch((error) => {
          setRefreshing(false);
          console.log(error);
        });
    }
  }
   
  // const onTabPress = (tab) => {
  //   setSelectedTab(tab);
  //   // Fetch data for the selected tab
  //   fetchApplications("getTeacherApplicationsPaid");
  // };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchApplications("getTeacherApplicationsPaid");
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
         
           {/* <View
            style={{ flexDirection: "row", paddingTop: 20, paddingLeft: 10 }}
          >
            <View style={{ flexDirection: "row", paddingHorizontal: 15 }}>
              <Pressable
                style={tw`border-red-10 border rounded-full p-2 ${selectedTab=="Pending" && "bg-amber-500"}  w-23`}
                onPress={() => onTabPress("Pending")}
              >
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                  Pending
                </Text>
              </Pressable>
            </View>
            <View style={{ flexDirection: "row", paddingHorizontal: 15 }}>
              <Pressable
                style={tw`border-red-10 border rounded-full p-2 ${selectedTab=="Paid" && "bg-amber-500"} w-23`}
                onPress={() => onTabPress("Paid")}
              >
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                  Paid
                </Text>
              </Pressable>
            </View>
            <View style={{ flexDirection: "row", paddingHorizontal: 15 }}>
              <Pressable
                style={tw`border-red-10 border rounded-full p-2 ${selectedTab=="Archived" && "bg-amber-500"} w-23`}
                onPress={() => onTabPress("Archived")}
              >
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                  Archived
                </Text>
              </Pressable>
            </View>
          </View>  */}
        </View>
        <ScrollView
          style={{ paddingTop: 6, width: "100%" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {applications.map((application, index) => {
            return <TeacherApplicationsCard key={index} data={application} />;
          })}
          {applications.length == 0 && (<Text>None available, apply now!</Text>)}
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

export default withNavigation(ApplicationsScreenT);
