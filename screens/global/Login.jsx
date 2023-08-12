import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Image, ImageBackground } from 'react-native'
import { TYPOGRAPHY, COLORS, SIZES, SHADOWS } from '../../assets/theme'
import { TextInput } from 'react-native-paper';
import { AuthButton } from '../../components/Buttons'
import { useNavigation } from '@react-navigation/native';
import { SkoolDuoIcon, GoogleIcon } from '../../assets/svg/SvgIcons';

const LoginScreen = () => {
    const navigation = useNavigation()
    const { width } = useWindowDimensions()
    return (
        <SafeAreaView style={styles.container}>

            <ImageBackground style={{ flex: 1, }}>

                <View style={{ flex: 0.45, alignItems: 'center' }}>
                    <SkoolDuoIcon />
                </View>

                <View style={styles.cardContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            // mode="outlined"
                            placeholder='Enter Email or Phone Number'
                            theme={{ roundness: 2 }}
                            left={<TextInput.Icon icon="email" iconColor={COLORS.white} />}
                            style={styles.inputField}
                            underlineColor={COLORS.white}
                            activeOutlineColor={COLORS.primary}
                            backgroundColor={COLORS.primary}
                            placeholderTextColor={COLORS.white}
                            textColor={COLORS.white}
                        />
                        <View style={{ marginVertical: SIZES.xs, }} />
                        <TextInput
                            // mode="outlined"
                            placeholder='Enter Password'
                            theme={{ roundness: 2 }}
                            left={<TextInput.Icon icon="lock" iconColor={COLORS.white} />}
                            right={<TextInput.Icon icon="eye" iconColor={COLORS.white} />}
                            style={styles.inputField}
                            underlineColor={COLORS.white}
                            activeOutlineColor={COLORS.primary}
                            backgroundColor={COLORS.primary}
                            placeholderTextColor={COLORS.white}
                            textColor={COLORS.white}
                        />

                        <TouchableOpacity
                            style={styles.forgotPasswordButton} activeOpacity={0.5} onPress={() => { navigation.navigate("ForgotPasswordScreen") }}>
                            <Text style={{ ...TYPOGRAPHY.h2, ...styles.forgotPassword }}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <AuthButton
                            text='Login'
                            onPress={() => { navigation.navigate("ParentDashboard") }} />
                    </View>

                    <View style={styles.loginWithGoogleContainer}>
                        <TouchableOpacity
                            style={styles.signupButton}
                            activeOpacity={0.5}
                            onPress={() => { navigation.navigate("SignupScreen") }}>
                            <Text style={{ ...TYPOGRAPHY.h2, ...styles.forgotPassword }}>Signup here</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.loginWithGoogleButton}
                            activeOpacity={0.5}
                            onPress={() => { }}>
                            <View style={{ flexDirection: 'row', }}>
                                <GoogleIcon />
                                <View style={{ marginHorizontal: SIZES.xs, }} />
                                <Text style={{ ...TYPOGRAPHY.h2, ...styles.forgotPassword, textDecorationLine: "none" }}>Login with Google</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.zettaworksContainer}>
                    <Text style={styles.zettaworks}>Powered by Zettaworks Technologies</Text>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default LoginScreen

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: SIZES.lg
    },
    cardContainer: {
        flex: 0.53,
        borderRadius: 40,
        marginStart: 24,
        marginEnd: 24,
        backgroundColor: COLORS.primary,
        ...SHADOWS.dark
    },
    inputContainer: {
        flex: 0.8,
        backgroundColor: COLORS.primary,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        padding: SIZES.md,
    },
    inputField: {
        backgroundColor: COLORS.primary,
        color: COLORS.black,
    },
    forgotPasswordButton: {
        paddingTop: SIZES.sm,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    loginWithGoogleContainer: {
        flex: 0.2,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        paddingStart: SIZES.xs,
        flexDirection: "row", justifyContent: "space-between"
    },
    signupButton: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center",
    },
    forgotPassword: {
        color: COLORS.yellow,
        fontWeight: '700',
        textDecorationLine: 'underline',
    },
    loginWithGoogleButton: {
        flex: 0.7,
        backgroundColor: COLORS.secondary,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    zettaworksContainer: { 
        flex: 0.07, 
        alignItems: "center", 
        justifyContent: 'flex-end' 
    },
    zettaworks: {
        position: "absolute", 
        fontFamily: "comic-xxs", 
        fontWeight: "400" 
    }
})