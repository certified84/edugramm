import {
    StyleSheet, Text, View,
    TouchableOpacity, Image, useWindowDimensions, FlatList
} from 'react-native'
import { COLORS, SIZES, TYPOGRAPHY } from '../../../assets/theme'
import React, { useState } from 'react';
import { Avatar } from 'react-native-paper';
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons'
import ImageDialog from '../../../components/ImageDialog';

const PostComment = ({ item }) => {

    const { width } = useWindowDimensions()
    const [liked, setLiked] = useState(false);
    const [showImageDialog, setShowImageDialog] = useState(false);

    return (
        <View style={{flex: 1, width: width}}>

            <ImageDialog
                index={0}
                showImageDialog={showImageDialog}
                setShowImageDialog={setShowImageDialog}
                image={item.image_url}
                images={item.images}
            />

            <View style={{flexDirection: 'row', paddingStart: SIZES.md, paddingEnd: SIZES.md, paddingVertical: SIZES.xs}}>
                <View>
                    <TouchableOpacity activeOpacity={.9} style={{height: 50}} onPress={() => {}} >
                        <Avatar.Image size={40} source={{ uri: item.user_photo }} />
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, marginStart: SIZES.xxs}}>
                    <View style={{flexWrap: 'wrap', flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ ...TYPOGRAPHY.h2, color: COLORS.onSurface }}>{item.full_name}</Text>
                        {
                            item.isVerified && <MaterialIcons
                                name='verified'
                                size={SIZES.sm}
                                color={"#0082CB"}
                                style={{ alignSelf: "center" }}
                            />
                        }
                        <Text style={{flex: 1, ...TYPOGRAPHY.h2, textAlign: 'right', color: COLORS.onSurface}}>{` \u2022 11h`}</Text>
                    </View>
                    <Text style={{ ...TYPOGRAPHY.p, color: COLORS.onSurface }} numberOfLines={8}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium    
                        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
                    </Text>
                    { 
                        item.images.length === 1 && 
                        <TouchableOpacity activeOpacity={.9} onPress={() => setShowImageDialog(true)} style={{ width: width * .7, height: width * .8, marginTop: SIZES.xs}}>
                            <Image 
                                source={{ uri: item.images[0] }} 
                                style={{ width: '100%', height: width * .8, borderRadius: SIZES.sm}} 
                            />
                        </TouchableOpacity>
                    }
                    { 
                        item.images.length > 1 && 
                        <>
                            <FlatList
                                data={item.images}
                                horizontal
                                renderItem={({ item }) => 
                                    <TouchableOpacity activeOpacity={.9} onPress={() => setShowImageDialog(true)} style={{ width: width * .7, height: width * .8, marginTop: SIZES.xs, marginEnd: SIZES.xs}}>
                                        <Image source={{ uri: item }} style={{ width: width * .7, height: width * .8, borderRadius: SIZES.sm}} />
                                    </TouchableOpacity>
                                }
                                keyExtractor={(index) => index}
                                alwaysBounceVertical={false}
                                showsHorizontalScrollIndicator={false}
                            />
                        </>
                    }

                    <View style={{...styles.bottomSection}}>
                        <View style={{ flexDirection: "row", flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { setLiked(!liked) }}>
                                <AntDesign name={liked ? 'heart' : 'hearto'} size={SIZES.xl} color={liked ? COLORS.red : COLORS.onSurface} />
                            </TouchableOpacity>
                            <Text style={styles.commentSection}>{item.likes.length}</Text>
                            <Ionicons name='chatbubble-outline' size={SIZES.xl} color={COLORS.onSurface} />
                            <Text style={styles.commentSection}>{item.comments.length}</Text>
                        </View>
                    </View>
                </View>
            </View>
            
            <PostSubComment item={item}/>

            <View style={{height: 1, width: '100%', backgroundColor: COLORS.lightGray}}/>
        </View>
    )
}

const PostSubComment = ({ item }) => {

    const { width } = useWindowDimensions()
    const [liked, setLiked] = useState(false);

    return (
        <View style={{flex: 1, width: width}}>

            <View style={{flexDirection: 'row', paddingStart: SIZES.md, paddingEnd: SIZES.md, paddingVertical: SIZES.xs}}>
                <View>
                    <TouchableOpacity activeOpacity={.9} style={{height: 50}} onPress={() => {}} >
                        <Avatar.Image size={40} source={{ uri: item.user_photo }} />
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, marginStart: SIZES.xxs}}>
                    <View style={{flexWrap: 'wrap', flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ ...TYPOGRAPHY.h2, color: COLORS.onSurface }}>{item.full_name}</Text>
                        {
                            item.isVerified && <MaterialIcons
                                name='verified'
                                size={SIZES.sm}
                                color={"#0082CB"}
                                style={{ alignSelf: "center" }}
                            />
                        }
                        <Text style={{flex: 1, ...TYPOGRAPHY.h2, textAlign: 'right', color: COLORS.onSurface}}>{` \u2022 11h`}</Text>
                    </View>
                    <Text style={{ ...TYPOGRAPHY.p, color: COLORS.onSurface }} numberOfLines={8}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium    
                        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
                    </Text>
                    { 
                        // item.images.length === 1 && 
                        // <TouchableOpacity activeOpacity={.9} onPress={() => setShowImageDialog(true)} style={{ width: width * .7, height: width * .8, marginTop: SIZES.xs}}>
                        //     <Image 
                        //         source={{ uri: item.images[0] }} 
                        //         style={{ width: '100%', height: width * .8, borderRadius: SIZES.sm}} 
                        //     />
                        // </TouchableOpacity>
                    }
                    { 
                        // item.images.length > 1 && 
                        // <>
                        //     <FlatList
                        //         data={item.images}
                        //         horizontal
                        //         renderItem={({ item }) => 
                        //             <TouchableOpacity activeOpacity={.9} onPress={() => setShowImageDialog(true)} style={{ width: width * .7, height: width * .8, marginTop: SIZES.xs, marginEnd: SIZES.xs}}>
                        //                 <Image source={{ uri: item }} style={{ width: width * .7, height: width * .8, borderRadius: SIZES.sm}} />
                        //             </TouchableOpacity>
                        //         }
                        //         keyExtractor={(index) => index}
                        //         alwaysBounceVertical={false}
                        //         showsHorizontalScrollIndicator={false}
                        //     />
                        // </>
                    }

                    <View style={{...styles.bottomSection}}>
                        <View style={{ flexDirection: "row", flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { setLiked(!liked) }}>
                                <AntDesign name={liked ? 'heart' : 'hearto'} size={SIZES.xl} color={liked ? COLORS.red : COLORS.onSurface} />
                            </TouchableOpacity>
                            <Text style={styles.commentSection}>{item.likes.length}</Text>
                            <Ionicons name='chatbubble-outline' size={SIZES.xl} color={COLORS.onSurface} />
                            <Text style={styles.commentSection}>{item.comments.length}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{height: 1, width: '100%', backgroundColor: COLORS.lightGray}}/>
        </View>
    )
}

export default PostComment

const styles = StyleSheet.create({
    bottomSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: SIZES.sm
    },
    commentSection: {
        ...TYPOGRAPHY.h2,
        fontSize: SIZES.md,
        marginHorizontal: SIZES.xs,
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