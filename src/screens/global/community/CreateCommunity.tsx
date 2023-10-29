import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet, ScrollView, Image, ImageBackground, useWindowDimensions } from "react-native";
import { COLORS, LINE, SIZES, TYPOGRAPHY } from "../../../../assets/theme";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Avatar, Snackbar, TextInput } from "react-native-paper";
import { auth, firestore, storage } from '../../../../firebase';
import { DocumentReference, addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { Loader } from "../../../components/Loader";
import * as ImagePicker from 'expo-image-picker';
import { ref, getDownloadURL, StorageReference } from 'firebase/storage';
import { useUploadFile } from 'react-firebase-hooks/storage';
import * as FileSystem from 'expo-file-system';
import { Community, defaultCommunity } from "../../../data/model/Community";
import CommunityPlaceHolder from "../../../../assets/svg/CommunityPlaceHolder";
import { colors } from "../../../util/Utils";
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function CreateCommunityScreen() {

    const navigation = useNavigation()
    const { height } = useWindowDimensions()
    const user = auth.currentUser

    const [values, setValues] = useState({
        ...defaultCommunity,
        color: colors[Math.floor(Math.random() * colors.length)],
        message: "",
        loading: false,
        showSnackBar: false,
    })

    const [uploadFile, uploading, imageSnapshot, imageError] = useUploadFile()
    // const communityImageRef = ref(storage, 'communityImages/' + values.id + '/communityImage.jpg')

    useEffect(() => setValues({ ...values, showSnackBar: values.message !== "" }), [values.message])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        console.log("Result: ", result);

        if (!result.canceled) {
            setValues({ ...values, image: result.assets[0].uri });
        }
    };

    async function createCommunity() {
        setValues({ ...values, loading: true })
        const data: Community = {
            id: null,
            name: values.name,
            color: values.color,
            description: values.description,
            restricted: values.restricted,
            image: null,
            members: [user.uid],
            moderators: [user.uid]
        }
        const docRef = addDoc(collection(firestore, "communities"), data)
        await docRef.then((snapshot) => {
            setValues({ ...values, id: snapshot.id, loading: false })
            values.image ? uploadImage(snapshot) : updateDoc(snapshot, { id: snapshot.id })
            navigation.goBack()
        })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorCode, errorMessage)
                setValues({ ...values, message: "An error occurred. Please try again.", loading: false })
            })
    }

    async function uploadImage(snapshot: DocumentReference) {
        console.log("Upload Image: ", values.image)
        try {
            const { uri } = await FileSystem.getInfoAsync(values.image);
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
            const communityImageRef = ref(storage, 'communityImages/' + snapshot.id + '/communityImage.jpg')
            await uploadFile(communityImageRef, blob, { contentType: 'image/jpeg' })
                .then(() => getUrl(snapshot, communityImageRef)).catch((error) => {
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

    async function getUrl(snapshot: DocumentReference, communityImageRef: StorageReference) {
        await getDownloadURL(communityImageRef)
            .then((url) => {
                updateDoc(snapshot, { id: snapshot.id, image: url })
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorCode, errorMessage)
                setValues({ ...values, message: "An error occurred. Please try again.", loading: false })
            });
    }

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                return (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={TYPOGRAPHY.h2}>Cancel</Text>
                    </TouchableOpacity>
                )
            }
        })
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <TouchableOpacity
                        onPress={createCommunity}
                        disabled={values.name.length < 1}
                        style={{ opacity: values.name.length > 0 ? 1 : .5 }}
                    >
                        <Text style={{ ...TYPOGRAPHY.h2, color: COLORS.primary }}>Create</Text>
                    </TouchableOpacity>
                )
            },
        })
    }, [values])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.surface }}>

            <Loader showLoader={values.loading || uploading} />

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1 }}>

                    <TouchableOpacity style={{ width: '100%', backgroundColor: values.color, paddingTop: SIZES.xxs / 2 }} onPress={pickImage} activeOpacity={.6}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {
                                values.image ? <ImageBackground source={{ uri: values.image }} resizeMode='cover' style={{ width: '100%', height: height * .23 }} /> : <CommunityPlaceHolder />
                            }
                        </View>
                        <View style={{ position: 'absolute', width: '100%', marginTop: SIZES.sm, alignItems: 'center', bottom: 0, padding: SIZES.sm, backgroundColor: values.color + '80' }}>
                            <Text style={{ ...TYPOGRAPHY.h2, color: COLORS.white, }}>Click to change</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ width: '100%', height: 1, backgroundColor: COLORS.onSurface, opacity: .1 }} />

                    <Text style={{ ...TYPOGRAPHY.p, color: COLORS.onSurface, marginHorizontal: SIZES.md, marginTop: SIZES.md }}>
                        Tell us a little about your community. You can always change these details later.
                    </Text>

                    <Text style={{ ...TYPOGRAPHY.h2, color: COLORS.onSurface, marginHorizontal: SIZES.md, marginTop: SIZES.xl }}>
                        Community name
                    </Text>

                    <TextInput
                        value={values.name}
                        placeholder='Enter community name'
                        onChangeText={(text) => setValues({ ...values, name: text })}
                        style={styles.inputField}
                        selectionColor={values.color}
                        contentStyle={{ margin: 0, padding: 0 }}
                        underlineColor={COLORS.onSurface}
                        activeUnderlineColor={values.color}
                        placeholderTextColor={COLORS.darkGray}
                        textColor={values.color}
                    />

                    <Text style={{ ...TYPOGRAPHY.p, color: COLORS.onSurface, marginHorizontal: SIZES.md, marginTop: SIZES.xxs }}>
                        Names must be between 3 and 30 characters and can't include hashtags or @usernames
                    </Text>

                    <Text style={{ ...TYPOGRAPHY.h2, color: COLORS.onSurface, marginHorizontal: SIZES.md, marginTop: SIZES.xl }}>
                        Community purpose (optional)
                    </Text>

                    <TextInput
                        value={values.description}
                        placeholder='Enter community purpose'
                        onChangeText={(text) => setValues({ ...values, description: text })}
                        style={styles.inputField}
                        selectionColor={values.color}
                        multiline
                        contentStyle={{ margin: 0, padding: 0 }}
                        underlineColor={COLORS.onSurface}
                        activeUnderlineColor={values.color}
                        placeholderTextColor={COLORS.darkGray}
                        textColor={values.color}
                    />

                    <Text style={{ ...TYPOGRAPHY.p, color: COLORS.onSurface, marginHorizontal: SIZES.md, marginTop: SIZES.xxs }}>
                        A strong purpose describes your Community and lets people know what to expect
                    </Text>

                    <View style={{ flexDirection: 'row', marginTop: SIZES.xl - SIZES.xxs, marginHorizontal: SIZES.md, justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ ...TYPOGRAPHY.h2, color: COLORS.onSurface, }}>
                            Membership type
                        </Text>

                        <TouchableOpacity onPress={() => setValues({ ...values, message: "Membership type can't be changed yet" })} style={{ flexDirection: 'row', padding: SIZES.xxs, alignItems: 'center' }}>
                            <Text style={{ ...TYPOGRAPHY.h2, color: values.color, marginEnd: SIZES.xxs }}>
                                {
                                    values.restricted ? 'Restricted' : 'Public'
                                }
                            </Text>
                            <MaterialCommunityIcons name={'chevron-right'} color={values.color} size={SIZES.sm} />
                        </TouchableOpacity>
                    </View>

                    <Text style={{ ...TYPOGRAPHY.p, color: COLORS.onSurface, marginHorizontal: SIZES.md }}>
                        Control who can join your Community. Keep in mind all Communities are visible to everyone on EduGramm.
                    </Text>
                </View>
            </ScrollView>

            <Snackbar
                visible={values.showSnackBar}
                onDismiss={() => setValues({ ...values, message: "" })}
                theme={{ colors: { primary: COLORS.primary } }}
                action={{
                    textColor: values.color,
                    label: 'OK',
                    onPress: () => { },
                }}>
                <Text style={{ ...TYPOGRAPHY.p, color: COLORS.white }}>{values.message}</Text>
            </Snackbar>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    inputField: {
        ...TYPOGRAPHY.p,
        // flex: .4,
        padding: 0,
        margin: 0,
        backgroundColor: COLORS.surface,
        color: COLORS.onSurface,
    }
})