import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';
import TitleDescriptionView from "./TitleDescriptionView";

class TeacherQualificationsView extends React.Component {
    state = {
        shouldDisplay: Boolean
    }

    componentDidMount() {
        this.setState({ shouldDisplay: false})
    }

    render() {
        const styles = StyleSheet.create({
            teacherDetail: {
                // justifyContent: 'center'
                padding: 8
            },
            titleContainer: {
                // backgroundColor: '#3b5998',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: '#3E8493',
                borderLeftColor: '#EAF5FB',
                borderRightColor: '#EAF5FB',
                borderTopColor: '#EAF5FB',
                borderWidth: 1
            },
            qualificationsContainer: {
                // backgroundColor: '#000'
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 2,
                paddingTop: 8
            },
            title: {
                // marginRight: 40
                width: '50%',
                fontSize: 14,

            },
            university: {
                width: '50%',
                fontSize: 14,
                fontWeight: 'bold'
            }
        });

        return <View style={styles.teacherDetail}>
            <TouchableOpacity onPress={ () => this.setState({ shouldDisplay: !this.state.shouldDisplay }) }>
                <View style={styles.titleContainer}>
                    <Text>{this.props.title}</Text>
                    <Ionicons name={this.state.shouldDisplay ? 'chevron-up' : 'chevron-down'} size={24} color='#3E8493' />
                </View>
            </TouchableOpacity>
            { !this.state.shouldDisplay ? null :
                this.props.qualifications.flatMap((item, index) => {
                    return <TitleDescriptionView key={index} leftTextStyle={styles.title} rightTextStyle={styles.university} leftText={item['cert_id']} rightText={item['university']} />
                })
            } 
        </View>
    }
}

export default TeacherQualificationsView;