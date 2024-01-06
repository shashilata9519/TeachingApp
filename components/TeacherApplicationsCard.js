import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment, { Moment } from "moment/moment";
import InfoView from "./TeacherInfoView";
import {
  GenerateTextColor,
  statusStudent,
  statusTeacher,
} from "../Services/Utils";
import { ScrollView } from "react-native-gesture-handler";
import tw from "twrnc";
import { green } from "@mui/material/colors";
import ScheduleBatchModal from "./ScheduleBatchModal";
export default function TeacherApplicationsCard(props) {
  const item = props.data;
  // console.log(item?.student?.firstname)
  var status = statusTeacher(item);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleArchive = (id, status) => {
    switch (status) {
      case "Invited":
        Alert.alert(
          "Invitation Confirmation",
          `Are you sure you want to accept this invitation? (ID: ${id}, Status: ${status})`,
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Accept",
              onPress: () => {
                archiveItem(id);
              },
            },
          ]
        );
        break;
      case "Rejected":
        Alert.alert(
          "Reject Confirmation",
          `Are you sure you want to reject this invitation? (ID: ${id}, Status: ${status})`,
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Submit,",
              onPress: () => {
                archiveItem(id);
              },
            },
          ]
        );
        break;
      case "Payment Due":
        Alert.alert("Payment Due", ` (ID: ${id}, Status: ${status})`, [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Accept",
            onPress: () => {
              archiveItem(id);
            },
          },
        ]);
        break;
      case "Applied":
        Alert.alert(
          "Archive Confirmation",
          `Are you sure you want to archive this item? (ID: ${id}, Status: ${status})`,
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Archive",
              onPress: () => {
                archiveItem(id);
              },
            },
          ]
        );
        break;
      case "Paid":
        setIsModalVisible(true);
        break;
      case "Cancel":
        console.log(`*****schedule cancel*****id : ${id}`);
      
      default:
        break;
    }
  };

  const archiveItem = (id) => {
    console.log(`Archiving item with ID: ${id}`);
  };
  const renderActionButton = (title, backgroundColor, onPress) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={tw`border-red-10 border rounded-full p-1 ${backgroundColor}  w-23`}
      >
        <Text
          style={{ fontWeight: "bold", textAlign: "center", color: "white" }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
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
        width: 350,
      }}
    >
      {/* Title */}
      <View style={{ flexDirection: "column", marginBottom: 4 }}>
        {/* <Text style={{ fontSize: 17, fontWeight: "bold", textAlign: "center" }}>
          {item ? item?.course?.course_name : ""}
        </Text> */}

        <View
          style={{
            flexDirection: "row",

            marginTop: 4,
            marginBottom: 4,
            width: 290,
          }}
        >
          <Image
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              borderColor: "#E8EAED",
              borderWidth: 1,
              marginRight: 8,
            }}
            source={{
              uri: item?.student?.dp
                ? item?.student?.dp
                : "https://xcool.s3.ap-south-1.amazonaws.com/images/lpddATIs8JiE61c5FByWdjTwjDfaVDXGcN1IKdhB.png",
            }}
          />
          <View>
            <Text style={tw` text-base pt-0 `}>
              <Text style={tw` font-bold text-orange-400 text-base pt-0 `}>
                {item?.student?.firstname}{" "}
              </Text>
              Applied for
            </Text>

            <Text style={tw`font-normal text-black text-base`}>
              {item?.course?.course_name || "to be filled"}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "normal" }}>
              on Batch{" "}
              <Text
                style={{ fontSize: 15, fontWeight: "bold" }}
                numberOfLines={2}
              >
                {item?.batch?.batch_name || "to be filled"}
              </Text>
            </Text>
            {/* <Text style={{ fontSize: 15, fontWeight: "normal" }}>
              Class End Date:
              <Text
                style={{ fontSize: 15, fontWeight: "bold" }}
                numberOfLines={2}
              >
                {moment(item?.batch?.end_date)
                  .locale("en")
                  .format("MMM Do YYYY")}
              </Text>
            </Text> */}
            {/* <Text style={{ fontSize: 14, fontWeight:'bold' }}>Gandharva Prarambhik Year 1</Text> */}
            {/* <View style={{paddingTop: 20, }}>
                        <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-blue-300  w-20`}>
                                <Text style={{fontWeight:"bold", textAlign:"center"}}>Chat ...</Text>
                        </TouchableOpacity> 
                        </View> */}
          </View>
        </View>
        <View
          style={{ flex: 1, height: 1, backgroundColor: "black", marginTop: 5 }}
        />
        {/* <Text style={{ paddingTop: 10, paddingBottom: 10 }}>
          --------------------------------------------------------------------------
        </Text> */}
        <View>
          <View style={tw`left-0 top-0`}>
            {/* <View style={{flexDirection: "column", paddingEnd:55 }}>
                        <Text style={{fontSize: 17, fontWeight: 'bold'}}>Custom Date</Text>
                        <Text style={{fontSize: 14,fontWeight: 'normal', textAlign:"center" }} >Morning</Text>
                    </View> */}
          </View>
          <View style={{ textAlign: "center" }}>
            <View
              style={{ flexDirection: "row", paddingTop: 10, paddingLeft: 25 }}
            >
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "bold",
                    paddingBottom: 0,
                    paddingTop: 0,
                  }}
                >
                  Fees: {item?.currency === "USD" ? "$. " : "Rs. "}
                  {item?.fees || item?.usd_fees || 0}
                </Text>

                {/* <TouchableOpacity
                style={tw`border-red-10 border rounded-full p-2 bg-amber-500 w-30`}
              >
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                  View Details
                </Text>
              </TouchableOpacity> */}
              </View>

              <View style={{ flexDirection: "column", paddingLeft: 25 }}>
                <Text
                  style={{ fontSize: 17, fontWeight: "bold", paddingBottom: 2 }}
                >
                  Application Status
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    textAlign: "center",
                    paddingBottom: 10,
                    color: GenerateTextColor(status),
                  }}
                >
                  {status}
                </Text>
                <View style={{ paddingBottom: 5, alignItems: "center" }}>
                  {(status === "Applied" || status === "Demo") && (
                    <>
                      {renderActionButton("Accept", "bg-blue-500 mb-1", () => {
                        handleArchive(item?.id, status);
                      })}
                      {renderActionButton("Reject", "bg-red-500", () => {
                        handleArchive(item?.id, status);
                      })}
                    </>
                  )}
                  {status === "Invited" && (
                    <>
                      {renderActionButton(
                        "Cancel Demo",
                        "bg-red-500 mb-1",
                        () => {
                          handleArchive(item?.id, status);
                        }
                      )}
                    </>
                  )}
                  {(status === "Removed" || status === "Cancelled") && (
                    <>
                      {renderActionButton("Delete", "bg-red-500 mb-1", () => {
                        handleArchive(item?.id, status);
                      })}
                    </>
                  )}
                  {status === "Payment Due" && (
                    <>
                      {renderActionButton(
                        "Cancel Invite",
                        "bg-red-500 mb-1",
                        () => {
                          handleArchive(item?.id, status);
                        }
                      )}
                    </>
                  )}
                  {status === "Paid" && item?.batch==null && (
                    <>
                      {renderActionButton(
                        "Schedule",
                        "bg-blue-500 mb-1",
                        () => {
                          handleArchive(item?.id, status);
                        }
                      )}
                      {renderActionButton("Cancel", "bg-red-500", () => {
                        handleArchive(item?.id, "Cancel");
                      })}
                    </>
                  )}
                  {/* {status === "Invited" && (
                    <TouchableOpacity
                      style={tw`rounded-3xl bg-red-600 p-1 bg-red-500  w-23 mt-1`}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          textAlign: "center",
                          color: "white",
                        }}
                      >
                        Cancel Demo
                      </Text>
                    </TouchableOpacity>
                  )} */}
                  {/* {(status === "Removed" || status === "Cancelled") && (
                    <TouchableOpacity
                      style={tw`rounded-3xl bg-red-600 p-1 bg-red-500  w-23 mt-1`}
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
                  )} */}
                  {/* {status === "Payment Due" && (
                    <TouchableOpacity
                      style={tw`rounded-3xl bg-red-600 p-1 bg-red-500  w-23 mt-1`}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          textAlign: "center",
                          color: "white",
                        }}
                      >
                        Cancel Invite
                      </Text>
                    </TouchableOpacity>
                  )} */}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* class Info  */}
      <View>
        {item?.class?.length > 0 && (
          <ScrollView
            showsHorizontalScrollIndicator={true}
            horizontal={true}
            style={{
              borderRadius: 12,
              marginTop: 8,
              paddingLeft: 0,
              paddingRight: 16,
              marginBottom: 8,
            }}
          >
            <TouchableOpacity
              style={{
                paddingRight: 10,
                justifyContent: "center",
                backgroundColor: "#a9a9a9",
                borderRadius: 10,
                marginLeft: 0,
              }}
            >
              <View
                style={{
                  paddingRight: 8,
                  padding: 8,
                  justifyContent: "center",
                  flexDirection: "row",
                  flex: 1,
                  margin: 1,
                }}
              >
                {item?.class?.map((i, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        padding: 4,
                        backgroundColor: "#FFF",
                        borderRadius: 12,
                        margin: 5,
                        marginTop: 10,
                        marginBottom: 10,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          paddingHorizontal: 8,
                          marginBottom: 5,
                        }}
                      >
                        Class {index + 1}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          paddingHorizontal: 8,
                          marginBottom: 5,
                        }}
                      >
                        {moment(i?.date_and_time + "Z").format("MMM Do YYYY")}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          paddingHorizontal: 8,
                          marginBottom: 5,
                        }}
                      >
                        {moment(i?.date_and_time + "Z").format("h:mm A")}
                      </Text>
                      {/* <Text
                      style={{
                        fontSize: 14,
                        paddingHorizontal: 8,
                        marginBottom: 5,
                        backgroundColor: "#556b2f",
                        color: '#FFFFFF',
                        borderRadius: 10,
                      }}
                    >
                      {i?.batchclass?.is_cancelled
                        ? "Cancelled"
                        : i?.batchclass?.status_t
                        ? i?.batchclass?.status_t
                        : "Scheduled"}
                    </Text> */}
                      {/* <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5, backgroundColor: '#228b22',fontWeight:'bold',borderRadius:10 }}>Completed</Text> */}
                    </View>
                  );
                })}
              </View>
            </TouchableOpacity>
          </ScrollView>
        )}

        {/* Student Info */}
        {/* <ScrollView showsHorizontalScrollIndicator={true} horizontal={true}  style={{ borderRadius: 12, marginTop: 8, paddingLeft: 0, paddingRight: 16, marginBottom: 8,}}>
                <TouchableOpacity style={{ paddingRight: 8, justifyContent: "center", backgroundColor: '#a9a9a9',  borderRadius: 10, marginLeft:0, flexDirection: 'row'}}>
                    <View style={{ paddingRight: 8, padding: 0, justifyContent: "center", flexDirection: 'row', flex : 1, margin: 1,}}>
                        <View style={{ padding: 4, backgroundColor: '#FFF', borderRadius: 12, margin: 5, marginTop: 10, marginBottom: 10, alignItems: "center", }} >
                                                <View style={{ flexDirection: 'column', marginTop: 0, marginBottom: 4 , }}>
                                                    <View style={{ flexDirection: 'row',margin: 5}}>
                                                        <Text style={{textAlign:'left', fontWeight:'bold', textDecorationColor: '#006400'}}>paid</Text>
                                                        <View style={{ marginLeft: 28, backgroundColor: 'gray', borderRadius: 8, padding: 8, paddingBottom: 4, paddingTop: 4, textAlign: 'right', }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 11, color: '#FFFFFF' }}>Demo</Text>
                                                        </View>

                                                    </View>
                                                    <View style={{ alignItems: "center",}}>
                                                     <Image style={{  width: 48, height: 48, borderRadius: 24, borderColor: '#E8EAED', borderWidth: 1, marginRight: 8 }} source={{uri: "https://xcool.s3.ap-south-1.amazonaws.com/images/RnwChyBMxG2yalhC0DuzTToOvL0zrb5kf666ezs5.png"}} />
                                                        <View style={{alignItems:"center"}}>
                                                        <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5, backgroundColor: '#fff',fontWeight:'bold',borderRadius:10 }}>Student 1</Text>
                                                        <View style={{flexDirection: 'row'}}>
                                                        <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-red-500 text-white mr-2`}>
                                                            <Text style={{fontWeight:"bold"}}>X</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={tw` text-lg  w-fit py-1 px-3 bg-slate-200 rounded-3xl ml-2`}>
                                                            <Text style={{fontWeight:"bold"}}>Chat</Text>
                                                        </TouchableOpacity>
                                                        </View>
                                                        </View>
                                                    </View>
                                                </View>
                        </View>

                    </View>

                    <View style={{ paddingRight: 8, padding: 0, justifyContent: "center", flexDirection: 'row', flex : 1, margin: 1,}}>
                        <View style={{ padding: 4, backgroundColor: '#FFF', borderRadius: 12, margin: 5, marginTop: 10, marginBottom: 10, alignItems: "center", }} >
                                                <View style={{ flexDirection: 'column', marginTop: 0, marginBottom: 4 , }}>
                                                    <View style={{ flexDirection: 'row',margin: 5}}>
                                                        <Text style={{textAlign:'left', fontWeight:'bold', textDecorationColor: '#006400'}}>paid</Text>
                                                        <View style={{ marginLeft: 28, backgroundColor: 'gray', borderRadius: 8, padding: 8, paddingBottom: 4, paddingTop: 4, textAlign: 'right', }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 11, color: '#FFFFFF' }}>Demo</Text>
                                                        </View>

                                                    </View>
                                                    <View style={{ alignItems: "center",}}>
                                                     <Image style={{  width: 48, height: 48, borderRadius: 24, borderColor: '#E8EAED', borderWidth: 1, marginRight: 8 }} source={{uri: "https://xcool.s3.ap-south-1.amazonaws.com/images/RnwChyBMxG2yalhC0DuzTToOvL0zrb5kf666ezs5.png"}} />
                                                        <View style={{alignItems:"center"}}>
                                                        <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5, backgroundColor: '#fff',fontWeight:'bold',borderRadius:10 }}>Student 2</Text>
                                                        <View style={{flexDirection: 'row'}}>
                                                        <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-red-500 text-white mr-2`}>
                                                            <Text style={{fontWeight:"bold"}}>X</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={tw` text-lg  w-fit py-1 px-3 bg-slate-200 rounded-3xl ml-2`}>
                                                            <Text style={{fontWeight:"bold"}}>Chat</Text>
                                                        </TouchableOpacity>
                                                        </View>
                                                        </View>
                                                    </View>
                                                </View>
                        </View>

                    </View>

                    <View style={{ paddingRight: 8, padding: 0, justifyContent: "center", flexDirection: 'row', flex : 1, margin: 1,}}>
                        <View style={{ padding: 4, backgroundColor: '#FFF', borderRadius: 12, margin: 5, marginTop: 10, marginBottom: 10, alignItems: "center", }} >
                                                <View style={{ flexDirection: 'column', marginTop: 0, marginBottom: 4 , }}>
                                                    <View style={{ flexDirection: 'row',margin: 5}}>
                                                        <Text style={{textAlign:'left', fontWeight:'bold', textDecorationColor: '#006400'}}>paid</Text>
                                                        <View style={{ marginLeft: 28, backgroundColor: 'gray', borderRadius: 8, padding: 8, paddingBottom: 4, paddingTop: 4, textAlign: 'right', }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 11, color: '#FFFFFF' }}>Demo</Text>
                                                        </View>

                                                    </View>
                                                    <View style={{ alignItems: "center",}}>
                                                     <Image style={{  width: 48, height: 48, borderRadius: 24, borderColor: '#E8EAED', borderWidth: 1, marginRight: 8 }} source={{uri: "https://xcool.s3.ap-south-1.amazonaws.com/images/RnwChyBMxG2yalhC0DuzTToOvL0zrb5kf666ezs5.png"}} />
                                                        <View style={{alignItems:"center"}}>
                                                        <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5, backgroundColor: '#fff',fontWeight:'bold',borderRadius:10 }}>Student 3</Text>
                                                        <View style={{flexDirection: 'row'}}>
                                                        <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-red-500 text-white mr-2`}>
                                                            <Text style={{fontWeight:"bold"}}>X</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={tw` text-lg  w-fit py-1 px-3 bg-slate-200 rounded-3xl ml-2`}>
                                                            <Text style={{fontWeight:"bold"}}>Chat</Text>
                                                        </TouchableOpacity>
                                                        </View>
                                                        </View>
                                                    </View>
                                                </View>
                        </View>

                    </View>

                </TouchableOpacity>
              </ScrollView> */}

        {/* Action buttons */}
        {/* <View style={{alignItems:"center", paddingTop: 20 , paddingBottom: 0}}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Action</Text>
                    <View style={{flexDirection:"row" ,paddingTop: 8}}>
                    <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-sky-600 text-white mr-2`}>
                        <Text style={{fontWeight:"bold"}}>[]</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-red-500 text-white mr-2`}>
                        <Text style={{fontWeight:"bold"}}>X</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-green-700 text-white mr-2`}>
                        <Text style={{fontWeight:"bold"}}>\/</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-blue-300 text-white mr-2`}>
                        <Text style={{fontWeight:"bold"}}>Join Class</Text>
                    </TouchableOpacity>           
                    </View>                    
              </View>*/}
      </View>

      {/* Info */}
      {/* <View style={{ flexDirection: 'row', marginTop: 4, marginBottom: 4 ,width: 290, }}>
            <Image style={{  width: 48, height: 48, borderRadius: 24, borderColor: '#E8EAED', borderWidth: 1, marginRight: 8 }} source={{uri: "https://xcool.s3.ap-south-1.amazonaws.com/images/RnwChyBMxG2yalhC0DuzTToOvL0zrb5kf666ezs5.png"}} />
            <View>
                <Text style={{ fontSize: 14 }}>by Jane Doe</Text>
                <Text style={{ fontSize: 14 }}>Guitar</Text>
                <Text style={{ fontSize: 14 }}>3 Classes</Text>
            </View>
        </View>  */}
      {/* Dates */}
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4, marginBottom: 4 }}>
            <View>
                <Text style={{ fontSize: 14 }}>Start Date</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{moment().format("ddd DD MMM, YYYY")}</Text>
            </View>
            <View>
                <Text style={{ fontSize: 14 }}>End Date</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{moment().format("ddd DD MMM, YYYY")}</Text>
            </View>
        </View> */}
      {/* Fees & Application */}
      {/* <View style={{ marginTop: 4, marginBottom: 4 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Fees:</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>₹ 500</Text>
            </View> 
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 14 }}>Application Status:</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#e87e39' }}>Applied</Text>
            </View>
        </View> */}
      {/* Schedule */}

      {/* Students */}

      {/* Actions */}
      {/* <View style={{ height: 44, flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
           
            <View></View>
            <View style={{ backgroundColor: '#3E8493', borderRadius: 12, width: '100%' }}>
                <Pressable >
                    <Text style={{ textAlign: 'center', fontSize: 14, color: '#FFFFFF', padding: 12, fontWeight: 'bold' }}>Join Class 2</Text>
                </Pressable>
            </View>
        </View> */}

      {isModalVisible && (
        <ScheduleBatchModal
          isVisible={true}
          allowBackgroundInteraction={false}
          onCancel={() => setIsModalVisible(false)}
          data={item}
          onSuccess={() => {
            // setToken(newToken);
            setIsModalVisible(false);
            // postRequestForCourse();
          }}
        />
      )}
    </View>
  );
}
