import {
    SafeAreaView, View, Text,
    TouchableOpacity, useWindowDimensions
} from 'react-native'
import { TextInput } from 'react-native-paper';
import { TYPOGRAPHY, COLORS, SIZES } from '../../assets/theme'
import { ActionButton, GoogleButton } from '../../components/Buttons'
import { styles } from './Login';
import { useNavigation } from '@react-navigation/native';


const SignupScreen = () => {
    const navigation = useNavigation()
    const { width } = useWindowDimensions()
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1, margin: SIZES.md, paddingTop: SIZES.lg}}>
                <Text style={{...TYPOGRAPHY.h1, fontSize: SIZES.xl - 2, color: COLORS.onSurface, alignSelf: 'center'}}>Sign up</Text>
                <Text style={{...TYPOGRAPHY.h2, fontFamily: 'space-grotesk-light', marginTop: SIZES.md, color: COLORS.onSurface, alignSelf: 'center'}}>We could use your presence here</Text>
                
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

                <ActionButton style={{width: '100%', marginTop: SIZES.lg}} buttonTitle={'Sign up'} buttonColor={COLORS.primary} textColor={COLORS.onPrimary}/>

                <View style={{flexDirection: 'row', width: '100%', marginTop: SIZES.xl, alignItems: 'center', justifyContent: 'space-evenly'}}>
                    <View style={{flex: .42, height: 1, backgroundColor: COLORS.darkGray}}  />
                    <Text>OR</Text>
                    <View style={{flex: .42, height: 1, backgroundColor: COLORS.darkGray}}  />
                </View>

                <GoogleButton style={{width: '100%', marginTop: SIZES.lg}} buttonTitle={'Sign up With Google'} />

                <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                    <View style={{height: 1, width: '100%', backgroundColor: COLORS.darkGray, marginBottom: SIZES.md, width: width}}/>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{...TYPOGRAPHY.h2, color: COLORS.onSurface}}>Already have an account?</Text>
                        <TouchableOpacity activeOpacity={.8} style={{marginHorizontal: SIZES.xxs}} onPress={() => { navigation.navigate("LoginScreen") }}>
                            <Text style={{...TYPOGRAPHY.h2, color: COLORS.primary}}>Sign in.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SignupScreen