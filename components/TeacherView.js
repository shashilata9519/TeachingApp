import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { calculateTeacherFee } from "../Services/Utils";

export default function TeacherView(props) {
  const { id, firstname, dp, details, rateph } = props.teacher;
  const Location = props.Location;
  

  // const getTeacherFee = () => {
  //   if (Location?.countryCode === "IN") {
  //     const newRate = ((details?.rateph || 500) * 1.1).toFixed(1);
  //     return parseFloat(newRate);
  //   } else {
  //     let usdRate = details?.usd_rateph || 20;
  //     usdRate = (usdRate / 83) * 1.25;
  //     if (usdRate <= 20) {
  //       usdRate = 20;
  //     }
  //     const newRate = usdRate.toFixed(1);
  //     const num = parseFloat(newRate);
  //     return Math.ceil(num);
  //   }
  // };

  return (
    <View key={id}>
      <View
        style={{
          backgroundColor: "#FFF",
          borderRadius: 12,
          padding: 16,
          alignItems: "center",
        }}
      >
        <Image
          style={{
            backgroundColor: "#FFF",
            borderColor: "#E8EAED",
            borderWidth: 1,
            width: 120,
            height: 120,
            borderRadius: 60,
          }}
          source={{ uri: dp ?? props.teacher?.teacher?.dp }}
        />
        <View style={{ marginTop: 8, height: 76, justifyContent: "center" }}>
          <Text
            style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}
            numberOfLines={2}
            adjustsFontSizeToFit={true}
          >
            {firstname ?? props.teacher?.teacher?.firstname}
          </Text>
          {/* <Text style={{ textAlign: "center", fontSize: 13 }}>
            Location: {city}
          </Text> */}
          <Text style={{ textAlign: "center", fontSize: 13 }}>
            Fees starting at
          </Text>
          <Text
            style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}
          >
            {Location?.countryCode === "IN" ? "Rs. " : "$ "}
            {Location?.countryCode === "IN"
              ? calculateTeacherFee(
                  details?.rateph || 500,
                  Location?.countryCode
                )
              : calculateTeacherFee(
                  details?.usd_rateph || 20,
                  Location?.countryCode
                )}
            {/* {getTeacherFee()} */}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#2A87BB",
            marginTop: 8,
            marginBottom: 8,
            borderRadius: 12,
            width: "100%",
          }}
        >
          <Pressable onPress={props.onApply}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 14,
                color: "#FFFFFF",
                padding: 12,
                fontWeight: "bold",
              }}
            >
              Book Now
            </Text>
          </Pressable>
        </View>
        <View style={{ width: "100%" }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 14,
              color: "#2A87BB",
              fontWeight: "bold",
            }}
          >
            Show Profile
          </Text>
        </View>
      </View>
    </View>
  );
}
