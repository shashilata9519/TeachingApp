import React, { useState } from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  FlatList,
} from "react-native";

import tw from "twrnc";
import { getallConversation } from "../../Services/NetworkingService";
import SearchBar from "../../components/SearchBar";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { withNavigation } from "react-navigation";
import ChatListCard from "../../components/ChatListCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginModal from "../../components/LoginModal";

function ChatListScreen(props) {
  const navigation = useNavigation();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [getAllConversations, setgetAllConversations] = useState([]);
  const [filteredChatList, setFilteredChatList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if token is present
    AsyncStorage.getItem("token")
      .then((value) => {
        if (value) {
          // Token is present, set it in state
          setToken(value);
          // Fetch chat list data
          fetchData();
        } 
      })
      .catch((error) => console.log(error));
  }, []);

  async function fetchData() {
    try {
      const data = await getallConversation();
      setgetAllConversations(data);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  }

  useEffect(() => {
    setFilteredChatList(getAllConversations);
  }, [getAllConversations]);

  useEffect(() => {
    let currentList = getAllConversations.filter((item) => {
      return item?.messageable.firstname
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });

    setFilteredChatList(currentList);
  }, [searchText]);

  if (!token) {
    // Render the login button or modal here when token is not present
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#2A87BB",
            borderRadius: 12,
          }}
          onPress={() => setShowLoginModal(true)}
        >
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
        </TouchableOpacity>
        {/* Render LoginModal when showLoginModal is true */}
        {showLoginModal && (
          <LoginModal
            isVisible={true}
            allowBackgroundInteraction={false}
            onCancel={() => setShowLoginModal(false)}
            onSuccess={(newToken) => {
              setToken(newToken);
              fetchData()
              setShowLoginModal(false); // Close the login modal after successful login
            }}
          />
        )}
      </View>
    );
  }

  return (
    <View
      style={{
        padding: 10,
        borderRadius: 12,
        margin: 5,
        marginTop: 8,
        marginBottom: 8,
        width: 373,
      }}
    >
      <View style={{ paddingVertical: 10 }}>
        <SearchBar onTextValueChange={(text) => setSearchText(text)} />
      </View>
      {filteredChatList?.length === 0 ? (
        <View>
          <Text>No Search Found</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={filteredChatList}
            renderItem={(item) => {
              return <ChatListCard item={item} />;
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
    </View>
  );
}

export default withNavigation(ChatListScreen);
