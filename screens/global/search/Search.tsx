import { FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { View } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../assets/theme";
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { Avatar, TextInput } from "react-native-paper";
import VerifiedIcon from "../../../components/VerifiedIcon";
import { useEffect, useState } from "react";
import { followerCount } from "../../../util/Utils";
import { Post } from "./Components/Post";
import { accounts, data } from "../../../components/data";
import { ImageDialog } from "./Components/ImageDialog";

export default function SearchScreen() {

    const navigation = useNavigation()
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredAccounts, setFilteredAccounts] = useState(accounts)
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
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flex: .2}}/>
                    <Text style={{...TYPOGRAPHY.h1, alignSelf: 'center', color: COLORS.onSurface}}>Search</Text>
                    <TouchableOpacity activeOpacity={.8} style={{flex: .2, alignItems: 'center'}}>
                        <MaterialCommunityIcons name={'calendar-edit'} color={COLORS.surface} size={SIZES.xl} />
                    </TouchableOpacity>
                </View>
                {
                    !posts || data.length === 0 ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: SIZES.md, marginTop: 0}}>
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
                            style={{ padding: SIZES.sm }}
                            data={posts}
                            renderItem={({ item, index }) => <Post 
                                item={item} 
                                index={index} 
                                setCurrentIndex={setCurrentIndex} 
                                setShowImageDialog={setShowImageDialog} 
                                navigation={navigation}
                            />}
                            //Setting the number of column
                            numColumns={3}
                            keyExtractor={(item, index) => `${index}`}
                        />
                        {/* <FlatList
                            data={filteredAccounts}
                            renderItem={({ item }) => <Account account={item} navigation={navigation} />}
                            keyExtractor={(item) => item.id}
                            alwaysBounceVertical={true}
                        /> */}
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