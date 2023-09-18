import {
    StyleSheet, SafeAreaView, Text, View,
    TouchableOpacity, FlatList, Image
} from 'react-native'
import { COLORS, SIZES, TYPOGRAPHY } from '../../../assets/theme'
import React, { useState } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { Avatar } from 'react-native-paper';
import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import FeedCard from '../home/FeedCard';
import { Account } from '../search/Search';

export const PostsTab = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <FeedCard item={item} navigation={navigation} />}
                    keyExtractor={(item) => item.id}
                    alwaysBounceVertical={true}
                />
            </SafeAreaView>
        </View>
    )
}

export const FollowersTab = ({accounts, navigation}) => {
    return (
        <View style={{flex: 1}}>
            { 
                !accounts || accounts.length > 0 ? <FlatList
                    data={accounts}
                    renderItem={({ item }) => <Account account={item} navigation={navigation} />}
                    keyExtractor={(item) => item.id}
                    alwaysBounceVertical={true}
                /> : <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: SIZES.md, marginTop: 0}}>
                    <Text style={{...TYPOGRAPHY.h2, color: COLORS.onSurface}}>There's nothing here yet.</Text>
                    <Text style={{...TYPOGRAPHY.h2, fontSize: SIZES.xs, color: COLORS.onSurface, opacity: .7, textAlign: 'center'}}>Accounts that follows this user will appear here when they are available...</Text>
                </View>
            }
        </View>
    )
}

export const FollowingTab = ({accounts, navigation}) => {
    return (
        <View style={{flex: 1}}>
            { 
                !accounts || accounts.length > 0 ? <FlatList
                    data={accounts}
                    renderItem={({ item }) => <Account account={item} navigation={navigation} />}
                    keyExtractor={(item) => item.id}
                    alwaysBounceVertical={true}
                /> : <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: SIZES.md, marginTop: 0}}>
                    <Text style={{...TYPOGRAPHY.h2, color: COLORS.onSurface}}>There's nothing here yet.</Text>
                    <Text style={{...TYPOGRAPHY.h2, fontSize: SIZES.xs, color: COLORS.onSurface, opacity: .7, textAlign: 'center'}}>Accounts this user follows will appear here when they are available...</Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.surface
    }
})


const data = [
    {
        id: '1',
        full_name: 'Slyvia Favour',
        user_photo: 'https://source.unsplash.com/random/?woman,kid',
        image_url: 'https://source.unsplash.com/random/?woman,kid',
        username: 'SlyviaTeacher',
        feed_type: "photo",
        images: [
            'https://source.unsplash.com/random/?woman,kid',
            'https://source.unsplash.com/random/?man,kid',
            'https://source.unsplash.com/random/?school,kid',
        ],
        likes: [
            'asdfoa',
            'ajsdiofja',
            'aiosdjf',
            'sjdofjao',
            'aiodjfoa',
            'ajisdjfioa',
            'jaoisdjfoa',
            'joisdfjoa',
            'jaoisdjfo'
        ],
        comments: [
            {
                id: 'ajsodi',
                uid: 'asdofjao',
                comment: 'This is a very serious comment'
            },
            {
                id: 'ajsodi',
                uid: 'asdofjao',
                comment: 'This is a very serious comment'
            },
            {
                id: 'ajsodi',
                uid: 'asdofjao',
                comment: 'This is a very serious comment'
            },
        ],
        date: "9:30am"
    },
    {
        id: '2',
        full_name: 'Jake Matheew',
        user_photo: 'https://source.unsplash.com/random/?man,kid',
        image_url: 'https://source.unsplash.com/random/?man,kid',
        username: 'principal',
        feed_type: "text",
        images: [
            'https://source.unsplash.com/random/?woman,kid',
        ],
        likes: [
            'asdfoa',
            'ajsdiofja',
            'aiosdjf',
            'sjdofjao',
            'aiodjfoa',
            'ajisdjfioa',
            'jaoisdjfoa',
            'joisdfjoa',
            'jaoisdjfo'
        ],
        comments: [
            {
                id: 'ajsodi',
                uid: 'asdofjao',
                comment: 'This is a very serious comment'
            },
            {
                id: 'ajsodi',
                uid: 'asdofjao',
                comment: 'This is a very serious comment'
            },
            {
                id: 'ajsodi',
                uid: 'asdofjao',
                comment: 'This is a very serious comment'
            },
        ],
        date: "1:30am"
    },
    {
        id: '3',
        full_name: 'Micheal Rayond',
        user_photo: 'https://source.unsplash.com/random/?man,kid',
        image_url: 'https://source.unsplash.com/random/?father,kid',
        username: 'Driver',
        feed_type: "text",
        images: [
            // 'https://source.unsplash.com/random/?woman,kid',
            // 'https://source.unsplash.com/random/?man,kid',
            // 'https://source.unsplash.com/random/?school,kid',
        ],
        likes: [
            'asdfoa',
            'ajsdiofja',
            'aiosdjf',
            'sjdofjao',
            'aiodjfoa',
            'ajisdjfioa',
            'jaoisdjfoa',
            'joisdfjoa',
            'jaoisdjfo'
        ],
        comments: [
            {
                id: 'ajsodi',
                uid: 'asdofjao',
                comment: 'This is a very serious comment'
            },
            {
                id: 'ajsodi',
                uid: 'asdofjao',
                comment: 'This is a very serious comment'
            },
            {
                id: 'ajsodi',
                uid: 'asdofjao',
                comment: 'This is a very serious comment'
            },
        ],
        date: "13:30am"
    },
    {
        id: '4',
        full_name: 'Frank k',
        user_photo: 'https://source.unsplash.com/random/?bike,kid',
        image_url: 'https://source.unsplash.com/random/?park,kid',
        username: 'Frank-saa',
        feed_type: "photo",
        images: [
            'https://source.unsplash.com/random/?woman,kid',
            'https://source.unsplash.com/random/?man,kid',
            'https://source.unsplash.com/random/?school,kid',
        ],
        likes: [
            'asdfoa',
            'ajsdiofja',
            'aiosdjf',
            'sjdofjao',
            'aiodjfoa',
            'ajisdjfioa',
            'jaoisdjfoa',
            'joisdfjoa',
            'jaoisdjfo'
        ],
        comments: [
            {
                id: 'ajsodi',
                uid: 'asdofjao',
                comment: 'This is a very serious comment'
            },
            {
                id: 'ajsodi',
                uid: 'asdofjao',
                comment: 'This is a very serious comment'
            },
            {
                id: 'ajsodi',
                uid: 'asdofjao',
                comment: 'This is a very serious comment'
            },
        ],
        date: "9:30am"
    },
    {
        id: '5',
        full_name: 'Jake Matheew',
        user_photo: 'https://source.unsplash.com/random/?president,kid',
        image_url: 'https://source.unsplash.com/random/?car,kid',
        username: 'principal',
        feed_type: "text",
        images: [
            'https://source.unsplash.com/random/?woman,kid',
            'https://source.unsplash.com/random/?man,kid',
            // 'https://source.unsplash.com/random/?school,kid',
        ],
        likes: [
            'asdfoa',
            'ajsdiofja',
            'aiosdjf',
            'sjdofjao',
            'aiodjfoa',
            'ajisdjfioa',
            'jaoisdjfoa',
            'joisdfjoa',
            'jaoisdjfo'
        ],
        comments: [
            {
                id: 'ajsodi',
                uid: 'asdofjao',
                comment: 'This is a very serious comment'
            },
            {
                id: 'ajsodi',
                uid: 'asdofjao',
                comment: 'This is a very serious comment'
            },
            {
                id: 'ajsodi',
                uid: 'asdofjao',
                comment: 'This is a very serious comment'
            },
        ],
        date: "1:30am"
    },
    {
        id: '6',
        full_name: 'Micheal Rayond',
        user_photo: 'https://source.unsplash.com/random/?child,kid',
        image_url: 'https://source.unsplash.com/random/?family,kid',
        username: 'Driver',
        feed_type: "photo",
        images: [
            // 'https://source.unsplash.com/random/?woman,kid',
            // 'https://source.unsplash.com/random/?man,kid',
            // 'https://source.unsplash.com/random/?school,kid',
        ],
        likes: [
            'asdfoa',
            'ajsdiofja',
            'aiosdjf',
            'sjdofjao',
            'aiodjfoa',
            'ajisdjfioa',
            'jaoisdjfoa',
            'joisdfjoa',
            'jaoisdjfo'
        ],
        comments: [
            {
                id: 'ajsodi',
                uid: 'asdofjao',
                comment: 'This is a very serious comment'
            },
            {
                id: 'ajsodi',
                uid: 'asdofjao',
                comment: 'This is a very serious comment'
            },
            {
                id: 'ajsodi',
                uid: 'asdofjao',
                comment: 'This is a very serious comment'
            },
        ],
        date: "13:30am"
    },
]
