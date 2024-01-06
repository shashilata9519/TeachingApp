import React from "react";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment, { Moment } from "moment/moment";
import tw from "twrnc";

export default function TestingCard(props) {
  const setDays = [
    {
      id: 1,
      day: "Sun ",
    },
    {
      id: 2,
      day: "Mon ",
    },
    {
      id: 3,
      day: "Tue ",
    },
    {
      id: 4,
      day: "Wed ",
    },
    {
      id: 5,
      day: "Thur ",
    },
    {
      id: 6,
      day: "Fri ",
    },
    {
      id: 7,
      day: "Sat ",
    },
  ];
  const getDayName = (index) => {
    const dayObj = setDays.find((day) => day.id === index);
    return dayObj ? dayObj.day : "Invalid Day";
  };
  const cardData = props.data;
  return (
    <View
      style={{
        padding: 16,
        backgroundColor: "#FFF",
        borderRadius: 12,
        margin: 16,
        marginTop: 8,
        marginBottom: 8,
        width: 350,
      }}
    >
      <View style={{ paddingBottom: 10, paddingTop: 10 }}>
        <TouchableOpacity
          style={{
            paddingRight: 10,
            justifyContent: "center",
            // backgroundColor: "#a9a9a9",
            borderRadius: 10,
            marginLeft: 0,
          }}
        >
          <View
            style={{ flexDirection: "column", marginBottom: 4, marginLeft: 5 }}
          >
            <Text style={{ fontSize: 15, fontWeight: "normal" }}>
              Applied at:{" "}
              <Text
                style={{ fontSize: 15, fontWeight: "bold" }}
                numberOfLines={2}
              >
                {moment(cardData?.created_at)
                  .locale("en")
                  .format("dddd DD MMM, YYYY")}
              </Text>
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "normal" }}>
              Course:{" "}
              <Text
                style={{ fontSize: 15, fontWeight: "bold" }}
                numberOfLines={2}
              >
                {cardData?.course_name ? cardData?.course_name : "Any"}
              </Text>
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "normal" }}>
              Genre:{" "}
              <Text
                style={{ fontSize: 15, fontWeight: "bold" }}
                numberOfLines={2}
              >
                {cardData?.genre_name ? cardData?.genre_name : "Any"}
              </Text>
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "normal" }}>
              Teacher:{" "}
              <Text
                style={{ fontSize: 15, fontWeight: "bold" }}
                numberOfLines={2}
              >
                {cardData?.teacher_name ? cardData?.teacher_name : "Any"}
              </Text>
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "normal" }}>
              Fee:{" "}
              <Text
                style={{ fontSize: 15, fontWeight: "bold" }}
                numberOfLines={2}
              >
                500-1000
              </Text>
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "normal" }}>
              Time:{" "}
              <Text
                style={{ fontSize: 15, fontWeight: "bold" }}
                numberOfLines={2}
              >
                {cardData?.time_pref ? cardData?.time_pref : "Any"}
              </Text>
            </Text>
            <Text
              style={{ fontSize: 15, fontWeight: "normal", paddingBottom: 15 }}
            >
              Day:{" "}
              <Text
                style={{ fontSize: 15, fontWeight: "bold" }}
                numberOfLines={2}
              >
                {cardData?.day_pref
                  ? cardData?.day_pref
                      ?.split(",")
                      .map(Number)
                      .map((index) => getDayName(index))
                      .join(", ")
                  : "Any"}
              </Text>
            </Text>
            {/* <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                paddingBottom: 5,
                paddingLeft: 10,
              }}
            >
              <TouchableOpacity
                style={tw`border-red-10 border rounded-full p-2 bg-blue-300 w-20 mr-2 `}
              >
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`border-red-10 border rounded-full p-2 bg-red-500 w-20`}
              >
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={tw`border-red-100 border py-1 px-2 rounded-3xl bg-red-700 `}
      >
        <Text
          style={{ fontWeight: "bold", textAlign: "center", color: "white" }}
        >
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );
}
