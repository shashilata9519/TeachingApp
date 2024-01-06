import React from "react";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment, { Moment } from "moment/moment";
import InfoView from "./TeacherInfoView";
import { ScrollView } from "react-native-gesture-handler";
import { GenerateTextColor, statusStudent } from "../Services/Utils";

export default function CompletedBatchCard(props) {
  const { details, isTeacher } = props;
  var status = statusStudent(details);

  const {
    course,
    is_demo_req,
    teacher,
    batch,
    class_count,
    fees,
    is_accepted,
    batch_name,
    start_date,
    end_date,
    batch_classes,
    invitation,
  } = details;

  //   Student Completed Batch Card

  return (
    <View
      style={{
        padding: 16,
        backgroundColor: "#FFF",
        borderRadius: 12,
        margin: 16,
        marginTop: 8,
        marginBottom: 8,
      }}
    >
      {/* Title */}
      <View style={{ flexDirection: "row", marginBottom: 4 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          {course?.course_name || 'to be filled'} 
        </Text>
        {is_demo_req == 1 ? (
          <View
            style={{
              marginLeft: 8,
              backgroundColor: "gray",
              borderRadius: 8,
              padding: 8,
              paddingBottom: 4,
              paddingTop: 4,
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 14, color: "#FFFFFF" }}
            >
              Demo
            </Text>
          </View>
        ) : null}
      </View>
      {/* Info */}
      {isTeacher == false ? (
        <View style={{ flexDirection: "row", marginTop: 4, marginBottom: 4 }}>
          <Image
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              borderColor: "#E8EAED",
              borderWidth: 1,
              marginRight: 8,
            }}
            source={{ uri: teacher?.dp }}
          />
          <View>
            <Text style={{ fontSize: 14 }}>by {teacher?.firstname}</Text>
            <Text style={{ fontSize: 14 }}>{batch_name}</Text>
            <Text style={{ fontSize: 14 }}>{class_count} Classes</Text>
          </View>
        </View>
      ) : (
        <View style={{ marginBottom: 4 }}>
          <Text style={{ fontSize: 14 }}>Batch: {batch_name || 'to be filled'} </Text>
          {/* <Text style={{ fontSize: 14 }}>Students: 1</Text> */}
        </View>
      )}
      {/* Dates */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 4,
          marginBottom: 4,
        }}
      >
        <View>
          <Text style={{ fontSize: 14 }}>Start Date</Text>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            {moment(batch?.start_date ?? start_date, "YYYY-MM-DD")
              .locale("en")
              .format("dddd DD MMM, YYYY")}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 14 }}>End Date</Text>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            {moment(batch?.end_date ?? end_date, "YYYY-MM-DD")
              .locale("en")
              .format("dddd DD MMM, YYYY")}
          </Text>
        </View>
      </View>
      {/* Fees & Application */}
      {isTeacher == false ? (
        <View style={{ marginTop: 4, marginBottom: 4 }}>
          {fees != 0 ? (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                Fees: ₹{fees}
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "bold" }}></Text>
            </View>
          ) : null}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 14 }}>
              Application Status :{" "}
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",

                  color: GenerateTextColor(status),
                }}
              >
                {" "}
                {status}
              </Text>
            </Text>
          </View>
        </View>
      ) : null}
      {/* Schedule */}
      {(isTeacher ? batch_classes : details?.class) && (
        <ScrollView
          horizontal={true}
          style={{ marginTop: 4, marginBottom: 4, flexDirection: "row" }}
        >
          {(isTeacher ? batch_classes : details?.class).flatMap(
            (item, index) => {
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
                    style={{ marginBottom: 2, marginTop: 2, fontWeight: "500" }}
                  >
                    {moment(
                      item?.date ?? item?.class_date,
                      isTeacher ? "YYYY-MM-DD" : "DD-MM-YYYY"
                    )
                      .locale("en")
                      .format("MMM DD YYYY")}
                  </Text>
                  <Text
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                    style={{ marginBottom: 2, marginTop: 2, fontWeight: "500" }}
                  >
                    {moment(item?.class_datetime ?? item?.date_and_time + "Z")
                      .locale("en")
                      .format("h:mm A")}
                  </Text>
                  {/* <View
                    style={{
                      backgroundColor: item?.is_cancelled
                        ? "#aa2e26"
                        : "#dee9fc",
                      borderRadius: 4,
                      padding: 4,
                      marginTop: 2,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        fontWeight: "500",
                        color: item?.is_cancelled ? "#FFFFFF" : "#000000",
                      }}
                    >
                      {item?.is_cancelled
                        ? "Cancelled"
                        : item?.status_t ?? item?.batch_classes?.status_t
                        ? item?.batchclass?.status_t
                        : "Scheduled"}
                    </Text>
                  </View> */}
                   <View>
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
                      ) : item?.status_t == "Completed" && (
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
                      ) }
                    </View>
                </View>
              );
            }
          )}
        </ScrollView>
      )}
      {/* Students */}
      {isTeacher && invitation && (
        <ScrollView
          horizontal={true}
          style={{ marginTop: 4, marginBottom: 4, flexDirection: "row" }}
        >
          {invitation.flatMap((item, index) => {
            return (
              <View
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor: "#2F5290",
                  borderRadius: 8,
                  alignItems: "center",
                  alignContent: "center",
                  padding: 8,
                  marginRight: 8,
                  width: 132,
                }}
              >
                <Image
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    borderColor: "#E8EAED",
                    borderWidth: 1,
                  }}
                  source={{ uri: item?.student?.dp }}
                />
                <Text
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}
                  style={{ marginBottom: 2, fontWeight: "500" }}
                >
                  {item?.student?.firstname + " " + item?.student?.lastname}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                    style={{ marginBottom: 2, marginTop: 2, fontWeight: "500" }}
                  >
                    ₹{item?.fees}
                  </Text>
                </View>
                {isTeacher == false ? (
                  <View
                    style={{
                      backgroundColor: "#dee9fc",
                      borderRadius: 4,
                      padding: 4,
                      marginTop: 2,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        fontWeight: "500",
                      }}
                    >
                      Scheduled
                    </Text>
                  </View>
                ) : null}
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}
