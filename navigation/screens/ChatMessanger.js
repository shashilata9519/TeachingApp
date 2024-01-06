import React, { useState, useCallback, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Video } from "expo-av";
import { withNavigation } from "react-navigation";
// import { WebView } from 'react-native-webview';
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  getConversationById,
  sendMessage,
} from "../../Services/NetworkingService";
const { width } = Dimensions.get("window");
function ChatMessanger(props) {
  const route = useRoute();
  const { messageable, id } = route.params?.chatItemData;

  console.log(id, "conversation");
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getConversation();

    // setMessages([
    //  {
    //    _id: 1,
    //    text: "Hi",
    //    createdAt: new Date(),
    //    user: {
    //      _id: 2,
    //      name: "React Native",
    //      avatar:
    //        "https://xcool.s3.ap-south-1.amazonaws.com/images/sPAG4sReftgMw0Ai00UkbHVEJTs8aS6hXOwhjBLi.jpg",
    //    },
    //  },
    //  {
    //    _id: 2,
    //    text: "Hi",
    //    createdAt: new Date(),
    //    user: {
    //      _id: 1,
    //    },
    //  },
    //  {
    //    _id: 3,
    //    text: "Hi",
    //    createdAt: new Date(),
    //    user: {
    //      _id: 2,
    //      name: "React Native",
    //      avatar:
    //        "https://xcool.s3.ap-south-1.amazonaws.com/images/sPAG4sReftgMw0Ai00UkbHVEJTs8aS6hXOwhjBLi.jpg",
    //    },
    //  },
    //  ]);


  }, []);
  async function getConversation() {
    try {
      const { data } = await getConversationById(
        route.params?.chatItemData?.id
      );
      
  // console.log(data, "conversation");

      const messageObjects = data.map((message) => ({
        _id: message.id.toString(), // Convert ID to string
        text: message.body,
        createdAt: message.created_at,
        user: {
          _id: message.is_sender === 1 ? 1 : 2, // You can set the user IDs based on is_sender
          name: message.is_sender === 1 ? "john" : "You", // Set names accordingly
          avatar: message.sender.dp, // Use the sender's avatar if available
        },
      }));
      // console.log(messageObjects,'messageObjects')
      setMessages(messageObjects);
    } catch (error) {
      console.error("Error fetching:", error?.message);
    }
  }

  const SendMsg = async (messages) => {
    try {
      console.log(messages[0].text);
      const conversationId = route.params?.chatItemData?.id;
      const messageText = messages[0].text;
      // Assuming you have a sendMessage function in your NetworkingService
      const response = await sendMessage(conversationId, messageText);

      getConversation();
      const Message = {
        _id: response?.id.toString(), // Convert ID to string
        text: response?.body,
        createdAt: response?.conversation?.created_at,
        user: {
          _id: 2,
          name: "You",
          avatar: response?.participation?.messageable?.dp,
          // Set other user properties as needed
        },
      };

      setMessages((previousMessages) =>
        GiftedChat.append(...previousMessages, [Message])
      );
    } catch (error) {
      console.error("Error sending message:", error?.message);
    }
    // setMessages((previousMessages) =>
    //  GiftedChat.append(previousMessages, messages)
    // );
  };

  const renderMessageVideo = (props) => {
    const { currentMessage } = props;
    if (currentMessage.video.includes("vimeo")) {
      if (Platform.OS === "web") {
        return null;
      }
      // return (
      //   <View style={styles.video}>
      //     <WebView
      //       style={{ borderRadius: 13 }}
      //       source={{
      //         uri: `https://player.vimeo.com/video/${getVimeoId(
      //           currentMessage!.video!
      //         )}`,
      //       }}
      //     />
      //   </View>
      // );
    }
    return null;
    // <Video
    //   Readonly
    //   source={{ uri: currentMessage.video! }}
    //   style={styles.video}
    //   resizeMode="cover"
    // />
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ height: 60, paddingLeft: 16, justifyContent: "center" }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name={"arrow-back"} size={26} />
      </TouchableOpacity>

      <GiftedChat
        {...{ messages, onSend: SendMsg, renderMessageVideo }}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: width / 1.5,
    height: 150,
    margin: 13,
    borderRadius: 13,
  },
});

export default withNavigation(ChatMessanger);
