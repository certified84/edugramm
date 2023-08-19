import { FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { View } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../assets/theme";
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { Avatar, TextInput } from "react-native-paper";
import VerifiedIcon from "../../components/VerifiedIcon";
import { useEffect, useState } from "react";
import { followerCount } from "../../util/Utils";

export   const accounts = [
    {
        id: '1',
        name: 'Samson Achiaga',
        image: 'https://source.unsplash.com/random/?man,kid',
        follower_count: 200000,
    },
    {
        id: '2',
        name: 'Samson Achiaga',
        image: 'https://source.unsplash.com/random/?man,kid',
        follower_count: 99990,
    },
    {
        id: '3',
        name: 'Kolawole Godstime',
        image: 'https://source.unsplash.com/random/?man,kid',
        follower_count: 200000,
    },
    {
        id: '4',
        name: 'Okafe Vincent',
        image: 'https://source.unsplash.com/random/?man,kid',
        follower_count: 20000,
    },
    {
        id: '5',
        name: 'Olorunnegan Ifeoluwa',
        image: 'https://source.unsplash.com/random/?man,kid',
        follower_count: 200000000,
    },
    {
        id: '6',
        name: 'James Oluseyi ',
        image: 'https://source.unsplash.com/random/?man,kid',
        follower_count: 200000,
    },
    {
        id: '7',
        name: 'Samson Achiaga',
        image: 'https://source.unsplash.com/random/?man,kid',
        follower_count: 200000,
    },
    {
        id: '8',
        name: 'Samson Achiaga',
        image: 'https://source.unsplash.com/random/?man,kid',
        follower_count: 99990,
    },
    {
        id: '9',
        name: 'Kolawole Godstime',
        image: 'https://source.unsplash.com/random/?man,kid',
        follower_count: 200000,
    },
    {
        id: '10',
        name: 'Okafe Vincent',
        image: 'https://source.unsplash.com/random/?man,kid',
        follower_count: 20000,
    },
    {
        id: '11',
        name: 'Olorunnegan Ifeoluwa',
        image: 'https://source.unsplash.com/random/?man,kid',
        follower_count: 200000000,
    },
    {
        id: '12',
        name: 'James Oluseyi Famodimu James, Oluseyi',
        image: 'https://source.unsplash.com/random/?man,kid',
        follower_count: 200000,
    },
]

export default function SearchScreen() {

    const navigation = useNavigation()
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredAccounts, setFilteredAccounts] = useState(accounts)

    useEffect(() => {
        setFilteredAccounts(
            accounts.filter((item) => {
                return(item.name.toLowerCase().includes(searchQuery.toLowerCase()))
            })
        )
    },[searchQuery])

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.surface}}>
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flex: .2}}/>
                    <Text style={{...TYPOGRAPHY.h1, alignSelf: 'center', color: COLORS.onSurface}}>Search</Text>
                    <TouchableOpacity activeOpacity={.8} style={{flex: .2, alignItems: 'center'}}>
                        <MaterialCommunityIcons name={'calendar-edit'} color={COLORS.surface} size={SIZES.xl} />
                    </TouchableOpacity>
                </View>
                {
                    !filteredAccounts || accounts.length === 0 ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: SIZES.md, marginTop: 0}}>
                        <Text style={{...TYPOGRAPHY.h2, color: COLORS.onSurface}}>Coming soon...</Text>
                        <View style={{flex: .1}}/>
                    </View>
                    : <View style={{flex: 1}}>
                        <View style={{marginHorizontal: SIZES.md, borderRadius: SIZES.xs, overflow: 'hidden'}}>
                            <TextInput
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                mode="outlined"
                                placeholder='Search'
                                left={
                                    <TextInput.Icon icon={'calendar-edit'} color={COLORS.onSurface} />
                                }
                                theme={{ roundness: SIZES.xs }}
                                style={styles.inputField}
                                underlineColor={COLORS.onSecondaryContainer}
                                outlineColor={'transparent'}
                                activeOutlineColor={'transparent'}
                                placeholderTextColor={COLORS.onSecondaryContainer}
                                textColor={COLORS.onSecondaryContainer}
                            />
                        </View>
                        <FlatList
                            data={filteredAccounts}
                            renderItem={({ item }) => <Account account={item} navigation={navigation} />}
                            keyExtractor={(item) => item.id}
                            alwaysBounceVertical={true}
                        />
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}

export const Account = ({ account, navigation }) => {
    return (
        <TouchableOpacity activeOpacity={.9} style={{ flex: 1, flexDirection: 'row', paddingHorizontal: SIZES.md, marginTop: SIZES.sm}} onPress={() => navigation.navigate('UserDetailScreen', {account})}>
            <View style={{width: 43, height: 43, borderRadius: 43 / 2, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center'}}>
                <Avatar.Image size={40} source={{ uri: account.image }} />
            </View>
            <View style={{flex: 1, justifyContent: 'space-between', paddingStart: SIZES.sm}}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flex: .95}}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{...TYPOGRAPHY.h2, color: COLORS.onSurface}} numberOfLines={1}>{account.name}</Text>
                            <VerifiedIcon style={{marginEnd: 2}}/>
                            {/* <View style={{width: SIZES.md}}/> */}
                        </View>
                        <Text style={{...TYPOGRAPHY.p, color: COLORS.onSurface, opacity: .4, fontSize: SIZES.sm - 3}}>{`${followerCount(account.follower_count)} followers`}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={.5} style={{marginStart: SIZES.md, padding: SIZES.md, paddingVertical: SIZES.xxs / 2, borderWidth: 2, borderColor: COLORS.lightGray, borderRadius: SIZES.xxs}}>
                            <Text style={{...TYPOGRAPHY.h2, color: COLORS.onSurface}}>Follow</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width: '100%', height: 1, marginTop: SIZES.xs, backgroundColor: COLORS.darkGray, alignContent: 'flex-end', opacity: .2}}/>
            </View>
        </TouchableOpacity>
    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.surface1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    inputField: {
        backgroundColor: COLORS.surface1,
        color: COLORS.black,
    },
    forgotPasswordButton: {
        paddingTop: SIZES.sm,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    forgotPassword: {
        color: COLORS.primary,
        fontWeight: '700',
        textDecorationLine: 'underline',
    },
})