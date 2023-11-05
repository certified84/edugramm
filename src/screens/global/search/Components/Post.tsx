import { Image, Text, TouchableOpacity, View } from "react-native"
import { Avatar } from "react-native-paper"
import { COLORS, LINE, SIZES, TYPOGRAPHY } from "../../../../../assets/theme"
import { MaterialIcons, FontAwesome, AntDesign, Feather } from '@expo/vector-icons'

export const Post = ({ item, index, setCurrentIndex, setShowImageDialog, navigation }) => {
    return (
        <TouchableOpacity
            activeOpacity={.8}
            onLongPress={() => {
                setCurrentIndex(index)
                setShowImageDialog(true)
            }}
            onPress={() => navigation.navigate("PostDetailedScreen", { item: item })}
            style={{ flex: 1, flexDirection: 'column', margin: 1 }}
        >
            <Image
                style={{ height: 200 }}
                source={{ uri: item.images[0] }}
            />
        </TouchableOpacity>
    )
}

export const PostDetailed = ({ post, width, height }) => {
    return (
        <View>
            <View style={{ paddingEnd: 0, padding: SIZES.xs, flexDirection: "row", alignItems: "center" }}>
                <Avatar.Image size={55} source={{ uri: post.user_photo }} />

                <View style={{ marginLeft: SIZES.xxs }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ ...TYPOGRAPHY.h2 }}>{post.full_name}</Text>
                        <MaterialIcons
                            name='verified'
                            size={15}
                            color={"#0082CB"}
                            style={{ alignSelf: "center" }}
                        />
                    </View>
                    <Text style={{ ...TYPOGRAPHY.h2, color: "#6F6F6F" }}>@{post.username}</Text>
                </View>

                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Text style={{ ...TYPOGRAPHY.p }}>12:30</Text>
                    <TouchableOpacity style={{padding: SIZES.sm}}>
                        <Feather name="more-vertical" size={24} />
                    </TouchableOpacity>
                </View>
            </View>

            <Image source={{uri: post.image, width: width, height: height * .5}}/>

            <Text style={{...TYPOGRAPHY.p, margin: SIZES.sm, lineHeight: 20}}>Dear parents, welcome to our classroom feed! Today, we transformed into a science lab...</Text>

            <View style={{ ...LINE.horizontal, opacity: .1, marginHorizontal: SIZES.sm}}/>

            <View style={{flexDirection: 'row', marginHorizontal: SIZES.lg}}>
                <AntDesign name="heart" color={'#FF0000'} size={SIZES.sm} />
                <Text style={{...TYPOGRAPHY.p, marginStart: SIZES.sm}}>45 Likes</Text>
                <FontAwesome style={{marginStart: 30}} name='comment-o' size={SIZES.sm} color={COLORS.black} />
                <Text style={{...TYPOGRAPHY.p, marginStart: SIZES.sm}}>32 Comments</Text>
            </View>

            <View style={{ ...LINE.horizontal, opacity: .1, marginHorizontal: SIZES.sm}}/>
        </View>
    )
}