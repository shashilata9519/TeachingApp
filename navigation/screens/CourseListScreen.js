import { View, StyleSheet, Modal, TouchableOpacity, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import LoadingView from "../../components/LoadingView";
import { withNavigation } from "react-navigation";
import SearchBar from "../../components/SearchBar";
import CourseCard from "../../components/CourseCard";
import {
  fetchAllCategories,
  fetchAllCourses,
  fetchAllSubCategories,
  fetchAllTeachers,
  openUrlForApplyingCourse,
} from "../../Services/NetworkingService";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import DropdownComponent from "../../components/DropdownComponent";
import RequestDetailsModal from "../../components/RequestDetailsModal";

function CourseListScreen(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldFetchCategories, setShouldFetchCategories] = useState(true);
  const [categories, setCategories] = useState([]);
  const [shouldFetchSubCategories, setShouldFetchSubCategories] =
    useState(true);
  const [subCategories, setSubCategories] = useState([]);
  const [shouldFetchCourses, setShouldFetchCourses] = useState(true);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [shouldShowSearchField, setShouldShowSearchField] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [shouldDisplayApplyScreen, showApplyScreen] = useState(false);
  const [selectedFees, selectFees] = useState(null);
  const [selectedTeacher, selectTeacher] = useState(null);
  const [selectedCourse, selectCourse] = useState(null);
  const [selectedSubCategory, selectSubCategory] = useState(null);
  const [selectedGenre, selectGenre] = useState(null);
  const [selectedTimeslot, selectTimeslot] = useState(null);
  const [teachers, setTeachers] = useState([]);

  const styles = StyleSheet.create({
    container: {},
    text: {
      fontSize: 20,
      fontWeight: "bold",
    },
    loadingView: {
      justifyContent: "center",
      alignSelf: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      verticalAlign: "middle",
    },
  });

  // Getters
  function getSubCategory(subcategory_id) {
    if (subCategories === undefined) {
      return null;
    }
    let subCategory = subCategories.filter(
      (subCategory) => subCategory["id"] === subcategory_id
    )[0];
    if (subCategory === undefined) {
      return null;
    }
    return subCategory;
  }
  function getCategory(category_id) {
    let category = categories.filter(
      (category) => category["id"] === category_id
    )[0];
    if (category === undefined) {
      return null;
    }
    return category;
  }

  // Effects
  useEffect(() => {
    setIsLoading(true);
    fetchAllCategories()
      .then((response) => {
        setCategories(response);
      })
      .catch((error) => {
        console.log(error);
      });
    fetchAllSubCategories()
      .then((response) => {
        setSubCategories(response);
      })
      .catch((error) => {
        console.log(error);
      });
    fetchAllCourses()
      .then((response) => {
        setCourses(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
    fetchAllTeachers()
      .then((response) => {
        setTeachers(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);
  useEffect(() => {
    let currentCourses = courses.filter((course) => {
      return course.course_name
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });
    setFilteredCourses(currentCourses);
  }, [searchText]);

  // Main
  if (isLoading) {
    return (
      <LoadingView
        height="100%"
        backgroundColor="#EAF5FB"
        title={"loading courses..."}
      />
    );
  }
  return (
    <View style={{ backgroundColor: "#EAF5FB", height: "100%" }}>
      <View style={{ padding: 16 }}>
        <SearchBar onTextValueChange={(text) => setSearchText(text)} />
      </View>
      <FlatList
        style={{}}
        data={filteredCourses}
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          let subCategoryId = item["subcategory"];
          var subCategory = null;
          var subCategoryDesc = null;
          var category = null;
          var categoryDesc = null;
          if (subCategoryId != null) {
            subCategory = getSubCategory(subCategoryId);
            if (subCategory != null && subCategory != undefined) {
              let categoryId = subCategory["category_id"];
              subCategoryDesc = subCategory["subcategory"];
              if (categoryId != null) {
                category = getCategory(categoryId);
                if (category != null && category != undefined) {
                  categoryDesc = category["category"];
                }
              }
            }
          }
          return (
            <CourseCard
              course={item}
              category={categoryDesc}
              subCategory={subCategoryDesc}
              onDetailsButtonPress={() =>
                props.navigation.navigate("Course Details", {
                  item,
                  subCategory,
                  applyScreenName: "Apply Course Screen",
                })
              }
              onApplyButtonPress={() => {
                selectSubCategory({
                  label: subCategoryDesc,
                  id: subCategory?.id,
                });
                selectCourse(item);
                showApplyScreen(true);
              }}
              ActiveCourse={false}
            />
          );
        }}
      />
      {shouldDisplayApplyScreen && (
        <RequestDetailsModal
          isVisible={shouldDisplayApplyScreen}
          onCancel={() => showApplyScreen(false)}
          selectedCourse={{
            label: selectedCourse?.course_name,
            value: selectedCourse?.id,
          }}
          selectedGenre={{
            label: selectedSubCategory?.subcategory,
            value: selectedSubCategory?.id,
          }}
        />
      )}
    </View>
  );
}

export default withNavigation(CourseListScreen);
