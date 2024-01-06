import { View, Text } from "react-native";
import React from "react";
import moment from "moment";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";

export default function TransactionCard({ i, type, currentMonthIndex }) {
  return (
    <View>
      {type === "payin" && (
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
          <Text
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            Course : {i?.course?.course_name}
          </Text>
          <Text
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            Batch : {i?.batch?.batch_name}
          </Text>
          <Text
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            Student : {i?.student?.firstname}
          </Text>
          <Text
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            Classes : {i?.class?.length}
          </Text>
          <ScrollView
            horizontal={true}
            style={{ marginTop: 4, marginBottom: 4, flexDirection: "row" }}
          >
            {(i?.class).flatMap((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    borderWidth: 1,
                    borderColor: "#e87e39",
                    borderRadius: 8,
                    alignItems: "center",
                    padding: 8,
                    marginRight: 8,
                    width: 100,
                    backgroundColor: `${
                      moment(item?.batchclass?.class_date).month() ===
                      currentMonthIndex
                        ? item?.batchclass?.status_t === "Completed"
                          ? "#e6ffe6"
                          : ""
                        : "lightgray"
                    }`,
                  }}
                >
                  <Text
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                    style={{ marginBottom: 2, fontWeight: "500" }}
                  >
                    Class {index + 1}
                  </Text>
                  <Text
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                    style={{
                      marginBottom: 2,
                      marginTop: 2,
                      fontWeight: "500",
                    }}
                  >
                    {moment(item?.date_and_time + "Z").format("MMM Do YYYY")}
                  </Text>
                  {item?.batchclass?.is_cancelled ? (
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        fontWeight: "500",
                        color: "#FFFFFF",
                        backgroundColor: "#aa2e26",
                        borderRadius: 4,
                        padding: 4,
                      }}
                    >
                      Cancelled
                    </Text>
                  ) : item?.batchclass?.status_t ? (
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        fontWeight: "500",
                        color: "#FFFFFF",
                        backgroundColor: "#07bc0c",
                        borderRadius: 4,
                        padding: 4,
                      }}
                    >
                      T {item?.batchclass?.status_t}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        fontWeight: "500",
                        color: "#FFFFFF",
                        backgroundColor: "#aa2e26",
                        borderRadius: 4,
                        padding: 4,
                      }}
                    >
                      Scheduled
                    </Text>
                  )}
                  {item?.batchclass?.status_s && (
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        fontWeight: "500",
                        color: "#FFFFFF",
                        backgroundColor: "#07bc0c",
                        borderRadius: 4,
                        padding: 4,
                        marginTop: 5,
                      }}
                    >
                      S {item?.batchclass?.status_s}
                    </Text>
                  )}

                  {/* <Text
                      adjustsFontSizeToFit={true}
                      numberOfLines={1}
                      style={{
                        marginBottom: 2,
                        marginTop: 2,
                        fontWeight: "500",
                      }}
                    >
                      {moment(item?.class_datetime ?? item?.date_and_time + "Z")
                        .locale("en")
                        .format("h:mm A")}
                    </Text> */}

                  {/* <View>
                      {item?.is_cancelled === 1 ? (
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 14,
                            fontWeight: "500",
                            color: "#FFFFFF",
                            backgroundColor: "#aa2e26",
                            borderRadius: 4,
                            padding: 4,
                          }}
                        >
                          Cancelled
                        </Text>
                      ) : (
                        item?.status_t == "Completed" && (
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 14,
                              fontWeight: "500",
                              color: "#000000",
                              backgroundColor: "#dee9fc",
                              borderRadius: 4,
                              padding: 4,
                            }}
                          >
                            Completed
                          </Text>
                        )
                      )}
                    </View> */}
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}
      {type === "payout" && (
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
          <Text
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {" "}
            {moment(i?.created_at).format("MMM Do YYYY")}
          </Text>
          <Text
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            Status : {i?.status}
          </Text>
          <Text
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            Amount :{i?.currency} {i?.amount / 100}
          </Text>
          <Text
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            Payment Mode : {i?.mode}
          </Text>
          <Text
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            Fees :{i?.currency} {i?.fees}
          </Text>
        </View>
      )}
    </View>
  );
}
