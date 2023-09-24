import {
    SafeAreaView, View, Text,
    TouchableOpacity, useWindowDimensions, Animated
} from 'react-native'
import { Snackbar, TextInput } from 'react-native-paper';
import { TYPOGRAPHY, COLORS, SIZES } from '../../../../assets/theme'
import { ActionButton, GoogleButton } from '../../../components/Buttons'
import { styles } from './Login';
import { useNavigation } from '@react-navigation/native';
import { Loader } from '../../../components/Loader';
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../firebase';


const SignupScreen = () => {

    const navigation = useNavigation()
    const { width } = useWindowDimensions()
    const [loading, setLoading] = useState(false)

    const [value, setValue] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
    });

    const [errors, setErrors] = useState({
        name: false,
        email: false,
        password: false,
    })

    useEffect(() => {}, [value.error]);

    async function signUp() {
        if (value.name === "") {
            setErrors({ ...errors, name: true })
            return
        }

        else if (value.email === "") {
            setErrors({ ...errors, email: true })
            return
        }

        else if (value.password === "") {
            setErrors({ ...errors, password: true })
            return
        }
    
        setLoading(true)
        await createUserWithEmailAndPassword(auth, value.email, value.password)
        .then((userCredential) => {
            const user = userCredential.user
            setLoading(false)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            setValue({ ...value, error: "An error occurred. Please try again." })
            setLoading(false)
        })
    }

    return (
        <SafeAreaView style={styles.container}>

            <Loader showLoader={loading} setShowLoader={setLoading} />

            <View style={{flex: 1, margin: SIZES.md, paddingTop: SIZES.lg}}>
                <Text style={{...TYPOGRAPHY.h1, fontSize: SIZES.xl - 2, color: COLORS.onSurface, alignSelf: 'center'}}>Sign up</Text>
                <Text style={{...TYPOGRAPHY.h2, fontFamily: 'space-grotesk-light', marginTop: SIZES.md, color: COLORS.onSurface, alignSelf: 'center'}}>We could use your presence here</Text>
                
                <TextInput
                    mode="outlined"
                    placeholder='Name'
                    theme={{ roundness: SIZES.xs }}
                    value={value.name}
                    onChangeText={(text) => {
                        if(text !== "") {
                            setErrors({...errors, name: false})
                        } else {
                            setErrors({...errors, name: true})
                        }
                        setValue({ ...value, name: text })
                    }}
                    style={[styles.inputField, {marginTop: SIZES.xl}]}
                    underlineColor={COLORS.onSecondaryContainer}
                    activeOutlineColor={COLORS.secondaryContainer}
                    placeholderTextColor={COLORS.onSecondaryContainer}
                    textColor={COLORS.onSecondaryContainer}
                />
                { errors.name && <Text style={{...TYPOGRAPHY.p, alignSelf: 'flex-end', color: COLORS.error}}>Name is required</Text>}
                
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
                    style={[styles.inputField]}
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
                        } else {
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

                <ActionButton onPress={signUp} style={{width: '100%', marginTop: SIZES.lg}} buttonTitle={'Sign up'} buttonColor={COLORS.primary} textColor={COLORS.onPrimary}/>

                <View style={{flexDirection: 'row', width: '100%', marginTop: SIZES.xl, alignItems: 'center', justifyContent: 'space-evenly'}}>
                    <View style={{flex: .42, height: 1, backgroundColor: COLORS.darkGray}}  />
                    <Text style={{...TYPOGRAPHY.h2, color: COLORS.onSurface}}>OR</Text>
                    <View style={{flex: .42, height: 1, backgroundColor: COLORS.darkGray}}  />
                </View>

                <GoogleButton onPress={() => {}} buttonColor={COLORS.surface1} style={{width: '100%', marginTop: SIZES.lg}} buttonTitle={'Sign in With Google'} />

                <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                    <View style={{height: 1, backgroundColor: COLORS.darkGray, marginBottom: SIZES.md, width: width}}/>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{...TYPOGRAPHY.h2, color: COLORS.onSurface}}>Already have an account?</Text>
                        <TouchableOpacity activeOpacity={.8} style={{marginHorizontal: SIZES.xxs}} onPress={() => { navigation.navigate("LoginScreen" as never) }}>
                            <Text style={{...TYPOGRAPHY.h2, color: COLORS.primary}}>Sign in.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <Snackbar
                visible={value.error !== ""}
                onDismiss={() => setValue({...value, error: ""})}
                theme={{ colors: { primary: COLORS.primary } }}
                action={{ 
                    textColor: COLORS.primary,
                    label: 'OK',
                    onPress: () => {},
                }}>
                    <Text style={{...TYPOGRAPHY.p, color: COLORS.white}}>{value.error}</Text>
            </Snackbar>
        </SafeAreaView>
    )
}

export default SignupScreen