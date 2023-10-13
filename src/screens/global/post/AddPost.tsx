import { SafeAreaView, TouchableOpacity, View, Text, StyleSheet, Image, FlatList, useWindowDimensions, ScrollView, Platform, StatusBar } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../../assets/theme";
import { useNavigation } from "@react-navigation/native";
import { Avatar, TextInput } from "react-native-paper";
import { useState } from "react";
import { Feather, Ionicons } from '@expo/vector-icons'
import { SplashIcon } from "../../../../assets/svg/SplashIcon";
import { auth, firestore } from "../../../../firebase";
import { Timestamp, addDoc, collection, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { User as FirebaseUser } from 'firebase/auth';
import { Post, defaultPost } from "../../../data/model/Post";
import { Loader } from "../../../components/Loader";
import VerifiedIcon from "../../../components/VerifiedIcon";

export default function AddPostScreen({ route }) {

    const navigation = useNavigation()
    const { width } = useWindowDimensions()
    const user = auth.currentUser
    const userInfo = route.params.userInfo
    console.log(userInfo)

    const [values, setValues] = useState({
        post: "",
        message: "",
        images: [],
        loading: false,
        showSnackBar: false,
        success: false,
    })

    const [errors, setErrors] = useState({
        name: false,
        email: false,
        password: false,
    })

    async function uploadPost() {
        setValues({...values, loading: true})
        const data: Post  = {
            ...defaultPost,
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
            setValues({...values, loading: false})
            navigation.goBack()
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            setValues({...values, message: "An error occurred. Please try again.", loading: false})
            console.log(errorCode, errorMessage)
        })
    }

    return (
        <SafeAreaView style={styles.container}>

            <Loader showLoader={values.loading} />
            
            <View style={{flex: 1, paddingHorizontal: SIZES.md}}>
                
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity activeOpacity={.6} onPress={() => navigation.goBack()} style={{paddingVertical: SIZES.xxs}}>
                        <Text style={{...TYPOGRAPHY.h2}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        activeOpacity={.6} 
                        style={{opacity: values.post.length > 0 || values.images.length > 0 ? 1 : .5}} 
                        disabled={values.post.length < 1 && values.images.length < 1} 
                        onPress={() => values.post.length > 0 || values.images.length > 0 ? uploadPost() : {}}
                    >
                        <View style={{borderRadius: 50, paddingHorizontal: SIZES.md, paddingVertical: SIZES.xxs, backgroundColor: COLORS.primary}}>
                            <Text style={{...TYPOGRAPHY.h2, color: COLORS.onPrimary}}>Post</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
                <View style={{flexDirection: 'row', flex: .8, marginTop: SIZES.sm}}>
                    <View style={{overflow: 'hidden', width: 43, height: 43, borderRadius: 43 / 2, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center'}}>
                        { user.photoURL ? 
                            <Avatar.Image size={80} source={{ uri: user.photoURL }} />
                            : <SplashIcon />
                        }
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{...TYPOGRAPHY.h2, marginStart: SIZES.sm}}>Samson Achiaga</Text>
                            { userInfo.verified && <VerifiedIcon /> }
                        </View>
                        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
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
                                contentStyle={{margin: 0, padding: 0}}
                                outlineColor={'transparent'}
                                activeOutlineColor={'transparent'}
                                placeholderTextColor={COLORS.darkGray}
                                textColor={COLORS.onSurface}
                            />
                            <FlatList
                                data={values.images}
                                style={{flex: 1}}
                                horizontal
                                renderItem={({ item, index }) => 
                                    <View style={{ width: width * .7, height: width * .8, marginTop: SIZES.xs, marginEnd: SIZES.xs}}>
                                        <Image source={{ uri: item }} style={{ width: width * .7, height: width * .8, borderRadius: SIZES.sm}} />
                                        <TouchableOpacity 
                                            activeOpacity={.6} 
                                            style={{
                                                backgroundColor: COLORS.black,
                                                width: 35, height: 35, 
                                                position: 'absolute', 
                                                right: SIZES.xs, 
                                                top: SIZES.xs, 
                                                justifyContent: 'center', 
                                                alignItems: 'center', 
                                                borderRadius: 50
                                            }}
                                            onPress={() => {
                                                const newImages = values.images.filter((value, i) => {
                                                    index !== i
                                                })
                                                // values.images.forEach((value, i) => {
                                                //     if (index !== i)
                                                //     newImages.push(value)
                                                // })
                                                setValues({...values, images: newImages})
                                            }}
                                        >
                                            <Ionicons size={SIZES.lg} name='close' color={COLORS.white}/>
                                        </TouchableOpacity>
                                    </View>
                                }
                                keyExtractor={(index) => index}
                                alwaysBounceVertical={false}
                                showsHorizontalScrollIndicator={false}
                            />
                        </ScrollView>
                    </View>
                </View>

                <View style={{flex: .2, alignItems: 'center'}}>
                    <TouchableOpacity style={{width: 80, height: 80, borderWidth: 1, borderColor: COLORS.primary, borderRadius: SIZES.sm, justifyContent: 'center', alignItems: 'center'}}>
                        <Feather name="camera" size={30} color={COLORS.onSurface}/>
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