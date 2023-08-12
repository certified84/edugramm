import {
    SafeAreaView, View, Text, StyleSheet,
    TouchableOpacity, ImageBackground
} from 'react-native'
import { TextInput } from 'react-native-paper';
import { TYPOGRAPHY, LINE, COLORS, SIZES } from '../../assets/theme'
import { AuthButton } from '../../components/Buttons'
import { styles } from './Login';
import { useNavigation } from '@react-navigation/native';
import { SkoolDuoIcon, GoogleIcon } from '../../assets/svg/SvgIcons';


const SignupScreen = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>

            <ImageBackground style={{ flex: 1, }}>

                <View style={{ flex: 0.4, alignItems: 'center' }}>
                    <SkoolDuoIcon />
                </View>

                <View style={styles.cardContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            // mode="outlined"
                            placeholder='Enter Email or Phone Number'
                            theme={{ roundness: 2 }}
                            left={<TextInput.Icon icon="email" iconColor={COLORS.white} />}
                            style={[styles.inputField]}
                            underlineColor={COLORS.white}
                            activeOutlineColor={COLORS.primary}
                            backgroundColor={COLORS.primary}
                            placeholderTextColor={COLORS.white}
                            textColor={COLORS.white}
                        />
                        <View style={{ marginVertical: SIZES.xs - 4, }} />
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
                        <View style={{ marginVertical: SIZES.xs - 4, }} />
                        <TextInput
                            // mode="outlined"
                            placeholder='Confirm Password'
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

                        <AuthButton text='Signup' />
                    </View>

                    <View style={styles.loginWithGoogleContainer}>
                        <TouchableOpacity
                            style={styles.signupButton}
                            activeOpacity={0.5}
                            onPress={() => { navigation.navigate("LoginScreen") }}>
                            <Text style={{ ...TYPOGRAPHY.h2, ...styles.forgotPassword }}>Login here</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.loginWithGoogleButton}
                            activeOpacity={0.5}
                            onPress={() => { navigation.navigate("RegisterScreen") }}>
                            <View style={{ flexDirection: 'row', }}>
                                <GoogleIcon />
                                <View style={{ marginHorizontal: SIZES.xs, }} />
                                <Text style={{ ...TYPOGRAPHY.h2, ...styles.forgotPassword, textDecorationLine: "none" }}>Signup with Google</Text>
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

export default SignupScreen