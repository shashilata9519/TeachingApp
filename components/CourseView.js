import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class CourseView extends React.Component {
    render() {
        const { course_name, level, teachers, img } = this.props.course
        const { category, subCategory, onDetailsButtonPress, onApplyButtonPress } = this.props

        const styles = StyleSheet.create({
            container: {
                margin: 16,
                marginTop: 8,
                marginBottom: 8,
                backgroundColor: '#FFF',
                borderRadius: 12,
                borderWidth: 0.5,
                borderColor: '#000',
                maxWidth: 400,
                justifyContent: 'space-between'
            },
            courseDetailsContainer: {
                width: "100%",
                // height: '70%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5,
            },
            buttonsContainer: {
                flexDirection: 'row',
                width: '100%',
                height: 44,
                justifyContent: 'space-between',
                borderTopColor: '#000',
                borderWidth: 0.5,
                borderBottomWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                marginTop: 16,
                borderBottomRightRadius: 12,
            },
            detailsButton: {
                width: '49.9%',
                height: '100%',
                borderColor: '#000',
                justifyContent: 'center',
            },
            applyButton: {
                width: '49.9%',
                backgroundColor: '#E8EAED',
                height: '100%',
                borderColor: '#000',
                borderRightWidth: 0.5,
                borderBottomWidth: 0.5,
                borderLeftWidth: 0.5,
                justifyContent: 'center',
                borderBottomRightRadius: 12,
            },
            rightComponents: {
                marginRight: 5,
                padding: 5,
                alignItems: 'center',
                width: 80,
                height: 80,
            },
            buttonText: {
                textAlign: 'center',
                fontSize: 14,
                height: '100%',
                textAlignVertical: 'center',
                padding: 12
            },
            applyButtonText: {
                textAlign: 'center',
                fontSize: 14,
                fontWeight: 'bold',
                height: '100%',
                textAlignVertical: 'center',
                padding: 12
            },
            leftComponents: {
                padding: 8,
                width: '75%'
            },
            title: {
                fontSize: 15,
                fontWeight: 'bold',
            },
            titleInfo: {
                flexDirection: 'row',
                justifyContent: 'space-between'
            },
            infoImage: {
                width: 20,
                height: 20,
                backgroundColor: '#E8EAED',
                borderRadius: 10
            },
            description: {
                fontSize: 13
            },
            courseImage: {
                marginBottom: 5,
                width: '100%',
                height: '100%',
                borderRadius: 12,
                alignItems: 'flex-start',
                flexDirection: 'column-reverse',
                paddingBottom: 10,
                paddingLeft: 10,
                borderWidth: 0.5,
                borderColor: '#E8EAED'
            },
            courseInfo: {
                flexDirection: 'row',
                // paddingTop: 4
            },
            courseCategory: {
                textAlign: 'center',
                fontSize: 14,
                verticalAlign: 'middle',
                paddingTop: 5,
                paddingBottom: 5
            },
            courseLevel: {
                textAlign: 'center',
                fontSize: 14,
            },
            courseLevelContainer: {
                backgroundColor: '#E8EAED',
                borderRadius: 12,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5,
                paddingBottom: 5,
                marginLeft: 5,
            },
            subtitle: {
                // textAlign: 'right',
                fontSize: 12,
                textAlign: 'center'
            },
            teachersAvailableContainer: {
                alignItems: 'center',
                paddingTop: 5,
                paddingBottom: 5
            },
            teacherImage: {
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#E8EAED',
                marginLeft: -15,
                borderWidth: 0.2,
                borderColor: '#000'
            },
            teachersImageContainer: {
                flexDirection: 'row',
                paddingLeft: 15
            }
        });
        return (
            <TouchableOpacity style={styles.container} onPress={() => onDetailsButtonPress()}>
                {/* Course Details */}
                <View style={styles.courseDetailsContainer}>
                    {/* Course Info */}
                    <View style={styles.leftComponents}>
                        <Text style={styles.title} ellipsizeMode='tail'>{course_name}</Text>
                        <Text style={{ fontSize: 14, verticalAlign: 'middle', paddingTop: 2, textTransform: 'uppercase' }}>{subCategory}</Text>
                        <View style={styles.courseInfo}>
                                <Text style={styles.courseCategory}>{category}</Text>
                                <View style={styles.courseLevelContainer}>
                                    <Text style={styles.courseLevel}>{level}</Text>
                                </View>
                        </View>
                        <Text style={{ fontSize: 14, verticalAlign: 'middle', paddingTop: 2 }}>Affiliated to Xcool</Text>
                    </View>
                    {/* Course Image & Teachers Count */}
                    <View style={styles.rightComponents}>
                        <Image style={styles.courseImage} source={{ uri: img }} />
                        { teachers == undefined || teachers.length === 0 ? null : 
                            <View style={styles.teachersAvailableContainer}>
                                <Text style={{ fontSize: 12, textAlign: 'center' }}>Offered by</Text>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', justifyContent: 'center', textAlign: 'center' }}>{teachers.length} Teachers</Text>
                            </View>
                        }
                    </View>
                </View>
                {/* Buttons */}
                <View style={styles.buttonsContainer}>
                    <View style={styles.detailsButton}>
                        <TouchableOpacity style={{ height: '100%' }} onPress={() => onDetailsButtonPress()}>
                            <Text style={styles.buttonText}>More Details</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.applyButton}>
                        <TouchableOpacity style={{  }} onPress={() => onApplyButtonPress()}>
                            <Text style={styles.applyButtonText}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}