import { Platform, SafeAreaView, StatusBar, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../../assets/theme";
import { SceneMap, TabView } from "react-native-tab-view";
import { FollowersTab, FollowingTab } from "./Tabs";
import { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { followerCount } from "../../../util/Utils";
import { auth, firestore } from "../../../../firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, doc, orderBy, query, where } from "firebase/firestore";
import { defaultUser } from "../../../data/model/User";

export default function FollowScreen({ route }) {

    const { width } = useWindowDimensions()
    const navigation = useNavigation()
    const user = auth.currentUser
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'followers', title: 'Followers' },
        { key: 'following', title: 'Following' },
    ]);

    const [userInfo, setUserInfo] = useState(defaultUser)
    const userRef = doc(firestore, "users", route.params.userInfo.uid)
    const [snapshot, loading, error] = useDocument(userRef)

    useEffect(() => {
        if (snapshot && snapshot.exists()) {
            setUserInfo({ ...defaultUser, ...snapshot.data() })
        }
    }, [snapshot])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.surface }}>
            <View style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: SIZES.md }}>
                    <TouchableOpacity activeOpacity={.9} onPress={() => navigation.goBack()}>
                        <Ionicons name='chevron-back' size={SIZES.xl} color={COLORS.onSurface} />
                    </TouchableOpacity>
                    <Text style={{ ...TYPOGRAPHY.h1, flex: 1, textAlign: 'center', marginEnd: SIZES.xl, color: COLORS.onSurface }}>{route.params.userInfo.name}</Text>
                </View>

                <TabView
                    renderTabBar={() => <RenderTab followers={userInfo.followers.length} following={userInfo.following.length} index={index} setIndex={setIndex} />}
                    navigationState={{ index, routes }}
                    renderScene={renderScene({ uid: route.params.userInfo.uid, navigation: navigation })}
                    onIndexChange={setIndex}
                    initialLayout={{ width: width }}
                    style={{ flex: 1, marginTop: SIZES.md }}
                />
            </View>
        </SafeAreaView>
    )
}

const RenderTab = ({ index, setIndex, followers, following }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TabTitle title={`${followerCount(followers)} Followers`} isSelected={index === 0} onPress={() => { setIndex(0) }} style={{ flex: 0.5 }} />
            <TabTitle title={`${followerCount(following)} Following`} isSelected={index === 1} onPress={() => { setIndex(1) }} style={{ flex: 0.5 }} />
        </View>
    );
}

const TabTitle = ({ title, isSelected, onPress, style }) => {
    return (
        <TouchableOpacity style={{ ...style, justifyContent: 'center', alignItems: 'center' }} onPress={onPress} activeOpacity={0.5}>
            <Text style={{ ...TYPOGRAPHY.h3, opacity: isSelected ? 1 : .5 }}>{title}</Text>
            <View style={{ width: '100%', height: 2, backgroundColor: COLORS.onSurface, marginTop: SIZES.xxs - 2, opacity: isSelected ? 1 : 0 }} />
        </TouchableOpacity>
    );
}

const renderScene = ({ uid, navigation }) => SceneMap({
    followers: () => <FollowersTab uid={uid} navigation={navigation} />,
    following: () => <FollowingTab uid={uid} navigation={navigation} />,
});