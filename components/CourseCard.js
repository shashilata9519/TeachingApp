import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import tw from "twrnc";
export default function CourseCard(props) {
  const { course_name, level, teachers, img, affiliate_id, coursetemplate } =
    props.item ?? props.course;
  const {
    category,
    subCategory,
    onDetailsButtonPress,
    onApplyButtonPress,
    isHorizontal,
    isVertical,
    ActiveCourse,
    setRefresh
  } = props;

  let [levelDesc, levelBgColor] = getLevelDetails(level);
  

  return (
    <TouchableOpacity
      style={{
        marginLeft: isHorizontal ? 0 : 16,
        marginRight: 16,
        margin: 8,
        backgroundColor: "#FFF",
        borderRadius: 12,
        maxWidth: isHorizontal && 300,
        justifyContent: "space-between",
        borderWidth: 0.5,
      }}
      onPress={() => onDetailsButtonPress()}
    >
      {/* Course Details */}
      <View
        style={{
          padding: 16,
          paddingBottom: 0,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/* Course Info */}
        <View style={{ width: "69%" }}>
          <Text
            style={{ fontSize: 15, fontWeight: "bold" }}
            ellipsizeMode="tail"
          >
            {course_name}
          </Text>
          {subCategory && (
            <Text
              style={{
                fontSize: 14,
                verticalAlign: "middle",
                marginTop: 4,
                textTransform: "uppercase",
              }}
            >
              {subCategory}
            </Text>
          )}
          <View style={{ flexDirection: "row", marginTop: 4, marginBottom: 4 }}>
            {category && (
              <Text style={{ marginRight: 8, alignSelf: "center" }}>
                {category}
              </Text>
            )}
            <View
              style={{
                backgroundColor: levelBgColor,
                borderRadius: 8,
                padding: 8,
                paddingBottom: 4,
                paddingTop: 4,
              }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 14, color: "#FFFFFF" }}
              >
                {levelDesc}
              </Text>
            </View>
          </View>
          {ActiveCourse ? (
            <Text style={{ fontSize: 14, verticalAlign: "middle" }}>
              Design by {coursetemplate?.certification}
              {/**{affiliate_id}*/}
            </Text>
          ) : (
            <Text style={{ fontSize: 14, verticalAlign: "middle" }}>
              Affiliated to Xcool{/**{affiliate_id}*/}
            </Text>
          )}
        </View>
        {/* Course Image & Teachers Count */}
        <View
          style={{
            width: "31%",
            paddingBottom: 8,
            paddingLeft: 8,
            alignItems: "center",
          }}
        >
          <Image
            style={{
              marginBottom: 5,
              width: 60,
              height: 60,
              borderRadius: 12,
              alignItems: "flex-start",
              flexDirection: "column-reverse",
              paddingBottom: 10,
              paddingLeft: 10,
              borderWidth: 0.5,
              borderColor: "#E8EAED",
            }}
            source={{ uri: img || coursetemplate?.img }}
          />
          {teachers == undefined || teachers.length === 0 ? null : (
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 12, textAlign: "center" }}>
                Offered by
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {teachers.length} Teachers
              </Text>
            </View>
          )}
        </View>
      </View>
      {/* Buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 8,
          borderColor: "#000000",
          borderTopWidth: 0.5,
        }}
      >
        <View
          style={{
            width: "50%",
            borderBottomStartRadius: 12,
            borderEndWidth: 0.5,
          }}
        >
          {ActiveCourse ? (
            <TouchableOpacity onPress={()=>console.log('activate')}>
              <Text style={{ textAlign: "center", fontSize: 14, padding: 12 }}>
                Make Active
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onDetailsButtonPress}>
              <Text style={{ textAlign: "center", fontSize: 14, padding: 12 }}>
                Show Details
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            backgroundColor: "#2A87BB",
            borderBottomEndRadius: 12,
            width: "50%",
          }}
        >
          {ActiveCourse ? (
            <TouchableOpacity>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  color: "#FFFFFF",
                  padding: 12,
                  fontWeight: "bold",
                }}
              >
                View
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onApplyButtonPress}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  color: "#FFFFFF",
                  padding: 12,
                  fontWeight: "bold",
                }}
              >
                Book Now
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function getLevelDetails(id) {
  if (id == 1) {
    return ["Beginner", "#2A87BB"];
  } else if (id == 2) {
    return ["Intermediate", "#ED9F39"];
  } else {
    return ["Advanced", "#B03827"];
  }
}
