import { View, Text, StyleSheet, useWindowDimensions, PermissionsAndroid } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';
import RenderHTML from "react-native-render-html";

export default function TeacherDetailView(props) {
    const [shouldDisplayDescription, setShouldDisplayDescription] = useState(props.shouldDisplayDescription ?? false)
    const source = { html: props.description }
    const { width } = useWindowDimensions()

    return <View style={{ padding: 8 }}>
        <TouchableOpacity onPress={ () => setShouldDisplayDescription(!shouldDisplayDescription) }>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#3E8493', borderLeftColor: '#EAF5FB', borderRightColor: '#EAF5FB', borderTopColor: '#EAF5FB', borderWidth: 1 }}>
                <Text>{props.title}</Text>
                <Ionicons name={shouldDisplayDescription ? 'chevron-up' : 'chevron-down'} size={24} color='#3E8493' />
            </View>
        </TouchableOpacity>
        { shouldDisplayDescription ?
            <View style={{ paddingTop: 8 }}>
                {/* <Text>{this.props.description}</Text> */}
                {/* <RenderHTML contentWidth={200} source={this.props.description} /> */}
                <RenderHTML source={source} contentWidth={width} />
            </View> : null
        } 
    </View>
}