import {
    StyleSheet, Text, View,
    TouchableOpacity, Image, useWindowDimensions, FlatList
} from 'react-native'
import { COLORS, SIZES, TYPOGRAPHY } from '../../../../assets/theme'
import React, { useEffect, useState } from 'react';
import { Avatar } from 'react-native-paper';
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons'
import ImageDialog from '../../../components/ImageDialog';
import VerifiedIcon from '../../../components/VerifiedIcon';
import { auth, firestore } from '../../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { SplashIcon } from '../../../../assets/svg/SplashIcon';
import { formatDate } from '../../../util/Utils';

const PostDetailedCard = ({ item, navigation, userInfo }) => {

    const { width } = useWindowDimensions()
    const user = auth.currentUser

    const reference = doc(firestore, "posts", item.id)
    const [snapshot, loading, error] = useDocument(reference)
    const [post, setPost] = useState(item)

    const [showImageDialog, setShowImageDialog] = useState(false);
    const [liked, setLiked] = useState(post.likes.includes(user.uid))
    const [imageIndex, setImageIndex] = useState(0)

    useEffect(() => {
        if (snapshot && snapshot.exists()) {
            setPost(snapshot.data())
        }
    }, [snapshot])

    async function likePost(isLiked: boolean) {
        let likes = post.likes
        isLiked ? likes.push(user.uid) : likes = post.likes.filter((it: string) => { it !== user.uid })
        const postRef = doc(firestore, "posts", post.id)
        await updateDoc(postRef, { likes: [...likes] })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            })
    }

    return (
        <View style={{ flex: 1, width: width }}>

            <ImageDialog
                showImageDialog={showImageDialog}
                setShowImageDialog={setShowImageDialog}
                image={post.photoUrl}
                images={post.images}
                index={imageIndex}
            />

            <View style={{ paddingHorizontal: SIZES.md, paddingVertical: SIZES.xs }}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <TouchableOpacity activeOpacity={.9} style={{ height: 50 }} onPress={() => {
                        post.uid === user.uid ? navigation.navigate('ProfileScreen', { userInfo: userInfo }) : navigation.navigate('UserDetailScreen', { userInfo: { ...userInfo, name: post.name, uid: post.uid } })
                    }}>
                        <View style={{ overflow: 'hidden', width: 43, height: 43, borderRadius: 43 / 2, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' }}>
                            {/* { post.photoUrl ?  */}
                            {/* <Avatar.Image size={40} source={{ uri: post.photoUrl }} /> */}
                            <SplashIcon />
                            {/* } */}
                        </View>
                    </TouchableOpacity>

                    <View style={{ marginHorizontal: SIZES.xxs }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...TYPOGRAPHY.h2, color: COLORS.onSurface }}>{post.name}</Text>
                            {post.verified && <VerifiedIcon />}
                        </View>

                    </View>

                    <Text style={{ flex: 1, ...TYPOGRAPHY.h2, textAlign: 'right', color: COLORS.onSurface }}>{`${formatDate(post.date)}`}</Text>

                </View>

                <View style={{ flex: 1, marginTop: SIZES.sm }}>
                    <Text style={{ ...TYPOGRAPHY.p, color: COLORS.onSurface }}>{post.post}</Text>

                    {
                        post.images.length === 1 &&
                        <TouchableOpacity activeOpacity={.9} onPress={() => setShowImageDialog(true)} style={{ width: '100%', height: width * .8, marginTop: SIZES.xs }}>
                            <Image
                                source={{ uri: post.images[0] }}
                                style={{ width: '100%', height: width * .8, borderRadius: SIZES.sm }}
                            />
                        </TouchableOpacity>
                    }
                    {
                        post.images.length > 1 &&
                        <>
                            <FlatList
                                data={post.images}
                                horizontal
                                renderItem={({ item, index }) =>
                                    <TouchableOpacity
                                        activeOpacity={.9}
                                        onPress={() => {
                                            setImageIndex(index)
                                            setShowImageDialog(true)
                                        }}
                                        style={{ width: width * .7, height: width * .8, marginTop: SIZES.xs, marginEnd: SIZES.xs }}>
                                        <Image source={{ uri: item }} style={{ width: width * .7, height: width * .8, borderRadius: SIZES.sm }} />
                                    </TouchableOpacity>
                                }
                                keyExtractor={(index) => index}
                                alwaysBounceVertical={false}
                                showsHorizontalScrollIndicator={false}
                            />
                        </>
                    }

                    <View style={{ ...styles.bottomSection }}>
                        <View style={{ flexDirection: "row", flex: 0.4, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                setLiked(!liked)
                                likePost(!liked)
                            }}>
                                <AntDesign name={post.likes.includes(user.uid) ? 'heart' : 'hearto'} size={SIZES.md} color={liked ? COLORS.red : COLORS.onSurface} />
                            </TouchableOpacity>
                            <Text style={styles.commentSection}>{post.likes.length}</Text>
                            <TouchableOpacity onPress={() => { }}>
                                <Ionicons name='chatbubble-outline' size={SIZES.md} color={COLORS.onSurface} />
                            </TouchableOpacity>
                            <Text style={styles.commentSection}>{post.comments.length}</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* {item.feed_type === "video" &&
                (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate("FeedDetailed", { item })}
                        style={{ height: 150, backgroundColor: COLORS.lightGray }}>
                    </TouchableOpacity>
                )
            } */}
        </View>
    )
}

export default PostDetailedCard

const styles = StyleSheet.create({
    bottomSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: SIZES.sm
    },
    commentSection: {
        ...TYPOGRAPHY.h2,
        fontSize: SIZES.sm,
        marginStart: SIZES.xxs,
        marginEnd: SIZES.md,
        color: COLORS.onSurface
    },
    dateSection: {
        flex: 0.6,
        ...TYPOGRAPHY.h2,
        textAlign: "right",
        justifyContent: "flex-end",
        alignSelf: "center",
        color: "#6F6F6F"
    }
})