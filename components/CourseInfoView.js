import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function NavigationBarInfoView(props) {
    const { title, subtitle, imagePath, onApplyButtonPress } = props;

    return (
        <View style={{ padding: 16, paddingTop: 0, paddingBottom: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 40+16 }}>
            <Image style={{ width: 44, height: 44, borderRadius: 22, borderColor: '#2A87BB', borderWidth: 1 }} source={{uri: imagePath}} />
            <View style={{ flexDirection: 'column', alignContent: 'flex-start', paddingTop: 4, paddingBottom: 4, paddingRight: 4, marginLeft: 8, marginRight: 8 }}>
                <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: 'bold', paddingRight: 16, }} numberOfLines={2} adjustsFontSizeToFit={true} >{title}</Text>
                <Text style={{ fontSize: 14, color: '#FFFFFF' }}>{subtitle}</Text>
            </View>
            <View style={{ width: 80, height: 40, backgroundColor: '#2A87BB', justifyContent: 'center', alignContent: 'center', alignItems: 'center', borderRadius: 12 }}>
                    <TouchableOpacity onPress={props.onApplyButtonPress}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#FFF',textAlign:'center' }}>Book Now</Text>
                    </TouchableOpacity>
            </View>
        </View>
    );
};