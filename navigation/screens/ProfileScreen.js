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
} from "../../Services/NetworkingService";
import LoginModal from "../../components/LoginModal";
import { useIsFocused } from "@react-navigation/native";
import InProgressBatchCard from "../../components/InProgressBatchCard";
import { RefreshControl } from "react-native";

function ProfileScreen(props) {
  var instance = axios.create({
    baseURL: "https://beta.xcool.in/api/",
  });
  const [token, setToken] = useState();
  const [userDetails, setUserDetails] = useState();
  const [meetings, setMeetings] = useState([]);
  const [shouldFetchMeetings, setShouldFetchMeetings] = useState(true);
  const [shouldDisplayLoginModal, showLoginModal] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [dataRefresh,setDataRefresh]=React.useState(false)
  

  const isFocused = useIsFocused();

  // Storage
  const removeToken = async () => {
    try {
      await AsyncStorage.setItem("token", "");
      await AsyncStorage.setItem("phone", "");
      await AsyncStorage.setItem("email", "");
      setToken(null);
    } catch (error) {
      console.log(error);
    }
  };
  async function storeDetails(type, value) {
    await AsyncStorage.setItem("type", String(value));
    // onSuccess(value);
  }

  useEffect(() => {
    isFocused &&
      AsyncStorage.getItem("token")
        .then(setToken)
        .catch((error) => console.log(error));
  }, [isFocused]);
  useEffect(() => {
    storeDetails("type", String(isTeacher));
    // AsyncStorage.setItem("type", isTeacher);
  }, [isTeacher]);
  useEffect(() => {
    token && fetchUserDetails();
  }, [token]);
  useEffect(() => {
    fetchMeetings();
  }, [userDetails,dataRefresh]);

  // console.log(isTeacher, "isTeacher");

  // Networking
  function fetchUserDetails() {
    instance
      .get("myself", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setIsTeacher(response?.data?.data?.is_teacher == 1);
        console.log("type", response?.data?.data?.is_teacher == 1);
        storeDetails("type", Boolean(response?.data?.data?.is_teacher == 1));
        // AsyncStorage.setItem("type", Boolean(response?.data?.data?.is_teacher == 1));
        setUserDetails(response.data?.data);
      })
      .catch((error) => console.log(error));
  }
  function fetchMeetings() {
    setRefreshing(true);
    console.log(refreshing);
    if (userDetails) {
      instance
        .get(isTeacher ? "getTeacherBatches" : "getStudentApplicationsPaid", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          setRefreshing(false);
          setDataRefresh(false)
          setMeetings(response.data["data"]);
          setShouldFetchMeetings(false);
        })
        .catch((error) => {
          setRefreshing(false);
          setDataRefresh(false)
          console.log(error);
        });
    }
  }

  function showMeetingDetials(meeting) {
    console.log("details:", meeting);
  }
  function joinMeeting(meeting) {
    if (isTeacher) {
      if (userDetails?.details?.custom_link_use_xcool == true) {
        props.navigation.navigate("Join Class", {
          id: `${userDetails?.name}-${userDetails?.jm_uuid}`,
        });
        //   joinClassOfTeacher(meeting?.teacher?.name);
      } else {
        joinCustomClassLink(meeting?.teacher?.details?.custom_link);
      }
    } else {
      if (meeting?.teacher?.details?.custom_link_use_xcool == true) {
        props.navigation.navigate("Join Class", {
          // id: meeting?.teacher?.name,
          id: `${meeting?.teacher?.name}-${meeting?.teacher?.jm_uuid}`,
        });
        //   joinClassOfTeacher(meeting?.teacher?.name);
      } else {
        joinCustomClassLink(meeting?.teacher?.details?.custom_link);
      }
    }
  }

  const ContentView = () => {
    return (
      <View>
        <View
          style={{
            width: useSafeAreaFrame().width,
            backgroundColor: "#2F5290",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {userDetails && (
            <>
              <InfoView
                title={userDetails.firstname + " " + userDetails.lastname}
                subtitle={userDetails.email}
                imagePath={userDetails.dp}
              />
              <View
                style={{
                  alignSelf: "center",
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 6,
                  paddingBottom: 16,
                }}
              >
                <Pressable
                  onPress={() => {
                    removeToken();
                    setUserDetails(null);
                    showLoginModal(true);
                  }}
                >
                  <Text style={{ color: "tomato" }}>Logout</Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
        {/* Schedule */}
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchMeetings} />
          }
          style={{ paddingTop: 6, width: "100%" }}
        >
          <View>
            {meetings.map((meeting, index) => {
              return (
                <InProgressBatchCard
                  key={index}
                  isTeacher={isTeacher}
                  details={meeting}
                  onDetailsButtonPress={() =>
                    props.navigation.navigate("Meeting Detail Screen", {
                      details,
                    })
                  }
                  setDataRefresh={setDataRefresh}
                  onJoinButtonPress={() => joinMeeting(meeting)}
                />
              );
            })}
            {meetings.length == 0 && (
              <Text>No Batches available, apply now!</Text>
            )}
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
      {token ? (
        <ContentView />
      ) : (
        <LoginModal
          allowBackgroundInteraction={true}
          isVisible={!token}
          onCancel={() => {
            token && showLoginModal(false);
          }}
          onSuccess={(newToken) => {
            setToken(newToken);
            showLoginModal(false);
          }}
        />
      )}
    </View>
  );
}

export default withNavigation(ProfileScreen);
