import {
    StyleSheet, SafeAreaView, Text, View,
    TouchableOpacity, FlatList, Image
} from 'react-native'
import { COLORS, SIZES, TYPOGRAPHY } from '../../../../assets/theme'
import React, { useEffect, useState } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { Avatar } from 'react-native-paper';
import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { PostCard } from '../../../components/PostCard';
import { Account } from '../search/Components/Account';
import { collection, query, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '../../../../firebase';

const user = auth.currentUser

export const FollowersTab = ({ uid, navigation }) => {

    const [users, setUsers] = useState([])
    const usersRef = collection(firestore, "users")
    const q = query(usersRef, where("following", "array-contains", uid))
    const [snapshot, loading, error] = useCollection(q)

    useEffect(() => {
        if (snapshot) {
            setUsers(snapshot.docs)
        }
    }, [snapshot])

    return (
        <View style={{ flex: 1 }}>
            {
                users.length > 0 ? <FlatList
                    data={users}
                    renderItem={({ item }) => <Account accountInfo={item.data()} navigation={navigation} />}
                    keyExtractor={(item) => item.id}
                    alwaysBounceVertical={true}
                /> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: SIZES.md, marginTop: 0 }}>
                    <Text style={{ ...TYPOGRAPHY.h3, color: COLORS.onSurface }}>There's nothing here yet.</Text>
                    <Text style={{ ...TYPOGRAPHY.h3, fontSize: SIZES.xs, color: COLORS.onSurface, opacity: .7, textAlign: 'center' }}>
                        Accounts that follows this user will appear here when they are available...
                    </Text>
                </View>
            }
        </View>
    )
}

export const FollowingTab = ({ uid, navigation }) => {

    const [users, setUsers] = useState([])
    const usersRef = collection(firestore, "users")
    const q = query(usersRef, where("followers", "array-contains", uid))
    const [snapshot, loading, error] = useCollection(q)

    useEffect(() => {
        if (snapshot) {
            setUsers(snapshot.docs)
        }
    }, [snapshot])

    return (
        <View style={{ flex: 1 }}>
            {
                users.length > 0 ? <FlatList
                    data={users}
                    renderItem={({ item }) => <Account accountInfo={item.data()} navigation={navigation} />}
                    keyExtractor={(item) => item.id}
                    alwaysBounceVertical={true}
                /> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: SIZES.md, marginTop: 0 }}>
                    <Text style={{ ...TYPOGRAPHY.h3, color: COLORS.onSurface }}>There's nothing here yet.</Text>
                    <Text style={{ ...TYPOGRAPHY.h3, fontSize: SIZES.xs, color: COLORS.onSurface, opacity: .7, textAlign: 'center' }}>
                        Accounts that this user follows will appear here when they are available...
                    </Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.surface
    }
})