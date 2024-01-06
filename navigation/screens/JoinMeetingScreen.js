import { Text, View } from "react-native";
import React, { useCallback, useEffect, useState, useRef } from "react";

import { JitsiMeeting } from "@jitsi/react-native-sdk/index";
import { useNavigation } from "@react-navigation/native";
import { generateJwt } from "../../Services/NetworkingService";

export default function JoinMeetingView(props) {
  const { id } = props.route.params;
  const jitsiMeeting = useRef(null);
  const [meetjwt, selectMeetjwt] = useState("");
  const [showMeet, setShowMeet] = useState(false);
  const [roomName, setRoomName] = useState("");
  const navigation = useNavigation();
  // const {
  //   roomName,
  // } = `vpaas-magic-cookie-cabf1df7028948b0a50ab91216d36623/${id}?jwt=${meetjwt}`;
  console.log(id, "meeting", props);
  const onReadyToClose = useCallback(() => {
    // @ts-ignore
    jitsiMeeting.current.close();
    // @ts-ignore
    navigation.navigate("Menu");
  }, [navigation]);

  useEffect(() => {
    generateJwt(id)
      .then((response) => {
        selectMeetjwt(response);

        console.log(roomName, "roomName");
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(data, "data");
  }, []);

  let meetingOptions = {
    domain: "https://8x8.vc/",
    onReadyToClose,
    roomName: `vpaas-magic-cookie-cabf1df7028948b0a50ab91216d36623/${id}?jwt=${meetjwt}`,
    settings: {
      startWithAudioMuted: true,
      startWithVideoMuted: true,
      startAudioOnly: false,
    },
  };

  useEffect(() => {
    setRoomName(`vpaas-magic-cookie-cabf1df7028948b0a50ab91216d36623/${id}`);
    meetingOptions = {
      domain: "https://8x8.vc/",
      onReadyToClose,
      roomName: `${id}?jwt=${meetjwt}`,
      settings: {
        startWithAudioMuted: true,
        startWithVideoMuted: true,
        startAudioOnly: false,
      },
    };
    setShowMeet(true);
    // console.log(data, "data");
  }, [meetjwt]);

  useEffect(() => {
    if (roomName != "") {
      setShowMeet(true);
    }
    // console.log(data, "data");
  }, [roomName]);

  // console.log(meetingOptions?.roomName, "meetingOptions");

  const eventListeners = {
    onReadyToClose,
  };

  const ContentView = () => {
    return (
      <JitsiMeeting
        // @ts-ignore
        eventListeners={eventListeners}
        serverURL={"https://8x8.vc/"}
        flags={{
          "call-integration.enabled": false,
          "pip.enabled": true,
          "videoQuality.persist": true,
        }} // Set to false for the simulator.
        // meetingOptions={meetingOptions}
        room={roomName}
        ref={jitsiMeeting}
        jwt={meetjwt}
        token={meetjwt}
        style={{ flex: 1 }}
        config={{}}
        userInfo={{ displayName: "Guest" }}
      />
      // <JitsiMeeting
      //     eventListeners={eventListeners }
      //     ref={jitsiMeeting}
      //     style={{flex: 1}}
      //     room={roomName}
      //     jwt={meetjwt}
      //     serverURL={'https://meet.jit.si/'} />
      // <Text>{roomName}</Text>
    );
  };

  return (
    <>
      {showMeet ? (
        <ContentView />
      ) : (
        // <Text>{meetingOptions?.roomName}</Text>
        <View>
          <Text>Loading Meeting</Text>
        </View>
      )}
    </>
    // return <Text>{meetingOptions?.roomName}</Text>;
    // <JitsiMeeting
    //   // @ts-ignore
    //   serverURL={"https://8x8.vc/"}
    //   flags={{ "call-integration.enabled": false }} // Set to false for the simulator.
    //   meetingOptions={meetingOptions}
    //   ref={jitsiMeeting}
    //   style={{ flex: 1 }}
    // />
  );
}
