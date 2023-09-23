import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Lottie from 'lottie-react-native';
import { COLORS, SIZES, TYPOGRAPHY } from "../../../../assets/theme";

export default function OnboardingItem({ item }) {
    const { width } = useWindowDimensions()
    return (
        <View style={[styles(width).container, ]}>
            <View style={{ flex: .9, width: '100%'}}>
            <Lottie source={item.animation} autoPlay loop />
            </View>
            <Text style={{flex: .1, ...TYPOGRAPHY.h2, textAlign: 'center', color: COLORS.onPrimary }}>{item.text}</Text>
        </View>
    )
}

const styles = (width) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width * .9,
        height: '100%',
    }
})