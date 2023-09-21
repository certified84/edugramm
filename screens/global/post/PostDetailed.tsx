import {
    StyleSheet, SafeAreaView, Text, View,
    TouchableOpacity, FlatList, Image, ScrollView, KeyboardAvoidingView, Platform, StatusBar
} from 'react-native'
import { COLORS, SIZES, TYPOGRAPHY } from '../../../assets/theme'
import React, { useState } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { Avatar, TextInput } from 'react-native-paper';
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons'
import HomeHeader from '../home/HomeHeader';
import { useNavigation } from '@react-navigation/native';
import { PostCard } from './PostCard';
import PostComment from './PostComment';
import PostDetailedCard from './PostDetailedCard';

const PostDetailedScreen = ({ route }) => {

    const item = route.params.item
    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 0.9 }}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: SIZES.md}}>
                    <TouchableOpacity activeOpacity={.9} onPress={() => navigation.goBack()}>
                        <Ionicons name='chevron-back' size={SIZES.xl} color={COLORS.onSurface}/>
                    </TouchableOpacity>
                    <Text style={{...TYPOGRAPHY.h1, flex: 1, textAlign: 'center', marginEnd: SIZES.xl, color: COLORS.onSurface}}>Post</Text>
                </View>
                <ScrollView style={{flex: 1}}>
                    <PostDetailedCard item={item} navigation={navigation} />

                    <View style={{ marginBottom: SIZES.xl}}>
                        <PostComment item={item} />
                        <PostComment item={item} />
                    </View>

                </ScrollView>
            </View>

            <View style={{ flex: 0.1 }}>
                <TextInput
                    mode="outlined"
                    placeholder='Add a Comment'
                    theme={{ roundness: 3 }}
                    // left={<TextInput.Icon icon="email" iconColor={COLORS.white} />}
                    style={styles.inputField}
                    underlineColor={COLORS.white}
                    activeOutlineColor={COLORS.primary}
                    placeholderTextColor={COLORS.black}
                    textColor={COLORS.black}
                />
                <TouchableOpacity>
                    <Text style={{
                        ...TYPOGRAPHY.h2,
                        color: COLORS.primary,
                        position: "absolute",
                        right: 35,
                        // bottom: -40,
                        bottom: 15,
                        fontSize: SIZES.md
                    }}>Post</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default PostDetailedScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.surface,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    inputField: {
        borderRadius: 55,
        width: "100%",
        backgroundColor: COLORS.lightGray
        // paddingHorizontal: 20
    }
})