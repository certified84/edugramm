import {
    StyleSheet, SafeAreaView, Text, View,
    TouchableOpacity, FlatList, Image, ScrollView, KeyboardAvoidingView
} from 'react-native'
import { COLORS, SIZES, TYPOGRAPHY } from '../../../assets/theme'
import React, { useState } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { Avatar, TextInput } from 'react-native-paper';
import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons'
import FeedHeader from './FeedHeader';
import { useNavigation } from '@react-navigation/native';
import FeedCard from './FeedCard';
import FeedComment from './FeedComment';
import FeedDetailedCard from './FeedDetailedCard';

const FeedDetailedScreen = ({ route }) => {
    
    const item = route.params.item
    const navigation = route.params.navigation

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 0.9 }}>
                <View style={{flex: .1, flexDirection: 'row', alignItems: 'center', marginHorizontal: SIZES.md}}>
                    <TouchableOpacity activeOpacity={.9} onPress={() => navigation.goBack()}>
                        <MaterialIcons name='arrow-back' size={SIZES.xl}/>
                    </TouchableOpacity>
                    <Text style={{...TYPOGRAPHY.h1, flex: 1, textAlign: 'center', marginEnd: SIZES.xl}}>Post</Text>
                </View>
                <ScrollView style={{flex: 1}}>
                    <FeedDetailedCard item={item} navigation={navigation} />

                    <View style={{ paddingHorizontal: SIZES.md, marginBottom: SIZES.xl}}>
                        <FeedComment />
                        <FeedComment subComment={true} />
                    </View>

                </ScrollView>
            </View>

            <View style={{ flex: 0.1 }}>
                <TextInput
                    mode="outlined"
                    placeholder='Add a Comment'
                    theme={{ roundness: 3 }}
                    // left={<TextInput.Icon icon="email" iconColor={COLORS.white} />}
                    style={styles.inputField}
                    underlineColor={COLORS.white}
                    activeOutlineColor={COLORS.primary}
                    backgroundColor={COLORS.lightGray}
                    placeholderTextColor={COLORS.black}
                    textColor={COLORS.black}
                />
                <TouchableOpacity>
                    <Text style={{
                        ...TYPOGRAPHY.h2,
                        color: COLORS.primary,
                        position: "absolute",
                        right: 35,
                        // bottom: -40,
                        bottom: 15,
                        fontSize: SIZES.md
                    }}>Post</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default FeedDetailedScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.surface
    },
    inputField: {
        borderRadius: 55,
        width: "100%",
        backgroundColor: COLORS.lightGray
        // paddingHorizontal: 20
    }
})