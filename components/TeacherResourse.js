import React from "react";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";

import tw from "twrnc";
// import { blue, green } from "@mui/material/colors";

export default function TeacherResourseCard({ data }) {
  return (
    <View
      style={{
        paddingRight: 0,
        padding: 8,
        justifyContent: "flex-start",
        flexDirection: "row",
        flex: 1,
        backgroundColor: "#EDF9FF",

        borderRadius: 10,
        // margin: 1,
        marginBottom: 5,
        marginHorizontal: 4,
        paddingHorizontal: 4,
      }}
    >
      <View style={{ flexDirection: "column", width: "100%" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "normal",
              paddingBottom: 10,
              // backgroundColor:'red'
            }}
          >
            File Name:{" "}
            <Text
              style={{ fontSize: 17, fontWeight: "bold" }}
              numberOfLines={2}
            >
              {data?.cert_id}
            </Text>
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "normal",
              paddingBottom: 10,
              // backgroundColor:'green'
            }}
          >
            Type:{" "}
            <Text
              style={{ fontSize: 17, fontWeight: "bold", color: "blue" }}
              numberOfLines={2}
            >
              {data?.pre_name}{" "}
            </Text>
          </Text>
        </View>
        <View style={{ flexDirection: "row", paddingRight: 20 }}>
          <TouchableOpacity
            style={tw`border-red-100 border rounded-full p-1 bg-green-700 w-20 mr-2 `}
          >
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                color: "white",
              }}
            >
              Open
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`border-red-100 border rounded-full p-1 bg-red-500 w-20`}
            onPress={()=>console.log(data?.id)}
          >
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                color: "white",
              }}
            >
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
