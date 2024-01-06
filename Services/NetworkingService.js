import { useState } from "react";
import axios from "axios";
import { Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

var networkingService = axios.create({
  baseURL: "https://beta.xcool.in/api/",
  //   baseURL: "http://127.0.0.1:8000/api/",
});

// Networking
export async function fetchAllCategories() {
  return (await networkingService.get("getCategories")).data.data;
}
export async function fetchAllSubCategories() {
  return (await networkingService.get("getSubCategory")).data.data;
}
export async function fetchLocation() {
  return (await networkingService.get("location")).data.data;
}
export async function fetchAllCourses(genre) {
  return (
    await networkingService.post("getAllCourses", {
      subcategory: genre ?? "",
    })
  ).data.data;
}
export async function discount(fdata) {
  // return (
  //   await networkingService.post("discount",fdata)
  // ).data.data;
  try {
    const response = await networkingService.post("discount", fdata);

    if (response && response.data && response.data.data) {
      return response.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    return error;
  }
}
export async function createAnonOrderAPI(data) {
  //   const token = await AsyncStorage.getItem("token");
  return (
    await networkingService.post("createAnonOrderAPI", data, {
      //   headers: {
      //     Authorization: "Bearer " + token,
      //   }
    })
  ).data.data;
}
export async function saveAnonOrderAPI(data) {
  //   const token = await AsyncStorage.getItem("token");
  return (
    await networkingService.post("savePayment", data, {
      //   headers: {
      //     Authorization: "Bearer " + token,
      //   }
    })
  ).data.data;
}
export async function scheduleBatchRequest(data) {
  //   const token = await AsyncStorage.getItem("token");
  return (
    await networkingService.post("scheduleBatch", data, {
      //   headers: {
      //     Authorization: "Bearer " + token,
      //   }
    })
  ).data;
}
export async function fetchAllCoursesByGenre(genre) {
  return (await networkingService.get("getCoursesByGenrev2/" + genre)).data
    .data;
}
export async function fetchDropdownCourses() {
  const token = await AsyncStorage.getItem("token");
  return (
    await networkingService.get("myCoursesDropdown", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  ).data?.data;
}
export async function getallConversation() {
  const token = await AsyncStorage.getItem("token");
  return (
    await networkingService.get("getAllConversations", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  ).data?.data;
}
export async function getConversationById(id) {
  const token = await AsyncStorage.getItem("token");

  return (
    await networkingService.get(`getConversation/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  ).data?.data;
}
export async function sendMessage(id, msg) {
  const body = {
    message: msg,
  };
  console.log(body, id);
  const token = await AsyncStorage.getItem("token");
  return (
    await networkingService.post(`sendMessage/${id}`, body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  ).data?.data;
}
export async function fetchDetailsOfCourse(slug) {
  return (await networkingService.get("getCourseById/" + slug)).data.data;
}
export async function fetchAllTeachers() {
  return (await networkingService.get("getAllTeachers")).data.data;
}
export async function fetchAllDropdownTeachers(data) {
  return (await networkingService.post("getDdTeachersWF", data)).data.data;
}
export async function fetchDetailsOfTeacher(slug) {
  return (await networkingService.get("getTeacher/" + slug)).data.data;
}
export async function fetchFeesOfTeacher(id) {
  return (await networkingService.get("getTeacherFees/" + id)).data.data;
}
export async function fetchQualificationsOfTeacher(slug) {
  return (await networkingService.get("getTeacherIdQual/" + slug)).data.data
    .details;
}
export async function completeClass(id) {
  console.log(id, "id");
  const token = await AsyncStorage.getItem("token");
  return (
    await networkingService.get(`completeClass/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  ).data;
}
export async function cancelClass(id) {
  console.log(id, "id");
  const token = await AsyncStorage.getItem("token");
  return (
    await networkingService.get(`cancelClass/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  ).data;
}
export async function completeClassStudent(id) {
  console.log(id, "id");
  const token = await AsyncStorage.getItem("token");
  return (
    await networkingService.get(`completeClassStudent/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  ).data;
}
export async function rescheduleClass(fdata) {
  const token = await AsyncStorage.getItem("token");
  return (
    await networkingService.post(`rescheduleClass`, fdata, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  ).data;
}
export async function fetchCoursesOfTeacher(slug) {
  return (await networkingService.get("getTeacherIdCourses/" + slug)).data.data;
}
export async function fetchAllTeachersForCourse(slug) {
  return (await networkingService.get("getCourseTeachers/" + slug)).data.data;
}
export async function requestForCourse(requestData) {
  console.log(requestData);
  const token = await AsyncStorage.getItem("token");
  return (
    await networkingService.post("addLead", requestData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  ).data;
}
export async function generateJwt(requestData) {
  const token = await AsyncStorage.getItem("token");
  return (
    await networkingService.get(`joinClass/${requestData}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  ).data.data;
}
export async function myCourses() {
  const token = await AsyncStorage.getItem("token");
  return (
    await networkingService.get(`myCourses`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  ).data.data;
}
export async function ActivateCourse(id) {
  const token = await AsyncStorage.getItem("token");
  return (
    await networkingService.get(`activateCourse/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  ).data;
}
export async function teacherPayins(fdata) {
  const token = await AsyncStorage.getItem("token");
  console.log(fdata);
  return (
    await networkingService.post(`getPayins`, fdata, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  ).data?.data;
}
export async function teacherPayout(fdata) {
  const token = await AsyncStorage.getItem("token");
  console.log(fdata);
  return (
    await networkingService.post(`getPayouts`, fdata, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  ).data?.data;
}
export async function generateInvoice() {
  const token = await AsyncStorage.getItem("token");

  return (
    await networkingService.get(`generateInvoice`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  ).data?.data;
}
export async function getInvoice(id) {
  const token = await AsyncStorage.getItem("token");

  return (
    await networkingService.get(`getInvoice/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  ).data?.data;
}

export async function login(email, password) {
  return (
    await networkingService.postForm("login", {
      email: email,
      password: password,
    })
  ).data?.data?.token;
}
export async function loginViaOTP(email, otp) {
  console.log(email, otp);
  return (
    await networkingService.postForm("loginViaOTP", {
      email: email,
      otp: otp,
    })
  ).data?.data?.token;
}
export async function loginSendOTP(email) {
  return (
    await networkingService.postForm("loginSendOTP", {
      email: email,
    })
  ).data;
}
export async function register(firstname, lastname, phone, email, password) {
  return (
    await networkingService.postForm("register", {
      email: email,
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      password: password,
      password_confirmation: password,
    })
  ).data?.data;
}
export async function resetpass(data) {
  console.log(data);
  return await networkingService.post(
    "resetpass",
    { email: data },
    {
      headers: {
        "Content-Type": "multipart/form-data;",
      },
    }
  );
}

// Redirecting
export function openUrlForApplyingCourse(id) {
  Linking.openURL("https://www.xcool.in/xcourse/" + id);
}
export function openUrlForApplyingCourseWithTeacher(courseId, teacherSlug) {
  // Linking.openURL('https://www.xcool.in/teacher/'+teacherSlug+"/"+courseId)
  openUrlForApplyingCourse(courseId);
}
export function joinClassOfTeacher(teacherName) {
  console.log(
    "joining class '" +
      "https://app.xcool.in/account/joinclassroom/" +
      teacherName +
      "'."
  );
  Linking.openURL("https://app.xcool.in/account/joinclassroom/" + teacherName);
}

export function joinCustomClassLink(link) {
  console.log("joining class '" + link + "'.");
  Linking.openURL(link);
}
