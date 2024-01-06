
import { View, Text, TouchableOpacity } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment, { Moment } from "moment/moment";

export default function MeetingView(props) {
    const { date, date_and_time, end_date_and_time, class_name, batch_name, teacher } = props.meeting
    
    return <TouchableOpacity style={{ padding: 16, paddingTop: 6, paddingBottom: 6 }} activeOpacity={1} /*onPress={props.onDetailsButtonPress}*/>
        <View style={{ padding: 8, backgroundColor: '#FFF', borderRadius: 12 }}>
            {/* Date Time */}
            <View style={{ marginTop: -8, marginLeft: -8, marginRight: -8, borderTopEndRadius: 12, borderTopStartRadius: 12, padding: 16, paddingBottom: 8, paddingTop: 8, backgroundColor: '#B6D0E2'}}>
                <Text style={{ fontSize: 14 }}>{moment(date, "DD-MM-YYYY").format("DD MMM, YYYY dddd")}</Text>
            </View>
            <View style={{ padding: 8, paddingTop: 8 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{moment(date_and_time).format("hh:mm A")} - {moment(end_date_and_time).format("hh:mm A")}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ width: '95%', fontSize: 17 }} numberOfLines={2}>{class_name}</Text>
                    <Ionicons name={'chevron-forward-outline'} size={16} />
                </View>
                <Text style={{ width: '95%', fontSize: 14 }}>{teacher?.firstname}</Text>
                <View style={{ height: 44, flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                    {/* <View style={{ width: '49%', backgroundColor: '#E8EAED', justifyContent: 'center', borderRadius: 12 }}>
                        <TouchableOpacity onPress={props.onDetailsButtonPress}>
                            <Text style={{ textAlign: 'center', fontSize: 14, height: '100%', textAlignVertical: 'center' }}>More Details</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View></View>
                    <View style={{ backgroundColor: '#2A87BB', borderRadius: 12, width: '100%' }}>
                        <TouchableOpacity onPress={props.onJoinButtonPress}>
                            <Text style={{ textAlign: 'center', fontSize: 14, color: '#FFFFFF', padding: 12, fontWeight: 'bold' }}>Join Class</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    </TouchableOpacity>
}