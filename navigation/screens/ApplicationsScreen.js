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
import StudentApplicationsCard from "../../components/StudentApplicationsCard";
import tw from "twrnc";

function ApplicationsScreen(props) {
  // getStudentApplications

  const [token, setToken] = useState();
  const [selectedTab, setSelectedTab] = useState("Ongoing");
  const isFocused = useIsFocused();
  console.log(selectedTab, "selectedTab");
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

  const fetchApplications = (tab) => {
    setRefreshing(true);

    // Define different API endpoints for each tab
    let endpoint;
    switch (tab) {
      // case "Pending":
      //   endpoint = "getStudentApplications";
      //   break;
      case "Ongoing":
        endpoint = "getStudentApplicationsPaid";
        break;
      case "Archived":
        endpoint = "getStudentApplicationsArchive";
        break;
      default:
        endpoint = "getStudentApplicationsPaid"; // Default to Pending
        break;
    }

    if (token) {
      instance
        .get(endpoint, {
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
  
  const onTabPress = (tab) => {
    setSelectedTab(tab);
    // Fetch data for the selected tab
    fetchApplications(tab);
  };

  // function fetchMeetings() {
  //   setRefreshing(true);
  //   // console.log(refreshing, "refreshing", token);
  //   if (token) {
  //     // console.log(refreshing, "refreshing2");
  //     instance
  //       .get("getStudentApplications", {
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchApplications(selectedTab);
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
          <View
            style={{ flexDirection: "row", paddingTop: 20, paddingLeft: 10 }}
          >
            {/* <View style={{ flexDirection: "row", paddingHorizontal: 15 }}>
              <Pressable
                style={tw`border-red-10 border rounded-full p-2 ${
                  selectedTab == "Pending" && "bg-blue-400"
                }  w-23`}
                onPress={() => onTabPress("Pending")} // Update tab press handler
                >
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                  Pending
                </Text>
              </Pressable>
            </View> */}
            <View style={{ flexDirection: "row", paddingHorizontal: 15 }}>
              <Pressable
                style={tw`border-red-10 border rounded-full p-2 ${
                  selectedTab == "Ongoing" && "bg-blue-400"
                } w-23`}
                onPress={() => onTabPress("Ongoing")}
              >
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                  Ongoing
                </Text>
              </Pressable>
            </View>
            <View style={{ flexDirection: "row", paddingHorizontal: 15 }}>
              <Pressable
                style={tw`border-red-10 border rounded-full p-2 ${
                  selectedTab == "Archived" && "bg-blue-400"
                } w-23`}
                onPress={() => onTabPress("Archived")}
              >
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                Completed
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        <ScrollView
          style={{ paddingTop: 6, width: "100%" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {applications?.map((application, index) => {
            return <StudentApplicationsCard key={index} data={application} />;
          })}
          {applications.length == 0 && <Text>None available, apply now!</Text>}
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

export default withNavigation(ApplicationsScreen);
