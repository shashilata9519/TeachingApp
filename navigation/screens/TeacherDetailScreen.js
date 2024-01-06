import { View, Text, StyleSheet, Platform } from "react-native";
import TeacherInfoView from '../../components/TeacherInfoView';
import React, { useEffect, useState } from "react";
import { withNavigation } from "react-navigation";
import { FlatList, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';
import TeacherQualificationsView from '../../components/TeacherQualificationsView';
import TeacherDetailView from "../../components/TeacherDetailView";
import SocialProfileView from "../../components/SocialProfileView";
import LoadingView from "../../components/LoadingView";
import TeacherAchievementsView from "../../components/TeacherAchievementsView";
import CourseCard from "../../components/CourseCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { fetchAllCategories, fetchAllSubCategories, fetchCoursesOfTeacher, fetchDetailsOfTeacher, fetchQualificationsOfTeacher, openUrlForApplyingCourseWithTeacher } from "../../Services/NetworkingService";
import { useIsFocused } from "@react-navigation/native";
import NavigationBarInfoView from "../../components/CourseInfoView";
import RequestDetailsModal from "../../components/RequestDetailsModal";

function TeacherDetailScreen(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [teacherDetails, setTeacherDetails] = useState({})
    const [selectedSection, selectSection] = useState(0)
    const [certifications, setCertifications] = useState([])
    const [awards, setAwards] = useState([])
    const [courses, setCourses] = useState([])
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])

    const { subCategory, courseDetails } = props.route.params

    const [shouldDisplayApplyScreen, showApplyScreen] = useState(false)
    const [selectedCourse, selectCourse] = useState(null)
    const [selectedSubCategory, selectSubCategory] = useState(null)

    function getSubCategory(subcategory_id) {
        return subCategories.filter( (subCategory) => subCategory.id == subcategory_id )[0]
    }
    function getCategory(category_id) {
        return categories.filter( (category) => category.id == category_id )[0]
    }

    function navigateToDetailScreen(item) {
        props.navigation.navigate('Course Details', { item, applyScreenName: 'Apply Course with Teacher Screen', teacher: teacherDetails })
    }

    useEffect(() => {
        fetchAllCategories().then(setCategories).catch((error) => console.log(error))
        fetchAllSubCategories().then(setSubCategories).catch((error) => console.log(error))
    }, [])
    useEffect(() => {
        let teacherSlug = props.route.params.item.slug ?? props.route.params.item.teacher?.slug
        fetchDetailsOfTeacher(teacherSlug).then(setTeacherDetails).catch((error) => console.log(error))
        fetchQualificationsOfTeacher(teacherSlug).then((response) => {
            var awards = []
            var certifications = []
            for (let index = 0; index < response.length; index++) {
                let element = response[index];
                if (element['type'] == 'award') {
                    awards = [...awards, element]
                } else if (element['type'] == 'degree') {
                    certifications = [...certifications, element]
                }
            }
            setCertifications(certifications)
            setAwards(awards)
            setIsLoading(false)
        }).catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
        fetchCoursesOfTeacher(teacherSlug).then((response) => {
            setCourses(response)
            setIsLoading(false)
        }).catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
        selectSection(0)
    }, [props])

    const ContentView = () => {
        // paddingBottom: 44+76+(useSafeAreaInsets().bottom == 0 ? 56 : useSafeAreaInsets().bottom)+useBottomTabBarHeight()+60
        let hasAnySocialProfile = (teacherDetails?.details?.yt || teacherDetails?.details?.insta || teacherDetails?.details?.fb || teacherDetails?.details?.linkedin || teacherDetails?.details?.twitter)
        let contentMarginY = 60+useSafeAreaInsets().top + 50 + useBottomTabBarHeight() + (useSafeAreaInsets().bottom == 0 ? 24 : useSafeAreaInsets().bottom) + (Platform.OS == 'android' && 30)

        const AboutSection = <View style={{ height: '100%', width: '100%' }}>
            {/* Social Profiles */}
            { hasAnySocialProfile &&
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, height: 80 }}>
                    <Text style={{ fontSize: 14, verticalAlign: 'middle' }}>Get connect on:</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        {teacherDetails?.details?.yt && <SocialProfileView iconName='logo-youtube' iconColor='#FF0000' url={teacherDetails?.details?.yt} />}
                        {teacherDetails?.details?.insta && <SocialProfileView iconName='logo-instagram' iconColor='#E4405F' url={teacherDetails?.details?.insta} />}
                        {teacherDetails?.details?.fb && <SocialProfileView iconName='logo-facebook' iconColor='#3b5998' url={teacherDetails?.details?.fb} />}
                        {teacherDetails?.details?.linkedin && <SocialProfileView iconName='logo-linkedin' iconColor='#3b5998' url={teacherDetails?.details?.linkedin} />}
                        {teacherDetails?.details?.twitter && <SocialProfileView iconName='logo-twitter' iconColor='#3b5998' url={teacherDetails?.details?.twitter} />}
                    </View>
                </View>}
            { teacherDetails?.details &&  <ScrollView style={{ backgroundColor: 'white', padding: 8 }}>
                <TeacherDetailView title='Bio' description={teacherDetails?.details.bio} shouldDisplayDescription={true} />
                { certifications.length == 0 ? null : <TeacherQualificationsView title='Degrees & Certifications' qualifications={certifications} /> }
                { awards.length == 0 ? null : <TeacherAchievementsView title='Achievements' qualifications={awards} /> }
            </ScrollView> }
        </View>;
        const CoursesSection = <View style={{ marginBottom: contentMarginY }}>
                <FlatList data={courses} numColumns={1} keyExtractor={ (item, index) => index.toString() } renderItem={ ({ item }) => {
                let subCategoryId = item?.subcategory
                var subCategory = null
                var subCategoryDesc = null
                var category = null
                var categoryDesc = null
                if (subCategoryId != null) {
                    subCategory = getSubCategory(subCategoryId)
                    if (subCategory != null && subCategory != undefined) {
                        let categoryId = subCategory.category_id
                        subCategoryDesc = subCategory.subcategory
                        if (categoryId != null) {
                            category = getCategory(categoryId)
                            if (category != null && category != undefined) {
                                categoryDesc = category.category
                            }
                        }
                    }
                }
                return <CourseCard course={item} category={categoryDesc} subCategory={subCategoryDesc} onDetailsButtonPress={ () => navigateToDetailScreen(item) } onApplyButtonPress={() => {
                    let genre = subCategories.filter((subCategory) => {
                        return subCategory.id == item.subcategory
                    })[0]
                    selectSubCategory(genre)
                    selectCourse(item)
                    showApplyScreen(true)
                }} />
            }} />
        </View>;

        const sectionStyles = StyleSheet.create({
            sectionButton: {
                backgroundColor: '#EAF5FB',
                width: '50%',
                height: '100%',
                borderColor: '#000',
                justifyContent: 'center'
            },
            selectedSectionButton: {
                backgroundColor: '#EAF5FB',
                width: '50%',
                height: '100%',
                borderWidth: 4,
                borderColor: '#3E8493',
                borderStartColor: '#EAF5FB',
                borderEndColor: '#EAF5FB',
                borderTopColor: '#EAF5FB',
                justifyContent: 'center',
            },
            sectionText: {
                textAlign: 'center',
                fontSize: 14,
            },
            selectedSectionText: {
                textAlign: 'center',
                color: '#3E8493',
                fontSize: 14,
                fontWeight: 'bold'
            },
        })

        return <View style={{ width: '100%', height: '100%', alignItems: 'center', backgroundColor: '#EAF5FB', flexDirection: 'column' }}>
            {/* Section Titles -> About, Courses */}
            <View style={{ flexDirection: 'row', width: '100%', height: 44, backgroundColor: '#EAF5FB', justifyContent: 'space-between', borderTopColor: '#3E8493', borderBottomColor: '#3E8493', borderLeftColor: '#3E8493', borderRightColor: '#3E8493', borderWidth: 0.5 }}>
                <View style={selectedSection == 0 ? sectionStyles.selectedSectionButton : sectionStyles.sectionButton}>
                    <TouchableOpacity onPress={() => selectSection(0)}>
                        <Text style={selectedSection == 0 ? sectionStyles.selectedSectionText : sectionStyles.sectionText}>About</Text>
                    </TouchableOpacity>
                </View>
                {
                courses.length > 0 ? <View style={selectedSection == 1 ? sectionStyles.selectedSectionButton : sectionStyles.sectionButton}>
                    <TouchableOpacity onPress={() => selectSection(1)}>
                        <Text style={selectedSection == 1 ? sectionStyles.selectedSectionText : sectionStyles.sectionText}>Courses</Text>
                    </TouchableOpacity>
                </View> : null
                }
            </View>
            {/* Section Content  */}
            { selectedSection == 1 ? (courses && CoursesSection) :  AboutSection }
        </View>
    };
    return <View style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: '#2F5290' }}> 
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: useSafeAreaInsets().top, borderBottomWidth: 0.5 }}>
            <TouchableOpacity style={{ height: 60, paddingLeft: 16, justifyContent: 'center' }} onPress={() => props.navigation.goBack()}>
                <Ionicons name={'arrow-back'} size={26} color={'#FFFFFF'} />
            </TouchableOpacity>
            { teacherDetails?.details && <View style={{ width: '78%' }}>
                <NavigationBarInfoView title={teacherDetails?.firstname} subtitle={teacherDetails?.details?.yoe + " YOE | " + teacherDetails?.city + ", " + teacherDetails?.country} imagePath={teacherDetails?.dp} onApplyButtonPress={() => showApplyScreen(true)} />
            </View> }
        </View>
        { isLoading ? <LoadingView height='90%' backgroundColor='#EAF5FB' title={'loading teacher details...'} /> : <ContentView /> } 
        { shouldDisplayApplyScreen && <RequestDetailsModal 
            isVisible={shouldDisplayApplyScreen} 
            onCancel={() => showApplyScreen(false)} 
            selectedCourse={{label: courseDetails?.course_name ?? selectedCourse?.course_name, value: courseDetails?.id ?? selectedCourse?.id}} 
            selectedTeacher={{label: teacherDetails?.firstname, value: teacherDetails?.id}} 
            selectedGenre={{label: subCategory?.subcategory ?? selectedSubCategory?.subcategory, value: subCategory?.id ?? selectedSubCategory?.id}}
        /> }
    </View>
}

export default withNavigation(TeacherDetailScreen)