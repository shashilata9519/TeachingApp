import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";

export default function TeacherIntroCard({
  props,
  selectedCategory,
  para,
  selectedSubCategory,
  uri,
  course,
  title,
}) {
  const styles = StyleSheet.create({
    cardContainer: {
      justifyContent: "center",
      display: "flex",
      alignSelf: "flex-start",
      backgroundColor: "#FFFFFF",
      borderRadius: 8,
      padding: 16,
      margin: 8,
      shadowColor: "#000000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      width: 290,
      height: 420,
    },
    imageContainer: {
      flex: 1,
      marginRight: 16,
    },
    textContainer: {
      flex: 2,
    },
    cardImage: {
      width: 100, // Set the width as needed
      height: 100, // Set the height as needed
      borderRadius: 50, // Set half of the width or height to make the image round
      marginBottom: 8,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333333",
    },
    cardDescription: {
      fontSize: 14,
      marginTop: 8,
      color: "#666666",
    },
  });
  //   console.log(props?.navigation)
  return (
    <View style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Image
          source={{
            uri: uri,
          }}
          style={styles.cardImage}
        />

        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription} numberOfLines={6}>
          {para}
        </Text>

        <View style={tw`flex flex-row`}>
          <Text style={tw`text-sm font-bold mt-6`}>Courses Offered</Text>
          <View>
            {selectedCategory != null || selectedSubCategory != null ? (
              <TouchableOpacity
                style={{
                  paddingTop: 18,
                  alignSelf: "flex-start",
                  paddingLeft: 16,
                  paddingRight: 16,
                  left: 10,
                }}
                onPress={() => props?.navigation?.navigate("Courses")}
              >
                <View
                  style={{
                    padding: 8,
                    backgroundColor: "#2A87BB",
                    borderRadius: 12,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "#FFFFFF" }}>
                    {" "}
                    View Profile{" "}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        <Text style={tw`text-[#333333]  text-sm mt-2`}>{course}</Text>
      </View>
    </View>
  );
}
