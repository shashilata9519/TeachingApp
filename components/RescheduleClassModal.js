import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Modal,
  Platform,
  Alert,
  Pressable,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ScrollView } from "react-native-gesture-handler";
import tw from "twrnc";
import axios from "axios";
import { getDatesForN, retrieveData, storeDetails } from "../Services/Utils";
import DropdownComponent from "./DropdownComponent";
import {
  fetchDropdownCourses,
  rescheduleClass,
  scheduleBatchRequest,
} from "../Services/NetworkingService";
import { AsyncStorageService } from "../Services/AsyncStorage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native";
import moment from "moment";

export default function RescheduleClassModal(props) {
  const { isVisible, onCancel, data, onSuccess } = props;

  const inputStyles = StyleSheet.create({
    inputTextStyle: {
      margin: 4,
      padding: 8,
      borderWidth: 1,
      borderRadius: 8,
      width: "100%",
      borderColor: "gray",
    },
    dayPreferenceText: {
      fontSize: 18,
      // fontWeight: "bold",
      marginVertical: 10,
    },
    daySelectorContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginHorizontal: -5,
    },
    daySelectorButton: {
      borderRadius: 25,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderWidth: 1,
      borderColor: "black",
      margin: 5,
    },
    selectedDay: {
      backgroundColor: "black",
    },
    daySelectorText: {
      fontSize: 16,
    },
  });

  const backgroundStyles = StyleSheet.create({
    noBackgroundInteraction: {
      backgroundColor: "#000000aa",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignContent: "center",
    },
    backgroundInteraction: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignContent: "center",
    },
    scrollViewContent: {
      flexGrow: 1,
      flexDirection: "column", // Set the direction to 'column' for vertical scrolling
      justifyContent: "center",
    },
  });

  const [date, setDate] = useState(new Date());
  const [showDatepicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [time, setTime] = useState(new Date());
  const [showTimepicker, setShowTimePicker] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endtime, setEndTime] = useState(new Date());
  const [showEndTimepicker, setShowEndTimePicker] = useState(false);
  const [NewEndTime, setNewEndTime] = useState("");
  const [dateError, setDateError] = useState(false);
const [startTimeError, setStartTimeError] = useState(false);
const [endTimeError, setEndTimeError] = useState(false);


  // console.log(data, "schedule");
  const toggleDatePicker = () => {
    setShowDatePicker(!showDatepicker);
  };
  const toggleTimePicker = () => {
    setShowTimePicker(!showTimepicker);
  };
  const toggleEndTimePicker = () => {
    setShowEndTimePicker(!showEndTimepicker);
  };

  ///start date
  const onChangeDate = ({ type }, selectedDate) => {
    if (type == "set") {
      const currDate = selectedDate;
      setDate(currDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
        setStartDate(moment(currDate, "ddd MMM DD YYYY").format("DD-MM-YYYY"));
      }
      setDateError(false);
    } else {
      toggleDatePicker();
    }
  };

  ///start time
  const onChangeTime = ({ type }, selectedTime) => {
    if (type == "set") {
      const currDate = selectedTime;
      setTime(currDate);
      if (Platform.OS === "android") {
        toggleTimePicker();
        setStartTime(moment(currDate, "HH:mm:ss [GMT]ZZ").format("hh:mm A"));
      }
      setStartTimeError(false);
    } else {
      toggleTimePicker();
    }
  };
  ///End time
  const onChangeEndTime = ({ type }, selectedTime) => {
    if (type == "set") {
      const currDate = selectedTime;
      setEndTime(currDate);
      if (Platform.OS === "android") {
        toggleEndTimePicker();
        setNewEndTime(moment(currDate, "HH:mm:ss [GMT]ZZ").format("hh:mm A"));
      }
      setEndTimeError(false);
    } else {
      toggleEndTimePicker();
    }
  };

  function convertISO(time) {
    // Parse the start and end times
    const format = "HH:mm";
    let date = new Date();
    const temp = moment(time, format).utc().format("HH:mm");
    // .format(format);

    // Calculate the duration in minutes

    return temp;
  }

  const submitHandler = async () => {
     // Reset error states
  setDateError(false);
  setStartTimeError(false);
  setEndTimeError(false);

  // Check if any of the fields are empty
  if (!startDate || !startTime || !NewEndTime) {
    if (!startDate) setDateError(true);
    if (!startTime) setStartTimeError(true);
    if (!NewEndTime) setEndTimeError(true);
    return; // Do not proceed if there are empty fields
  }
    const requestData = {
      class_id: data,
      date: moment(startDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
      eutc_time: convertISO(NewEndTime),
      utc_time: convertISO(startTime),
    };
    console.log(requestData);

    const res = await rescheduleClass(requestData);
    console.log(res,'data');
    onSuccess();
  };

  return (
    isVisible && (
      <Modal transparent={true}>
        <Pressable
          onPress={onCancel}
          style={backgroundStyles.noBackgroundInteraction}
        >
          <ScrollView
            contentContainerStyle={backgroundStyles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            <Pressable
              style={{
                flexDirection: "column",
                backgroundColor: "#EAF5FB",
                margin: 32,
                borderRadius: 12,
                padding: 16,
                width: useSafeAreaFrame().width - 64,
                // height: 500,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginVertical: 10,
                }}
              >
                Reschedule Class
              </Text>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#EAF5FB",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <View style={{ width: 200 }}>
                    <Text>Class Start Date</Text>
                    {!showDatepicker && (
                      <Pressable onPress={toggleDatePicker}>
                        <TextInput
                          editable={false}
                          style={inputStyles.inputTextStyle}
                          placeholder="DD-MM-YYYY"
                          value={startDate}
                          onChangeText={setStartDate}
                          // defaultValue="24-08-2023"
                        />
                      </Pressable>
                    )}
                    {showDatepicker && (
                      <DateTimePicker
                        mode="date"
                        display="spinner"
                        onChange={onChangeDate}
                        value={date}
                        minimumDate={new Date()}
                        // defaultValue={''}
                      />
                    )}
                      {dateError && <Text style={{ color: "red" }}>Date is required</Text>}
                  </View>
                  <View style={{ width: 200 }}>
                    <Text>Class Start Time</Text>
                    {!showTimepicker && (
                      <Pressable onPress={toggleTimePicker}>
                        <TextInput
                          editable={false}
                          style={inputStyles.inputTextStyle}
                          placeholder="hh:mm A"
                          value={startTime}
                          onChangeText={setStartTime}
                          // defaultValue={}
                        />
                      </Pressable>
                    )}
                    {showTimepicker && (
                      <DateTimePicker
                        mode="time"
                        display="spinner"
                        is24Hour={false}
                        onChange={onChangeTime}
                        value={time}
                      />
                    )}
                      {startTimeError && <Text style={{ color: "red" }}>Start time is required</Text>}
                  </View>
                  <View style={{ width: 200 }}>
                    <Text>Class End Time</Text>
                    {!showEndTimepicker && (
                      <Pressable onPress={toggleEndTimePicker}>
                        <TextInput
                          editable={false}
                          style={inputStyles.inputTextStyle}
                          placeholder="hh:mm A"
                          value={NewEndTime}
                          onChangeText={setNewEndTime}
                        />
                      </Pressable>
                    )}
                    {showEndTimepicker && (
                      <DateTimePicker
                        mode="time"
                        display="spinner"
                        is24Hour={false}
                        onChange={onChangeEndTime}
                        value={endtime}
                      />
                    )}
                      {endTimeError && <Text style={{ color: "red" }}>End time is required</Text>}
                  </View>
                </View>

                <View
                  style={{
                    borderRadius: 12,
                    marginTop: 20,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Pressable
                    onPress={onCancel}
                    style={tw` rounded-full bg-red-500 my-auto py-2  w-23`}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      Cancel
                    </Text>
                  </Pressable>
                  <Pressable
                    // style={{ backgroundColor: "#3E8493", width: 80 }}
                    onPress={() => submitHandler()}
                    style={tw` rounded-full bg-[#3E8493] my-auto py-2  w-23`}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      Submit
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Pressable>
          </ScrollView>
        </Pressable>
      </Modal>
    )
  );
}
