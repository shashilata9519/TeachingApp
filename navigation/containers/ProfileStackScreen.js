import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";
import TestScreen from "../screens/TestScreen";
import RequestScreen from "../screens/RequestScreen";
import MeetingDetailScreen from "../screens/MeetingDetailScreen";
import JoinMeetingView from "../screens/JoinMeetingScreen";
import { Image } from "react-native";
import Icon from "../../assets/icon.png";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import InvoiceCard from "../../components/InvoiceCard";
import InvoiceDetailScreen from "../screens/InvoiceDetailScreen";

const profileScreenName = "Profile Sreen";
const meetingDetailScreenName = "Class Detail Screen";
const meetingJoinScreenName = "Join Class";
const testScreenName = "Test Screen";

const ProfileStack = createStackNavigator();

export default function ProfileStackScreen() {
  return (
    // <MainDrawer />
    <ProfileStack.Navigator initialRouteName={profileScreenName}>
      <ProfileStack.Screen name={testScreenName} component={RequestScreen} />
      <ProfileStack.Screen
        name={profileScreenName}
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name={meetingDetailScreenName}
        component={MeetingDetailScreen}
      />
      <ProfileStack.Screen name="InvoiceCard" component={InvoiceCard} />
      <ProfileStack.Screen
        name="InvoiceDetailScreen"
        component={InvoiceDetailScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* <ProfileStack.Screen
        name={meetingJoinScreenName}
        component={JoinMeetingView}
        // options={{ headerShown: false }}
        options={({ route }) => ({
          tabBarVisible: undefined,
          headerShown: false,
          tabBarStyle: { display: "none" },
          tabBarButton: () => null,
        })}
      /> */}
      {/* <ProfileStack.Screen name={testScreenName} component={TestScreen} /> */}
    </ProfileStack.Navigator>
  );
}
