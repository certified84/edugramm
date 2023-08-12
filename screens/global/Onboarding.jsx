import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../assets/theme";
import { ActionButton } from "../../components/Buttons";
import { useNavigation } from '@react-navigation/native';

export default function OnboardingScreen() {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary}}>
            <View style={styles.container}>

                <View style={{flex: .3, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{...TYPOGRAPHY.h1, fontFamily: 'sansita-italic', fontSize: SIZES.xxl, color: COLORS.white50}}>EduGramm</Text>
                    <Text style={{...TYPOGRAPHY.h2, color: COLORS.onPrimary, marginTop: SIZES.sm}}>"Connect with a world of knowledge, Learn from diverse minds, and Grow your potential."</Text>
                </View>

                <View style={{flex: .3, width: '100%', justifyContent: 'space-evenly'}}>
                    <ActionButton buttonTitle={'Create Account'} buttonColor={COLORS.secondaryContainer} textColor={COLORS.onSecondaryContainer} onPress={() => { navigation.navigate("SignupScreen") }} />
                    <ActionButton buttonTitle={'Login'} buttonColor={COLORS.onPrimaryContainer} textColor={COLORS.primaryContainer} onPress={() => { navigation.navigate("LoginScreen") }} />
                </View>

                <View style={{flex: .3, justifyContent: 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{...TYPOGRAPHY.h2, color: COLORS.white50}}>Read about our</Text>
                        <TouchableOpacity activeOpacity={.8} style={{marginHorizontal: SIZES.xxs}}>
                            <Text style={{...TYPOGRAPHY.h2, color: COLORS.white}}>Terms</Text>
                        </TouchableOpacity>
                        <Text style={{...TYPOGRAPHY.h2, color: COLORS.white50}}>and</Text>
                        <TouchableOpacity activeOpacity={.8} style={{marginHorizontal: SIZES.xxs}}>
                            <Text style={{...TYPOGRAPHY.h2, color: COLORS.white}}>Privacy Policy</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SIZES.xl
    }
});