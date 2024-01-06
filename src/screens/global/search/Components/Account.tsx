import { Text, TouchableOpacity, View } from "react-native"
import { Avatar } from "react-native-paper"
import VerifiedIcon from "../../../../components/VerifiedIcon"
import { COLORS, SIZES, TYPOGRAPHY } from "../../../../../assets/theme"
import { followerCount } from "../../../../util/Utils"
import { SplashIcon } from "../../../../../assets/svg/SplashIcon"
import { auth, firestore } from "../../../../../firebase"
import { doc, updateDoc, writeBatch } from "firebase/firestore"
import { useDocument } from "react-firebase-hooks/firestore"
import { useEffect, useState } from "react"
import { User, defaultUser } from "../../../../data/model/User"

export const Account = ({ navigation, accountInfo }) => {

    const user = auth.currentUser

    const accountRef = doc(firestore, "users", accountInfo.uid) 
    const [accountSnapshot, accountLoading, accountError] = useDocument(accountRef)
    const [account, setAccount] = useState(accountInfo)

    const userRef = doc(firestore, "users", user.uid)
    const [userSnapshot, userLoading, userError] = useDocument(userRef)
    const [userInfo, setUserInfo] = useState({ ...defaultUser })

    useEffect(() => {
        if (userSnapshot && userSnapshot.exists()) {
            setUserInfo({ ...userInfo, ...userSnapshot.data() })
        }
    }, [userSnapshot])

    useEffect(() => {
        if (accountSnapshot && accountSnapshot.exists()) {
            setAccount({ ...account, ...accountSnapshot.data() })
        }
    }, [accountSnapshot])

    async function followAccount() {
        let accountFollowers = account.followers
        let userFollowing: string[] = userInfo.following
        userFollowing.includes(account.uid) ? userFollowing = userFollowing.filter((it: string) => { it !== account.uid }) : userFollowing.push(account.uid)
        accountFollowers.includes(user.uid) ? accountFollowers = accountFollowers.filter((it: string) => { it !== user.uid }) : accountFollowers.push(user.uid)
        
        const batch = writeBatch(firestore)
        batch.update(accountRef, { followers: [...accountFollowers]})
        batch.update(userRef, { following: [...userFollowing]})
        await batch.commit().catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        })
    }

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
                            <Text style={{ ...TYPOGRAPHY.h3, color: COLORS.onSurface }} numberOfLines={1}>{account.name}</Text>
                            { account.verified && <VerifiedIcon style={{ marginEnd: 2 }} />}
                        </View>
                        <Text style={{ ...TYPOGRAPHY.p, color: COLORS.onSurface, opacity: .4, fontSize: SIZES.sm - 3 }}>{`${followerCount(account.followers.length)} followers`}</Text>
                    </View>
                    {
                        (account.uid !== user.uid) && <TouchableOpacity
                            onPress={followAccount}
                            activeOpacity={.5}
                            style={{
                                marginStart: SIZES.md,
                                padding: SIZES.md,
                                paddingVertical: SIZES.xxs / 2,
                                borderWidth: 2,
                                borderColor: COLORS.lightGray,
                                borderRadius: SIZES.xxs
                            }}>
                            <Text style={{ ...TYPOGRAPHY.h3, color: COLORS.onSurface }}>
                                {account.followers.includes(user.uid) ? 'Unfollow' : 'Follow'}
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
                <View style={{ width: '100%', height: 1, marginTop: SIZES.xs, backgroundColor: COLORS.darkGray, alignContent: 'flex-end', opacity: .2 }} />
            </View>
        </TouchableOpacity>
    )
}