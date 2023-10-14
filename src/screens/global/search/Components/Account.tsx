import { Text, TouchableOpacity, View } from "react-native"
import { Avatar } from "react-native-paper"
import VerifiedIcon from "../../../../components/VerifiedIcon"
import { COLORS, SIZES, TYPOGRAPHY } from "../../../../../assets/theme"
import { followerCount } from "../../../../util/Utils"
import { SplashIcon } from "../../../../../assets/svg/SplashIcon"
import { auth } from "../../../../../firebase"

export const Account = ({ account, navigation }) => {
    const user = auth.currentUser
    return (
        <TouchableOpacity activeOpacity={.9} style={{ flex: 1, flexDirection: 'row', paddingHorizontal: SIZES.md, marginTop: SIZES.sm }} onPress={() =>
            account.uid === user.uid ? navigation.navigate('ProfileScreen', { userInfo: account }) : navigation.navigate('UserDetailScreen', { userInfo: { ...account } })
        }>
            <View style={{ overflow: 'hidden', width: 43, height: 43, borderRadius: 43 / 2, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' }}>
                {
                    account.photo ?
                        <Avatar.Image size={40} source={{ uri: account.photo }} />
                        : <SplashIcon />
                }
            </View>
            <View style={{ flex: 1, justifyContent: 'space-between', paddingStart: SIZES.sm }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flex: .95 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...TYPOGRAPHY.h2, color: COLORS.onSurface }} numberOfLines={1}>{account.name}</Text>
                            <VerifiedIcon style={{ marginEnd: 2 }} />
                            {/* <View style={{width: SIZES.md}}/> */}
                        </View>
                        <Text style={{ ...TYPOGRAPHY.p, color: COLORS.onSurface, opacity: .4, fontSize: SIZES.sm - 3 }}>{`${followerCount(account.followers.length)} followers`}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={.5} style={{ marginStart: SIZES.md, padding: SIZES.md, paddingVertical: SIZES.xxs / 2, borderWidth: 2, borderColor: COLORS.lightGray, borderRadius: SIZES.xxs }}>
                        <Text style={{ ...TYPOGRAPHY.h2, color: COLORS.onSurface }}>Follow</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', height: 1, marginTop: SIZES.xs, backgroundColor: COLORS.darkGray, alignContent: 'flex-end', opacity: .2 }} />
            </View>
        </TouchableOpacity>
    )
}