import { View, Text, SafeAreaView, StyleSheet, ImageBackground, FlatList, Image, ScrollView, TouchableOpacity } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../../assets/theme";
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import VerifiedIcon from "../../../components/VerifiedIcon";
import { collection, orderBy, query } from "firebase/firestore";
import { firestore } from "../../../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useEffect, useState } from "react";
import CommunityPlaceHolder from "../../../../assets/svg/CommunityPlaceHolder";

const messages = [
    {
        id: 1,
        name: 'Samson Achiaga',
        image: 'https://source.unsplash.com/random/?android,developer',
        message: "Hey man. How's it going?"
    },
    {
        id: 2,
        name: 'Olorunnegan Ifeoluwa',
        image: 'https://source.unsplash.com/random/?computer,github',
        message: "Agba Developer 🙌🏾. How Vella dey go an?"
    },
    {
        id: 3,
        name: 'James Oluseyi',
        image: 'https://source.unsplash.com/random/?android,device',
        message: "My boy! What's good?"
    },
    {
        id: 4,
        name: 'OKafe Vincent',
        image: 'https://source.unsplash.com/random/?code,computer',
        message: 'Yo Billionaire! How your life.'
    },
    {
        id: 5,
        name: 'Kolawole Godstime',
        image: 'https://source.unsplash.com/random/?code,computer',
        message: "Hey man. How's it going?"
    },
    {
        id: 6,
        name: 'Samson Achiaga',
        image: 'https://source.unsplash.com/random/?android,developer',
        message: "Hey man. How's it going?"
    },
    {
        id: 7,
        name: 'Olorunnegan Ifeoluwa',
        image: 'https://source.unsplash.com/random/?computer,github',
        message: "Agba Developer 🙌🏾. How Vella dey go an?"
    },
    {
        id: 8,
        name: 'James Oluseyi',
        image: 'https://source.unsplash.com/random/?android,device',
        message: "My boy! What's good?"
    },
    {
        id: 9,
        name: 'OKafe Vincent',
        image: 'https://source.unsplash.com/random/?code,computer',
        message: 'Yo Billionaire! How your life.'
    },
    {
        id: 10,
        name: 'Kolawole Godstime',
        image: 'https://source.unsplash.com/random/?code,computer',
        message: "Hey man. How's it going?"
    },
]

export default function CommunityScreen() {

    const navigation = useNavigation()

    const communitiesRef = collection(firestore, "communities")
    const q = query(communitiesRef)
    const [communitiesSnapshot, communitiesLoading, communitiesError] = useCollection(communitiesRef)
    const [communities, setCommunities] = useState([])

    useEffect(() => {
        if (communitiesSnapshot) {
            const data = communitiesSnapshot.docs
            setCommunities(data)
        }
    }, [communitiesSnapshot])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.surface }}>

            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: .3 }} />
                    <Text style={{ ...TYPOGRAPHY.h1, alignSelf: 'center', color: COLORS.onSurface }}>Communities & Chat</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("CreateCommunityScreen" as never)} activeOpacity={.8} style={{ flex: .3, alignItems: 'center' }}>
                        <AntDesign name={'addusergroup'} color={COLORS.onSurface} size={SIZES.xl} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={communities}
                    style={{ alignSelf: 'center' }}
                    horizontal
                    renderItem={({ item }) => <Community item={item} navigation={navigation} />}
                    keyExtractor={(item) => `${item.id}`}
                    alwaysBounceVertical={false}
                    showsHorizontalScrollIndicator={false}
                />
                <View style={{ height: 1, width: '100%', backgroundColor: COLORS.darkGray, marginVertical: SIZES.xs }} />
            </View>

            <View>
                <FlatList
                    data={messages}
                    renderItem={({ item }) => <Message onPress={() => navigation.navigate('ChatScreen', { message: item } as never)} message={item} />}
                    keyExtractor={(item) => `${item.id}`}
                    alwaysBounceVertical={false}
                    ListFooterComponent={<View style={{ height: 220 }} />}
                />
            </View>
        </SafeAreaView>
    )
}

const Community = ({ item, navigation }) => {
    const community = item.data()
    return (
        <TouchableOpacity onPress={() => navigation.navigate("CommunityDetailScreen", { communityInfo: community })} activeOpacity={.7} style={{ borderRadius: 15, marginVertical: SIZES.sm, marginHorizontal: SIZES.xxs, width: 180, height: 130, overflow: 'hidden' }}>
            {
                community.image ? <ImageBackground source={{ uri: community.image }} resizeMode='cover' style={{ width: '100%', height: '100%', }} />
                    : <CommunityPlaceHolder />
            }
            {/* <ImageBackground source={{uri: community.image}} resizeMode='cover' style={{width: '100%', height: '100%', }}> */}
            {/* <View /> */}
            <View style={{ position: 'absolute', bottom: 0, backgroundColor: COLORS.primary, width: '100%', padding: SIZES.xs }}>
                <Text numberOfLines={1} style={{ ...TYPOGRAPHY.h2, color: COLORS.onPrimary, alignSelf: 'center' }}>{community.name}</Text>
            </View>
            {/* </ImageBackground> */}
        </TouchableOpacity>
    )
}

const Message = ({ message, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={.7} style={{ flex: 1, flexDirection: 'row', margin: SIZES.sm, marginBottom: 0 }}>
            <Image source={{ uri: message.image }} style={{ width: 50, height: 50, borderRadius: 25 }} />
            <View style={{ flex: 1, marginHorizontal: SIZES.xs, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', flex: .8 }}>
                        <Text style={{ ...TYPOGRAPHY.h2, color: COLORS.onSurface }} numberOfLines={1}>{message.name}</Text>
                        <VerifiedIcon />
                    </View>
                    <Text style={{ ...TYPOGRAPHY.h2, color: message.isRead ? COLORS.onSurface : COLORS.primary }}>Yesterday</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <Text style={{ ...TYPOGRAPHY.h2, color: COLORS.onSurface, opacity: .7, flex: .9 }} numberOfLines={2}>{message.message}</Text>
                    <View style={{ marginEnd: SIZES.xxs, width: SIZES.xxs, height: SIZES.xxs, backgroundColor: COLORS.primary, borderRadius: SIZES.xxs / 2, alignSelf: 'center' }} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

})