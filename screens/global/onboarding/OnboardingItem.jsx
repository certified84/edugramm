import { StyleSheet, Text, View } from "react-native";
import Lottie from 'lottie-react-native';
import { COLORS, SIZES, TYPOGRAPHY } from "../../../assets/theme";

export default function OnboardingItem({ item }) {
    return (
        <View style={[styles.container, {backgroundColor: item.color}]}>
            {/* <View style={{ flex: .9, width: '100%',}}>
                <Lottie source={item.animation} autoPlay loop />
            </View> */}
            {/* <Text style={{flex: .1, ...TYPOGRAPHY.h2, textAlign: 'center', color: COLORS.onPrimary }}>{item.text}</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    }
})