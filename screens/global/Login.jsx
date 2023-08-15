import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Platform, StatusBar } from 'react-native'
import { TYPOGRAPHY, COLORS, SIZES } from '../../assets/theme'
import { TextInput } from 'react-native-paper';
import { ActionButton, GoogleButton } from '../../components/Buttons'
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation()
    const { width } = useWindowDimensions()
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1, margin: SIZES.md, paddingTop: SIZES.lg}}>
                <Text style={{...TYPOGRAPHY.h1, fontSize: SIZES.xl - 2, color: COLORS.onSurface, alignSelf: 'center'}}>Sign in</Text>
                <Text style={{...TYPOGRAPHY.h2, fontFamily: 'space-grotesk-light', marginTop: SIZES.md, color: COLORS.onSurface, alignSelf: 'center'}}>We missed you while you were away</Text>
                
                <TextInput
                    mode="outlined"
                    placeholder='Email'
                    theme={{ roundness: SIZES.xs }}
                    style={[styles.inputField, {marginTop: SIZES.xl}]}
                    underlineColor={COLORS.onSecondaryContainer}
                    activeOutlineColor={COLORS.secondaryContainer}
                    placeholderTextColor={COLORS.onSecondaryContainer}
                    textColor={COLORS.onSecondaryContainer}
                />

                <TextInput
                    mode="outlined"
                    placeholder='Password'
                    theme={{ roundness: SIZES.xs }}
                    style={styles.inputField}
                    underlineColor={COLORS.onSecondaryContainer}
                    activeOutlineColor={COLORS.secondaryContainer}
                    placeholderTextColor={COLORS.onSecondaryContainer}
                    textColor={COLORS.onSecondaryContainer}
                />
                <TouchableOpacity
                    style={styles.forgotPasswordButton} activeOpacity={0.5} onPress={() => { navigation.navigate("ForgotPasswordScreen") }}>
                    <Text style={{ ...TYPOGRAPHY.h2, ...styles.forgotPassword }}>Forgot Password?</Text>
                </TouchableOpacity>

                <ActionButton style={{width: '100%', marginTop: SIZES.lg}} buttonTitle={'Sign in'} buttonColor={COLORS.primary} textColor={COLORS.onPrimary} onPress={() => { navigation.navigate("HomeScreen") }} />

                <View style={{flexDirection: 'row', width: '100%', marginTop: SIZES.xl, alignItems: 'center', justifyContent: 'space-evenly'}}>
                    <View style={{flex: .42, height: 1, backgroundColor: COLORS.darkGray}}  />
                    <Text>OR</Text>
                    <View style={{flex: .42, height: 1, backgroundColor: COLORS.darkGray}}  />
                </View>

                <GoogleButton style={{width: '100%', marginTop: SIZES.lg}} buttonTitle={'Sign in With Google'} />

                <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                    <View style={{height: 1, width: '100%', backgroundColor: COLORS.darkGray, marginBottom: SIZES.md, width: width}}/>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{...TYPOGRAPHY.h2, color: COLORS.onSurface}}>New to EduGramm?</Text>
                        <TouchableOpacity activeOpacity={.8} style={{marginHorizontal: SIZES.xxs}} onPress={() => { navigation.navigate("SignupScreen") }} >
                            <Text style={{...TYPOGRAPHY.h2, color: COLORS.primary}}>Sign up.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.surface1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    inputField: {
        backgroundColor: COLORS.surface1,
        color: COLORS.black,
        // marginTop: SIZES.lg
    },
    forgotPasswordButton: {
        paddingTop: SIZES.sm,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    forgotPassword: {
        color: COLORS.primary,
        fontWeight: '700',
        textDecorationLine: 'underline',
    },
})