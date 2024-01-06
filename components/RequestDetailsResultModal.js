import { View, Text, Modal, Pressable } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";

export default function RequestDetailsResultModal(props) {

    const { isVisible, onCancel, message } = props

    return isVisible && <Modal transparent={true}>
        <Pressable onPress={onCancel} style={{ backgroundColor: '#000000aa', width: '100%', height: '100%', justifyContent: 'center', alignContent: 'center' }}>
            <Pressable style={{ flexDirection: 'column', backgroundColor: '#EAF5FB', margin: 32, borderRadius: 12, padding: 16, width: useSafeAreaFrame().width-64 }}>
                {/* Title */}
                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center', marginBottom: 16 }}>{message}</Text>
                {/* Drop Down Fields */}
                {/* Actions */}
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ width: '30%', borderRadius: 12, backgroundColor: '#3E8493' }}>
                        <Pressable onPress={onCancel}>
                            <Text style={{ textAlign: 'center', fontSize: 14, padding: 12, color: '#FFFFFF' }}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Pressable>
        </Pressable>
    </Modal>
}