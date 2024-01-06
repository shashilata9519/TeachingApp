import { View, Text, Image, StyleSheet } from 'react-native'


export default function TeacherInfoView(props) {
    const { title, subtitle, imagePath } = props;

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: imagePath}} />
            <View style={styles.contentView}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}>{title}</Text>
                {/* <Text style={{ fontSize: 14, color: '#FFFFFF' }}>{subtitle}</Text> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        padding: 16,
        flexDirection: 'row',
    },
    image: {
        width: 32,
        height: 32,
        borderRadius: 22,
        borderColor: '#E8EAED',
        borderWidth: 1,
        marginRight: 8
    },
    contentView: {
        flexDirection: 'column',
        alignContent: 'flex-start',
        paddingTop: 4,
        paddingBottom: 4
    },
});