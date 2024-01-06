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
import TestingCard from "../../components/TestingCard";
import TestingCard2 from "../../components/TestingCard2";
// import TestingCard3 from "../../components/TeacherResourse";
import TestingCard4 from "../../components/TestingCard4";

function TestScreen(props) {

  
  
  const ContentView = () => {
    return (
      <View>
        <View
          style={{
            width: useSafeAreaFrame().width,
            backgroundColor: "#2F5290",
          }}
        >
           <Text style={{ color: "black" }}>Test</Text>
          
        </View>
        {/* Schedule */}
        <ScrollView style={{ paddingTop: 6, width: "100%" }}>
          
              {/* <TestingCard
                key={1}
              /> */}
              <TestingCard2
                key={1}
              />
              {/* <TestingCard3
                key={1}
              /> */}
              <TestingCard4
                key={1}
              />
           
          
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

export default withNavigation(TestScreen);
