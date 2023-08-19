import { SafeAreaView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../assets/theme";
import { SceneMap, TabView } from "react-native-tab-view";
import { FollowersTab, FollowingTab } from "./Tabs";
import { accounts } from "../Search";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { followerCount } from "../../../util/Utils";

export default function FollowScreen() {

    const { width } = useWindowDimensions()
    const navigation = useNavigation()
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'followers', title: 'Followers' },
        { key: 'following', title: 'Following' },
    ]);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.surface}}>
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: SIZES.md}}>
                    <TouchableOpacity activeOpacity={.9} onPress={() => navigation.goBack()}>
                        <Ionicons name='chevron-back' size={SIZES.xl} color={COLORS.onSurface}/>
                    </TouchableOpacity>
                    <Text style={{...TYPOGRAPHY.h1, flex: 1, textAlign: 'center', marginEnd: SIZES.xl, color: COLORS.onSurface}}>Samson Achiaga</Text>
                </View>

                <TabView
                    renderTabBar={() => <RenderTab index={index} setIndex={setIndex} />}
                    navigationState={{ index, routes }}
                    renderScene={renderScene({navigation})}
                    onIndexChange={setIndex}
                    initialLayout={{ width: width }}
                    style={{ flex: 1, marginTop: SIZES.md }}
                />
            </View>
        </SafeAreaView>
    )
}

const RenderTab = ({ index, setIndex }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TabTitle title={`${followerCount(234454)} Followers`} isSelected={index === 0} onPress={() => { setIndex(0) }} style={{ flex: 0.5 }} />
            <TabTitle title={`${followerCount(23494)} Following`} isSelected={index === 1} onPress={() => { setIndex(1) }} style={{ flex: 0.5 }} />
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

const renderScene = ({ navigation }) => SceneMap({
    followers: () => <FollowersTab accounts={accounts} navigation={navigation}/>,
    following: () => <FollowingTab accounts={accounts} navigation={navigation}/>,
});