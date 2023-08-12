import {
    StyleSheet, Text, View, useWindowDimensions, Alert
} from 'react-native'
import React, { useState, useCallback, useRef } from 'react'
import { TYPOGRAPHY, LINE, COLORS, SIZES } from '../../assets/theme'
import { DefaultButton } from '../../components/Buttons'
import Lottie from 'lottie-react-native';
import { TextInput } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import AnimatedCodeInput from "@brainsbeards/react-native-animated-code-input";


const ForgotPasswordScreen = () => {
    const { width } = useWindowDimensions()
    const sheetRef = useRef();
    const verifySheetRef = useRef();
    const [code, setCode] = useState("");
    const [codeIsVerified, setCodeIsVerified] = useState(false);


    const onChangeText = useCallback((text) => {
        setCode(text);
    }, []);

    const onSubmit = useCallback((codeValue) => {
        setCodeIsVerified(true)
        Alert.alert(
            "DONE",
            codeValue,
            [{ text: "OK", onPress: () => setCode("") }],
            { cancelable: false }
        );
    }, []);
    return (
        <View style={styles.container}>

            {/* section 1 */}
            <View style={{ flex: 0.3 }}>
                <Text style={{ ...TYPOGRAPHY.h1, ...styles.wrapper }} >Forgot Password? </Text>
                <View style={{ ...LINE.horizontal, borderBottomColor: COLORS.primary }} />
                <Text style={{ ...TYPOGRAPHY.h2, marginTop: SIZES.xxs - 3 }}>
                    ✅ Fill-in the field below for your verification process. We would send a 4 digit code for your password
                </Text>
            </View>

            {/* section 2 */}
            <View style={{ flex: 0.5, alignItems: "center" }}>
                {/* <Lottie
                    style={{ width: "50%", marginTop: -30 }}
                    source={require('../../assets/animations/lock.json')} autoPlay loop /> */}


                <TextInput
                    // mode="outlined"
                    placeholder='Enter Email or Phone Number'
                    theme={{ roundness: 2 }}
                    left={<TextInput.Icon icon="email" iconColor={COLORS.primary} />}
                    style={[styles.inputField, { width: width - SIZES.sm }]}
                    underlineColor={COLORS.black}
                    activeOutlineColor={COLORS.primary}
                />


            </View>

            {/* section 3 */}
            <View style={{ flex: 0.2 }}>
                <DefaultButton
                    buttonTitle={"Reset Password"}
                    onPress={() => { sheetRef.current.open() }}
                />

                {/* Bottom sheet  */}
                {/* https://www.npmjs.com/package/react-native-raw-bottom-sheet */}
                <RBSheet
                    ref={sheetRef}
                    closeOnDragDown={true}
                    closeOnPressMask={false}
                    animationType="slide"
                    height={450}
                    openDuration={600}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "#fcfc",
                            opacity: 1
                        },
                        draggableIcon: {
                            backgroundColor: "#000"
                        },
                        container: {
                            backgroundColor: "#fff",
                            borderTopRightRadius: 40,
                            borderTopLeftRadius: 40
                        }
                    }}
                >

                    {
                        !codeIsVerified ?
                            // IF CODE IS YET TO BE INPUTTED
                            <>

                                <View style={{ padding: SIZES.md }}>
                                    <Text style={{ ...TYPOGRAPHY.h1, ...styles.wrapper }} >Enter 4 Digits Code </Text>
                                    <View style={{ ...LINE.horizontal, borderBottomColor: COLORS.primary }} />
                                    <Text style={{ ...TYPOGRAPHY.h2, marginTop: SIZES.xxs - 3 }}>
                                        ✅ Fill-in the field below for your verification process. We would send a 4 digit code for your password
                                    </Text>
                                </View>

                                {/* Code inpout  */}
                                {/* https://github.com/brains-and-beards/react-native-animated-code-input */}
                                <View style={styles.codeContainer}>
                                    <AnimatedCodeInput
                                        value={code}
                                        numberOfInputs={4}
                                        onChangeText={onChangeText}
                                        onSubmitCode={onSubmit}
                                        autoFocus={true}
                                        textColor={COLORS.primary}
                                        codeContainerStyle={{
                                            borderColor: COLORS.primary,
                                            backgroundColor: COLORS.white,
                                        }}
                                    />
                                </View>

                                <View style={{
                                    position: "absolute",
                                    bottom: 0,
                                    width: "100%",
                                    marginBottom: SIZES.xl + 12
                                }}>
                                    <DefaultButton
                                        buttonTitle={"Verify Code"}
                                        onPress={() => {
                                            setCodeIsVerified(true)
                                        }}
                                    />
                                </View>

                            </>
                            :
                            // IF CODE IS VERIFIED 
                            <>

                                <View style={{ padding: SIZES.md }}>
                                    <Text style={{ ...TYPOGRAPHY.h1, ...styles.wrapper }} >Reset Password</Text>
                                    <View style={{ ...LINE.horizontal, borderBottomColor: COLORS.primary }} />
                                    <Text style={{ ...TYPOGRAPHY.h2, marginTop: SIZES.xxs - 3 }}>
                                        ✅ Set the new password for your account so you can login and access all features
                                    </Text>
                                </View>


                                <TextInput
                                    // mode="outlined"
                                    placeholder='Enter Password'
                                    secureTextEntry
                                    theme={{ roundness: 2 }}
                                    left={<TextInput.Icon icon="lock" iconColor={COLORS.primary} />}
                                    style={[styles.inputField, { width: width - SIZES.sm }]}
                                    underlineColor={COLORS.black}
                                    activeOutlineColor={COLORS.primary}
                                />

                                <TextInput
                                    // mode="outlined"
                                    placeholder='Confirm Password'
                                    secureTextEntry
                                    theme={{ roundness: 2 }}
                                    left={<TextInput.Icon icon="lock" iconColor={COLORS.primary} />}
                                    right={<TextInput.Icon icon="eye" iconColor={COLORS.primary} />}
                                    style={[styles.inputField, { width: width - SIZES.sm, marginTop: SIZES.lg }]}
                                    underlineColor={COLORS.black}
                                    activeOutlineColor={COLORS.primary}
                                />

                                <View style={{
                                    position: "absolute",
                                    bottom: 0,
                                    width: "100%",
                                    marginBottom: SIZES.xl + 12
                                }}>
                                    <DefaultButton
                                        buttonTitle={"Submit"}
                                        onPress={() => {
                                            setCodeIsVerified(false)
                                            sheetRef.current.close()
                                        }}
                                    />
                                </View>
                            </>
                    }
                </RBSheet>
            </View>
        </View >
    )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
    container: {
        padding: SIZES.sm,
        flex: 1,
        backgroundColor: COLORS.white
    },
    inputField: {
        backgroundColor: COLORS.white,
        color: COLORS.black,
    },
    codeContainer: {
        margin: SIZES.md,
        paddingTop: SIZES.xl,
        justifyContent: "center",
    }
})

