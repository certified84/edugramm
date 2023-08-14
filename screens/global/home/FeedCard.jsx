import {
    StyleSheet, Text, View,
    TouchableOpacity, Image, useWindowDimensions, FlatList
} from 'react-native'
import { COLORS, SIZES, TYPOGRAPHY } from '../../../assets/theme'
import React, { useState } from 'react';
import { Avatar } from 'react-native-paper';
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons'
import ChatDialog from '../../../components/ChatDialog';

const FeedCard = ({ item, navigation }) => {

    const { width } = useWindowDimensions()
    const [showPersonDialog, setShowPersonDialog] = useState(false);
    const [liked, setLiked] = useState(false);

    return (
        <View style={{flex: 1, width: width}} onPress={() => navigation.navigate("FeedDetailed", { item })}>
            {/* Show person dialog modal  */}
            <ChatDialog
                showPersonDialog={showPersonDialog}
                setShowPersonDialog={setShowPersonDialog}
                name={item.full_name}
                image={item.image_url}
            />

            <View style={{flexDirection: 'row', paddingHorizontal: SIZES.md, paddingVertical: SIZES.xs}}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => { setShowPersonDialog(true) }} >
                    <Avatar.Image size={50} source={{ uri: item.user_photo }} />
                </TouchableOpacity>
                <View style={{flex: 1, marginStart: SIZES.xxs}}>
                    <View style={{flexWrap: 'wrap', flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ ...TYPOGRAPHY.h2 }}>{item.full_name}</Text>
                        {
                            item.isVerified && <MaterialIcons
                                name='verified'
                                size={SIZES.sm}
                                color={"#0082CB"}
                                style={{ alignSelf: "center" }}
                            />
                        }
                        <Text style={{ ...TYPOGRAPHY.h2, color: "#6F6F6F" }}>@{item.username}</Text>
                        <Text>{` \u2022 11h`}</Text>
                    </View>
                    <Text style={{ ...TYPOGRAPHY.p }} numberOfLines={8}>
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
                        item.images.length === 1 && <Image source={{ uri: item.images[0] }} style={{ width: '100%', height: width * .8, borderRadius: SIZES.sm, marginTop: SIZES.xxs}} />
                    }
                    { 
                        item.images.length > 1 && <FlatList
                            data={item.images}
                            horizontal
                            renderItem={({ item }) => <Image source={{ uri: item }} style={{ width: width * .7, height: width * .8, borderRadius: SIZES.sm, marginTop: SIZES.xxs, marginEnd: SIZES.xs}} />}
                            keyExtractor={(index) => index}
                            alwaysBounceVertical={false}
                            showsHorizontalScrollIndicator={false}
                        />
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

export default FeedCard

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