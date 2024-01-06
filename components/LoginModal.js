import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import {
  login,
  loginSendOTP,
  loginViaOTP,
  register,
  resetpass,
} from "../Services/NetworkingService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { storeDetails } from "../Services/Utils";

export default function RequestDetailsResultModal(props) {
  const {
    isVisible,
    onCancel,
    onSuccess,
    onFailure,
    allowBackgroundInteraction,
  } = props;

  const [email, setEmail] = useState(null);
  const [otpcode, setotpCode] = useState(null);
  const [forgotEmail, setforgotEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [fistName, setfistName] = useState(null);
  const [lastName, setlastName] = useState(null);
  const [error, setError] = useState("");
  const [password, setPassword] = useState(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showForgotPassForm, setShowForgotPassForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showotpForm, setShowotpForm] = useState(false);
  const [showLoginotpForm, setShowLoginotpForm] = useState(false);

  const [userDetails, setUserDetails] = useState();

  console.log(userDetails, "user");

  const [token, setToken] = useState("");
  var instance = axios.create({
    baseURL: "https://beta.xcool.in/api/",
  });
  async function storeToken(value) {
    if (value !== null && value !== undefined) {
      await AsyncStorage.setItem("token", value);
      setToken(value);
      fetchUserDetails(value);
    }

    onSuccess(value);
  }
  function fetchUserDetails(token) {
    instance
      .get("myself", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        // setIsTeacher(response?.data?.data?.is_teacher == 1);
        // console.log("type", response?.data?.data);
        storeDetails("type", Boolean(response?.data?.data?.is_teacher == 1));
        storeDetails("email", response?.data?.data?.email);
        storeDetails("phone", response?.data?.data?.phone_no);
        // AsyncStorage.setItem("email", String(response?.data?.data?.email));

        // AsyncStorage.setItem("phone", String(response?.data?.data?.phone_no));
        setUserDetails(response.data?.data);
      })
      .catch((error) => console.log(error));
  }

  function loginUser() {
    setError("");
    login(email, password)
      .then((response) => storeToken(response))
      .catch((error) => {
        console.log(error, "error");
        setError("Wrong credentials");
      });
  }
  function RegisterUser() {
    setError("");
    register(fistName, lastName, phone, email, password)
      .then(setShowRegisterForm(false))
      .catch((error) => setError("Something went wrong try again"));
  }
  async function ForgotPassUser() {
    if (forgotEmail === null) {
      setError("Email is required");
    } else {
      setError("");
      await resetpass(forgotEmail)
        .then((res) => {
          Alert.alert("Password Reset email sent!");
          toggleLoginForm();
        })
        .catch((error) => setError(error?.response?.data?.message));
    }
  }
  async function loginSendOTPhandler() {
    if (email === null) {
      setError("Email is required");
    } else {
      setError("");
      await loginSendOTP(email)
        .then((res) => {
          console.log(res);
          Alert.alert(res?.data);
          setShowotpForm(true);
          // toggleLoginForm();
        })
        .catch((error) => setError(error?.response?.data?.message));
    }
  }
  async function loginviaOtp() {
    if (otpcode === null) {
      setError("otp is required");
    } else {
      setError("");
      await loginViaOTP(email, otpcode)
        .then((res) => {
          console.log(res);
          storeToken(res);
        })
        .catch((error) => console.log(error?.response?.data));
    }
  }

  function toggleLoginForm() {
    setShowLoginForm(true);
    setShowForgotPassForm(false);
    setShowRegisterForm(false);
    setShowLoginotpForm(false);
  }

  function toggleForgotPassForm() {
    setShowLoginForm(false);
    setShowForgotPassForm(true);
    setShowRegisterForm(false);
    setShowLoginotpForm(false);
  }
  function toggleLoginOtpForm() {
    setShowLoginForm(false);
    setShowForgotPassForm(false);
    setShowRegisterForm(false);
    setShowLoginotpForm(true);
  }

  function toggleRegisterForm() {
    setShowLoginForm(false);
    setShowForgotPassForm(false);
    setShowRegisterForm(true);
    setShowLoginotpForm(false);
  }

  // function toggleRegisterForm() {
  //   setShowRegisterForm(!showRegisterForm);

  // }
  // function toggleForgotPassForm() {
  //   setShowForgotPassForm(true);
  //   // setShowRegisterForm(!showRegisterForm);
  // }

  const inputStyles = StyleSheet.create({
    emailAndPassword: {
      // height: 40,
      margin: 4,
      padding: 8,
      borderWidth: 1,
      borderRadius: 8,
      width: "100%",
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
  });

  const ContentView = () => {
    return;
  };

  if (allowBackgroundInteraction) {
    return (
      isVisible && (
        <>
          {showLoginForm && (
            <>
              <Pressable
                style={{
                  flexDirection: "column",
                  backgroundColor: "#EAF5FB",
                  margin: 3,
                  borderRadius: 12,
                  padding: 16,
                  width: useSafeAreaFrame().width - 64,
                  height: 200,
                }}
              >
                <View
                  style={{
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    backgroundColor: "#EAF5FB",
                  }}
                >
                  <TextInput
                    style={inputStyles.emailAndPassword}
                    onChangeText={setEmail}
                    placeholder="Email"
                    keyboardType="email-address"
                  />
                  <TextInput
                    style={inputStyles.emailAndPassword}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry={true}
                  />
                  <View
                    style={{
                      backgroundColor: "#2A87BB",
                      borderRadius: 12,
                      marginTop: 16,
                      width: "40%",
                    }}
                  >
                    <Pressable onPress={() => loginUser()}>
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 14,
                          color: "#FFFFFF",
                          padding: 12,
                          fontWeight: "bold",
                        }}
                      >
                        Login
                      </Text>
                    </Pressable>
                  </View>
                  {error && (
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 12,
                        padding: 12,
                        fontWeight: "bold",
                        height: 45,
                        borderRadius: 10,
                      }}
                    >
                      {error}
                    </Text>
                  )}
                </View>
              </Pressable>
              <View
                style={{
                  paddingTop: 0,
                }}
              >
                <Pressable onPress={() => toggleLoginOtpForm()}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      padding: 12,
                      fontWeight: "bold",
                      height: 45,
                      borderRadius: 10,
                      textDecorationLine: "underline",
                    }}
                  >
                    Login via OTP
                  </Text>
                </Pressable>
              </View>
              <View
                style={{
                  paddingTop: 0,
                }}
              >
                <Pressable onPress={() => toggleForgotPassForm()}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      padding: 12,
                      fontWeight: "bold",
                      height: 45,
                      borderRadius: 10,
                      textDecorationLine: "underline",
                    }}
                  >
                    Forgot Password
                  </Text>
                </Pressable>
              </View>

              {/* Register button error */}
              <View
                style={{
                  paddingTop: 0,
                }}
              >
                <Pressable onPress={() => toggleRegisterForm()}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      padding: 12,
                      fontWeight: "bold",
                      height: 45,
                      borderRadius: 10,
                    }}
                  >
                    New User? Register Now!
                  </Text>
                </Pressable>
              </View>
            </>
          )}
          {showRegisterForm && (
            <Pressable>
              <View style={{ paddingBottom: 10, paddingTop: 4 }}>
                <View
                  style={{
                    paddingRight: 10,
                    justifyContent: "center",
                    borderRadius: 10,
                    marginLeft: 13,
                    width: 350,
                    height: 480,
                  }}
                >
                  <View
                    style={{
                      paddingRight: 0,
                      padding: 8,
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      flex: 1,
                      margin: 1,
                      paddingHorizontal: 4,
                    }}
                  >
                    <View style={{ flexDirection: "column" }}>
                      <View
                        style={{
                          textAlign: "center",
                          justifyContent: "center",
                          marginLeft: 20,
                          marginTop: 40,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 17,
                            fontWeight: "normal",
                            paddingBottom: 10,
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          Student Registration
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          textAlign: "left",
                          justifyContent: "center",
                          marginLeft: 90,
                          marginTop: 10,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            textAlign: "center",
                            justifyContent: "center",
                            marginLeft: 1,
                            marginTop: 2,
                            width: 150,
                            height: 45,
                          }}
                        >
                          <TextInput
                            style={inputStyles.emailAndPassword}
                            onChangeText={setfistName}
                            placeholder="First Name *"
                            keyboardType="email-address"
                          />
                          <TextInput
                            style={inputStyles.emailAndPassword}
                            onChangeText={setlastName}
                            placeholder="Last Name *"
                            keyboardType="email-address"
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          textAlign: "center",
                          justifyContent: "flex-start",
                          marginLeft: 8,
                          marginTop: 10,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "column",
                            textAlign: "center",
                            marginLeft: 0,
                            marginTop: 5,
                            width: 310,
                            height: 45,
                          }}
                        >
                          <TextInput
                            style={inputStyles.emailAndPassword}
                            onChangeText={setEmail}
                            placeholder="Email *"
                            keyboardType="email-address"
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          textAlign: "center",
                          justifyContent: "flex-start",
                          marginLeft: 8,
                          marginTop: 10,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "column",
                            textAlign: "center",
                            marginLeft: 0,
                            marginTop: 5,
                            width: 310,
                            height: 45,
                          }}
                        >
                          <TextInput
                            style={inputStyles.emailAndPassword}
                            onChangeText={setPhone}
                            placeholder="Phone Number *"
                            keyboardType="email-address"
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          textAlign: "center",
                          justifyContent: "flex-start",
                          marginLeft: 8,
                          marginTop: 10,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "column",
                            textAlign: "center",
                            marginLeft: 0,
                            marginTop: 5,
                            width: 310,
                            height: 45,
                          }}
                        >
                          <TextInput
                            style={inputStyles.emailAndPassword}
                            onChangeText={setPassword}
                            placeholder="Password"
                            secureTextEntry={true}
                          />
                        </View>
                      </View>
                      {error && (
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 12,
                            padding: 12,
                            fontWeight: "bold",
                            height: 45,
                            borderRadius: 10,
                          }}
                        >
                          {error}
                        </Text>
                      )}
                      <View
                        style={{
                          margin: 15,
                          alignItems: "center",
                          backgroundColor: "#2A87BB",
                          borderRadius: 12,
                        }}
                      >
                        <Pressable onPress={() => RegisterUser()}>
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 14,
                              color: "#FFFFFF",
                              padding: 12,
                              fontWeight: "bold",
                            }}
                          >
                            Register
                          </Text>
                        </Pressable>
                      </View>
                      <View
                        style={{
                          paddingTop: 0,
                        }}
                      >
                        <Pressable onPress={() => toggleLoginForm()}>
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 12,
                              padding: 12,
                              fontWeight: "bold",
                              height: 45,
                              borderRadius: 10,
                            }}
                          >
                            Already have an account? Login Now!
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          )}

          {showForgotPassForm && (
            <>
              <Pressable
                style={{
                  flexDirection: "column",
                  backgroundColor: "#EAF5FB",
                  margin: 3,
                  borderRadius: 12,
                  padding: 16,
                  width: useSafeAreaFrame().width - 64,
                  height: 200,
                }}
              >
                <View
                  style={{
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    backgroundColor: "#EAF5FB",
                  }}
                >
                  <TextInput
                    style={inputStyles.emailAndPassword}
                    onChangeText={setforgotEmail}
                    placeholder="Email"
                    keyboardType="email-address"
                  />

                  <View
                    style={{
                      backgroundColor: "#2A87BB",
                      borderRadius: 12,
                      marginTop: 16,
                      width: "40%",
                    }}
                  >
                    <Pressable onPress={() => ForgotPassUser()}>
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 14,
                          color: "#FFFFFF",
                          padding: 12,
                          fontWeight: "bold",
                        }}
                      >
                        Reset
                      </Text>
                    </Pressable>
                  </View>
                  {error && (
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 12,
                        padding: 12,
                        fontWeight: "bold",
                        height: 45,
                        borderRadius: 10,
                      }}
                    >
                      {error}
                    </Text>
                  )}
                </View>
              </Pressable>
              <View
                style={{
                  paddingTop: 0,
                }}
              >
                <Pressable onPress={() => toggleLoginForm()}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      padding: 12,
                      fontWeight: "bold",
                      height: 45,
                      borderRadius: 10,
                      textDecorationLine: "underline",
                    }}
                  >
                    Login here
                  </Text>
                </Pressable>
              </View>
            </>
          )}
          {showLoginotpForm && (
            <>
              <Pressable
                style={{
                  flexDirection: "column",
                  backgroundColor: "#EAF5FB",
                  margin: 3,
                  borderRadius: 12,
                  padding: 16,
                  width: useSafeAreaFrame().width - 64,
                  height: 200,
                }}
              >
                <View
                  style={{
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    backgroundColor: "#EAF5FB",
                  }}
                >
                  <TextInput
                    style={inputStyles.emailAndPassword}
                    onChangeText={setEmail}
                    placeholder="Email"
                    keyboardType="email-address"
                  />
                  <Pressable onPress={() => loginSendOTPhandler()}>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        color: "#FFFFFF",
                        padding: 12,
                        fontWeight: "bold",
                        backgroundColor: "black",
                        borderRadius: 12,
                        marginVertical: 10,
                      }}
                    >
                      Send OTP
                    </Text>
                  </Pressable>
                  {showotpForm && (
                    <TextInput
                      style={inputStyles.emailAndPassword}
                      onChangeText={setotpCode}
                      placeholder="OTP"
                    />
                  )}
                  {showotpForm && (
                    <View
                      style={{
                        backgroundColor: "#2A87BB",
                        borderRadius: 12,
                        marginTop: 16,
                        width: "40%",
                      }}
                    >
                      <Pressable onPress={() => loginviaOtp()}>
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 14,
                            color: "#FFFFFF",
                            padding: 12,
                            fontWeight: "bold",
                          }}
                        >
                          Login
                        </Text>
                      </Pressable>
                    </View>
                  )}

                  {error && (
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 12,
                        padding: 12,
                        fontWeight: "bold",
                        height: 45,
                        borderRadius: 10,
                      }}
                    >
                      {error}
                    </Text>
                  )}
                </View>
              </Pressable>
              {/* login  button error */}
              <View
                style={{
                  marginTop: 10,
                }}
              >
                <Pressable onPress={() => toggleLoginForm()}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      padding: 12,
                      fontWeight: "bold",
                      height: 45,
                      borderRadius: 10,
                      textDecorationLine: "underline",
                    }}
                  >
                    Login here
                  </Text>
                </Pressable>
              </View>

              {/* forgot password button error */}
              <View
                style={{
                  paddingTop: 0,
                }}
              >
                <Pressable onPress={() => toggleForgotPassForm()}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      padding: 5,
                      fontWeight: "bold",
                      height: 45,
                      borderRadius: 10,
                      textDecorationLine: "underline",
                    }}
                  >
                    Forgot Password
                  </Text>
                </Pressable>
              </View>

              {/* Register button error */}
              <View
                style={{
                  paddingTop: 0,
                }}
              >
                <Pressable onPress={() => toggleRegisterForm()}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      padding: 5,
                      fontWeight: "bold",
                      height: 45,
                      borderRadius: 10,
                    }}
                  >
                    New User? Register Now!
                  </Text>
                </Pressable>
              </View>
            </>
          )}

          {/* Register card End */}
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
  return (
    isVisible && (
      <Modal transparent={true}>
        <Pressable
          onPress={onCancel}
          style={backgroundStyles.noBackgroundInteraction}
        >
          <Pressable
            style={{
              flexDirection: "column",
              backgroundColor: "#EAF5FB",
              margin: 32,
              borderRadius: 12,
              padding: 16,
              width: useSafeAreaFrame().width - 64,
              height: 200,
            }}
          >
            <View
              style={{
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                backgroundColor: "#EAF5FB",
              }}
            >
              <TextInput
                style={inputStyles.emailAndPassword}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
              />
              <TextInput
                style={inputStyles.emailAndPassword}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry={true}
              />
              <View
                style={{
                  backgroundColor: "#2A87BB",
                  borderRadius: 12,
                  marginTop: 16,
                  width: "40%",
                }}
              >
                <Pressable onPress={() => loginUser()}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 14,
                      color: "#FFFFFF",
                      padding: 12,
                      fontWeight: "bold",
                    }}
                  >
                    Login
                  </Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    )
  );
}
