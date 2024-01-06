import React from "react";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment, { Moment } from "moment/moment";
import InfoView from "./TeacherInfoView";
import { ScrollView } from "react-native-gesture-handler";
import { GenerateTextColor, statusStudent } from "../Services/Utils";
import { Alert } from "react-native";
import { cancelClass, completeClass, completeClassStudent } from "../Services/NetworkingService";
import RescheduleClassModal from "./RescheduleClassModal";
import { useState } from "react";

export default function InProgressBatchCard(props) {
  const { details, isTeacher, setDataRefresh } = props;
  var status = statusStudent(details);
  const [selectedId,setselectedId]=useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);
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
  // console.log(details?.class,'details')

  const modalHandler = ({ type, id }) => {
    console.log(type, "==", id);
    switch (type) {
      case "cancelClass":
        Alert.alert(
          "Cancel Class",
          `Are you sure you want to cancel this class?`,
          [
            {
              text: "No",
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: async () => {
                console.log(id);
                const res = await cancelClass(id);
                if (res?.success) {
                  setDataRefresh(true);
                }
                console.log(res, "cancel class");
              },
            },
          ]
        );
        break;
      case "completeClass":
        Alert.alert("Complete Class", `Did you finish the class ?`, [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: async () => {
              console.log(id);
              const res = await completeClass(id);
              if (res?.success) {
                setDataRefresh(true);
              }
              console.log(res?.success, "complete class");
            },
          },
        ]);
        break;
      case "rescheduleClass":
        setselectedId(id)
        setIsModalVisible(true);
        break;
        case "completeStudentClass":
          Alert.alert("Complete the Class", `Do you want to mark this class as completed?`, [
            {
              text: "No",
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: async() => {
                const res = await completeClassStudent(id);
              if (res?.success) {
                setDataRefresh(true);
              }
              console.log(res?.success, "complete class");
              },
            },
          ]);
          break;

      default:
        break;
    }
  };

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
          {course?.course_name || "to be filled"}
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
          <Text style={{ fontSize: 14 }}>Batch: {batch_name}</Text>
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
              .format("dddd DD MMM, YYYY") === "Invalid date"
              ? "to be filled"
              : moment(batch?.start_date ?? start_date, "YYYY-MM-DD")
                  .locale("en")
                  .format("dddd DD MMM, YYYY")}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 14 }}>End Date</Text>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            {moment(batch?.end_date ?? end_date, "YYYY-MM-DD")
              .locale("en")
              .format("dddd DD MMM, YYYY") === "Invalid date"
              ? "to be filled"
              : moment(batch?.end_date ?? end_date, "YYYY-MM-DD")
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
              {/* <Text style={{ fontSize: 14, fontWeight: "bold" }}></Text> */}
            </View>
          ) : null}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 14 }}>
              Application Status:{" "}
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
            {/* <Text
              style={{ fontSize: 14, fontWeight: "bold", color: "#e87e39" }}
            >
              {course?.is_approved
                ? "Paid"
                : is_accepted
                ? "Accepted"
                : "unknown"}
            </Text> */}
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
              // console.log("****",item?.class_datetime,"****")
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
                   {moment(item?.class_datetime || item?.batchclass?.class_datetime + "Z").format("MMM Do YYYY")}
                  </Text>
                  <Text
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                    style={{ marginBottom: 2, marginTop: 2, fontWeight: "500" }}
                  >
                    {moment(item?.class_datetime || item?.batchclass?.class_datetime + "Z").format("h:mm A")}
                    {/* {item?.class_datetime} */}
                    {/* {moment()
                      } */}
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
                        : item?.status_t ?? "Scheduled"}
                    </Text>
                  </View> */}
                  {isTeacher ? (
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
                      ) : item?.status_t == "Completed" ? (
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
                      ) : (
                        <View style={{ display: "flex", flexDirection: "row" }}>
                          <TouchableOpacity
                            onPress={() =>
                              modalHandler({
                                type: "cancelClass",
                                id: item?.class_id,
                              })
                            }
                          >
                            <Text>
                              <Ionicons
                                name={"close-circle"}
                                size={30}
                                color={"red"}
                              />
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              modalHandler({
                                type: "completeClass",
                                id: item?.id,
                              })
                            }
                          >
                            <Text>
                              <Ionicons
                                name={"checkmark-circle"}
                                size={30}
                                color={"green"}
                              />
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              modalHandler({
                                type: "rescheduleClass",
                                id: item?.class_id,
                              })
                            }
                          >
                            <Text>
                              <Ionicons
                                name={"swap-vertical"}
                                size={30}
                                color={"blue"}
                              />
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  ) : (
                    <View>
                      {item?.batchclass?.status_s == "Completed" ? (
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
                      ) : (
                        <View style={{ display: "flex", flexDirection: "row" }}>
                          <TouchableOpacity
                            onPress={() =>
                              modalHandler({
                                type: "completeStudentClass",
                                id: item?.id,
                              })
                            }
                          >
                            <Text>
                              <Ionicons
                                name={"checkmark-circle"}
                                size={30}
                                color={"green"}
                              />
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  )}
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
      {/* Actions */}
      <View
        style={{
          height: 44,
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
       
       
        <View
          style={{
            backgroundColor: "#2A87BB",
            borderRadius: 12,
            width: "100%",
          }}
        >
          <Pressable onPress={props.onJoinButtonPress}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 14,
                color: "#FFFFFF",
                padding: 12,
                fontWeight: "bold",
              }}
            >
              Join Class
            </Text>
          </Pressable>
        </View>
      </View>
      {isModalVisible && (
        <RescheduleClassModal
          isVisible={true}
         
          onCancel={() => setIsModalVisible(false)}
          data={selectedId}
          onSuccess={() => {
         
            setIsModalVisible(false);
            setDataRefresh(true)
            
          }}
        />
      )}

      {/* Date Time */}
      {/* <View style={{ marginLeft: -8, marginRight: -8, borderTopEndRadius: 12, borderTopStartRadius: 12, padding: 16, paddingBottom: 8, paddingTop: 8, backgroundColor: '#B6D0E2'}}>
            <Text style={{ fontSize: 14 }}>{moment(date, "DD-MM-YYYY").format("DD MMM, YYYY dddd")}</Text>
        </View>
        <View style={{ padding: 8, paddingTop: 8 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{moment(date_and_time).format("hh:mm A")} - {moment(end_date_and_time).format("hh:mm A")}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ width: '95%', fontSize: 17 }} numberOfLines={2}>{class_name}</Text>
                <Ionicons name={'chevron-forward-outline'} size={16} />
            </View>
            <Text style={{ width: '95%', fontSize: 14 }}>{teacher?.firstname}</Text>
            
        </View> */}
    </View>
  );
}
