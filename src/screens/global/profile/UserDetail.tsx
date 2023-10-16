import { useNavigation } from "@react-navigation/native";
import { FlatList, Platform, SafeAreaView, StatusBar, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { MaterialIcons, Ionicons, AntDesign, Feather } from '@expo/vector-icons'
import { COLORS, SIZES, TYPOGRAPHY } from "../../../../assets/theme";
import { Text } from "react-native";
import { Avatar, Snackbar } from "react-native-paper";
import { followerCount } from "../../../util/Utils";
import { useEffect, useState } from "react";
import { auth, firestore } from "../../../../firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, doc, orderBy, query, updateDoc, where, writeBatch } from "firebase/firestore";
import { PostCard } from "../post/PostCard";
import { Loader } from "../../../components/Loader";
import VerifiedIcon from "../../../components/VerifiedIcon";
import { SplashIcon } from "../../../../assets/svg/SplashIcon";
import { defaultUser } from "../../../data/model/User";

export default function UserDetailScreen({ route }) {

    const navigation = useNavigation()
    const user = auth.currentUser
    const [userInfo, setUserInfo] = useState(route.params.userInfo)

    const myRef = doc(firestore, "users", user.uid)
    const [userSnapshot, userLoading, userError] = useDocument(myRef)

    const userRef = doc(firestore, "users", userInfo.uid)
    const [snapshot, loading, error] = useDocument(userRef)

    const postRef = collection(firestore, "posts")
    const q = query(postRef, where("uid", "==", userInfo.uid), orderBy("uid"), orderBy("date", "desc"))
    const [postsSnapshot, postsLoading, postsError] = useCollection(q)
    const [posts, setPosts] = useState([])

    const [values, setValues] = useState({
        ...defaultUser,
        message: "",
        loading: false,
        showSnackBar: false,
    })

    useEffect(() => {
        if (userSnapshot && userSnapshot.exists()) {
            setValues({ ...values, ...userSnapshot.data() })
        }
    }, [userSnapshot])

    useEffect(() => {
        if (postsSnapshot) {
            setPosts(postsSnapshot.docs)
        }
    }, [postsSnapshot])

    useEffect(() => {
        if (snapshot && snapshot.exists()) {
            setUserInfo(snapshot.data())
        }
    }, [snapshot])

    useEffect(() => setValues({ ...values, showSnackBar: values.message !== "" }), [values.message])
    useEffect(() => {
        if (error && error.message !== "") {
            setValues({ ...values, showSnackBar: true, message: error.message })
            console.log("Error:", error.message)
        }
    }, [error])

    useEffect(() => {
        if (userError) {
            console.log("Error:", userError.message)
        }
    }, [userError])
    useEffect(() => {
        if (postsError) {
            console.log("Error:", postsError.message)
        }
    }, [postsError])

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                return (
                    <TouchableOpacity style={{ alignItems: 'center', marginStart: SIZES.md }} onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={SIZES.xl} color={COLORS.onSurface} />
                        {/* <Text style={{...TYPOGRAPHY.h2}}>Back</Text> */}
                    </TouchableOpacity>
                )
            },
        })
    }, [])

    async function followAccount() {
        let userFollowers = userInfo.followers
        let myFollowing: string[] = values.following
        myFollowing.includes(userInfo.uid) ? myFollowing = myFollowing.filter((it: string) => { it !== userInfo.uid }) : myFollowing.push(userInfo.uid)
        userFollowers.includes(user.uid) ? userFollowers = userFollowers.filter((it: string) => { it !== user.uid }) : userFollowers.push(user.uid)

        const batch = writeBatch(firestore)
        batch.update(userRef, { followers: [...userFollowers] })
        batch.update(myRef, { following: [...myFollowing] })
        await batch.commit().catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.surface }}>

            <Loader showLoader={values.loading || loading || postsLoading} />

            <FlatList
                data={posts}
                ListHeaderComponent={() =>
                    <View style={{ paddingHorizontal: SIZES.md }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{ flex: 1, marginEnd: SIZES.sm, flexDirection: 'row' }}>
                                <Text style={{ ...TYPOGRAPHY.h1 }} numberOfLines={2}>{userInfo.name}</Text>
                                {userInfo.verified && <VerifiedIcon />}
                            </View>
                            <View style={{ overflow: 'hidden', width: 53, height: 53, borderRadius: 53 / 2, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' }}>
                                {userInfo.photo ?
                                    <Avatar.Image size={50} source={{ uri: userInfo.photo }} />
                                    : <SplashIcon />
                                }
                            </View>
                        </View>

                        {userInfo.bio && <Text style={{ ...TYPOGRAPHY.p, marginVertical: SIZES.md }}>{userInfo.bio}</Text>}

                        <View>
                            {(userInfo.company || userInfo.schoool) && <Text style={{ ...TYPOGRAPHY.p }}>{`${userInfo.company} \u2022 ${userInfo.school}`}</Text>}
                            {!userInfo.location && <Text style={{ ...TYPOGRAPHY.p, opacity: .5 }}>{`Badagry, Lagos state, Nigeria`}</Text>}
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: SIZES.sm }}>
                            <TouchableOpacity activeOpacity={.8} onPress={() => navigation.navigate('FollowScreen', { userInfo: userInfo })}>
                                <Text style={{ ...TYPOGRAPHY.h2, opacity: .5 }}>{`${followerCount(userInfo.followers.length)} followers \u2022 `}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={.8} style={{ flex: 1 }}>
                                <Text style={{ ...TYPOGRAPHY.h2, opacity: .5, color: COLORS.primary }} numberOfLines={1}>{userInfo.link}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: SIZES.md }}>
                            <TouchableOpacity onPress={followAccount} activeOpacity={.5} style={{ flex: .47, padding: SIZES.md, paddingVertical: SIZES.xxs, backgroundColor: COLORS.onSurface, borderRadius: SIZES.xxs, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ ...TYPOGRAPHY.h2, color: COLORS.surface }}>
                                    {userInfo.followers.includes(user.uid) ? 'Unfollow' : 'Follow'}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', { message: userInfo })} activeOpacity={.5} style={{ flex: .47, padding: SIZES.md, paddingVertical: SIZES.xxs / 2, borderWidth: 2, borderColor: COLORS.lightGray, borderRadius: SIZES.xxs, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ ...TYPOGRAPHY.h2, color: COLORS.onSurface }}>Message</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                renderItem={({ item }) => <PostCard item={item.data()} key={item.id} navigation={navigation} userInfo={{}} />}
                keyExtractor={(item) => item.id}
            // alwaysBounceVertical={false}
            />

            <Snackbar
                visible={values.showSnackBar}
                onDismiss={() => setValues({ ...values, message: "" })}
                theme={{ colors: { primary: COLORS.primary } }}
                action={{
                    textColor: COLORS.primary,
                    label: 'OK',
                    onPress: () => { },
                }}>
                <Text style={{ ...TYPOGRAPHY.p, color: COLORS.white }}>{values.message}</Text>
            </Snackbar>
        </SafeAreaView>
    )
}