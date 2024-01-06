import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default class TitleDescriptionView extends React.Component {
    render() {
        const { leftTextStyle, rightTextStyle, leftText, rightText } = this.props
        const styles = StyleSheet.create({
            qualificationsContainer: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 2,
                paddingTop: 8
            },
        });
        return <View style={styles.qualificationsContainer}>
            <Text style={leftTextStyle}>{leftText}</Text>
            <Text style={rightTextStyle}>{rightText}</Text>
        </View>
    }
}