import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES, TYPOGRAPHY } from '../../../assets/theme'
import { Avatar } from 'react-native-paper'
import { FontAwesome, AntDesign } from "@expo/vector-icons"

const FeedComment = ({ subComment = false }) => {
    return (
        <View style={{ marginLeft: subComment ? 42 : 0 }}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => { }} style={styles.container}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                    <Avatar.Image size={35} source={{ uri: 'https://source.unsplash.com/random/?soldier,kid' }} />
                    <View style={{ marginLeft: SIZES.xxs }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <Text style={{ ...TYPOGRAPHY.h2 }}>Mrs.Nnenna</Text>
                        </View>
                        <Text style={{
                            ...TYPOGRAPHY.p,
                            color: "#6F6F6F"
                        }}>15m</Text>
                    </View>
                </View>
                <Text style={{ ...TYPOGRAPHY.p, marginLeft: SIZES.xl }} numberOfLines={2}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                </Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", marginLeft: 12 }}>
                {/* <AntDesign name='hearto' size={20} /> */}

                <TouchableOpacity onPress={() => { }}>
                    <AntDesign

                        name='heart'
                        size={20}
                        color={COLORS.red}
                    />
                </TouchableOpacity>
                <Text
                    onPress={() => { }}
                    style={{ ...TYPOGRAPHY.h2, marginLeft: SIZES.xxs }} >Like</Text>

                <FontAwesome
                    name='send'
                    size={18}
                    style={{ marginLeft: SIZES.xxs }} />
                <Text
                    onPress={() => { }}
                    style={{ ...TYPOGRAPHY.h2, marginLeft: SIZES.xxs }} >Reply</Text>

            </View>

            {/* if any Sub-comments  */}
        </View>
    )
}

export default FeedComment

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        padding: SIZES.md,
        borderRadius: SIZES.md,
        borderTopLeftRadius: 0,
        marginVertical: SIZES.xs,
        borderColor: COLORS.darkGray,
    },
})