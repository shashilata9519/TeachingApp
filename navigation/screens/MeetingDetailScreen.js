import { Text } from "react-native"

export default function MeetingDetailScreen(props) {
    const { meeting } = props.route.params
    
    return <Text>{meeting}</Text>
}