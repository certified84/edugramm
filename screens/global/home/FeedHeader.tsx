import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native'
import { COLORS, SIZES, TYPOGRAPHY } from '../../../assets/theme'
import React, { useState } from 'react';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'

import { Avatar } from 'react-native-paper';
import {
    MenuProvider, Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
} from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';


const { ContextMenu, SlideInMenu, Popover } = renderers;

const FeedHeader = ({ titleText, navigation }) => {

    const otherAccounts = [
        {
            id: 1,
            image: "https://source.unsplash.com/random/?child,kid",
            name: 'Micheal Rita',
            school: 'Pacesetters Academy. Old GRA'
        },
        {
            id: 2,
            image: "https://source.unsplash.com/random/?child,kid",
            name: 'Micheal Jordan',
            school: 'Pacesetters Academy. Old GRA'
        },
    ]

    return (
        <View style={styles.container}>
            <Text style={{...TYPOGRAPHY.h1, fontFamily: 'sansita-italic', fontSize: SIZES.xxl, color: COLORS.onSurface}}>{titleText}</Text>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={{marginHorizontal: SIZES.xs}} activeOpacity={.5} onPress={() => navigation.navigate('NotificationScreen')}>
                    <MaterialCommunityIcons name='bell-outline' color={COLORS.onSurface} size={SIZES.xl + 5} />
                </TouchableOpacity>
                <TouchableOpacity style={{marginStart: SIZES.xs}} activeOpacity={.7} onPress={() => navigation.navigate('ProfileScreen')}>
                    <View style={{width: SIZES.xl + 5, height: SIZES.xl + 5, borderRadius: (SIZES.xl + 5) / 2, backgroundColor: COLORS.onSurface}}>

                    </View>
                </TouchableOpacity>
            </View>
            {/* https://www.npmjs.com/package/react-native-popup-menu */}
            {/* <Menu renderer={Popover} rendererProps={{ placement: 'bottom' }}>
                <MenuTrigger>
                    <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: COLORS.primary, paddingHorizontal: SIZES.xs, paddingVertical: SIZES.xxs, borderRadius: SIZES.lg, width: "100%" }}>
                        <Avatar.Image size={40} source={{ uri: "https://source.unsplash.com/random/?child,kid" }} />
                        <Feather name="chevron-down" color='#BFBFBF' size={20} style={{ marginStart: SIZES.xxs / 2 }} />
                    </View>
                </MenuTrigger>

                <MenuOptions customStyles={menuOptionsStyle}>
                    <View style={{ backgroundColor: '#840042', borderRadius: SIZES.md, margin: SIZES.xxs, padding: SIZES.lg }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Avatar.Image size={50} source={{ uri: "https://source.unsplash.com/random/?child,kid" }} />
                            <View style={{ marginStart: SIZES.xs - 2 }}>
                                <Text style={{ ...TYPOGRAPHY.h2, color: COLORS.white, marginBottom: SIZES.xxs / 2 }}>Micheal Blessing</Text>
                                <Text style={{ ...TYPOGRAPHY.h2, color: COLORS.white, fontFamily: 'comic-sm' }}>Chrisland Intl. School. VGC</Text>
                            </View>
                        </View>

                        <MenuOption onSelect={() => { }}>
                            <View style={{ borderWidth: 1, borderColor: '#A6A6A6', borderRadius: SIZES.xxs, marginTop: SIZES.md, marginBottom: SIZES.xxs, padding: SIZES.xs }}>
                                <Text style={{ ...TYPOGRAPHY.h2, color: COLORS.white, alignSelf: 'center' }}>Manage your account</Text>
                            </View>
                        </MenuOption>
                    </View>

                    <FlatList
                        contentContainerStyle={{ paddingBottom: 0 }}
                        data={otherAccounts}
                        scrollEnabled={false}
                        renderItem={({ item, index }) => <OtherAccount key={index} child={item} isLast={index === otherAccounts.length - 1} />}
                        keyExtractor={(item) => item.id}
                        ListFooterComponent={
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>

                                <MenuOption onSelect={() => navigation.navigate('AddChildScreen')} customStyles={{ optionWrapper: { padding: 0 } }}>
                                    <View style={{ flexDirection: 'row', padding: SIZES.sm }}>
                                        <Svg xmlns="http://www.w3.org/2000/svg" width={SIZES.md} height={SIZES.md} fill="none" >
                                            <Path fill="#fff" d="M9.583 7.292c-.291 0-.538-.101-.74-.303a1.003 1.003 0 0 1-.301-.739c0-.292.1-.538.302-.74.202-.202.448-.302.74-.302.291 0 .538.101.74.303.201.202.302.448.301.739 0 .292-.1.538-.303.74a1.003 1.003 0 0 1-.739.302Zm-4.166 0c-.292 0-.539-.101-.74-.303a1.003 1.003 0 0 1-.302-.739c0-.292.1-.538.303-.74.201-.202.448-.302.739-.302s.538.101.74.303c.201.202.302.448.301.739 0 .292-.1.538-.302.74a1.003 1.003 0 0 1-.74.302ZM7.5 11.667a3.93 3.93 0 0 1-2.26-.688 4.079 4.079 0 0 1-1.49-1.812h7.5a4.084 4.084 0 0 1-1.49 1.812 3.928 3.928 0 0 1-2.26.688ZM7.5 15a7.255 7.255 0 0 1-2.928-.594 7.633 7.633 0 0 1-2.375-1.604 7.628 7.628 0 0 1-1.603-2.374A7.27 7.27 0 0 1 0 7.5c0-1.042.198-2.018.594-2.928.396-.91.93-1.701 1.603-2.375A7.628 7.628 0 0 1 4.572.594 7.27 7.27 0 0 1 7.5 0c1.042 0 2.018.198 2.928.594.91.396 1.701.93 2.374 1.603a7.64 7.64 0 0 1 1.605 2.375A7.24 7.24 0 0 1 15 7.5a7.255 7.255 0 0 1-.594 2.928 7.633 7.633 0 0 1-1.604 2.374 7.64 7.64 0 0 1-2.374 1.605A7.24 7.24 0 0 1 7.5 15Zm0-1.667c1.611 0 2.986-.57 4.125-1.708 1.139-1.139 1.708-2.514 1.708-4.125 0-1.611-.57-2.986-1.708-4.125C10.486 2.236 9.111 1.667 7.5 1.667h-.25a.787.787 0 0 0-.25.041.627.627 0 0 0-.167.271 1.133 1.133 0 0 0-.041.313c0 .291.1.538.301.74.201.201.448.302.74.301a.92.92 0 0 0 .345-.062.863.863 0 0 1 .322-.063c.167 0 .306.063.417.188.11.125.166.27.166.437 0 .32-.15.525-.448.615-.299.09-.566.136-.802.135a2.205 2.205 0 0 1-1.615-.677 2.201 2.201 0 0 1-.676-1.614v-.125c0-.042.007-.098.02-.167A5.895 5.895 0 0 0 2.75 4.104C2.028 5.09 1.667 6.222 1.667 7.5c0 1.611.57 2.986 1.708 4.125 1.139 1.139 2.514 1.708 4.125 1.708Z" />
                                        </Svg>
                                        <Text style={{ ...TYPOGRAPHY.h2, color: COLORS.white, marginStart: SIZES.xxs }}>Add Child</Text>
                                    </View>
                                </MenuOption>

                                <View style={{ width: 1, height: 60, backgroundColor: '#A6A6A6' }} />

                                <MenuOption onSelect={() => { navigation.navigate("LoginScreen") }} customStyles={{ optionWrapper: { padding: 0 } }}>
                                    <View style={{ flexDirection: 'row', padding: SIZES.sm }}>
                                        <MaterialIcons name="logout" color={COLORS.white} size={SIZES.md} style={{ marginStart: SIZES.xxs / 2 }} />
                                        <Text
                                            style={{ ...TYPOGRAPHY.h2, color: COLORS.white, marginStart: SIZES.xxs }}>Logout</Text>
                                    </View>
                                </MenuOption>
                            </View>
                        }
                    />
                </MenuOptions>
            </Menu> */}
        </View>
    )
}

const OtherAccount = ({ child, isLast }) => {
    return (
        <MenuOption onSelect={() => { }} customStyles={{ optionWrapper: { padding: 0 } }}>
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: 30 }}>
                    <Avatar.Image size={50} source={{ uri: child.image }} />
                    <View style={{ marginStart: SIZES.xs - 2 }}>
                        <Text style={{ ...TYPOGRAPHY.h2, fontSize: SIZES.sm - 2, color: COLORS.white, marginBottom: SIZES.xxs / 2 }}>{child.name}</Text>
                        <Text style={{ ...TYPOGRAPHY.h2, fontSize: SIZES.sm - 2, color: COLORS.white, fontFamily: 'comic-sm' }}>{child.school}</Text>
                    </View>
                </View>
                {!isLast && <View style={{ height: 1, backgroundColor: '#A6A6A6', marginStart: 30, marginVertical: SIZES.xs - 2 }} />}
                {isLast && <View style={{ height: 1, backgroundColor: '#A6A6A6', marginTop: SIZES.xs - 2 }} />}
            </View>
        </MenuOption>
    )
}

const menuOptionsStyle = {
    optionsContainer: {
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.md,
        padding: 0
    }
}

export default FeedHeader

const styles = StyleSheet.create({
    container: {
        padding: SIZES.md,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
})