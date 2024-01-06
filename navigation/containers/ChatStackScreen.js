import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { Image } from "react-native";
import Icon from "../../assets/icon.png";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ChatListScreen from "../screens/ChatListScreen";
import ChatMessanger from "../screens/ChatMessanger";
import AsyncStorage from "@react-native-async-storage/async-storage";

const chatListName = "ChatList";
const chatScreenName = "chatScreen";

const ChatStack = createStackNavigator();

export default function ChatStackScreen() {
 
  return (

    <ChatStack.Navigator initialRouteName={chatListName}>
      <ChatStack.Screen name={chatListName} component={ChatListScreen} />
      <ChatStack.Screen
        name={chatScreenName}
        component={ChatMessanger}
        options={{ headerShown: false }}
      />
    </ChatStack.Navigator>
  );
}
