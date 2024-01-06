// import React from "react";
// import { View, Text } from "react-native";

// const InvoiceDetailScreen = ({ route }) => {
//   // Get the invoice data passed as a parameter from the InvoiceCard component
//   const { invoice } = route.params;
//   console.log(invoice)

//   return (
//     <View>
//       <Text style={{ fontSize: 24, fontWeight: "bold" }}>Invoice Details</Text>

//       <View style={{ margin: 16 }}>
//         <Text>Date: {invoice?.invoice_date}</Text>
//         <Text>Invoice Id: {invoice?.id}</Text>
//         <Text>Amount: {invoice?.invoice_total}</Text>
//         <Text>Payment Status: {invoice?.payment_status}</Text>
//         {/* Add more details here as needed */}
//       </View>
//     </View>
//   );
// };

// export default InvoiceDetailScreen;
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import moment from "moment";
import { useEffect } from "react";
import { getInvoice } from "../../Services/NetworkingService";
import { useState } from "react";

const InvoiceDetailScreen = ({ route }) => {
  const { invoice } = route.params;
  const [data, setData] = useState(null);

  console.log(data,'data');
  useEffect(() => {
    (async () => {
      const res = await getInvoice(invoice);
      setData(res);
      // setRefresh(false)
    })();
  }, [invoice]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Invoice Date: </Text>
        <Text>{moment(data?.invoice_date).format("DD-MM-YYYY")}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Invoice No: {data?.id}</Text>
      </View>
      {/* Teacher section */}
      {/* Commented out as it seems to be missing in your provided code */}
      {/* <View style={styles.row}>
        <Text style={styles.label}>Teacher: </Text>
        <Text>{data?.class[0]?.invitation?.name}</Text>
      </View> */}
      <View style={styles.row}>
        <Text style={styles.label}>Total: </Text>
        <Text>{data?.invoice_total || 0}</Text>
      </View>

      <ScrollView horizontal>
        <View>
          {/* Table header */}
          <View style={styles.row}>
            <Text style={styles.tableHeader}>S.No</Text>
            <Text style={styles.tableHeader}>Class Number</Text>
            <Text style={styles.tableHeader}>Class ID</Text>
            <Text style={styles.tableHeader}>Student</Text>
            <Text style={styles.tableHeader}>Fees</Text>
            <Text style={styles.tableHeader}>Discount</Text>
            <Text style={styles.tableHeader}>Total</Text>
          </View>

          <View>
            {data?.class?.length > 0 ? (
              data?.class?.map((item, index) => (
                <View style={styles.row} key={index}>
                  <Text>{index + 1}</Text>
                  <Text>{item.id}</Text>
                  <Text>{item.class_id}</Text>
                  <Text>{item.invitation?.lead?.student_name}</Text>
                  <Text>{data?.invoice_items[index]?.fee}</Text>
                  <Text>{data?.invoice_items[index]?.discount_bulk}</Text>
                  <Text>{data?.invoice_items[index]?.fee_total}</Text>
                </View>
              ))
            ) : (
              <View style={styles.row}>
                <Text style={styles.noData}>No data</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
  },
  tableHeader: {
    fontWeight: "bold",
    marginRight: 8,
  },
  noData: {
    textAlign: "center",
  },
});

export default InvoiceDetailScreen;
