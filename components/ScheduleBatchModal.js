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
  scheduleBatchRequest,
} from "../Services/NetworkingService";
import { AsyncStorageService } from "../Services/AsyncStorage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native";
import moment from "moment";

export default function ScheduleBatchModal(props) {
  const { isVisible, onCancel, onSuccess, allowBackgroundInteraction, data } =
    props;
  // console.log(data?.batch?.class[0]?.date, "data");
  const [batchName, setBatchName] = useState(null);

  const [dropdownCourses, setDropdownCourses] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState({
    label: data?.course?.course_name,
    value: data?.course?.id,
    slug: data?.slug,
  });
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const setDays = [
    {
      id: 1,
      day: "S",
    },
    {
      id: 2,
      day: "M",
    },
    {
      id: 3,
      day: "T",
    },
    {
      id: 4,
      day: "W",
    },
    {
      id: 5,
      day: "T",
    },
    {
      id: 6,
      day: "F",
    },
    {
      id: 7,
      day: "S",
    },
  ];

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

  const toggleDay = (day) => {
    // console.log(day);
    if (selectedDays.includes(day.id)) {
      setSelectedDays(selectedDays.filter((id) => id !== day.id));
    } else {
      setSelectedDays([...selectedDays, day.id]);
    }
  };

  const ContentView = () => {
    return null;
  };

  if (allowBackgroundInteraction) {
    return (
      isVisible && (
        <>
          {/* Your JSX for login and registration */}
          {/* ... */}
          {/* End of your JSX */}
          <View
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "center",
              alignSelf: "flex-start",
              width: "100%",
              height: 50,
              alignItems: "center",
              position: "absolute",
              bottom: 0,
            }}
          >
            <Pressable>
              <Text>Privacy Policy</Text>
            </Pressable>
            <Text
              style={{
                textAlign: "center",
                fontSize: 30,
                color: "#000000",
                padding: 5,
                fontWeight: "bold",
              }}
            >
              |
            </Text>
            <Pressable>
              <Text>Terms of Service</Text>
            </Pressable>
          </View>
        </>
      )
    );
  }

  useEffect(() => {
    (async () => {
      const data = await fetchDropdownCourses();
      setDropdownCourses(data);
    })();
  }, []);

  const [date, setDate] = useState(new Date());
  const [showDatepicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [time, setTime] = useState(new Date());
  const [showTimepicker, setShowTimePicker] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endtime, setEndTime] = useState(new Date());
  const [showEndTimepicker, setShowEndTimePicker] = useState(false);
  const [NewEndTime, setNewEndTime] = useState("");
  const [scheduleError, setScheduleError] = useState(false);
  const [batchNameError, setBatchNameError] = useState(false);
  const [studentIdMsg, setStudentIdMsg] = useState(false);
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
    } else {
      toggleEndTimePicker();
    }
  };

  // useEffect(() => {
  //   console.log(selectedCourse, "sel");
  // }, [selectedCourse]);

  function convertISO(time) {
    // Parse the start and end times
    const format = "HH:mm";
    let date = new Date();
    const temp = moment(time, format).utc().format("HH:mm");
    // .format(format);

    // Calculate the duration in minutes

    return temp;
  }
  function calculateDuration(startTime, endTime) {
    // Parse the start and end times
    const format = "HH:mm";
    const startMoment = moment(startTime, format);
    const endMoment = moment(endTime, format);

    // Calculate the duration in minutes
    const duration = moment.duration(endMoment.diff(startMoment)).asMinutes();

    return duration;
  }
  // console.log(data,'data')

  useEffect(() => {
    if (startDate != "" && startTime != "") {
      // console.log(startDate + " " + convertISO(startTime), "values2");
      const scheduleLength = getDatesForN(
        moment(startDate, "DD-MM-YYYY").format("YYYY-MM-DD") +
          " " +
          convertISO(startTime),
        data?.lead?.no_classes,
        startTime,
        selectedDays
      );

      setScheduleData(scheduleLength);
    }
  }, [selectedDays]);

  console.log(scheduleData, "selectedDays");

  const submitHandler = async () => {
    const requestData = {
      weekdays: selectedDays || null,
      student_ids: [
        Number(
          data?.lead?.student_id ? data?.lead?.student_id : data?.student?.id
        ),
      ],
      class_datetime: startDate + " " + convertISO(startDate),
      class_edatetime:
        scheduleData[scheduleData.length - 1] + " " + convertISO(NewEndTime),
      duration: calculateDuration(startTime, NewEndTime),
      utc_time: convertISO(startTime),
      eutc_time: convertISO(NewEndTime),
      end_date: scheduleData[scheduleData.length - 1],
      // lead_id: item?.lead_id,
      schedule: scheduleData,
    };
    if (scheduleData.length === 0) {
      // console.log("schedule error");
      setScheduleError(true);
    } else {
      // console.log("no error");
      setScheduleError(false);
    }

    if (requestData?.student_ids?.length === 0) {
      // console.log("show id msg");
      setStudentIdMsg(true);
    } else {
      // console.log("no error");
      setStudentIdMsg(false);
    }
    if (scheduleData?.length > 0 && requestData?.student_ids?.length > 0) {
      setScheduleError(false);
      setStudentIdMsg(false);
      console.log(requestData);
      const res = await scheduleBatchRequest(requestData);
      if (res?.success) {
        Alert.alert("Batch scheduled successfully");
      } else {
        Alert.alert("Something went wrong. Try Again!");
      }
    }
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
                  marginVertical: 3,
                }}
              >
                Schedule Batch
              </Text>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#EAF5FB",
                }}
              >
                <TextInput
                  style={inputStyles.inputTextStyle}
                  placeholder="Batch Name"
                  value={batchName}
                  onChangeText={(e) => {
                    setBatchName(e);

                    if (e.length < 2) {
                      setBatchNameError(true);
                    } else {
                      setBatchNameError(false);
                    }
                  }}
                />
                {batchNameError && (
                  <Text style={{ color: "red" }}>Batch name is required</Text>
                )}
                <View>
                  <Text> No of Classes: {data?.lead?.no_classes || 0}</Text>
                </View>
                <DropdownComponent
                  title="Course"
                  selectedValue={selectedCourse}
                  onSelection={(item) => setSelectedCourse(item)}
                  data={dropdownCourses?.map((item) => {
                    // console.log(item)
                    return {
                      label: item.course_name,
                      value: item.id,
                      slug: item.slug,
                    };
                  })}
                />
                <View style={{ display: "flex", flexDirection: "row", gap: 2 }}>
                  <View style={{ width: 140 }}>
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
                  </View>
                  <View style={{ width: 140 }}>
                    <Text>Class End Date</Text>
                    <TextInput
                      editable={false}
                      style={inputStyles.inputTextStyle}
                      defaultValue={
                        moment(scheduleData[scheduleData?.length - 1]).format(
                          "DD MMM YYYY"
                        ) ?? "Select a start date"
                      }
                    />
                  </View>
                </View>

                <View style={{ display: "flex", flexDirection: "row", gap: 2 }}>
                  <View style={{ width: 140 }}>
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
                  </View>
                  <View style={{ width: 140 }}>
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
                  </View>
                </View>
                <View>
                  <Text>Student : {data?.student?.firstname}</Text>
                </View>
                {studentIdMsg && (
                  <Text style={{ color: "red" }}>
                    Please select atleast one student
                  </Text>
                )}
                <View>
                  <Text style={inputStyles.dayPreferenceText}>
                    Day Preference
                  </Text>
                  <View style={inputStyles.daySelectorContainer}>
                    {setDays?.map((day) => (
                      <TouchableOpacity
                        onPress={() => toggleDay(day)}
                        key={day?.id}
                        style={[
                          inputStyles.daySelectorButton,
                          // Apply styles based on selection
                          {
                            backgroundColor: selectedDays.includes(day?.id)
                              ? "black"
                              : "transparent",
                          },
                        ]}
                      >
                        <Text
                          style={[
                            inputStyles.daySelectorText,

                            {
                              color: selectedDays.includes(day?.id)
                                ? "white"
                                : "black",
                            },
                          ]}
                        >
                          {day.day}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {scheduleError && (
                    <Text style={{ color: "red" }}>
                      No classes is selected schedule
                    </Text>
                  )}
                </View>
                <View>
                  {scheduleData?.map((item, key) => {
                    console.log(item, "item");
                    return (
                      // console.log
                      <Text key={key}>
                        Class {key + 1} : {moment(item).format("DD MMM YYYY")}
                      </Text>
                    );
                  })}
                </View>

                <View
                  style={{
                    borderRadius: 12,
                    marginTop: 10,
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
                      Schedule
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
