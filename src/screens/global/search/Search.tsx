import { FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { View } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../../assets/theme";
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { Avatar, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { Post } from "./Components/Post";
import { ImageDialog } from "./Components/ImageDialog";
import { Account } from "./Components/Account";
import { collection, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../../../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";

export default function SearchScreen() {

    const navigation = useNavigation()

    const [values, setValues] = useState({
        searchQuery: "",
        accounts: [],
        filteredAccounts: [],
        searching: false,
        posts: [],
        showImageDialog: false,
        currentIndex: 0,
        message: "",
        loading: false,
        showSnackBar: false,
    })

    const reference = collection(firestore, "users")
    const q = query(reference, where("name", "==", values.searchQuery))
    const [snapshot, loading, error] = useCollection(reference)

    const postsRef = collection(firestore, "posts")
    const postsQ = query(postsRef, where("communityId", "==", ""), orderBy("date", "desc"))
    const [postsSnapshot, postsLoading, postsError] = useCollection(postsQ)

    useEffect(() => {
        if (snapshot) {
            setValues({ ...values, accounts: snapshot.docs })
        }
    }, [snapshot])

    useEffect(() => {
        if (postsSnapshot) {
            setValues({
                ...values,
                posts: postsSnapshot.docs.filter((snap) => {
                    return (snap.data().images.length > 0)
                })
            })
        }
    }, [postsSnapshot])

    useEffect(() => {
        setValues({
            ...values,
            filteredAccounts: values.accounts ?
                values.accounts.filter((item) => {
                    return (item.data().name.toLowerCase().includes(values.searchQuery.toLowerCase()))
                }) : []
        })
    }, [values.searchQuery])

    useEffect(() => setValues({ ...values, showSnackBar: values.message !== "" }), [values.message])
    useEffect(() => {
        if (error && error.message !== "") {
            setValues({ ...values, showSnackBar: true, message: error.message ?? postsError.message })
        }
    }, [error, postsError])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.surface }}>

            {
                values.posts.length > 0 && <ImageDialog
                    showImageDialog={values.showImageDialog}
                    setShowImageDialog={(value) => setValues({ ...values, showImageDialog: value })}
                    image={values.posts[values.currentIndex].data().images[0]}
                />
            }
            <View style={{ flex: 1 }}>
                {
                    values.searching ? <View style={{ flex: 1 }}>
                        <View>
                            <View style={{ flexDirection: 'row', backgroundColor: COLORS.surface1, alignItems: 'center', paddingHorizontal: SIZES.md, marginHorizontal: SIZES.md, borderRadius: SIZES.xs, overflow: 'hidden' }}>
                                <Feather name="search" size={20} color={COLORS.onSecondaryContainer} style={{ flex: .1 }} />
                                <View style={{ flex: .7 }}>
                                    <TextInput
                                        value={values.searchQuery}
                                        onChangeText={(text) => setValues({ ...values, searchQuery: text })}
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
                                <TouchableOpacity onPress={() => setValues({ ...values, searching: false })} activeOpacity={.9} style={{ flex: .2, paddingVertical: SIZES.sm, alignItems: 'center' }}>
                                    <Text style={{ ...TYPOGRAPHY.h3, color: COLORS.onSecondaryContainer }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>

                            <FlatList
                                key={'search'}
                                data={values.filteredAccounts}
                                renderItem={({ item }) => <Account accountInfo={item.data()} navigation={navigation} />}
                                keyExtractor={(item) => item.data().uid}
                                alwaysBounceVertical={true}
                            />
                        </View>
                    </View>
                        : <View style={{ flex: 1 }}>
                            {
                                !values.posts || values.posts.length === 0 ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: SIZES.md, marginTop: 0 }}>
                                    <Text style={{ ...TYPOGRAPHY.h3, color: COLORS.onSurface }}>Coming soon...</Text>
                                    <View style={{ flex: .1 }} />
                                </View>
                                    : <View style={{ flex: 1 }}>
                                        <TouchableOpacity onPress={() => setValues({ ...values, searching: true })} activeOpacity={.9} style={{ paddingVertical: SIZES.sm, backgroundColor: COLORS.surface1, alignItems: 'center', paddingHorizontal: SIZES.md, marginHorizontal: SIZES.md, flexDirection: 'row', borderRadius: SIZES.xs, overflow: 'hidden' }}>
                                            <Feather name="search" size={20} color={COLORS.onSecondaryContainer} />
                                            <Text style={{ ...TYPOGRAPHY.h3, marginStart: SIZES.md, color: COLORS.onSecondaryContainer }}>Search</Text>
                                        </TouchableOpacity>

                                        <FlatList
                                            key={'posts'}
                                            style={{ padding: SIZES.sm }}
                                            data={values.posts}
                                            renderItem={({ item, index }) => <Post
                                                item={item.data()}
                                                index={index}
                                                setCurrentIndex={(i) => setValues({ ...values, currentIndex: i })}
                                                setShowImageDialog={(value) => setValues({ ...values, showImageDialog: value })}
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