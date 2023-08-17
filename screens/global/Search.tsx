import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../assets/theme";
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";

const accounts = [

]

export default function SearchScreen() {

    const navigation = useNavigation()

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.surface}}>
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flex: .2}}/>
                    <Text style={{...TYPOGRAPHY.h1, alignSelf: 'center', color: COLORS.onSurface}}>Search</Text>
                    <TouchableOpacity activeOpacity={.8} style={{flex: .2, alignItems: 'center'}}>
                        <MaterialCommunityIcons name={'calendar-edit'} color={COLORS.surface} size={SIZES.xl} />
                    </TouchableOpacity>
                </View>
                <View style={{marginHorizontal: SIZES.md, borderRadius: SIZES.xs, overflow: 'hidden', marginTop: SIZES.sm}}>
                    <TextInput 
                        style={{backgroundColor: COLORS.lightGray}}
                    />
                </View>
                {
                    // accounts && <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: SIZES.md, marginTop: 0}}>
                    //     <Text style={{...TYPOGRAPHY.h2, color: COLORS.onSurface}}>Coming soon...</Text>
                    //     <View style={{flex: .1}}/>
                    // </View>
                }
            </View>
        </SafeAreaView>
    )
}