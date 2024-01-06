import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment, { Moment } from "moment/moment";
import InfoView from "./TeacherInfoView";
import { GenerateTextColor, statusStudent } from "../Services/Utils";
import { ScrollView } from "react-native-gesture-handler";
import tw from "twrnc";
import { green } from "@mui/material/colors";

export default function TestingCard(props) {
  const item = props.data;
  var status = statusStudent(item);

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
      default:
        // Handle other statuses or no status
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
        <Text style={{ fontSize: 17, fontWeight: "bold", textAlign: "center" }}>
          {item ? item?.course?.course_name : ""}
        </Text>

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
              uri: item?.teacher?.dp
                ? item?.teacher?.dp
                : "https://xcool.s3.ap-south-1.amazonaws.com/images/lpddATIs8JiE61c5FByWdjTwjDfaVDXGcN1IKdhB.png",
            }}
          />
          <View>
            <Text style={tw` font-bold text-black-400 text-base pt-0 `}>
              By {item?.teacher?.firstname}
            </Text>
            <Text style={tw`font-normal text-black text-base`}>
              Batch {item?.batch?.batch_name}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "normal" }}>
              Class Start Date:
              <Text
                style={{ fontSize: 15, fontWeight: "bold" }}
                numberOfLines={2}
              >
                {moment(item?.batch?.start_date)
                  .locale("en")
                  .format("MMM Do YYYY")}
              </Text>
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "normal" }}>
              Class End Date:
              <Text
                style={{ fontSize: 15, fontWeight: "bold" }}
                numberOfLines={2}
              >
                {moment(item?.batch?.end_date)
                  .locale("en")
                  .format("MMM Do YYYY")}
              </Text>
            </Text>
            {/* <Text style={{ fontSize: 14, fontWeight:'bold' }}>Gandharva Prarambhik Year 1</Text> */}
            {/* <View style={{paddingTop: 20, }}>
                        <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-blue-300  w-20`}>
                                <Text style={{fontWeight:"bold", textAlign:"center"}}>Chat ...</Text>
                        </TouchableOpacity> 
                        </View> */}
          </View>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
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
                <Text
                  style={{ fontSize: 17, fontWeight: "bold", paddingBottom: 2 }}
                >
                  Application Status :{" "}
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
                </Text>
              </View>

              <View style={{ flexDirection: "column", paddingLeft: 25 }}>
                {(status === "Invited" || status === "Pending confirmation") &&
                  renderActionButton("Accept", "bg-blue-500", () => {
                    handleArchive(item?.id, status);
                  })}
                {(status === "Rejected" || status === "Applied") &&
                  renderActionButton("Archive", "bg-gray-400", () => {
                    handleArchive(item?.id, status);
                  })}
                {status === "Paid" && (
                  <>
                    {renderActionButton(
                      "View Details",
                      "bg-amber-400 mb-1",
                      () => {
                        handleArchive(item?.id, status);
                      }
                    )}
                    <TouchableOpacity
                      style={tw`border-red-10 border rounded-full p-1 bg-green-500 text-white mr-2`}
                    >
                      <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                        Join Class
                      </Text>
                    </TouchableOpacity>
                  </>
                )}

                {status === "Payment Due" && (
                  <>
                    {renderActionButton("Pay Now", "bg-amber-500 mb-1", () => {
                      handleArchive(item?.id, status);
                    })}
                    {renderActionButton("Decline", "bg-red-500", () => {
                      handleArchive(item?.id, status);
                    })}
                  </>
                )}

                {/* {status === "Paid" && (
                  <View style={{ paddingBottom: 5 }}>
                    <TouchableOpacity
                      style={tw`border-red-10 border rounded-full p-2 bg-amber-500  w-23`}
                    >
                      <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                        View Details
                      </Text>
                    </TouchableOpacity>
                  </View>
                )} */}
                {/* {(status === "Invited" ||
                  status === "Pending confirmation") && (
                  <>
                    <View style={{ paddingBottom: 5 }}>
                      <TouchableOpacity
                        style={tw`border-red-10 border text-white rounded-full p-2 bg-blue-300  w-23`}
                        onPress={() => handleArchive(item?.id, status)} // Add onPress handler
                      >
                        <Text
                          style={{ fontWeight: "bold", textAlign: "center" }}
                        >
                          Accept
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => handleArchive(item?.id, status)} // Add onPress handler
                        style={tw`border-red-10 border text-white rounded-full p-2 bg-red-500  w-23`}
                      >
                        <Text
                          style={{ fontWeight: "bold", textAlign: "center" }}
                        >
                          Decline
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )} */}

                {/* {status === "Payment Due" && (
                  <>
                    <View style={{ paddingBottom: 5 }}>
                      <TouchableOpacity
                        onPress={() => handleArchive(item?.id, status)} // Add onPress handler
                        style={tw`border-red-10 border rounded-full p-2 bg-amber-500  w-23`}
                      >
                        <Text
                          style={{ fontWeight: "bold", textAlign: "center" }}
                        >
                          Pay Now
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={tw`border-red-10 border rounded-full p-2 bg-red-500  w-23`}
                      >
                        <Text
                          style={{ fontWeight: "bold", textAlign: "center" }}
                        >
                          Decline
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )} */}
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* class Info  */}
      {item?.class?.length > 0 && (
        <View>
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
                      <View
                        style={{
                          fontSize: 14,
                          paddingHorizontal: 8,
                          marginBottom: 5,
                          backgroundColor: "#556b2f",
                          color: "#FFFFFF",
                          borderRadius: 10,
                        }}
                      >
                        {i?.batchclass?.is_cancelled
                          ? "Cancelled"
                          : i?.batchclass?.status_t
                          ? i?.batchclass?.status_t
                          : "Scheduled"}
                      </View>
                      {/* <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5, backgroundColor: '#228b22',fontWeight:'bold',borderRadius:10 }}>Completed</Text> */}
                    </View>
                  );
                })}
              </View>
            </TouchableOpacity>
          </ScrollView>

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
      )}

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
    </View>
  );
}
