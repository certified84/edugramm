import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { COLORS, SIZES, TYPOGRAPHY } from '../../../assets/theme'
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Avatar } from 'react-native-paper';

export default function FeedHeader({ titleText, navigation }) {
    return (
        <View style={styles.container}>
            <Text style={{...TYPOGRAPHY.h1, fontFamily: 'sansita-italic', fontSize: SIZES.xxl, color: COLORS.onSurface}}>{titleText}</Text>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={{marginHorizontal: SIZES.xs}} activeOpacity={.5} onPress={() => navigation.navigate('NotificationScreen')}>
                    <MaterialCommunityIcons name='bell-outline' color={COLORS.onSurface} size={SIZES.xl + 5} />
                </TouchableOpacity>
                <TouchableOpacity style={{marginStart: SIZES.xs}} activeOpacity={.7} onPress={() => navigation.navigate('ProfileScreen')}>
                    <Avatar.Image size={SIZES.xl + SIZES.xxs} source={{ uri: 'https://source.unsplash.com/random/?woman,kid'}} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: SIZES.md,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
})