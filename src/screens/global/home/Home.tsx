import {
    StyleSheet, SafeAreaView, Text, View,
    TouchableOpacity, FlatList, Image
} from 'react-native'
import { COLORS, SIZES, TYPOGRAPHY } from '../../../../assets/theme'
import React, { useEffect, useState } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { Avatar, FAB } from 'react-native-paper';
import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons'
import HomeHeader from './HomeHeader';
import { useNavigation } from '@react-navigation/native';
import { PostCard } from '../post/PostCard';
import { data } from '../../../components/data';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { collection, doc, query, where } from 'firebase/firestore';
import { auth, firestore } from '../../../../firebase';
import { defaultUser } from '../../../data/model/User'
import { Loader } from '../../../components/Loader';

const HomeScreen = () => {

    const navigation = useNavigation()
    const user = auth.currentUser

    const userRef = doc(firestore, "users", user.uid)
    const [snapshot, loading, error] = useDocument(userRef)

    const [values, setValues] = useState({
        ...defaultUser,
        message: "",
        loading: false,
        showSnackBar: false,
    })

    const postRef = collection(firestore, "posts")
    const q = query(postRef, where("uid", "==", user.uid))
    const [postsSnapshot, postsLoading, postsError] = useCollection(q)

    const [posts, setPosts] = useState([])

    useEffect(() => {
        if(postsSnapshot) {
            const data = postsSnapshot.docs
            setPosts(data)
        }
    }, [postsSnapshot])

    useEffect(() => setValues({...values, showSnackBar: values.message !== ""}), [values.message])
    useEffect(() => {
        if (error && error.message !== "") {
            setValues({...values, showSnackBar: true, message: error.message})
        }
    }, [error])

    return (
        <View style={styles.container}>

            <Loader showLoader={values.loading || loading} />

            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    data={posts}
                    ListHeaderComponent={() => <HomeHeader titleText={"EduGramm"} navigation={navigation} userInfo={values} />}
                    renderItem={({ item }) => <PostCard item={item.data()} navigation={navigation} />}
                    keyExtractor={(item) => item.id}
                    // alwaysBounceVertical={false}
                />
                <FAB
                    icon="plus"
                    style={styles.fab}
                    color={COLORS.onPrimary}
                    onPress={() => navigation.navigate('AddPostScreen', { userInfo: {...values} }) }
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