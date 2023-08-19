import {
    StyleSheet, SafeAreaView, Text, View,
    TouchableOpacity, FlatList, Image
} from 'react-native'
import { COLORS, SIZES, TYPOGRAPHY } from '../../../assets/theme'
import React, { useState } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { Avatar } from 'react-native-paper';
import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons'
import FeedHeader from './FeedHeader';
import { useNavigation } from '@react-navigation/native';
import FeedCard from './FeedCard';

const HomeScreen = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    data={data}
                    ListHeaderComponent={() => <FeedHeader titleText={"EduGramm"} navigation={navigation} />}
                    renderItem={({ item }) => <FeedCard item={item} navigation={navigation} />}
                    keyExtractor={(item) => item.id}
                    alwaysBounceVertical={true}
                />
            </SafeAreaView>
        </View>
    )
}

export default HomeScreen

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
