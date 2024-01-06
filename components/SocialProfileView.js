import { View, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Linking } from "react-native";

class SocialProfileView extends React.Component {
    render() {
        const styles = StyleSheet.create({
            socialProfileButton: {
                width: 60,
            }
        });

        return <View style={styles.socialProfileButton}>
            <TouchableOpacity onPress={() => Linking.openURL(this.props.url)}>
                <Ionicons name={this.props.iconName} size={44} color={this.props.iconColor} />
            </TouchableOpacity>
        </View>;
    }
}

export default SocialProfileView;