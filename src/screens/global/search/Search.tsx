import { FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { View } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../../assets/theme";
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { Avatar, TextInput } from "react-native-paper";
import VerifiedIcon from "../../../components/VerifiedIcon";
import { useEffect, useState } from "react";
import { followerCount } from "../../../util/Utils";
import { Post } from "./Components/Post";
import { accounts, data } from "../../../components/data";
import { ImageDialog } from "./Components/ImageDialog";
import { Account } from "./Components/Account";

export default function SearchScreen() {

    const navigation = useNavigation()
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredAccounts, setFilteredAccounts] = useState(accounts)
    const [searching, setSearching] = useState(false)
    const [posts, setPosts] = useState([])
    const [showImageDialog, setShowImageDialog] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        setFilteredAccounts(
            accounts.filter((item) => {
                return(item.name.toLowerCase().includes(searchQuery.toLowerCase()))
            })
        )
    },[searchQuery])

    useEffect(() => {
        setPosts(
            data.filter((item) => {
                return(item.images.length > 0)
            })
        )
    },[])

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.surface}}>

            {
                posts.length > 0 && <ImageDialog
                    showImageDialog={showImageDialog}
                    setShowImageDialog={setShowImageDialog}
                    image={data[currentIndex].images[0]}
                />
            }

            <View style={{flex: 1}}>
                {
                    searching ? <View style={{flex: 1}}>
                        <View>
                            <View style={{flexDirection: 'row', backgroundColor: COLORS.surface1, alignItems: 'center', paddingHorizontal: SIZES.md, marginHorizontal: SIZES.md, borderRadius: SIZES.xs, overflow: 'hidden'}}>
                                <Feather name="search" size={20} color={COLORS.onSecondaryContainer} style={{flex: .1}}/>
                                <View style={{flex: .7}}>
                                    <TextInput
                                        value={searchQuery}
                                        onChangeText={setSearchQuery}
                                        mode="outlined"
                                        placeholder='Search'
                                        // left={
                                            // <TextInput.Icon icon={'search'} color={COLORS.onSurface} />
                                        // }
                                        // theme={{ roundness: SIZES.xs }}
                                        style={styles.inputField}
                                        underlineColor={COLORS.onSecondaryContainer}
                                        outlineColor={'transparent'}
                                        activeOutlineColor={'transparent'}
                                        placeholderTextColor={COLORS.darkGray}
                                        textColor={COLORS.onSecondaryContainer}
                                    />
                                </View>
                                <TouchableOpacity onPress={() => setSearching(false)} activeOpacity={.9} style={{flex: .2, paddingVertical: SIZES.sm, alignItems: 'center'}}>
                                    <Text style={{...TYPOGRAPHY.h2, color: COLORS.onSecondaryContainer}}>Cancel</Text>
                                </TouchableOpacity>
                            </View>

                            <FlatList
                                key={'search'}
                                data={filteredAccounts}
                                renderItem={({ item }) => <Account account={item} navigation={navigation} />}
                                keyExtractor={(item) => item.id}
                                alwaysBounceVertical={true}
                            />
                        </View>
                    </View>

                    : <View style={{flex: 1}}>

                        {
                            !posts || data.length === 0 ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: SIZES.md, marginTop: 0}}>
                                <Text style={{...TYPOGRAPHY.h2, color: COLORS.onSurface}}>Coming soon...</Text>
                                <View style={{flex: .1}}/>
                            </View>

                            : <View style={{flex: 1}}>
                                <TouchableOpacity onPress={() => setSearching(true)} activeOpacity={.9} style={{paddingVertical: SIZES.sm, backgroundColor: COLORS.surface1, alignItems: 'center', paddingHorizontal: SIZES.md, marginHorizontal: SIZES.md, flexDirection: 'row', borderRadius: SIZES.xs, overflow: 'hidden'}}>
                                    <Feather name="search" size={20} color={COLORS.onSecondaryContainer}/>
                                    <Text style={{...TYPOGRAPHY.h2, marginStart: SIZES.md, color: COLORS.onSecondaryContainer}}>Search</Text>
                                </TouchableOpacity>

                                <FlatList
                                    key={'posts'}
                                    style={{ padding: SIZES.sm }}
                                    data={posts}
                                    renderItem={({ item, index }) => <Post 
                                        item={item} 
                                        index={index} 
                                        setCurrentIndex={setCurrentIndex} 
                                        setShowImageDialog={setShowImageDialog} 
                                        navigation={navigation}
                                    />}
                                    numColumns={3}
                                    keyExtractor={(item, index) => `${index}`}
                                />
                            </View>
                        }

                    </View>
                }                
            </View>
        </SafeAreaView>
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