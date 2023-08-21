import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../assets/theme";
import { MaterialIcons, Ionicons, Feather, EvilIcons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {

    const navigation =  useNavigation()

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.surface}}>
            <View style={{flex: 1}}>

                <TouchableOpacity activeOpacity={.9} style={{flexDirection: 'row', marginTop: SIZES.md, marginHorizontal: SIZES.md}}>
                    <Feather name="user-plus" size={SIZES.lg} color={COLORS.onSurface}/>
                    <Text style={{...TYPOGRAPHY.h2, marginStart: SIZES.md}}>Follow and invite friends</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={.9} style={{flexDirection: 'row', marginTop: SIZES.md, marginHorizontal: SIZES.md}}>
                    <Feather name="bell" size={SIZES.lg} color={COLORS.onSurface}/>
                    <Text style={{...TYPOGRAPHY.h2, marginStart: SIZES.md}}>Notifications</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={.9} style={{flexDirection: 'row', marginTop: SIZES.md, marginHorizontal: SIZES.md}}>
                    <Feather name="heart" size={SIZES.lg} color={COLORS.onSurface}/>
                    <Text style={{...TYPOGRAPHY.h2, marginStart: SIZES.md}}>Your likes</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={.9} style={{flexDirection: 'row', marginTop: SIZES.md, marginHorizontal: SIZES.md}}>
                    <Feather name="lock" size={SIZES.lg} color={COLORS.onSurface}/>
                    <Text style={{...TYPOGRAPHY.h2, marginStart: SIZES.md}}>Privacy</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={.9} style={{flexDirection: 'row', marginTop: SIZES.md, marginHorizontal: SIZES.md}}>
                    <Feather name="user" size={SIZES.lg} color={COLORS.onSurface}/>
                    <Text style={{...TYPOGRAPHY.h2, marginStart: SIZES.md}}>Account</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={.9} style={{flexDirection: 'row', marginTop: SIZES.md, marginHorizontal: SIZES.md}}>
                    <Feather name="help-circle" size={SIZES.lg} color={COLORS.onSurface}/>
                    <Text style={{...TYPOGRAPHY.h2, marginStart: SIZES.md}}>Help</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={.9} style={{flexDirection: 'row', marginTop: SIZES.md, marginHorizontal: SIZES.md}}>
                    <Feather name="info" size={SIZES.lg} color={COLORS.onSurface}/>
                    <Text style={{...TYPOGRAPHY.h2, marginStart: SIZES.md}}>About</Text>
                </TouchableOpacity>

                <View style={{width: '100%', height: 1, backgroundColor: COLORS.onSurface, opacity: .3, marginVertical: SIZES.md, marginBottom: SIZES.xs}}/>

                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen' as never)} activeOpacity={.6} style={{paddingVertical: SIZES.xxs, paddingHorizontal: SIZES.sm}}>
                    <Text style={{...TYPOGRAPHY.h2, color: COLORS.primary}}>Log out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}