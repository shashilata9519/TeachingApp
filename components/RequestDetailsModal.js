import { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useSafeAreaFrame } from "react-native-safe-area-context";
import DropdownComponent from "./DropdownComponent";
import {
  fetchAllCourses,
  fetchAllDropdownTeachers,
  fetchAllSubCategories,
  fetchAllTeachers,
  requestForCourse,
  fetchFeesOfTeacher,
  createAnonOrderAPI,
  discount,
  saveAnonOrderAPI,
} from "../Services/NetworkingService";
import RequestDetailsResultModal from "./RequestDetailsResultModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginModal from "./LoginModal";
import RazorpayCheckout from "react-native-razorpay";
import { Alert } from "react-native";
import { calculateTeacherFee, retrieveData } from "../Services/Utils";

export default function RequestDetailsModal(props) {
  const { isVisible, onCancel } = props;

  const [courses, setCourses] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [Location, SetLocation] = useState(null);
  const [selectedFees, selectFees] = useState(null);
  const [selectedTeacher, selectTeacher] = useState(props.selectedTeacher);
  const [selectedCourse, selectCourse] = useState(props.selectedCourse);
  const [selectedGenre, selectGenre] = useState(props.selectedGenre);
  const [selectedTimeslot, selectTimeslot] = useState(null);

  const [popupMessage, setPopupMessage] = useState(null);
  const [fees, setFees] = useState(0);
  const [feesUSD, setFeesUSD] = useState(0);
  const [feesFeild, setFeeFeild] = useState(true);

  const [token, setToken] = useState(null);
  const [shouldDisplayLoginModal, showLoginModal] = useState(false);

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

  const payforCourse = (data) => {
    // alert(`Please try again later${{
    //   amount: data?.amount,
    //   currency: Location?.countryCode === "IN" ? "INR" : "USD",
    //   user_email: data?.email,
    //   user_phone: data?.phone,
    // }}`);
    const orderdetails = createAnonOrderAPI({
      amount: data?.amount,
      currency: Location?.countryCode === "IN" ? "INR" : "USD",
      user_email: data?.email,
      user_phone: data?.phone,
    });

    var options = {
      // key: "rzp_test_bELNQVu6cqbl9r", // Development
      key: "rzp_live_T3DOeCymNflq6a", // Prod
      amount: data?.amount,
      currency: Location?.countryCode === "IN" ? "INR" : "USD",
      name: "xcool",
      description: "Payment by student",
      image: "",
      order_id: orderdetails?.payment_order_id,

      external: {
        wallets: ["paytm"],
      },
      prefill: {
        email: data?.email,
        contact: data?.phone,
      },
      theme: { color: "#F37254" },
    };

    RazorpayCheckout.open(options)
      .then((response) => {
        const dataOption = {
          order_id: orderdetails?.order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          lead_id: data?.lead_id,
        };

        const res = saveAnonOrderAPI(dataOption);
        Alert.alert(`Success: ${res}`);
      })
      .catch((error) => {
        // handle failure
        // alert(`Error: ${error.code} | ${error.description}`);
        alert(`Please try again later`);
      });
  };
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedClass, setSelectedClass] = useState(4);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [updatedAmt, setUpdatedAmt] = useState("");

  const [contactError, setContactError] = useState(false);

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
  const NoOfClasses = [
    {
      id: 4,
      class: 4,
      discount: "0%",
      month: 1,
    },
    {
      id: 8,
      class: 8,
      discount: "5%",
      month: 2,
    },
    {
      id: 16,
      class: 16,
      discount: "10%",
      month: 4,
    },
    {
      id: 24,
      class: 24,
      discount: "15%",
      month: 6,
    },
  ];
  const selectClassHandler = (i) => {
    // console.log(i, "i");
    setSelectedClass(i.id);
  };
  // console.log(fees, "selectedClass");

  const toggleDay = (day) => {
    // console.log(day);
    if (selectedDays.includes(day.id)) {
      setSelectedDays(selectedDays.filter((id) => id !== day.id));
    } else {
      setSelectedDays([...selectedDays, day.id]);
    }
  };

  const getRequestData = () => {
    return {
      genre_id: selectedGenre?.value || "",
      genre_name: selectedGenre?.label || "",
      course_id: selectedCourse?.value || "",
      course_name: selectedCourse?.label || "",
      teacher_id: selectedTeacher?.value || "",
      teacher_name: selectedTeacher?.label || "",
      fee_pref: selectedFees?.label || "",
      time_pref: selectedTimeslot?.label || "",
    };
  };

  useEffect(() => {
    fetchAllCourses()
      .then(setCourses)
      .catch((error) => console.log(error));
    fetchAllSubCategories()
      .then(setSubCategories)
      .catch((error) => console.log(error));
    fetchAllDropdownTeachers()
      .then(setTeachers)
      .catch((error) => console.log(error));
    AsyncStorage.getItem("token")
      .then(setToken)
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetchAllCourses(selectedGenre?.slug)
      .then(setCourses)
      .catch((error) => console.log(error));
    // fetchAllSubCategories().then(setSubCategories).catch((error) => console.log(error))
    // fetchAllDropdownTeachers().then(setTeachers).catch((error) => console.log(error))
    // AsyncStorage.getItem('token').then(setToken).catch((error) => console.log(error))
  }, [selectedGenre]);
  useEffect(() => {
    // fetchAllCourses(selectedGenre?.slug).then(setCourses).catch((error) => console.log(error))
    // fetchAllSubCategories().then(setSubCategories).catch((error) => console.log(error))
    fetchAllDropdownTeachers({
      subcategory: selectedGenre?.slug ?? "",
      course: selectedCourse?.slug ?? "",
    })
      .then(setTeachers)
      .catch((error) => console.log(error));
    // AsyncStorage.getItem('token').then(setToken).catch((error) => console.log(error))
  }, [selectedCourse, selectedGenre, Location]);
  // console.log(selectedTeacher, fees, token, "teachers");

  useEffect(() => {
    if (selectedTeacher?.value !== undefined) {
      fetchFeesOfTeacher(selectedTeacher?.value)
        .then((data) => {
          if (Location?.countryCode === "IN") {
            const rateph = data?.details?.rateph || 500;
            // const newRate = (rateph * 1.1).toFixed(1);

            // // Calculate the rounded value divisible by 25
            // const roundedValue = Math.ceil(parseFloat(newRate) / 25) * 25;

            // // Calculate the difference
            // const difference = roundedValue - parseFloat(newRate);

            // // Add the difference to the original rate
            // const teacherFee = parseFloat(newRate) + difference;
            // console.log(teacherFee, "pc");
            const updatedFee = calculateTeacherFee(
              rateph,
              Location?.countryCode
            );
            setFees(updatedFee);
          } else {
            let usdRate = data?.details?.usd_rateph || 20;
            // usdRate = (usdRate / 83) * 1.25;
            // if (usdRate <= 20) {
            //   usdRate = 20;
            // }
            // const newRate = usdRate.toFixed(1);
            // const num = parseFloat(newRate);
            // console.log(Math.ceil(num), "usd_pc");

            // setFees(usdRate);
            const updatedFee = calculateTeacherFee(
              usdRate,
              Location?.countryCode
            );
            setFeesUSD(updatedFee);
          }
        })
        .catch((error) => console.log(error));
    } else {
      setFees(0);
      setFeesUSD(0);
    }
  }, [selectedTeacher?.value, Location]);

  useEffect(() => {
    if (fees !== 0 || feesUSD !== 0) {
      setFeeFeild(false);
    } else {
      setFeeFeild(true);
    }
  }, [fees, feesUSD, Location]);

  function calculateFinalFees(initialFee, selectedClass) {
    // Ensure the discount percentage is a valid number between 0 and 100
    let discountPercentage;
    const selectedClassInfo = NoOfClasses.find(
      (classInfo) => classInfo?.id === selectedClass
    );

    if (selectedClass === 4) {
      return initialFee * 4;
    } else {
      if (selectedClass === 8) {
        discountPercentage = 5;
      } else if (selectedClass === 16) {
        discountPercentage = 10;
      } else if (selectedClass === 24) {
        discountPercentage = 15;
      } else {
        discountPercentage = 0;
      }
    }

    // Calculate the discount amount
    const discountAmount = (initialFee * discountPercentage) / 100;
    // console.log(discountAmount, "discountAmount");
    // Calculate the final fee after applying the discount
    const finalFee = (initialFee - discountAmount) * selectedClassInfo?.class;
    const roundAmt = finalFee.toFixed(1);
    // setFinalAmt(finalFee);
    const amt = parseFloat(roundAmt);
    return amt;
  }

  const applyCoupon = async () => {
    console.log(couponCode);
    if (couponCode === "") {
      setCouponError("Coupon is required");
    } else {
      setCouponError("");
      console.log(updatedAmt, "updatedAmt");
      let finalFee;
      if (Location?.countryCode === "IN") {
        finalFee = calculateFinalFees(fees, selectedClass);
      } else {
        finalFee = calculateFinalFees(feesUSD, selectedClass);
      }

      console.log("finalFee", finalFee);
      const data = await discount({ code: couponCode, value: finalFee });
      console.log(data, "discount");
      if (data?.success) {
        setUpdatedAmt(data?.data);
      } else {
        setCouponError(data?.response?.data?.message);
        console.log(data?.response?.data?.message, "discount");
      }
    }
  };
  // Define an email validation function
  const isValidEmail = (email) => {
    // Regular expression to match a valid email address format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // Test the input against the regular expression
    return emailRegex.test(email);
  };
  // Define a function to validate contact numbers
  const isValidContactNumber = (phoneNumber) => {
    // Regular expressions for Indian and USD phone number formats
    const indianPhoneRegex = /^[6-9]\d{9}$/; // Indian phone numbers are 10 digits long and start with 6, 7, 8, or 9
    const usdPhoneRegex = /^[2-9]\d{9}$/; // USD phone numbers are 10 digits long and don't start with 1
    console.log(Location?.countryCode);
    // Choose the appropriate regex based on the country code
    const phoneRegex =
      Location?.countryCode === "IN" ? indianPhoneRegex : usdPhoneRegex;

    // Test the input against the chosen regex
    return phoneRegex.test(phoneNumber);
  };
  // console.log(fees,'usd',feesUSD)

  return (
    isVisible && (
      <Modal transparent={true}>
        <Pressable
          onPress={onCancel}
          style={{
            backgroundColor: "#000000aa",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Pressable
            style={{
              flexDirection: "column",
              backgroundColor: "#EAF5FB",
              margin: 16,
              borderRadius: 12,
              padding: 16,
              width: useSafeAreaFrame().width - 32,
            }}
          >
            <ScrollView>
              {/* Title */}
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  textAlign: "center",
                  marginBottom: 16,
                }}
              >
                Request for a course
              </Text>
              {/* <Text style={{ fontSize: 16, marginBottom: 8 }}>"{selectedCourse?.label ?? selectedItem?.label}"</Text> */}
              {/* Drop Down Fields */}
              <DropdownComponent
                title="Genre"
                data={subCategories.map((item) => {
                  return {
                    label: item.subcategory,
                    value: item.id,
                    slug: item.slug,
                  };
                })}
                onSelection={(item) => {
                  console.log("selecting: " + item);
                  selectGenre(item);
                }}
                selectedValue={selectedGenre}
              />
              <DropdownComponent
                title="Course"
                data={courses.map((item) => {
                  return {
                    label: item.course_name,
                    value: item.id,
                    slug: item.slug,
                  };
                })}
                onSelection={(item) => selectCourse(item)}
                selectedValue={selectedCourse}
              />
              <DropdownComponent
                title="Teacher"
                placeholder="Xcool Recommended (or select yourself)"
                data={teachers.map((item) => {
                  return { label: item.firstName, value: item.id };
                })}
                onSelection={(item) => selectTeacher(item)}
                selectedValue={selectedTeacher}
              />
              {feesFeild ? (
                <DropdownComponent
                  title="Fees"
                  data={[
                    { label: "500 - 1000", value: "1" },
                    { label: "1000 - 2000", value: "2" },
                    { label: "2000 - 3000", value: "3" },
                    { label: "3000 above", value: "4" },
                  ]}
                  onSelection={(item) => selectFees(item)}
                />
              ) : (
                <Text>
                  Fees: {Location?.countryCode === "IN" ? "Rs." : "$"}{" "}
                  {Location?.countryCode === "IN" ? fees : feesUSD}
                </Text>
              )}

              <DropdownComponent
                title="Timeslot"
                data={[
                  { label: "Morning", value: "1" },
                  { label: "Afternoon", value: "2" },
                  { label: "Evening", value: "3" },
                  { label: "Night", value: "4" },
                ]}
                onSelection={(item) => selectTimeslot(item)}
              />
              <View>
                <Text style={styles.dayPreferenceText}>Day Preference</Text>
                <View style={styles.daySelectorContainer}>
                  {setDays?.map((day) => (
                    <TouchableOpacity
                      key={day?.id}
                      style={[
                        styles.daySelectorButton,
                        // Apply styles based on selection
                        {
                          backgroundColor: selectedDays.includes(day?.id)
                            ? "black"
                            : "transparent",
                        },
                      ]}
                    >
                      <Text
                        onPress={() => toggleDay(day)}
                        style={[
                          styles.daySelectorText,

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
              </View>
              {!feesFeild && (
                <View>
                  <Text style={styles.labelCount}>No of classes</Text>
                  {/* <View style={styles.classContainer}>
                    {NoOfClasses.map((i) => (
                      <Text
                        key={i.id}
                        onPress={() => selectClassHandler(i)}
                        style={[
                          styles.classButton,
                          {
                            backgroundColor:
                              selectedClass === i.id ? "black" : "transparent",
                            color: selectedClass === i.id ? "white" : "black",
                          },
                        ]}
                      >
                        <Text> {i.month.toString()} months</Text>
                        <Text> {i.class.toString()} classes</Text>

                        <Text
                          style={{
                            backgroundColor:
                              selectedClass === i.id ? "black" : " ",
                          }}
                        >
                          {" "}
                          {i.discount} off
                        </Text>
                      </Text>
                    ))}
                  </View> */}
                  <View style={styles.classContainer}>
                    {NoOfClasses.map((i) => (
                      <Pressable
                        key={i.id}
                        onPress={() => selectClassHandler(i)}
                        style={{
                          backgroundColor:
                            selectedClass === i?.id ? "#2A87BB" : "white",
                          // borderRadius: 10,
                          borderWidth: 1,
                          width: "40%",
                          position: "relative",
                          display: "flex",
                          marginBottom: 10,
                        }}
                      >
                        {/* <Text
                          style={{
                            color: selectedClass === i.id ? "white" : "black",
                            textAlign: "center",
                          }}
                        >
                          {" "}
                          {i.month.toString()} months
                        </Text> */}
                        <Text
                          style={{
                            color: selectedClass === i.id ? "white" : "black",
                            textAlign: "center",
                            fontSize: 13,
                            // marginBottom: 10,
                            // paddingBottom: 10,
                            margin: 5,
                            padding: 5,
                          }}
                        >
                          {i.class.toString()} classes {i.discount} off
                        </Text>

                        {/* <Text
                          style={{
                            backgroundColor:
                              selectedClass === i.id ? "black" : "#2A87BB",
                            color: "white",
                            textAlign: "center",
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                            borderRadius: 3,
                            borderWidth: 1,
                            borderTopColor: "white",
                          }}
                        >
                          {" "}
                          {i.discount} off
                        </Text> */}
                      </Pressable>
                    ))}
                  </View>
                </View>
              )}
              {!feesFeild && (
                <>
                  <View
                    style={{
                      borderWidth: 1,
                      borderStyle: "dashed",
                      padding: 4,
                      marginTop: 4,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {" "}
                      Total Fees:{" "}
                      {`${selectedClass} x ${
                        Location?.countryCode === "IN" ? fees : feesUSD
                      } = ${Location?.countryCode === "IN" ? "Rs" : "$"} `}
                      {selectedClass !== 4 && (
                        <>
                          <Text style={{ textDecorationLine: "line-through" }}>
                            { Location?.countryCode === "IN"? fees * selectedClass: feesUSD *selectedClass}
                          </Text>
                        </>
                      )}
                      <Text>
                        {"  "}
                        {calculateFinalFees(
                          Location?.countryCode === "IN" ? fees : feesUSD,
                          selectedClass
                        )}{" "}
                        /-
                      </Text>
                      {/* <Text>{updatedAmt}</Text> */}
                    </Text>
                  </View>
                  <View>
                    <View
                      style={{ display: `${!showCoupon ? "flex" : "none"}` }}
                    >
                      <Pressable
                        style={{
                          borderColor: "black",
                          borderWidth: 1,
                          backgroundColor: "#2A87BB",
                          width: "35%",
                          marginVertical: 4,
                          paddingVertical: 6,
                          justifyContent: "center",
                        }}
                        onPress={() => setShowCoupon(!showCoupon)}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 14,
                            color: "white",
                          }}
                        >
                          {" "}
                          Add Coupon
                        </Text>
                      </Pressable>
                    </View>
                    {showCoupon && (
                      <View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginVertical: 3,
                          }}
                        >
                          <TextInput
                            style={{
                              borderWidth: 1,
                              borderRadius: 4,
                              paddingVertical: 4,
                              paddingHorizontal: 5,
                              width: 150,
                              marginVertical: 3,
                              marginHorizontal: 5,
                            }}
                            type="text"
                            label="Coupon code"
                            placeholder="Coupon code"
                            value={couponCode}
                            onChangeText={(text) => {
                              setCouponError("");
                              setCouponCode(text);
                            }}
                          />

                          <View
                            style={{
                              backgroundColor: "#2A87BB",
                              borderRadius: 12,
                              // paddingHorizontal: 8,
                              paddingVertical: 6,
                              justifyContent: "center",
                              width: "20%",
                            }}
                          >
                            <Pressable onPress={applyCoupon}>
                              <Text
                                style={{
                                  textAlign: "center",
                                  fontSize: 14,
                                  color: "white",
                                }}
                              >
                                {" "}
                                Apply
                              </Text>
                            </Pressable>
                          </View>
                          <View
                            style={{
                              backgroundColor: "red",
                              borderRadius: 12,
                              // paddingHorizontal: 8,
                              paddingVertical: 6,
                              justifyContent: "center",
                              width: "20%",
                            }}
                          >
                            <Pressable
                              onPress={() => {
                                setShowCoupon(!showCoupon);
                                setUpdatedAmt(null);
                              }}
                            >
                              <Text
                                style={{
                                  textAlign: "center",
                                  fontSize: 14,
                                  color: "white",
                                }}
                              >
                                Remove
                              </Text>
                            </Pressable>
                          </View>
                        </View>
                        {couponError && (
                          <Text style={{ color: "red" }}>{couponError}</Text>
                        )}
                        {updatedAmt && (
                          <Text
                            style={{
                              borderWidth: 1,
                              borderStyle: "dashed",
                              padding: 4,
                              marginTop: 10,
                              textAlign: "center",
                            }}
                          >
                            Updated Amount :{updatedAmt?.coupon?.currency==="INR"?"Rs":"$"} {updatedAmt?.discounted_value}
                          </Text>
                        )}
                      </View>
                    )}
                  </View>
                  {token === null && (
                    <View>
                      <View style={{ marginBottom: 20 }}>
                        <TextInput
                          style={styles.emailAndPhone}
                          onChangeText={(text) => {
                            setEmail(text); // Update the email state
                            // Validate email address and update the email error state
                            if (!isValidEmail(text)) {
                              setEmailError(true);
                            } else {
                              setEmailError(false);
                            }
                          }}
                          placeholder="Email"
                          keyboardType="email-address"
                        />
                        {emailError && (
                          <Text style={{ color: "red" }}>
                            * Email is required
                          </Text>
                        )}
                        <TextInput
                          style={styles.emailAndPhone}
                          onChangeText={(text) => {
                            setPhone(text); // Update the phone state
                            const isValid = isValidContactNumber(text);
                            // console.log(isValid);
                            if (!isValid) {
                              setContactError(true);
                            } else {
                              setContactError(false);
                            }
                          }}
                          placeholder="Contact Number"
                          keyboardType="phone-pad"
                        />

                        {contactError && (
                          <Text style={{ color: "red" }}>
                            * Contact Number is required
                          </Text>
                        )}
                      </View>
                    </View>
                  )}
                </>
              )}
              {feesFeild && token === null && (
                <View>
                  <View style={{ marginBottom: 20 }}>
                    <TextInput
                      style={styles.emailAndPhone}
                      onChangeText={(text) => {
                        setEmail(text); // Update the email state
                        // Validate email address and update the email error state
                        if (!isValidEmail(text)) {
                          setEmailError(true);
                        } else {
                          setEmailError(false);
                        }
                      }}
                      placeholder="Email"
                      keyboardType="email-address"
                    />
                    {emailError && (
                      <Text style={{ color: "red" }}>* Email is required</Text>
                    )}
                    <TextInput
                      style={styles.emailAndPhone}
                      onChangeText={(text) => {
                        setPhone(text); // Update the phone state
                        const isValid = isValidContactNumber(text);
                        // console.log(isValid);
                        if (!isValid) {
                          setContactError(true);
                        } else {
                          setContactError(false);
                        }
                      }}
                      placeholder="Contact Number"
                      keyboardType="phone-pad"
                    />

                    {contactError && (
                      <Text style={{ color: "red" }}>
                        * Contact Number is required
                      </Text>
                    )}
                  </View>
                </View>
              )}

              {/* Actions */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <View
                  style={{
                    width: "30%",
                    borderRadius: 12,
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <Pressable onPress={onCancel}>
                    <Text
                      style={{ textAlign: "center", fontSize: 14, padding: 12 }}
                    >
                      Close
                    </Text>
                  </Pressable>
                </View>
                <TouchableOpacity
                  onPress={() => postRequestForCourse()}
                  style={{
                    backgroundColor: "#2A87BB",
                    borderRadius: 12,
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    justifyContent: "center",
                    // width: "40%",
                  }}
                >
                  {/* <Pressable
                  // onPress={() => {
                  //   if(token) {
                  //   postRequestForCourse();
                  //   } else {
                  //       showLoginModal(true)
                  //   }
                  // }}
                
                > */}
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#FFFFFF",

                      fontWeight: "bold",
                    }}
                  >
                    {feesFeild ? "Request Class Now" : "Book Now"}
                  </Text>
                  {/* </Pressable> */}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Pressable>
        </Pressable>
        {shouldDisplayLoginModal && (
          <LoginModal
            isVisible={true}
            allowBackgroundInteraction={false}
            onCancel={() => showLoginModal(false)}
            onSuccess={(newToken) => {
              setToken(newToken);
              // showLoginModal(false)
              postRequestForCourse();
            }}
          />
        )}
        {popupMessage && (
          <RequestDetailsResultModal
            isVisible={true}
            onCancel={onCancel}
            message={popupMessage}
          />
        )}
      </Modal>
    )
  );

  async function postRequestForCourse() {
    const storedEmail = await retrieveData("email");
    const storedPhone = await retrieveData("phone");
    console.log(storedEmail, storedPhone, email, phone, "book now");
    console.log(token, "token");

    var finalFee = 0;
    if (updatedAmt?.coupon?.is_active) {
      finalFee = updatedAmt?.discounted_value; // Calculate the final fee
    } else {
      finalFee = calculateFinalFees(fees, selectedClass); // Calculate the final fee
    }

    if (!feesFeild) {
      if (!storedEmail) {
        if (!email || !phone) {
          // Show error message for missing email or phone
          if (!email) {
            console.log("err");
            setEmailError(true);
          }
          if (!phone) {
            setContactError(true);
          }
          return;
        }
      }

      const lead = await requestForCourse({
        ...getRequestData(),
        email: email === null ? storedEmail : email,
        phone: phone === null ? storedPhone : phone,
        currency: Location?.countryCode === "IN" ? "INR" : "USD",
        no_of_classes: selectedClass,
        fee_pc: fees,
        fee_total: finalFee,
        coupon_id: updatedAmt?.coupon?.id || null,
        discount: Number(finalFee - updatedAmt?.discounted_value) || null,
      });
      if (updatedAmt?.coupon?.code == "AVNISH") {
        // Alert.alert("Request submitted successfully");
        setPopupMessage("Request submitted successfully");

        return;
      }

      if (lead?.success) {
        payforCourse({
          email: lead?.data?.email,
          phone: lead?.data?.phone,
          amount: (finalFee || lead?.data?.fee_total) * 100,
          lead_id: lead?.data?.id,
        });
      }
      console.log(lead, "lead1");
    } else if (token == null || (token == null && feesFeild)) {
      if (!email || !phone) {
        // Show error message for missing email or phone
        if (!email) {
          console.log("err");
          setEmailError(true);
        }
        if (!phone) {
          setContactError(true);
        }
        return;
      }

      const lead = await requestForCourse({
        ...getRequestData(),
        email: email === email,
        phone: phone === phone,
        no_of_classes: selectedClass || null,
        currency: Location?.countryCode === "IN" ? "INR" : "USD",
        fee_pc: fees || null,
        fee_total: finalFee || null,
        coupon_id: updatedAmt?.coupon?.id || null,
        discount: Number(finalFee - updatedAmt?.discounted_value) || null,
      });
      if (updatedAmt?.coupon?.code == "AVNISH") {
        // Alert.alert("Request submitted successfully");
        setPopupMessage("Request submitted successfully");

        return;
      }
      console.log(lead, "lead");

      if (lead?.success) {
        // Alert.alert("Request submitted successfully");
        setPopupMessage("Request submitted successfully");
      }
    } else {
      // Alert.alert(token,storedEmail);

      try {
        const dd = await requestForCourse({
          ...getRequestData(),
          email: storedEmail,
          phone: storedPhone,
          currency: Location?.countryCode === "IN" ? "INR" : "USD",
          no_of_classes: null,
          fee_pc: null,
          fee_total: null,
          coupon_id: null,
          discount: null,
        });
        console.log(dd, "dd");

        if (dd?.success) {
          setPopupMessage("Request submitted successfully");
        }
      } catch (error) {
        Alert.alert(JSON.stringify(error, null, 2));

        setPopupMessage(
          "Unable to send request.\nPlease make sure you are logged in."
        );
      }
    }
    // payforCourse();

    return;

    requestForCourse(getRequestData())
      .then(() => {
        // TODO:: Add popup for razorpay
        // Add condition to check if the reacher is selected

        if (selectedTeacher?.value != null) {
        }
        setPopupMessage("Request submitted successfully");
        showLoginModal(false);
      })
      .catch((error) => {
        console.log(error);
        setPopupMessage(
          "Unable to send request.\nPlease make sure you are logged in."
        );
      });
  }
}
const styles = StyleSheet.create({
  dayPreferenceText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  emailAndPhone: {
    // height: 40,
    margin: 4,
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    width: "95%",
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
  unselectedDay: {
    backgroundColor: "transparent",
  },
  daySelectorText: {
    fontSize: 16,
  },
  selectedDayText: {
    color: "white",
  },
  unselectedDayText: {
    color: "black",
  },
  labelCount: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  classContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: 1,
  },
  classButton: {
    width: 70,
    height: 55,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    margin: 5,

    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 14,
  },
});
