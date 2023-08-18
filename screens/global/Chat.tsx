import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, TouchableOpacity, View, Text, StyleSheet, Platform, StatusBar, Image } from "react-native";
import { MaterialIcons, Ionicons, AntDesign, Feather } from '@expo/vector-icons'
import { COLORS, SIZES, TYPOGRAPHY } from "../../assets/theme";
import { useEffect } from "react";
import VerifiedIcon from "../../components/VerifiedIcon";

export default function ChatScreen({ route }) {

    const navigation = useNavigation()
    const message = route.params.message

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                return (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => {navigation.goBack()}}>
                            <Ionicons name="chevron-back" size={SIZES.xl} color={COLORS.onSurface}/>
                        </TouchableOpacity>
                        <View style={{width: SIZES.sm}}/>
                        <TouchableOpacity style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                            <View style={{marginEnd: SIZES.xxs}}>
                                <Image source={{uri: message.image}} style={{borderRadius: 20, width: 40, height: 40, overflow: 'hidden',}}/>
                                <View style={{width: SIZES.xs, height: SIZES.xs, borderRadius: SIZES.md / 2, backgroundColor: COLORS.green, position: 'absolute', bottom: 0, right: 0}}/>
                            </View>
                            <View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{...TYPOGRAPHY.h1, textAlign: 'center', color: COLORS.onSurface}} numberOfLines={1}>{message.name}</Text>
                                    <VerifiedIcon />
                                </View>
                                <Text style={{...TYPOGRAPHY.h2, fontSize: SIZES.xs, color: COLORS.onSurface, opacity: .8}}>Active now</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            },
            headerRight: () => {
                return (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => {}} activeOpacity={.7} style={{marginEnd: SIZES.md}}>
                            <Feather name='phone' size={SIZES.xl} color={COLORS.onSurface}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}} activeOpacity={.7}>
                            <Feather name='video' size={SIZES.xl} color={COLORS.onSurface}/>
                        </TouchableOpacity>
                    </View>
                )
            }
        })
    })

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1, marginHorizontal: SIZES.md}}>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.surface,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    inputField: {
        borderRadius: 55,
        width: "100%",
        backgroundColor: COLORS.lightGray
        // paddingHorizontal: 20
    }
})