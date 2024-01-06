import { TextInput } from "react-native-gesture-handler";
import { View } from "react-native";

export default function SearchBar(props) {
    const { onTextValueChange } = props

    return <View style={{ backgroundColor: '#FFF', borderColor: '#3E8493', borderWidth: 1, padding: 8, borderRadius: 12, height: 44, justifyContent: 'center' }}>
        <TextInput placeholder="Search" onChangeText={(text) => onTextValueChange(text)} clearButtonMode={'always'} />
    </View>
}