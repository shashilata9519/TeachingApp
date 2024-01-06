import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

export default function ChatListCard({ item }) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "column",
        marginBottom: 4,
        paddingHorizontal: 3,
      }}
    >
      <View style={{ marginBottom: 5 }}>
        <TouchableOpacity
          style={tw`border-red-10 p-0 w-88 `}
          onPress={() =>
            navigation.navigate("chatScreen", {
              chatItemData: item?.item,
            })
          }
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: 4,
              marginLeft: 8,
              marginBottom: 4,
              width: 290,
            }}
          >
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                borderColor: "#E8EAED",
                borderWidth: 1,
                marginRight: 8,
              }}
              source={{
                uri:
                  item?.item?.messageable?.dp ||
                  "https://xcool.s3.ap-south-1.amazonaws.com/images/lpddATIs8JiE61c5FByWdjTwjDfaVDXGcN1IKdhB.png",
              }}
            />
            <View>
              <Text
                style={tw` font-bold text-TouchableOpacity text-lg pt-3.5 pl-4 `}
              >
                {item?.item?.messageable?.firstname}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
