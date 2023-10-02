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
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { auth, firestore } from '../../../../firebase';
import { defaultUser } from '../../../data/model/User'
import { Loader } from '../../../components/Loader';

const HomeScreen = () => {

    const navigation = useNavigation()
    const user = auth.currentUser


    const reference = doc(firestore, "users", user.uid)
    const [snapshot, loading, error] = useDocument(reference)

    const [values, setValues] = useState({
        ...defaultUser,
        message: "",
        loading: false,
        showSnackBar: false,
    })

    useEffect(() => {
        if(snapshot && snapshot.exists()) {
            const data = snapshot.data()
            setValues({
                ...values,
                ...data
            })
        }
    }, [snapshot])

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
                    data={data}
                    ListHeaderComponent={() => <HomeHeader titleText={"EduGramm"} navigation={navigation} userInfo={values} />}
                    renderItem={({ item }) => <PostCard item={item} navigation={navigation} />}
                    keyExtractor={(item) => item.id}
                    alwaysBounceVertical={true}
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