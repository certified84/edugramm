import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, TouchableOpacity, View, Text, StyleSheet, Platform, StatusBar, Image } from "react-native";
import { MaterialIcons, Ionicons, AntDesign, Feather } from '@expo/vector-icons'
import { COLORS, SIZES, TYPOGRAPHY } from "../../../assets/theme";
import { useEffect, useState } from "react";
import VerifiedIcon from "../../components/VerifiedIcon";
import { Avatar, TextInput } from 'react-native-paper';
import { SplashIcon } from "../../../assets/svg/SplashIcon";
import AgoraUIKit from 'agora-rn-uikit';

export default function ChatScreen({ route }) {
    // 8bc017f304734bc0bb5178fd629e2bd7
    const navigation = useNavigation()
    const userInfo = route.params.userInfo
    console.log(userInfo)
    const [message, setMessage] = useState("")

    async function sendMessage() {
        setMessage("")
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
                        <TouchableOpacity style={{backgroundColor: 'green'}} onPress={() => setVideoCall(true)} activeOpacity={.7}>
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
                <TouchableOpacity onPress={() => navigation.navigate("UserDetailScreen", { userInfo: userInfo })} style={{ flex: 1, marginStart: SIZES.sm, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <View style={{ marginEnd: SIZES.sm, overflow: 'hidden', width: 43, height: 43, borderRadius: 43 / 2, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' }}>
                        {userInfo.photo ?
                            <Avatar.Image size={40} source={{ uri: userInfo.photo }} />
                            : <SplashIcon />
                        }
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ ...TYPOGRAPHY.h2 }} numberOfLines={1}>{userInfo.name}</Text>
                            {userInfo.verified && <VerifiedIcon />}
                        </View>
                        <Text style={{ ...TYPOGRAPHY.h2, fontSize: SIZES.xs, color: COLORS.onSurface, opacity: .8 }}>Active now</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => { }} activeOpacity={.7} style={{ padding: SIZES.xxs }}>
                        <Feather name='phone' size={SIZES.xl} color={COLORS.onSurface} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: SIZES.xxs }} onPress={() => { }} activeOpacity={.7}>
                        <Feather name='video' size={SIZES.xl} color={COLORS.onSurface} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ height: 1, backgroundColor: COLORS.white, opacity: .2, marginTop: SIZES.xxs }} />

            <View style={{ flex: 1, justifyContent: 'flex-end' }}>

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
                        value={message}
                        onChangeText={(text) => {
                            setMessage(text)
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
                        style={{ padding: SIZES.xxs + 4, position: 'absolute', right: 4, bottom: SIZES.xxs / 2, borderRadius: 100, alignItems: 'center', marginHorizontal: SIZES.xxs, backgroundColor: COLORS.onSecondary, opacity: message.length > 0 ? 1 : .5, marginBottom: SIZES.xxs }}
                        disabled={message.length < 1}
                        onPress={() => message.length > 0 ? sendMessage() : {}}
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