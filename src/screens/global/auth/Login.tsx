import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Platform, StatusBar } from 'react-native'
import { TYPOGRAPHY, COLORS, SIZES } from '../../../../assets/theme'
import { Snackbar, TextInput } from 'react-native-paper';
import { ActionButton, AppleButton, GoogleButton } from '../../../components/Buttons'
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { auth } from '../../../../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential,  } from 'firebase/auth';
import { Loader } from '../../../components/Loader';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';

const LoginScreen = () => {

    const navigation = useNavigation()
    const { width } = useWindowDimensions()
    const provider = new GoogleAuthProvider();

    const [ {}, userCredential ] = useSignInWithGoogle(auth)

    // GoogleSignin.configure({
    //     webClientId: '535570809491-rfd6nbbqpi8178tpdcbe079k6qhlscmm.apps.googleusercontent.com',
    // });

    const [value, setValue] = useState({
        email: "",
        password: "",
        message: "",
        loading: false,
        showSnackBar: false,
    })

    const [errors, setErrors] = useState({
        email: false,
        password: false,
    })

    useEffect(() => setValue({...value, showSnackBar: value.message !== ""}), [value.message])

    async function signInWithGoogle() {
        setValue({...value, loading: true})
        // await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
        // .then((has) => {
        //     if (!has) return
        // })
        // .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     console.log(errorCode, errorMessage)
        //     setValue({ ...value, message: "An error occurred. Please try again.", loading: false })
        // })
        // await useSignInWithGoogle(auth, provider)
        // const { idToken } = await GoogleSignin.signIn();
        // const credential = GoogleAuthProvider.credential(idToken);

        // await signInWithCredential(auth, userCredential)
        setValue({...value, message: userCredential.user.displayName, loading: false})
        // .then((credential) => {
        //     const user = credential.user
        //     setValue({...value, loading: false})
        // })
        // .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     console.log(errorCode, errorMessage)
        //     setValue({ ...value, message: "An error occurred. Please try again.", loading: false })
        // })
    }
    
    async function signIn() {
        if (value.email === "") {
            setErrors({ ...errors, email: true })
            return
        }

        else if (value.password === "") {
            setErrors({ ...errors, password: true })
            return
        }
    
        setValue({...value, loading: true})
        await signInWithEmailAndPassword(auth, value.email, value.password)
        .then((userCredential) => {
            const user = userCredential.user
            setValue({...value, loading: false})
            if (!user.emailVerified) {
                setValue({ ...value, message: "Please verify your email address." })
                auth.signOut()
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            setValue({ ...value, message: "An error occurred. Please try again.", loading: false })
        })
    }


    return (
        <SafeAreaView style={styles.container}>

            <Loader showLoader={value.loading} />

            <View style={{flex: 1, margin: SIZES.md, paddingTop: SIZES.lg}}>
                <Text style={{...TYPOGRAPHY.h1, fontSize: SIZES.xl - 2, color: COLORS.onSurface, alignSelf: 'center'}}>Sign in</Text>
                <Text style={{...TYPOGRAPHY.h2, fontFamily: 'space-grotesk-light', marginTop: SIZES.md, color: COLORS.onSurface, alignSelf: 'center'}}>We missed you while you were away</Text>
                
                <TextInput
                    mode="outlined"
                    placeholder='Email'
                    theme={{ roundness: SIZES.xs }}
                    value={value.email}
                    onChangeText={(text) => {
                        if(text !== "") {
                            setErrors({...errors, email: false})
                        } else {
                            setErrors({...errors, email: true})
                        }
                        setValue({ ...value, email: text })
                    }}
                    style={[styles.inputField, {marginTop: SIZES.xl}]}
                    underlineColor={COLORS.onSecondaryContainer}
                    activeOutlineColor={COLORS.secondaryContainer}
                    placeholderTextColor={COLORS.onSecondaryContainer}
                    textColor={COLORS.onSecondaryContainer}
                />
                { errors.email && <Text style={{...TYPOGRAPHY.p, alignSelf: 'flex-end', color: COLORS.error}}>Email is required</Text>}

                <TextInput
                    mode="outlined"
                    placeholder='Password'
                    theme={{ roundness: SIZES.xs }}
                    value={value.password}
                    onChangeText={(text) => {
                        if(text !== "") {
                            setErrors({...errors, password: false})
                        }
                        else if(text === "") {
                            setErrors({...errors, password: true})
                        }
                        setValue({ ...value, password: text })
                    }}
                    secureTextEntry={true}
                    style={styles.inputField}
                    underlineColor={COLORS.onSecondaryContainer}
                    activeOutlineColor={COLORS.secondaryContainer}
                    placeholderTextColor={COLORS.onSecondaryContainer}
                    textColor={COLORS.onSecondaryContainer}
                />
                { errors.password && <Text style={{...TYPOGRAPHY.p, alignSelf: 'flex-end', color: COLORS.error}}>Password is required</Text>}

                <TouchableOpacity
                    style={styles.forgotPasswordButton} activeOpacity={0.5} onPress={() => { navigation.navigate("ForgotPasswordScreen" as never) }}>
                    <Text style={{ ...TYPOGRAPHY.h2, ...styles.forgotPassword }}>Forgot Password?</Text>
                </TouchableOpacity>

                <ActionButton style={{width: '100%', marginTop: SIZES.lg}} buttonTitle={'Sign in'} buttonColor={COLORS.primary} textColor={COLORS.onPrimary} onPress={signIn} />

                <View style={{flexDirection: 'row', width: '100%', marginTop: SIZES.xl, alignItems: 'center', justifyContent: 'space-evenly'}}>
                    <View style={{flex: .42, height: 1, backgroundColor: COLORS.darkGray}}  />
                    <Text style={{...TYPOGRAPHY.h2, color: COLORS.onSurface}}>OR</Text>
                    <View style={{flex: .42, height: 1, backgroundColor: COLORS.darkGray}}  />
                </View>

                <GoogleButton onPress={() => setValue({ ...value, showSnackBar: true, message: "Coming soon.."})} style={{width: '100%', marginTop: SIZES.lg}} buttonTitle={'Sign in with Google'} />

                <AppleButton onPress={() => setValue({ ...value, showSnackBar: true, message: "Coming soon.."})} style={{width: '100%', marginTop: SIZES.lg}} buttonTitle={'Sign in with Apple'} />

                <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                    <View style={{height: 1, backgroundColor: COLORS.darkGray, marginBottom: SIZES.md, width: width}}/>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{...TYPOGRAPHY.h2, color: COLORS.onSurface}}>New to EduGramm?</Text>
                        <TouchableOpacity activeOpacity={.8} style={{marginHorizontal: SIZES.xxs}} onPress={() => { navigation.navigate("SignupScreen" as never) }} >
                            <Text style={{...TYPOGRAPHY.h2, color: COLORS.primary}}>Sign up.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <Snackbar
                visible={value.showSnackBar}
                onDismiss={() => setValue({...value, message: ""})}
                theme={{ colors: { primary: COLORS.primary } }}
                action={{ 
                    textColor: COLORS.primary,
                    label: 'OK',
                    onPress: () => {},
                }}>
                    <Text style={{...TYPOGRAPHY.p, color: COLORS.white}}>{value.message}</Text>
            </Snackbar>
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
        marginTop: SIZES.sm
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