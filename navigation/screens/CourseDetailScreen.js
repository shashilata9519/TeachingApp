import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Modal,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { withNavigation } from "react-navigation";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import LoadingView from "../../components/LoadingView";
import NavigationBarInfoView from "../../components/CourseInfoView";
import RenderHTML from "react-native-render-html";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { getLevelDetails } from "../../components/CourseCard";
import {
  fetchAllCategories,
  fetchAllCourses,
  fetchAllSubCategories,
  fetchAllTeachers,
  fetchAllTeachersForCourse,
  fetchDetailsOfCourse,
  openUrlForApplyingCourse,
} from "../../Services/NetworkingService";
import DropdownComponent from "../../components/DropdownComponent";
import RequestDetailsModal from "../../components/RequestDetailsModal";
import TeacherView from "../../components/TeacherView";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { retrieveData } from "../../Services/Utils";

function CourseDetailScreen(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [courseDetails, setCourseDetails] = useState(null);
  const { id, course_name, slug, img, level } =
    props.route.params.course ?? props.route.params.item;
  const { applyScreenName, subCategory, teacher } = props.route.params;
  const [selectedSection, selectSection] = useState(0);
  const [Location, SetLocation] = useState(null);

  let [levelDesc, levelBgColor] = getLevelDetails(level);

  const [shouldDisplayApplyScreen, showApplyScreen] = useState(false);
  const [selectedFees, selectFees] = useState(null);
  const [selectedTeacher, selectTeacher] = useState(null);
  const [selectedCourse, selectCourse] = useState(null);
  const [selectedGenre, selectGenre] = useState(null);
  const [selectedTimeslot, selectTimeslot] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [availableTeachers, setAvailableTeachers] = useState([]);

  // const isFocused = useIsFocused()

  useEffect(() => {
    setIsLoading(true);
    fetchDetailsOfCourse(slug)
      .then((response) => {
        setCourseDetails(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
    fetchAllTeachersForCourse(slug)
      .then(setAvailableTeachers)
      .catch((error) => console.log(error));
    selectSection(0);
    selectTeacher(teacher);
  }, [props]);

 
  useEffect(() => {
    fetchAllSubCategories()
      .then(setSubCategories)
      .catch((error) => console.log(error));
    fetchAllTeachers()
      .then(setTeachers)
      .catch((error) => console.log(error));
    fetchAllCourses()
      .then(setCourses)
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const getLocationData = async () => {
      try {
        const locationData = await retrieveData("location");
        SetLocation(locationData);
      } catch (error) {
        console.error("Error retrieving location data:", error);
      }
    };

    getLocationData();
  }, []);

  const ContentView = () => {
    var text = "";
    if (selectedSection == 0) {
      text = courseDetails.summary;
    } else if (selectedSection == 1) {
      text = courseDetails.outcomes;
    } else if (selectedSection == 2) {
      text = courseDetails.prerequisites;
    } else if (selectedSection == 3) {
      text = courseDetails.certification;
    }

    const source = { html: text };
    const { height, width } = useWindowDimensions();

    const sectionStyles = StyleSheet.create({
      sectionButton: {
        backgroundColor: "#EAF5FB",
        // width: 100,
        height: "100%",
        borderColor: "#000",
        justifyContent: "center",
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 4,
        paddingTop: 4,
      },
      selectedSectionButton: {
        backgroundColor: "#EAF5FB",
        // width: 100,
        paddingTop: 4,
        height: "100%",
        paddingLeft: 16,
        paddingRight: 16,
        // borderWidth: 4,
        borderBottomWidth: 4,
        borderColor: "#3E8493",
        borderLeftColor: "#EAF5FB",
        borderRightColor: "#EAF5FB",
        borderTopColor: "#EAF5FB",
        justifyContent: "center",
      },
      sectionText: {
        textAlign: "center",
        fontSize: 14,
      },
      selectedSectionText: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: "bold",
        color: "#3E8493",
      },
    });

    return (
      <View
        style={{
          width: "100%",
          height: useSafeAreaFrame().height,
          alignItems: "center",
          backgroundColor: "#EAF5FB",
          flexDirection: "column",
        }}
      >
        {/* Section Titles -> Content, Key Learning Outcomes, Who can apply?, Certification */}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            height: 44,
            backgroundColor: "#EAF5FB",
            justifyContent: "flex-start",
            borderTopColor: "#EAF5FB",
            borderBottomColor: "#3E8493",
            borderLeftColor: "#EAF5FB",
            borderRightColor: "#EAF5FB",
            borderWidth: 0.5,
          }}
        >
          <ScrollView
            style={{ flexDirection: "row" }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {/* Course Content */}
            {courseDetails?.summary && (
              <View
                style={
                  selectedSection == 0
                    ? sectionStyles.selectedSectionButton
                    : sectionStyles.sectionButton
                }
              >
                <TouchableOpacity onPress={() => selectSection(0)}>
                  <Text
                    style={
                      selectedSection == 0
                        ? sectionStyles.selectedSectionText
                        : sectionStyles.sectionText
                    }
                  >
                    Content
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {/* Outcomes */}
            {courseDetails?.outcomes && (
              <View
                style={
                  selectedSection == 1
                    ? sectionStyles.selectedSectionButton
                    : sectionStyles.sectionButton
                }
              >
                <TouchableOpacity onPress={() => selectSection(1)}>
                  <Text
                    style={
                      selectedSection == 1
                        ? sectionStyles.selectedSectionText
                        : sectionStyles.sectionText
                    }
                  >
                    Key Learning Outcomes
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {/* Prerequisites */}
            {courseDetails?.prerequisites && (
              <View
                style={
                  selectedSection == 2
                    ? sectionStyles.selectedSectionButton
                    : sectionStyles.sectionButton
                }
              >
                <TouchableOpacity onPress={() => selectSection(2)}>
                  <Text
                    style={
                      selectedSection == 2
                        ? sectionStyles.selectedSectionText
                        : sectionStyles.sectionText
                    }
                  >
                    Who can apply?
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {/* Certification */}
            {courseDetails?.certification && (
              <View
                style={
                  selectedSection == 3
                    ? sectionStyles.selectedSectionButton
                    : sectionStyles.sectionButton
                }
              >
                <TouchableOpacity onPress={() => selectSection(3)}>
                  <Text
                    style={
                      selectedSection == 3
                        ? sectionStyles.selectedSectionText
                        : sectionStyles.sectionText
                    }
                  >
                    Certification
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {/* Teachers */}
            {availableTeachers && (
              <View
                style={
                  selectedSection == 4
                    ? sectionStyles.selectedSectionButton
                    : sectionStyles.sectionButton
                }
              >
                <TouchableOpacity onPress={() => selectSection(4)}>
                  <Text
                    style={
                      selectedSection == 4
                        ? sectionStyles.selectedSectionText
                        : sectionStyles.sectionText
                    }
                  >
                    Teachers
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
        {/* Section Content  */}
        {/* <Text style={{ padding: 16 }}>{text}</Text> */}
        {availableTeachers && selectedSection == 4 ? (
          <View
            style={{
              width: "100%",
              height:
                useSafeAreaFrame().height -
                useSafeAreaInsets().top -
                48 -
                60 -
                useBottomTabBarHeight(),
            }}
          >
            <FlatList
              style={{
                backgroundColor: "#EAF5FB",
                width: "100%",
                paddingLeft: 16,
                paddingRight: 16,
              }}
              data={availableTeachers}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Pressable
                  style={{ width: "50%", padding: 4 }}
                  onPress={() => {
                   
                    props.navigation.navigate("Teacher Details", {
                      item,
                      subCategory,
                      courseDetails,
                    });
                    
                  }}
                >
                  <TeacherView
                    teacher={item?.teacher}
                    Location={Location}
                    onApply={() => {
                      selectTeacher(item?.teacher);

                      showApplyScreen(true);
                    }}
                  />
                </Pressable>
              )}
            />
          </View>
        ) : (
          <View style={{ paddingLeft: 16, paddingRight: 16 }}>
            <RenderHTML source={source} contentWidth={width} />
          </View>
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        flexDirection: "column",
        width: "100%",
        height: "100%",
        alignItems: "center",
        backgroundColor: "#2F5290",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginTop: useSafeAreaInsets().top,
          borderBottomWidth: 0.5,
        }}
      >
        <TouchableOpacity
          style={{ height: 60, paddingLeft: 16, justifyContent: "center" }}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons name={"arrow-back"} size={26} color={"#FFFFFF"} />
        </TouchableOpacity>
        {courseDetails && (
          <View style={{ width: "78%" }}>
            <NavigationBarInfoView
              title={course_name}
              subtitle={levelDesc + " | Affiliated to Xcool"}
              imagePath={img}
              onApplyButtonPress={() => showApplyScreen(true)}
            />
          </View>
        )}
      </View>
      {isLoading ? (
        <LoadingView
          height="90%"
          backgroundColor="#EAF5FB"
          title={"loading course details..."}
        />
      ) : (
        courseDetails && <ContentView />
      )}
      {shouldDisplayApplyScreen && (
        <RequestDetailsModal
          isVisible={shouldDisplayApplyScreen}
          onCancel={() => showApplyScreen(false)}
          selectedCourse={{
            label: courseDetails?.course_name,
            value: courseDetails?.id,
          }}
          selectedTeacher={{
            label: selectedTeacher?.firstname,
            value: selectedTeacher?.id,
          }}
          selectedGenre={{
            label: subCategory?.subcategory,
            value: subCategory?.id,
          }}
        />
      )}
    </View>
  );
}

export default withNavigation(CourseDetailScreen);
