import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { MaterialIcons, Ionicons, AntDesign, Feather } from '@expo/vector-icons'
import { COLORS, SIZES, TYPOGRAPHY } from "../../../assets/theme";
import { Text } from "react-native";
import { Avatar } from "react-native-paper";
import { followerCount } from "../../../util/Utils";
import { useState } from "react";
import { TabView, SceneMap } from 'react-native-tab-view';
import HomeScreen from "../home/Home";
import SearchScreen, { accounts } from "../Search";
import { FollowersTab, FollowingTab, PostsTab } from "./Tabs";

export default function UserDetailScreen(route) {

    // const account = route.params.account
    const navgation = useNavigation()
    const { width } = useWindowDimensions()
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'posts', title: 'Posts' },
        { key: 'followers', title: 'Followers' },
        { key: 'following', title: 'Following' },
    ]);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.surface}}>
            <View style={{flex: 1}}>
                <View style={{paddingHorizontal: SIZES.md}}>

                    <TouchableOpacity style={{width: '30%', flexDirection: 'row', alignItems: 'center'}} onPress={() => navgation.goBack()}>
                        <Ionicons name="chevron-back" size={SIZES.xl} color={COLORS.onSurface}/>
                        {/* <Text style={{...TYPOGRAPHY.h2}}>Back</Text> */}
                    </TouchableOpacity>
                    
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: SIZES.md}}>
                        <View style={{flex: 1, marginEnd: SIZES.sm}}>
                            <Text style={{...TYPOGRAPHY.h1}} numberOfLines={2}>Samson Achiaga</Text>
                        </View>
                        <View style={{width: 53, height: 53, borderRadius: 53 / 2, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center'}}>
                            <Avatar.Image size={50} source={{ uri: 'https://source.unsplash.com/random/?man,kid' }} />
                        </View>
                    </View>
                    
                    <Text style={{...TYPOGRAPHY.p}}>
                        Mobile Application developer at Zettaworks Technologies. React Native | JavaScript | Kotlin | Dart | Flutter
                    </Text>
                    
                    <View style={{marginTop: SIZES.md}}>
                        <Text style={{...TYPOGRAPHY.p}}>{`Zettaworks Technologies \u2022 Federal University of Technology, Akure`}</Text>
                        <Text style={{...TYPOGRAPHY.p, opacity: .5}}>{`Badagry, Lagos state, Nigeria`}</Text>
                    </View>
                    
                    <View style={{flexDirection: 'row', marginTop: SIZES.sm}}>
                        <TouchableOpacity activeOpacity={.8}>
                            <Text style={{...TYPOGRAPHY.h2, opacity: .5}}>{`${followerCount(2123135)} \u2022 `}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.8}>
                            <Text style={{...TYPOGRAPHY.h2, opacity: .5}}>github.com/certified84</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: SIZES.md}}>
                        <TouchableOpacity activeOpacity={.5} style={{flex: .47, padding: SIZES.md, paddingVertical: SIZES.xxs, backgroundColor: COLORS.onSurface, borderRadius: SIZES.xxs, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{...TYPOGRAPHY.h2, color: COLORS.surface}}>Follow</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity activeOpacity={.5} style={{flex: .47, padding: SIZES.md, paddingVertical: SIZES.xxs / 2, borderWidth: 2, borderColor: COLORS.lightGray, borderRadius: SIZES.xxs, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{...TYPOGRAPHY.h2, color: COLORS.onSurface}}>Message</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TabView
                    renderTabBar={() => <RenderTab index={index} setIndex={setIndex} />}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: width }}
                    style={{ flex: 1 }}
                />
            </View>
        </SafeAreaView>
    )
}



const RenderTab = ({ index, setIndex }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TabTitle title='Posts' isSelected={index === 0} onPress={() => { setIndex(0) }} style={{ flex: 0.3 }} />
            <TabTitle title='Followers' isSelected={index === 1} onPress={() => { setIndex(1) }} style={{ flex: 0.3 }} />
            <TabTitle title='Following' isSelected={index === 2} onPress={() => { setIndex(2) }} style={{ flex: 0.3 }} />
        </View>
    );
}

const TabTitle = ({ title, isSelected, onPress, style }) => {
    return (
        <TouchableOpacity style={{ ...style, justifyContent: 'center', alignItems: 'center' }} onPress={onPress} activeOpacity={0.5}>
            <Text style={{ ...TYPOGRAPHY.h2, opacity: isSelected ? 1 : .5 }}>{title}</Text>
            <View style={{ width: '100%', height: 2, backgroundColor: COLORS.onSurface, marginTop: SIZES.xxs - 2, opacity: isSelected ? 1 : 0 }} />
        </TouchableOpacity>
    );
}

const renderScene = SceneMap({
    posts: PostsTab,
    followers: () => <FollowersTab accounts={accounts} navigation={{}}/>,
    following: () => <FollowingTab accounts={accounts} navigation={{}}/>,
});