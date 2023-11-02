import { View, SafeAreaView, Platform, StatusBar, ImageBackground, useWindowDimensions, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../../assets/theme";
import CommunityPlaceHolder from "../../../../assets/svg/CommunityPlaceHolder";
import { followerCount } from "../../../util/Utils";
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { auth, firestore } from "../../../../firebase";
import { useNavigation } from "@react-navigation/native";
import Constants from 'expo-constants'
import { Avatar, FAB } from 'react-native-paper';
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, doc, orderBy, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Loader } from "../../../components/Loader";
import { PostCard } from "../../../components/PostCard";

export default function CommunityDetailScreen({ route }) {

    const user = auth.currentUser
    const navigation = useNavigation()
    const [community, setCommunity] = useState(route.params.communityInfo)
    const { height } = useWindowDimensions()

    const userRef = doc(firestore, "users", user.uid)
    const [snapshot, loading, error] = useDocument(userRef)

    const communityRef = doc(firestore, "communities", community.id)
    const [communitySnapshot, communityLoading, communityError] = useDocument(communityRef)

    const [values, setValues] = useState({
        post: "",
        message: "",
        images: [],
        loading: false,
        showSnackBar: false,
        success: false,
    })

    const postRef = collection(firestore, "posts")
    const q = query(postRef, where("communityId", "==", community.id), orderBy("date", "desc"))
    const [postsSnapshot, postsLoading, postsError] = useCollection(q)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (postsSnapshot) {
            const data = postsSnapshot.docs
            setPosts(data)
        }
    }, [postsSnapshot])

    useEffect(() => {
        if (postsError) {
            console.log("Erro: ", postsError)
        }
    }, [postsError])

    useEffect(() => {
        if (snapshot && snapshot.exists()) {
            setValues({
                ...values,
                ...snapshot.data()
            })
        }
    }, [snapshot])

    useEffect(() => {
        if (communitySnapshot && communitySnapshot.exists()) {
            setCommunity({
                ...community,
                ...communitySnapshot.data()
            })
        }
    }, [communitySnapshot])

    async function joinCommunity(which: string) {
        console.log("Which: ", which)
        let members = community.members
        which === "join" ? members.push(user.uid) : members = community.members.filter((it: string) => { it !== user.uid })
        const communityRef = doc(firestore, "communities", community.id)
        await updateDoc(communityRef, {
            members: [...members]
         }).then(() => {
            // setLiked(!isLiked)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.surface }}>

            <Loader showLoader={values.loading || loading || communityLoading || postsLoading} />

            {/* <View style={{ height: height * .35 }}>
                {
                    community.image ? <ImageBackground source={{ uri: community.image }} resizeMode='cover' style={{ width: '100%', height: '100%', }} />
                        : <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <CommunityPlaceHolder />
                        </View>
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
            </View> */}

            <View style={{ flex: 1 }}>
                <FlatList
                    style={{ zIndex: 2 }}
                    data={posts}
                    ListHeaderComponent={() =>
                        <View style={{ height: height * .35 }}>
                            {
                                community.image ? <ImageBackground source={{ uri: community.image }} resizeMode='cover' style={{ width: '100%', height: '100%', }} />
                                    : <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <CommunityPlaceHolder />
                                    </View>
                            }

                            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginStart: SIZES.md, borderRadius: 50, padding: 4, alignItems: 'center', backgroundColor: COLORS.black + '80', position: 'absolute', top: Constants.statusBarHeight }}>
                                <Ionicons name={'chevron-back'} color={COLORS.onSurface} size={SIZES.xl - 2} />
                            </TouchableOpacity>

                            <View style={{ backgroundColor: community.color + '80', position: 'absolute', width: '100%', bottom: 0, flexDirection: 'column-reverse' }}>
                                <View style={{ width: '100%', marginTop: SIZES.xxs, backgroundColor: community.color, padding: SIZES.md }}>
                                    <Text style={{ ...TYPOGRAPHY.h1 }}>{community.name}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Text style={{ ...TYPOGRAPHY.p }}>{`${followerCount(community.members.length)} Members`}</Text>
                                        {
                                            community.members.includes(user.uid) ?
                                                <TouchableOpacity onPress={() => joinCommunity("exit")}>
                                                    <AntDesign name={'deleteusergroup'} color={COLORS.onSurface} size={SIZES.xl} />
                                                </TouchableOpacity>
                                                : <TouchableOpacity onPress={() => joinCommunity("join")} style={{ backgroundColor: COLORS.white, padding: SIZES.xxs, paddingHorizontal: SIZES.sm, borderRadius: SIZES.md }}>
                                                    <Text style={{ ...TYPOGRAPHY.p, color: community.color }}>Join</Text>
                                                </TouchableOpacity>
                                        }
                                    </View>
                                    <Text style={{ ...TYPOGRAPHY.p, marginTop: SIZES.xxs }}>{community.description}</Text>
                                </View>
                            </View>
                        </View>
                    }
                    renderItem={({ item }) => <PostCard item={item.data()} navigation={navigation} userInfo={values} />}
                    keyExtractor={(item) => item.id}
                    alwaysBounceVertical={posts.length > 0}
                />
                {
                    posts.length === 0 && <View style={{ zIndex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', margin: SIZES.md }}>
                        <Text style={{ ...TYPOGRAPHY.h2, color: COLORS.onSurface }}>There's nothing here yet.</Text>
                        <Text style={{ ...TYPOGRAPHY.h2, fontSize: SIZES.xs, color: COLORS.onSurface, opacity: .7, textAlign: 'center' }}>
                            There are no conversations in this community yet. Click the add button to get it started...
                        </Text>
                    </View>
                }
                <View style={{ zIndex: 2 }}>
                    {
                        community.members.includes(user.uid) && <FAB
                            icon="plus"
                            style={{ ...styles.fab, backgroundColor: community.color }}
                            color={COLORS.white}
                            onPress={() => navigation.navigate('AddPostScreen', { userInfo: { ...values }, communityId: community.id })}
                            theme={{ colors: fabColors }}
                        />
                    }
                </View>
            </View>
            {/* {
                community.members.includes(user.uid) && <FAB
                    icon="plus"
                    style={{ ...styles.fab, backgroundColor: community.color }}
                    color={COLORS.white}
                    onPress={() => navigation.navigate('AddCommunityPostScreen', { userInfo: { ...values }, communityId: community.id })}
                    theme={{ colors: fabColors }}
                />
            } */}
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