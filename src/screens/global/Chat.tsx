import "expo-dev-client";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, TouchableOpacity, View, Text, StyleSheet, Platform, StatusBar, Image } from "react-native";
import { MaterialIcons, Ionicons, AntDesign, Feather } from '@expo/vector-icons'
import { COLORS, SIZES, TYPOGRAPHY } from "../../../assets/theme";
import { useEffect, useState } from "react";
import VerifiedIcon from "../../components/VerifiedIcon";
import { Avatar, TextInput } from 'react-native-paper';
import { SplashIcon } from "../../../assets/svg/SplashIcon";
import AgoraUIKit from 'agora-rn-uikit';
import { auth, firestore } from "../../../firebase";
import { Timestamp, addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { defaultUser } from "../../data/model/User";
import { defaultChat, Chat } from "../../data/model/Chat";
import { FlatList } from "react-native-gesture-handler";

export default function ChatScreen({ route }) {

    const navigation = useNavigation()
    const user = auth.currentUser

    const [values, setValues] = useState({
        userInfo: {
            ...defaultUser,
            ...route.params.userInfo
        },
        chatId: "x",
        messages: [],
        message: "",
        snackMessage: "",
        loading: false,
        showSnackBar: false,
    })

    const userRef = doc(firestore, "users", values.userInfo.uid)
    const [snapshot, loading, error] = useDocument(userRef)

    const chatRef = collection(firestore, `chats/${values.userInfo.uid}_${user.uid}/messages`)
    const [chatSnapshot, chatLoading, chatError] = useCollection(chatRef)

    const chatRef2 = collection(firestore, `chats/${user.uid}_${values.userInfo.uid}/messages`)
    const [chatSnapshot2, chatLoading2, chatError2] = useCollection(chatRef2)

    const mainChatRef = collection(firestore, `chats/${values.chatId}/messages`)
    const [mainChatSnapshot, mainChatLoading, mainChatError] = useCollection(mainChatRef)

    useEffect(() => {
        if (mainChatSnapshot) {
            const data = mainChatSnapshot.docs
            setValues({
                ...values,
                messages: data
            })
        }
    }, [mainChatSnapshot])

    useEffect(() => {
        if (chatSnapshot && chatSnapshot.docs.length > 0) {
            setValues({
                ...values,
                chatId: `${values.userInfo.uid}_${user.uid}`
            })
        } else {
            setValues({
                ...values,
                chatId: `${user.uid}_${values.userInfo.uid}`
            })
        }
    }, [chatSnapshot])

    useEffect(() => {
        if (snapshot && snapshot.exists()) {
            setValues({
                ...values,
                userInfo: {
                    ...snapshot.data()
                }
            })
        }
    }, [snapshot])

    useEffect(() => setValues({ ...values, showSnackBar: values.snackMessage !== "" }), [values.snackMessage])
    useEffect(() => {
        if (error && error.message !== "") {
            setValues({ ...values, showSnackBar: true, snackMessage: error.message })
        }
    }, [error])

    async function sendMessage() {
        const data: Chat = {
            ...defaultChat,
            senderId: user.uid,
            message: values.message,
            date: Timestamp.now().toMillis(),
        }

        const docRef = addDoc(mainChatRef, data)
        await docRef.then((snapshot) => {
            setValues({ ...values, message: "" })
            updateDoc(snapshot, { id: snapshot.id })
        })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                setValues({ ...values, message: "An error occurred. Please try again.", loading: false })
                console.log(errorCode, errorMessage)
            })
    }

    const [videoCall, setVideoCall] = useState(false);
    const connectionData = {
        appId: '8bc017f304734bc0bb5178fd629e2bd7',
        channel: 'test',
        token: '007eJxTYNgilLl50jH9d6X8zziupqwSWfh6sjKfW6vE1RWSigvlj3IqMFgkJRsYmqcZG5iYG5sA2UlJpobmFmkpZkaWqUZJKeaqOTapDYGMDJLxkiyMDBAI4rMwlKQWlzAwAAC6/Bxp',
    };

    const callbacks = {
        EndCall: () => setVideoCall(false),
    };

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <Ionicons name="chevron-back" size={SIZES.xl} color={COLORS.onSurface} />
                        </TouchableOpacity>
                        {/* <View style={{ width: SIZES.sm }} /> */}
                        {/* <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <View style={{ marginEnd: SIZES.sm, overflow: 'hidden', width: 43, height: 43, borderRadius: 43 / 2, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' }}>
                                {userInfo.photo ?
                                    <Avatar.Image size={40} source={{ uri: userInfo.photo }} />
                                    : <SplashIcon />
                                }
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ ...TYPOGRAPHY.h2 }} numberOfLines={1}>{userInfo.name}</Text>
                                    {userInfo.verified && <VerifiedIcon />}
                                </View>
                                <Text style={{ ...TYPOGRAPHY.h2, fontSize: SIZES.xs, color: COLORS.onSurface, opacity: .8 }}>Active now</Text>
                            </View>
                        </TouchableOpacity> */}
                    </View>
                )
            },
            // headerTransparent: true,
            // headerTItle: () => {
            //     return (
            //         <View style={{flex: 1, backgroundColor: 'purple'}}>
            //             <Text>Samson Achiaga</Text>
            //         </View>
            //     )
            // },
            headerRight: () => {
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => { }} activeOpacity={.7} style={{ marginEnd: SIZES.md }}>
                            <Feather name='phone' size={SIZES.xl} color={COLORS.onSurface} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: 'green' }} onPress={() => console.log("Video: Clicked")} activeOpacity={.7}>
                            <Feather name='video' size={SIZES.xl} color={COLORS.onSurface} />
                        </TouchableOpacity>
                    </View>
                )
            }
        })
    }, [])

    return (
        videoCall ? <AgoraUIKit connectionData={connectionData} rtcCallbacks={callbacks} /> :
            <SafeAreaView style={styles.container}>

                <View style={{ flexDirection: 'row', marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, alignItems: 'center', marginEnd: SIZES.sm }}>
                    <TouchableOpacity style={{ padding: SIZES.xxs }} onPress={() => { navigation.goBack() }}>
                        <Ionicons name="chevron-back" size={SIZES.xl} color={COLORS.onSurface} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("UserDetailScreen", { userInfo: values.userInfo })} style={{ flex: 1, marginStart: SIZES.sm, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <View style={{ marginEnd: SIZES.sm, overflow: 'hidden', width: 43, height: 43, borderRadius: 43 / 2, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' }}>
                            {values.userInfo.photo ?
                                <Avatar.Image size={40} source={{ uri: values.userInfo.photo }} />
                                : <SplashIcon />
                            }
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ ...TYPOGRAPHY.h2 }} numberOfLines={1}>{values.userInfo.name}</Text>
                                {values.userInfo.verified && <VerifiedIcon />}
                            </View>
                            <Text style={{ ...TYPOGRAPHY.h2, fontSize: SIZES.xs, color: COLORS.onSurface, opacity: .8 }}>Active now</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableOpacity onPress={() => { }} activeOpacity={.7} style={{ padding: SIZES.xxs }}>
                            <Feather name='phone' size={SIZES.xl} color={COLORS.onSurface} />
                        </TouchableOpacity>
                        <TouchableOpacity onPressIn={() => setVideoCall(true)} style={{ padding: SIZES.xxs }} onPress={() => { }} activeOpacity={.7}>
                            <Feather name='video' size={SIZES.xl} color={COLORS.onSurface} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ height: 1, backgroundColor: COLORS.white, opacity: .2, marginTop: SIZES.xxs }} />

                <View style={{ flex: 1}}>

                    <FlatList
                        // style={{ zIndex: 2 }}
                        data={values.messages}
                        // ListHeaderComponent={() => <HomeHeader titleText={"EduGramm"} navigation={navigation} userInfo={values} />}
                        renderItem={({ item }) => <Text style={{...TYPOGRAPHY.h2, color: 'white', marginTop: SIZES.md}}>{item.data().message}</Text>}
                        keyExtractor={(item) => item.id}
                        alwaysBounceVertical={values.messages.length > 0}
                    />

                    <View style={{
                        // flex: 1,
                        flexDirection: 'row',
                        // width: '100%',
                        alignSelf: 'stretch',
                        overflow: 'hidden',
                        backgroundColor: COLORS.secondaryContainer,
                        alignItems: 'flex-end',
                        marginHorizontal: SIZES.xs,
                        borderRadius: 25
                    }}>
                        <TextInput
                            mode="outlined"
                            placeholder='Message'
                            value={values.message}
                            onChangeText={(text) => {
                                setValues({ ...values, message: text })
                            }}
                            multiline
                            // numberOfLines={30}
                            style={styles.inputField}
                            outlineColor={COLORS.secondaryContainer}
                            underlineColor={COLORS.onSecondaryContainer}
                            activeOutlineColor={COLORS.secondaryContainer}
                            placeholderTextColor={COLORS.onSecondaryContainer}
                            textColor={COLORS.onSecondaryContainer}
                        />
                        <TouchableOpacity
                            activeOpacity={.6}
                            style={{ padding: SIZES.xxs + 4, position: 'absolute', right: 4, bottom: SIZES.xxs / 2, borderRadius: 100, alignItems: 'center', marginHorizontal: SIZES.xxs, backgroundColor: COLORS.onSecondary, opacity: values.message.length > 0 ? 1 : .5, marginBottom: SIZES.xxs }}
                            disabled={values.message.length < 1}
                            onPress={() => values.message.length > 0 ? sendMessage() : {}}
                        >
                            <Feather name='send' size={SIZES.md} color={COLORS.onSurface} />
                            {/* <Text style={{
                        ...TYPOGRAPHY.h2,
                        color: COLORS.primary,
                        // position: "absolute",
                        right: SIZES.md,
                        // bottom: -40,
                        // bottom: 15,
                        fontSize: SIZES.md
                    }}>Send</Text> */}
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.surface,
        // marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    inputField: {
        backgroundColor: COLORS.secondaryContainer,
        color: COLORS.black,
        paddingEnd: 40,
        flex: 1,
        paddingTop: 4,
        paddingVertical: 4
    }
})