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
import TestingCard3 from "../../components/TeacherResourse";
import TestingCard4 from "../../components/TestingCard4";
import tw from "twrnc";

function JoinClassScreen(props) {

  
  
  const ContentView = () => {
    return (
      <View>
        <View
          style={{
            width: useSafeAreaFrame().width,
            
          }}
        >
           <Text style={{ color: "#000", fontSize: 20, fontWeight: 600, alignItems:"center", paddingTop:5 }}>   Join Class</Text>
           {/* <View style={{flexDirection: 'row',paddingTop:20, paddingLeft:10, }}>
                                <View style={{flexDirection: 'row', paddingHorizontal:8 }}>
                                        <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-blue-300  w-40`}>
                                                <Text style={{fontWeight:"bold", textAlign:"center"}}>Upload Document</Text>
                                        </TouchableOpacity>
                                </View>
                                <View style={{flexDirection: 'row', paddingHorizontal:15 }}>
                                        <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-lime-500  w-23`}>
                                                <Text style={{fontWeight:"bold", textAlign:"center"}}>Paid</Text>
                                        </TouchableOpacity>
                                </View>
                                <View style={{flexDirection: 'row', paddingHorizontal:15 }}>
                                        <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-blue-300  w-23`}>
                                                <Text style={{fontWeight:"bold", textAlign:"center"}}>Archived</Text>
                                        </TouchableOpacity>
                                </View>
                               
            </View> */}
        </View>
        {/* Schedule */}
        <ScrollView style={{ paddingTop: 6, width: "100%" }}>
          
              {/* <TestingCard
                key={1}
              />
              <TestingCard2
                key={1}
              /> */}
              {/* <TestingCard3
                key={1}
              /> */}
              {/* <TestingCard4
                key={1}
              />
            */}
          
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

export default withNavigation(JoinClassScreen);
