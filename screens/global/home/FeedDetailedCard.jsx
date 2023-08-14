import {
    StyleSheet, Text, View,
    TouchableOpacity, Image, useWindowDimensions, FlatList
} from 'react-native'
import { COLORS, SIZES, TYPOGRAPHY } from '../../../assets/theme'
import React, { useState } from 'react';
import { Avatar } from 'react-native-paper';
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons'
import ImageDialog from '../../../components/ImageDialog';

const FeedDetailedCard = ({ item, navigation }) => {

    const { width } = useWindowDimensions()
    const [showImageDialog, setShowImageDialog] = useState(false);
    const [liked, setLiked] = useState(false);

    return (
        <View style={{flex: 1, width: width}}>

            <ImageDialog
                showImageDialog={showImageDialog}
                setShowImageDialog={setShowImageDialog}
                name={item.full_name}
                image={item.image_url}
                images={item.images}
            />

            <View style={{paddingHorizontal: SIZES.md, paddingVertical: SIZES.xs}}>
                
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    
                    <TouchableOpacity activeOpacity={0.5} onPress={() => { }}>
                        <Avatar.Image size={40} source={{ uri: item.user_photo }} />
                    </TouchableOpacity>

                    <View style={{marginHorizontal: SIZES.xxs}}>
                        
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{ ...TYPOGRAPHY.h2 }}>{item.full_name}</Text>
                            {
                                !item.isVerified && <MaterialIcons
                                    name='verified'
                                    size={SIZES.sm}
                                    color={"#0082CB"}
                                    style={{ alignSelf: "center" }}
                                />
                            }
                        </View>

                    </View>

                    <Text style={{flex: 1, textAlign: 'right'}}>{`1d`}</Text>
                
                </View>

                <View style={{flex: 1, marginTop: SIZES.xxs}}>
                    <Text style={{ ...TYPOGRAPHY.p }}>
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
                        <TouchableOpacity activeOpacity={.9} onPress={() => setShowImageDialog(true)} style={{ width: '100%', height: width * .8, marginTop: SIZES.xs}}>
                            <Image 
                                source={{ uri: item.images[0] }} 
                                style={{ width: '100%', height: width * .8, borderRadius: SIZES.sm}} 
                                onPress={() => { navigation.navigate('FeedDetailedScreen', { item })}}
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
                        <View style={{ flexDirection: "row", flex: 0.4, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { setLiked(!liked) }}>
                                <AntDesign name={liked ? 'heart' : 'hearto'} size={SIZES.xl} color={liked ? COLORS.red : COLORS.onSurface} />
                            </TouchableOpacity>
                            <Text style={styles.commentSection}>{item.likes.length}</Text>
                            <TouchableOpacity onPress={() => { }}>
                                <Ionicons name='chatbubble-outline' size={SIZES.xl} color={COLORS.black} />
                            </TouchableOpacity>
                            <Text style={styles.commentSection}>{item.comments.length}</Text>
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
            <View style={{height: 1, width: '100%', backgroundColor: COLORS.lightGray}}/>
        </View>
    )
}

export default FeedDetailedCard

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
        marginHorizontal: SIZES.xs
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