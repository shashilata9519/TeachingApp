import React from "react";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";

import tw from "twrnc";
// import { blue, green } from "@mui/material/colors";

export default function StudentResourseCard({ data }) {
  const ContentView = ({ item }) => {
    return (
      //   <Text style={{ backgroundColor: "green" }}>
      //     <Text
      //       style={{
      //         fontSize: 17,
      //         fontWeight: "normal",
      //         paddingBottom: 10,
      //         // backgroundColor:'red'
      //       }}
      //     >
      //       File Name:{" "}
      //       <Text style={{ fontSize: 17, fontWeight: "bold" }} numberOfLines={2}>
      //         {data?.cert_id}
      //       </Text>
      //     </Text>
      //     <Text
      //       style={{
      //         fontSize: 17,
      //         fontWeight: "normal",
      //         paddingBottom: 10,
      //         // backgroundColor:'green'
      //       }}
      //     >
      //       Type:{" "}
      //       <Text
      //         style={{ fontSize: 17, fontWeight: "bold", color: "blue" }}
      //         numberOfLines={2}
      //       >
      //         {data?.pre_name}{" "}
      //       </Text>
      //     </Text>
      //   </Text>
      <View
        style={{
          backgroundColor: "#EAF5FB",
          flex: 1,
          paddingHorizontal: 10,
          paddingVertical:9,
          width: 300,
         marginVertical:5,
         marginStart:10,
         borderRadius:5
        }}
      >
         <View style={{flex:1,flexDirection: "row",justifyContent:'space-between'}}>
          <Text
            style={{
             
              fontWeight: "normal",
              paddingBottom: 10,
              // backgroundColor:'red'
            }}
          >
            File Name:{" "}
            <Text
              style={{ fontWeight: "bold" }}
              numberOfLines={2}
            >
              {item?.cert_id}
            </Text>
          </Text>
          <Text
            style={{
              
              fontWeight: "normal",
              paddingBottom: 10,
              // backgroundColor:'green'
            }}
          >
            Type:{" "}
            <Text
              style={{fontWeight: "bold", color: "blue" }}
              numberOfLines={2}
            >
              {item?.pre_name}{" "}
            </Text>
          </Text>
          <TouchableOpacity
            style={tw`border-red-100 border py-1 px-2 rounded-3xl bg-green-700 `}
          >
            <Text style={{ fontWeight: "bold", textAlign: "center",color:'white' }}>
              Open
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        paddingRight: 0,
        padding: 8,
        justifyContent: "flex-start",
        flexDirection: "row",
        flex: 1,
        backgroundColor: "#FFF",

        borderRadius: 10,
        // margin: 1,
        marginBottom: 5,
        marginHorizontal: 4,
        paddingHorizontal: 4,
      }}
    >
      <View style={{ flexDirection: "column", width: "100%" }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "normal",
              paddingBottom: 10,
              // backgroundColor:'red'
            }}
          >
            Teacher:{" "}
            <Text
              style={{ fontSize: 17, fontWeight: "bold" }}
              numberOfLines={2}
            >
              {data?.firstname}
            </Text>
          </Text>
        </View>
        <View style={{ paddingRight: 20 }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "normal",
              paddingBottom: 10,
              // backgroundColor:'green'
            }}
          >
            Resource:{" "}
            <Text>
              {data?.resource?.length > 0 ? (
                <View>
                  {data?.resource?.map((item, index) => (
                    <ContentView item={item} key={index} />
                  ))}
                </View>
              ) : (
                <Text>None provided by the teacher</Text>
              )}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
