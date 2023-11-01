import { View, SafeAreaView, Platform, StatusBar, ImageBackground, useWindowDimensions, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../../assets/theme";
import CommunityPlaceHolder from "../../../../assets/svg/CommunityPlaceHolder";
import { followerCount } from "../../../util/Utils";
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { auth } from "../../../../firebase";
import { useNavigation } from "@react-navigation/native";
import Constants from 'expo-constants'
import { Avatar, FAB } from 'react-native-paper';

export default function CommunityDetailScreen({ route }) {

    const user = auth.currentUser
    const navigation = useNavigation()
    const community = route.params.communityInfo
    const { height } = useWindowDimensions()

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.surface }}>
            <View style={{ height: height * .35 }}>
                {
                    community.image ? <ImageBackground source={{ uri: community.image }} resizeMode='cover' style={{ width: '100%', height: '100%', }} />
                        : <CommunityPlaceHolder />
                }

                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginStart: SIZES.md, borderRadius: 50, padding: SIZES.xxs, alignItems: 'center', backgroundColor: COLORS.black + '80', position: 'absolute', top: Constants.statusBarHeight }}>
                    <Ionicons name={'chevron-back'} color={COLORS.onSurface} size={SIZES.xl} />
                </TouchableOpacity>

                <View style={{ backgroundColor: community.color + '80', position: 'absolute', width: '100%', bottom: 0, flexDirection: 'column-reverse' }}>
                    <View style={{ width: '100%', marginTop: SIZES.xxs, backgroundColor: community.color, padding: SIZES.md }}>
                        <Text style={{ ...TYPOGRAPHY.h1 }}>{community.name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ ...TYPOGRAPHY.p }}>{`${followerCount(community.members.length)} Members`}</Text>
                            {
                                community.members.includes(user.uid) ?
                                    <TouchableOpacity>
                                        <AntDesign name={'deleteusergroup'} color={COLORS.onSurface} size={SIZES.xl} />
                                    </TouchableOpacity>
                                    : <TouchableOpacity style={{ backgroundColor: COLORS.white, padding: SIZES.xxs, paddingHorizontal: SIZES.sm, borderRadius: SIZES.md }}>
                                        <Text style={{ ...TYPOGRAPHY.p, color: community.color }}>Join</Text>
                                    </TouchableOpacity>
                            }
                        </View>
                        <Text style={{ ...TYPOGRAPHY.p, marginTop: SIZES.xxs }}>{community.description}</Text>
                    </View>
                </View>
            </View>
            {
                community.members.includes(user.uid) && <FAB
                    icon="plus"
                    style={{ ...styles.fab, backgroundColor: community.color }}
                    color={COLORS.white}
                    onPress={() => navigation.navigate('AddPostScreen', { userInfo: { ...values } })}
                    theme={{ colors: fabColors }}
                />
            }
        </View>
    )
}

const fabColors = {
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    tertiary: COLORS.tertiary,
    surface: COLORS.surface
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.surface
    },
    fab: {
        zIndex: 2, position: 'absolute', bottom: SIZES.lg, right: SIZES.md,
        backgroundColor: COLORS.primary,
        borderRadius: 50
    }
})