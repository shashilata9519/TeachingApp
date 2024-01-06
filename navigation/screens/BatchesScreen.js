import axios, { formToJSON } from "axios";
import React, { useDebugValue, useEffect, useState } from "react";
import { View, Text, RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { withNavigation } from "react-navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import StudentBatchCard from "../../components/StudentBatchCard";
import CompletedBatchCard from "../../components/CompletedBatchCard";
function BatchesScreen(props) {
  const [token, setToken] = useState();
  const [isTeacher, setIsTeacher] = useState(false);
  const isFocused = useIsFocused();

  AsyncStorage.getItem("token")
    .then(setToken)
    .catch((error) => console.log(error));
  AsyncStorage.getItem("type")
    .then(setIsTeacher)
    .catch((error) => console.log(error));

  const [refreshing, setRefreshing] = React.useState(false);
  var instance = axios.create({
    baseURL: "https://beta.xcool.in/api/",
  });

  const [batches, setBatches] = useState([]);
  useEffect(() => {
    fetchMeetings();
  }, [isFocused, token, isTeacher]);

  function fetchMeetings() {
    console.log(refreshing, "refreshing", token);
    if (token) {
      console.log(refreshing, "refreshing2");
      instance
        .get("getStudentCompletedBatch", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          // setRefreshing(false);
          // console.log(response, isTeacher, "batches");
          setBatches(response?.data["data"]);
        })
        .catch((error) => {
          // setRefreshing(false);
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
      
        <ScrollView
          style={{ paddingTop: 6, width: "100%" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {batches.map((batch, index) => {
            return (
              // <TestingCard key={index} data={batch} />
              // <StudentBatchCard key={index} data={batch} />
              <CompletedBatchCard
                key={index}
                isTeacher={false}
                details={batch}
              />
              // <TeacherBatchCard key={index} data={batch} />
            );
          })}
          {batches.length == 0 && (<Text>None available, apply now!</Text>)}
          {/* <StudentBatchCard key={index} data={batch} /> */}
        </ScrollView>
      
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

export default withNavigation(BatchesScreen);
