import axios, { formToJSON } from "axios";
import React, { useDebugValue, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import InfoView from "../../components/TeacherInfoView";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";

import { withNavigation } from "react-navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  generateInvoice,
  teacherPayins,
  teacherPayout,
} from "../../Services/NetworkingService";
import TransactionCard from "../../components/TransactionCard";
import moment from "moment";
import InvoiceCard from "../../components/InvoiceCard";
import { Alert } from "react-native";

function TransactionScreen(props) {
  const [selectedTab, setSelectedTab] = useState(0);
  const currentYear = new Date().getFullYear();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth()
  );
  const [currentYearState, setCurrentYear] = useState(currentYear);
  const [paymentpayout, setPaymentpayout] = useState([]);
  const [paymentPayin, setPaymentPayin] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [refresh,setRefresh]=useState(false)

  const selectedTabHandler = (index) => {
    setSelectedTab(index);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handlePreviousMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex - 1 + 12) % 12);
    if (currentMonthIndex === 0) {
      setCurrentYear((prevYear) => prevYear - 1);
    }
  };
  useEffect(() => {
    (async () => {
      const payin = await teacherPayins({
        month: currentMonthIndex,
        year: currentYear,
      });
      setPaymentPayin(payin);
      const payout = await teacherPayout({
        month: currentMonthIndex,
        year: currentYear,
      });
      // console.log("[payout]", payout);
      setPaymentpayout(payout[0]);
      setInvoiceData(payout[1]);
      setRefresh(false)
    })();
  }, [currentMonthIndex,refresh]);
  console.log("*******", paymentpayout?.length, "***********", currentYear);

  const handleNextMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex + 1) % 12);
    if (currentMonthIndex === 11) {
      setCurrentYear((prevYear) => prevYear + 1);
    }
  };

  const generateInvoiceHandler = async () => {
    // const res = await generateInvoice();
    setRefresh(true)
    // console.log(res);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#EAF5FB",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginVertical: 15,
        }}
      >
        <TouchableOpacity
          // style={{ backgroundColor: "black", paddingHorizontal: 5 }}
          onPress={handlePreviousMonth}
        >
          <Text style={{ color: "white" }}>
            <Ionicons
              name="caret-back-circle-outline"
              size={30}
              color="black"
            />
            {/* <ion-icon name="caret-back-circle-outline"></ion-icon> */}
          </Text>
        </TouchableOpacity>
        <Text>
          {months[currentMonthIndex]} {currentYearState}
        </Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={{ color: "white" }}>
            <Ionicons
              name="caret-forward-circle-outline"
              size={30}
              color="black"
            />
            {/* <ion-icon name="caret-back-circle-outline"></ion-icon> */}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginVertical: 10,
        }}
      >
        {["Payins", "Payouts"].map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => selectedTabHandler(index)}
              style={{
                padding: 10,
                borderRadius: 10,
                backgroundColor: index === selectedTab ? "#3498db" : "#EAF5FB",
              }}
            >
              <Text
                style={{ color: index === selectedTab ? "white" : "black" }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        {selectedTab === 0 && (
          <View>
            {paymentPayin?.length > 0 ? (
              <ScrollView
                horizontal={false}
                style={{
                  marginTop: 4,
                  marginBottom: 4,
                  flexDirection: "column",
                  height: 500,
                }}
              >
                {paymentPayin?.map((i, index) => {
                  return (
                    <TransactionCard
                      key={index}
                      type={"payin"}
                      currentMonthIndex={currentMonthIndex}
                      i={i}
                    />
                  );
                })}
              </ScrollView>
            ) : (
              <Text
                style={{
                  textAlign: "center",
                  marginLeft: 16,
                  marginRight: 16,
                  margin: 8,
                  backgroundColor: "#FFF",
                  borderRadius: 12,
                  maxWidth: 400,
                  justifyContent: "space-between",
                  borderWidth: 0.5,
                  padding: 16,
                  paddingBottom: 16,
                }}
              >
                No data available
              </Text>
            )}
          </View>
        )}

        {selectedTab === 1 && (
          <View>
            {paymentpayout?.length > 0 ? (
              <View style={{ marginTop: 10 }}>
                {paymentpayout?.map((i, index) => {
                  return <TransactionCard type={"payout"} key={index} i={i} />;
                })}
              </View>
            ) : (
              <Text
                style={{
                  textAlign: "center",
                  marginLeft: 16,
                  marginRight: 16,
                  margin: 8,
                  backgroundColor: "#FFF",
                  borderRadius: 12,
                  maxWidth: 400,
                  justifyContent: "space-between",
                  borderWidth: 0.5,
                  padding: 16,
                  paddingBottom: 16,
                }}
              >
                No data available
              </Text>
            )}
            <View style={{ marginVertical: 5 }}>
              <Text style={{ textAlign: "center", fontSize: 20 }}>
                {" "}
                Invoice Details
              </Text>

              <TouchableOpacity
                style={{
                  alignItems: "flex-end",
                }}
                onPress={generateInvoiceHandler}
              >
                <Text
                  style={{
                    color: "white",
                    backgroundColor: "#2A87BB",
                    padding: 5,
                    marginEnd: 4,
                  }}
                >
                  Generate Invoice
                </Text>
              </TouchableOpacity>
              <View style={{ marginVertical: 5 }}>
                <ScrollView
                  horizontal={false}
                  style={{
                    marginTop: 4,
                    marginBottom: 4,
                    flexDirection: "column",
                    height: 400,
                  }}
                >
                  {invoiceData?.length > 0 ? (
                    <View>
                      {invoiceData?.map((i, index) => {
                        return <InvoiceCard key={index} i={i} />;
                      })}
                    </View>
                  ) : (
                    <Text
                      style={{
                        textAlign: "center",
                        marginLeft: 16,
                        marginRight: 16,
                        margin: 8,
                        backgroundColor: "#FFF",
                        borderRadius: 12,
                        maxWidth: 400,
                        justifyContent: "space-between",
                        borderWidth: 0.5,
                        padding: 16,
                        paddingBottom: 16,
                      }}
                    >
                      No data available
                    </Text>
                  )}
                </ScrollView>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

export default withNavigation(TransactionScreen);
