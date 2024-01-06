import { FlatList, TouchableOpacity, View } from "react-native";
import TeacherView from "../../components/TeacherView";
import React, { useEffect, useState } from "react";
import { withNavigation } from "react-navigation";
import LoadingView from "../../components/LoadingView";
import { fetchAllTeachers } from "../../Services/NetworkingService";
import RequestDetailsModal from "../../components/RequestDetailsModal";
import { retrieveData } from "../../Services/Utils";

function TeacherListScreen(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);

  const [shouldDisplayApplyScreen, showApplyScreen] = useState(false);
  const [selectedTeacher, selectTeacher] = useState(null);
  const [Location, SetLocation] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchAllTeachers()
      .then((response) => {
        setTeachers(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
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

  if (isLoading) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignSelf: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          verticalAlign: "middle",
          backgroundColor: "#EAF5FB",
        }}
      >
        <LoadingView title={"loading teachers..."} />
      </View>
    );
  }
  return (
    <View>
      <FlatList
        style={{ backgroundColor: "#EAF5FB", width: "100%", padding: 8 }}
        data={teachers}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ width: "50%", padding: 4 }}
            onPress={() => {
              props.navigation.navigate("Teacher Details", { item });
            }}
          >
            <TeacherView
              teacher={item}
              Location={Location}
              onApply={() => {
                selectTeacher(item);
                
                showApplyScreen(true);
              }}
            />
          </TouchableOpacity>
        )}
      />
      {shouldDisplayApplyScreen && (
        <RequestDetailsModal
          isVisible={shouldDisplayApplyScreen}
          onCancel={() => showApplyScreen(false)}
          selectedTeacher={{
            label: selectedTeacher?.firstname,
            value: selectedTeacher?.id,
          }}
        />
      )}
    </View>
  );
}

export default withNavigation(TeacherListScreen);
