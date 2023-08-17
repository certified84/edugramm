import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../assets/theme";
import { Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";

const jobs = [

]

export default function ProfileScreen() {

    const navigation = useNavigation()

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.surface}}>
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: SIZES.md}}>
                    <TouchableOpacity activeOpacity={.9} onPress={() => navigation.goBack()}>
                        <Ionicons name='chevron-back' size={SIZES.xl} color={COLORS.onSurface}/>
                    </TouchableOpacity>
                    <Text style={{...TYPOGRAPHY.h1, flex: 1, textAlign: 'center', marginEnd: SIZES.xl, color: COLORS.onSurface}}>Profile</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: SIZES.md, marginTop: 0}}>
                    <Text style={{...TYPOGRAPHY.h2, color: COLORS.onSurface}}>Coming soon...</Text>
                    <View style={{flex: .1}}/>
                </View>
            </View>
        </SafeAreaView>
    )
}