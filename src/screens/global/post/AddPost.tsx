import { SafeAreaView, TouchableOpacity, View, Text, StyleSheet, Image, FlatList, useWindowDimensions, ScrollView, Platform, StatusBar, ImageBackground } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../../assets/theme";
import { useNavigation } from "@react-navigation/native";
import { Avatar, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { Feather, Ionicons } from '@expo/vector-icons'
import { SplashIcon } from "../../../../assets/svg/SplashIcon";
import { auth, firestore, storage } from "../../../../firebase";
import { Timestamp, addDoc, collection, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { User as FirebaseUser } from 'firebase/auth';
import { Post, defaultPost } from "../../../data/model/Post";
import { Loader } from "../../../components/Loader";
import VerifiedIcon from "../../../components/VerifiedIcon";
import { useDocument } from "react-firebase-hooks/firestore";
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import * as FileSystem from 'expo-file-system';

export default function AddPostScreen({ route }) {

    const navigation = useNavigation()
    const { width } = useWindowDimensions()
    const user = auth.currentUser
    const userInfo = route.params.userInfo
    const communityId = route.params.communityId ? route.params.communityId : ""

    const userRef = doc(firestore, "users", user.uid)
    const [snapshot, loading, error] = useDocument(userRef)

    const [uploadFile, uploading, imageSnapshot, imageError] = useUploadFile();
    const postImagesRef = ref(storage, 'postImages/' + Date.now() + '.jpg');

    const [values, setValues] = useState({
        post: "",
        message: "",
        images: [],
        loading: false,
        showSnackBar: false,
        success: false,
    })

    useEffect(() => {
        if (snapshot && snapshot.exists()) {
            setValues({
                ...values,
                ...snapshot.data()
            })
        }
    }, [snapshot])

    async function uploadPost() {
        setValues({ ...values, loading: true })
        const data = {
            ...defaultPost,
            communityId: communityId,
            post: values.post,
            date: Timestamp.now().toMillis(),
            uid: user.uid,
            name: user.displayName,
            photoUrl: user.photoURL,
            verified: userInfo.verified,
        }

        const docRef = addDoc(collection(firestore, "posts"), data)
        await docRef.then((snapshot) => {
            updateDoc(snapshot, { id: snapshot.id })
            if (values.images.length > 0) {
                uploadImage(values.images[0].uri, snapshot.id)
                // values.images.forEach((image) => {
                //     uploadImage(image.uri, snapshot.id)
                // })
            } else {
                setValues({ ...values, loading: false })
                navigation.goBack()
            }
        })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                setValues({ ...values, message: "An error occurred. Please try again.", loading: false })
                console.log(errorCode, errorMessage)
            })
    }

    const pickImages = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            // allowsMultipleSelection: true,
            quality: 1,
        })

        console.log("Result: ", result);

        if (!result.canceled) {
            // result.assets.forEach((asset) => {
            //     console.log("Filename: ", asset.fileName)
            // })
            setValues({ ...values, images: result.assets });
        }
    }

    async function uploadImage(imageUri: string, id: string) {
        try {
            const { uri } = await FileSystem.getInfoAsync(imageUri);
            const blob: Blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest()
                xhr.responseType = "blob";
                xhr.onload = function () { resolve(xhr.response) }
                xhr.onerror = function (e) {
                    console.log(e)
                    reject(new TypeError("Network request failed"))
                }
                xhr.open("GET", uri, true)
                xhr.send(null)
            });
            await uploadFile(postImagesRef, blob, { contentType: 'image/jpeg' })
                .then(() => getUrl(id)).catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                    console.log(errorCode, errorMessage)
                    setValues({ ...values, message: "An error occurred. Please try again.", loading: false })
                })
            // blob.close()
        } catch (e) {
            console.log(e)
            setValues({ ...values, message: "An error occurred. Please try again.", loading: false })
        }
    }

    async function getUrl(id: string) {
        await getDownloadURL(postImagesRef)
            .then((url) => {
                // setDownloadUrl(url)
                updatePost(url, id)
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorCode, errorMessage)
                setValues({ ...values, message: "An error occurred. Please try again.", loading: false })
            });
    }

    async function updatePost(url: string, id: string) {
        const postRef = doc(firestore, "posts", id)
        setValues({ ...values, loading: true })
        await updateDoc(postRef, { images: [url] }).then(() => {
            setValues({ ...values, loading: false })
            navigation.goBack()
        })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorCode, errorMessage)
                setValues({ ...values, message: "An error occurred. Please try again.", loading: false })
            })
    }

    return (
        <SafeAreaView style={styles.container}>

            <Loader showLoader={values.loading || loading || uploading} />

            <View style={{ flex: 1, paddingHorizontal: SIZES.md }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity activeOpacity={.6} onPress={() => navigation.goBack()} style={{ paddingVertical: SIZES.xxs }}>
                        <Text style={{ ...TYPOGRAPHY.h3 }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={.6}
                        style={{ opacity: values.post.length > 0 || values.images.length > 0 ? 1 : .5 }}
                        disabled={values.post.length < 1 && values.images.length < 1}
                        onPress={() => values.post.length > 0 || values.images.length > 0 ? uploadPost() : {}}
                    >
                        <View style={{ borderRadius: 50, paddingHorizontal: SIZES.md, paddingVertical: SIZES.xxs, backgroundColor: COLORS.primary }}>
                            <Text style={{ ...TYPOGRAPHY.h3, color: COLORS.onPrimary }}>Post</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', flex: .8, marginTop: SIZES.sm }}>
                    <View style={{ overflow: 'hidden', width: 43, height: 43, borderRadius: 43 / 2, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' }}>
                        {user.photoURL ?
                            <Avatar.Image size={80} source={{ uri: user.photoURL }} />
                            : <SplashIcon />
                        }
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...TYPOGRAPHY.h3, marginStart: SIZES.sm }}>{user.displayName}</Text>
                            {userInfo.verified && <VerifiedIcon />}
                        </View>
                        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                            <TextInput
                                value={values.post}
                                onChangeText={(text) => {
                                    setValues({
                                        ...values,
                                        post: text
                                    })
                                }}
                                mode="outlined"
                                placeholder='What knowledge are you sharing today?'
                                style={styles.inputField}
                                selectionColor={COLORS.onSurface}
                                multiline
                                contentStyle={{ margin: 0, padding: 0 }}
                                outlineColor={'transparent'}
                                activeOutlineColor={'transparent'}
                                placeholderTextColor={COLORS.darkGray}
                                textColor={COLORS.onSurface}
                            />
                            <FlatList
                                data={values.images}
                                style={{ flex: 1 }}
                                horizontal
                                renderItem={({ item, index }) =>
                                    <ImageBackground source={{ uri: item.uri }} style={{ borderRadius: SIZES.sm, overflow: 'hidden', width: width * .7, height: width * .8, marginTop: SIZES.xs, marginEnd: SIZES.xs }}>
                                        <TouchableOpacity
                                            activeOpacity={.6}
                                            style={{
                                                backgroundColor: COLORS.black + 80,
                                                width: 35, height: 35,
                                                position: 'absolute',
                                                right: SIZES.xs,
                                                top: SIZES.xs,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 50
                                            }}
                                            onPress={() => {
                                                setValues({ ...values, images: [] })
                                            }}
                                        >
                                            <Ionicons size={SIZES.lg} name='close' color={COLORS.white} />
                                        </TouchableOpacity>
                                    </ImageBackground>
                                }
                                keyExtractor={(index) => index}
                                alwaysBounceVertical={false}
                                showsHorizontalScrollIndicator={false}
                            />
                        </ScrollView>
                    </View>
                </View>

                <View style={{ flex: .2, alignItems: 'center' }}>
                    <TouchableOpacity onPress={pickImages} style={{ width: 80, height: 80, borderWidth: 1, borderColor: COLORS.primary, borderRadius: SIZES.sm, justifyContent: 'center', alignItems: 'center' }}>
                        <Feather name="camera" size={30} color={COLORS.onSurface} />
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
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    inputField: {
        ...TYPOGRAPHY.p,
        // flex: .4,
        padding: 0,
        margin: 0,
        backgroundColor: COLORS.surface,
        color: COLORS.onSurface,
    }
})