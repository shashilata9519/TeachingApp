import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

export const statusStudent = (data) => {
  if (data?.batch == null) {
    return "Applied";
  } else {
    if (data?.is_demo_req == 1) {
      var status =
        (data?.is_accepted == 1 && "Accepted") ||
        (data?.is_cancelled == 1 && "Cancelled") ||
        (data?.is_rejected == 1 && "Rejected") ||
        "Pending confirmation";
    } else {
      var status =
        (data?.is_accepted == 1 && "Paid") ||
        (data?.is_demo_req == 1 && "Demo") ||
        (data?.is_cancelled == 1 && "Cancelled") ||
        (data?.is_rejected == 1 && "Rejected") ||
        "Payment Due";
    }
  }

  return status;
};
export const statusTeacher = (data) => {
  // var status =
  //   (data?.is_accepted == 1 && "Paid") ||
  //   (data?.is_demo_req == 1 && "Demo") ||
  //   (data?.is_cancelled == 1 && "Cancelled") ||
  //   (data?.is_rejected == 1 && "Rejected") ||
  //   "Pending";
  if (data?.is_demo_req == 1) {
    var status =
      (data?.is_accepted == 1 && "Paid") ||
      (data?.is_cancelled == 1 && "Cancelled") ||
      (data?.is_rejected == 1 && "Removed") ||
      (data?.is_pending == 1 && "Invited") ||
      "Applied";
  } else {
    var status =
      (data?.is_accepted == 1 && "Paid") ||
      (data?.is_cancelled == 1 && "Cancelled") ||
      (data?.is_rejected == 1 && "Removed") ||
      (data?.is_pending == 1 && "Payment Due") ||
      "Applied";
  }
  return status;
};

export const genareteColor = (str) => {
  return (
    (str == "Applied" && "#78a194") ||
    (str == "Pending confirmation" && "#f7efe1") ||
    (str == "Paid" && "#ccfcf2") ||
    (str == "Cancelled" && "#e7948b8a") ||
    (str == "Rejected" && "#343a40") ||
    (str == "Payment Due" && "#f7efe1") ||
    "#f7efe1"
  );
};
export const GenerateTextColor = (str) => {
  return (
    (str == "Invited" && "black") ||
    (str == "Paid" && "rgb(50,205,50)") ||
    (str == "Pending confirmation" && "#00BFFF") ||
    (str == "Removed" && "#FF0000") ||
    (str == "Rejected" && "#FF0000") ||
    (str == "Applied" && "#228B22") ||
    (str == "Accepted" && "#7B68EE") ||
    (str == "Payment Due" && "orange") ||
    (str == "Cancelled" && "darkred") ||
    "#f7efe1"
  );
};

export async function storeDetails(type, value) {
  await AsyncStorage.setItem(type, JSON.stringify(value));
  // onSuccess(value);
}
export const retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // console.log('Data retrieved successfully: ', JSON.parse(value));
      return JSON.parse(value);
    } else {
      console.log("No data found");
    }
  } catch (error) {
    console.error("Error retrieving data: ", error);
  }
};
export const getDatesForN = (startDate, no_of_dates, utc_time, dayOfWeek) => {
  const dates = [];

  // const current = new Date(startDate);
  const current = new Date(startDate);
  let numDates = 0; // Number of dates found


  while (numDates < no_of_dates) {
    // Check if the current day is the desired day of the week (0-6, where Sunday is 0)
    if (dayOfWeek.includes(current.getDay())) {
      dates.push(moment(current.toISOString()).format("yyyy-MM-DD HH:mm:ss"));
      numDates++; // Increment the number of dates found
    }

    // console.log(dates,'**', current, "dayOfWeek");
    // Move to the next day
    current.setDate(current.getDate() + 1);
    if (numDates >= no_of_dates) {
      break;
    }
  }
  console.log(dates,'dd')
  return dates;
  const lastDate = dates.length > 0 ? dates[dates.length - 1] : null;
  console.log(lastDate, "last date");
  return lastDate;
};

export const calculateTeacherFee = (rateph, country) => {
  let newRate;

  if (country === "IN") {
    newRate = (rateph * 1.1).toFixed(1);
    const roundedValue = Math.ceil(parseFloat(newRate) / 25) * 25;
    const difference = roundedValue - parseFloat(newRate);
    newRate = (parseFloat(newRate) + difference).toFixed(1);
    // if (newRate <= 1200) {
    //   newRate = 1200;
    // }
  } else {
    let usdRate = (rateph / 83) * 1.25;
    if (usdRate <= 20) {
      usdRate = 20;
    }
    newRate = usdRate.toFixed(1);
  }

  const teacherFee = Math.ceil(parseFloat(newRate));
  // console.log(teacherFee,"teacherFee")
  return teacherFee;
};

// export const getDatesForN = (startDate, no_of_dates, utc_time,dayOfWeek) => {
//   const dates = [];
//   const current = moment(startDate, "DD-MM-YYYY HH:mm");
//   let numDates = 0;
//   console.log(dayOfWeek,current.day(),'current')
//   // const dayAbbreviations = getDayAbbreviations(dayOfWeek);
// // console.log(dayOfWeek)

//   while (numDates < no_of_dates) {
//     // const currentDayOfWeek = current.day() === 1 ? 7 : current.day();
//     // Check if the current day is included in the desired days of the week
//     if (dayOfWeek?.includes(current.day())) {
//       console.log(dayOfWeek?.includes(current.day()))
//       dates.push(current.format("YYYY-MM-DD HH:mm:ss"));
//       numDates++;
//     }

//     // Move to the next day
//     current.add(1, "day");

//   }

//   return dates;
// };
