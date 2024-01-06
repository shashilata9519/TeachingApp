import { View, Text } from "react-native";
import React from "react";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const InvoiceCard = ({ i }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        marginLeft: 16,
        marginRight: 16,
        margin: 8,
        backgroundColor: "#FFF",
        borderRadius: 12,
        maxWidth: 400,
        justifyContent: "space-between",
        borderWidth: 0.5,
        padding: 16,
        paddingBottom: 16,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Date:{moment(i?.invoice_date).format("MMM Do YYYY")}</Text>
        <TouchableOpacity
          onPress={() => {
            // Navigate to the next screen and pass data
            navigation.navigate("InvoiceDetailScreen", { invoice: i?.id })
          }}
        >
          <Text
            style={{ color: "white", backgroundColor: "#2A87BB", padding: 5 }}
          >
            View Details
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        Invoice Id : {i?.id}
      </Text>
      <Text
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        Amount : {i?.invoice_total}
      </Text>
      <Text
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        Payment Status : {i?.paymeny_status}
      </Text>
    </View>
  );
};

export default InvoiceCard;
