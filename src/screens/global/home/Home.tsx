import {
    StyleSheet, SafeAreaView, Text, View,
    TouchableOpacity, FlatList, Image
} from 'react-native'
import { COLORS, SIZES, TYPOGRAPHY } from '../../../../assets/theme'
import React, { useState } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { Avatar, FAB } from 'react-native-paper';
import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons'
import HomeHeader from './HomeHeader';
import { useNavigation } from '@react-navigation/native';
import { PostCard } from '../post/PostCard';
import { data } from '../../../components/data';

const HomeScreen = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    data={data}
                    ListHeaderComponent={() => <HomeHeader titleText={"EduGramm"} navigation={navigation} />}
                    renderItem={({ item }) => <PostCard item={item} navigation={navigation} />}
                    keyExtractor={(item) => item.id}
                    alwaysBounceVertical={true}
                />
                <FAB
                    icon="plus"
                    style={styles.fab}
                    color={COLORS.onPrimary}
                    onPress={() => navigation.navigate('AddPostScreen' as never) }
                    theme={{colors: fabColors}}
                />
            </SafeAreaView>
        </View>
    )
}

export default HomeScreen

const fabColors = {
    primary: COLORS.primary, 
    secondary: COLORS.secondary, 
    tertiary: COLORS.tertiary,
    surface: COLORS.surface
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.surface
    },
    fab: {
        position: 'absolute',
        margin: SIZES.sm,
        right: 0,
        bottom: 0,
        backgroundColor: COLORS.primary,
        borderRadius: 50
    }
})