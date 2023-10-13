import {
    StyleSheet, SafeAreaView, Text, View,
    TouchableOpacity, FlatList, Image, ScrollView, KeyboardAvoidingView, Platform, StatusBar
} from 'react-native'
import { COLORS, SIZES, TYPOGRAPHY } from '../../../../assets/theme'
import React, { useEffect, useState } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { Avatar, TextInput } from 'react-native-paper';
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons'
import HomeHeader from '../home/HomeHeader';
import { useNavigation } from '@react-navigation/native';
import { PostCard } from './PostCard';
import PostDetailedCard from './PostDetailedCard';
import { auth, firestore } from '../../../../firebase';
import { Comment, defaultComment } from '../../../data/model/Comment';
import { Timestamp, addDoc, collection, doc, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { defaultUser } from '../../../data/model/User';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import PostComment from './PostComment';

const PostDetailedScreen = ({ route }) => {

    const post = route.params.item
    const navigation = useNavigation()
    const user = auth.currentUser

    const userRef = doc(firestore, "users", user.uid)
    const [snapshot, loading, error] = useDocument(userRef)

    const [values, setValues] = useState({
        ...defaultUser,
        comment: "",
        tag: { ...defaultUser },
        loading: false,
        message: "",
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

    const commentsRef = collection(firestore, "comments")
    const q = query(commentsRef, where("postId", "==", post.id), orderBy("postId"), orderBy("date", "desc"))
    const [commentsSnapshot, commentsLoading, commentsError] = useCollection(q)
    const [comments, setComments] = useState([])

    useEffect(() => {
        if (commentsSnapshot) {
            setComments(commentsSnapshot.docs)
        }
    }, [commentsSnapshot])

    async function addComment() {
        setValues({ ...values, loading: true })
        const data: Comment = {
            ...defaultComment,
            user: {
                ...defaultUser,
                ...values,
            },
            postId: post.id,
            comment: values.comment,
            date: Timestamp.now().toMillis(),
        }
        const docRef = addDoc(collection(firestore, "comments"), data)
        await docRef.then((snapshot) => {
            updateDoc(snapshot, { id: snapshot.id })
            setValues({ ...values, loading: false, comment: "" })
            // navigation.goBack()
        })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                setValues({ ...values, message: "An error occurred. Please try again.", loading: false })
                console.log(errorCode, errorMessage)
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={{ flex: 1 }}
                data={comments}
                renderItem={({ item }) => <PostComment item={item.data()} navigation={navigation} key={item.id} />}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={() =>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: SIZES.md }}>
                            <TouchableOpacity activeOpacity={.9} onPress={() => navigation.goBack()}>
                                <Ionicons name='chevron-back' size={SIZES.xl} color={COLORS.onSurface} />
                            </TouchableOpacity>
                            <Text style={{ ...TYPOGRAPHY.h1, flex: 1, textAlign: 'center', marginEnd: SIZES.xl, color: COLORS.onSurface }}>Post</Text>
                        </View>
                        <PostDetailedCard item={post} navigation={navigation} userInfo={values} />
                        <View style={{ height: 1, width: '100%', backgroundColor: COLORS.white, opacity: .1 }} />
                    </View>
                }
            />

            <View style={{ paddingHorizontal: SIZES.xs, position: 'absolute', bottom: Platform.OS === 'ios' ? SIZES.sm : SIZES.xxs / 2, width: '100%' }}>
                <TextInput
                    mode="outlined"
                    placeholder='Add a Comment'
                    value={values.comment}
                    onChangeText={(text) => {
                        setValues({
                            ...values,
                            comment: text
                        })
                    }}
                    theme={{ roundness: 55 }}
                    style={styles.inputField}
                    outlineColor={COLORS.secondaryContainer}
                    underlineColor={COLORS.onSecondaryContainer}
                    activeOutlineColor={COLORS.secondaryContainer}
                    placeholderTextColor={COLORS.onSecondaryContainer}
                    textColor={COLORS.onSecondaryContainer}
                />
                <TouchableOpacity
                    activeOpacity={.6}
                    style={{ opacity: values.comment.length > 0 ? 1 : .5 }}
                    disabled={values.comment.length < 1}
                    onPress={() => values.comment.length > 0 ? addComment() : {}}
                >
                    <Text style={{
                        ...TYPOGRAPHY.h2,
                        color: COLORS.primary,
                        position: "absolute",
                        right: SIZES.md,
                        // bottom: -40,
                        bottom: 15,
                        fontSize: SIZES.md
                    }}>Post</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default PostDetailedScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.surface,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    inputField: {
        backgroundColor: COLORS.secondaryContainer,
        color: COLORS.black,
        borderColor: 'red'
        // borderRadius: 55,
        // width: "100%",
        // backgroundColor: COLORS.onSurface
        // paddingHorizontal: 20
    }
})