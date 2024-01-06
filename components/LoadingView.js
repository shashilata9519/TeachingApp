import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

export default function LoadingView(props) {
    return <View style={{ width: '100%', height: props.height, alignItems: 'center', justifyContent: 'center', backgroundColor: props.backgroundColor }}>
        <ActivityIndicator size={'large'} style={{ padding: 8 }}></ActivityIndicator>
        <Text>{props.title ?? 'Loading...'}</Text>
    </View>
}