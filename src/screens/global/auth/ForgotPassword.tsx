import {
    SafeAreaView, View, Text,
    TouchableOpacity, useWindowDimensions
} from 'react-native'
import { TextInput } from 'react-native-paper';
import { TYPOGRAPHY, COLORS, SIZES } from '../../../../assets/theme'
import { ActionButton, GoogleButton } from '../../../components/Buttons'
import { styles } from './Login';
import { useNavigation } from '@react-navigation/native';


const ForgotPasswordScreen = () => {
    const navigation = useNavigation()
    const { width } = useWindowDimensions()
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1, margin: SIZES.md}}>
                <Text style={{...TYPOGRAPHY.h1, fontSize: SIZES.xl - 2, color: COLORS.onSurface, alignSelf: 'center'}}>Forgot password?</Text>
                <Text style={{...TYPOGRAPHY.h2, fontFamily: 'space-grotesk-light', marginTop: SIZES.md, color: COLORS.onSurface, alignSelf: 'center'}}>Enter your email and we'll send you a reset link</Text>
                
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

                <ActionButton style={{width: '100%', marginTop: SIZES.lg}} buttonTitle={'Reset password'} buttonColor={COLORS.primary} textColor={COLORS.onPrimary} onPress={() => {}}/>
            </View>
        </SafeAreaView>
    )
}

export default ForgotPasswordScreen