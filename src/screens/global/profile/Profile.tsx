import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../../assets/theme";
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { followerCount } from "../../../util/Utils";
import { Avatar, Snackbar } from "react-native-paper";
import { PostsTab } from "./Tabs";
import { useEffect, useState } from "react";
import { defaultUser } from '../../../data/model/User'
import { auth, firestore } from '../../../../firebase';
import { collection, doc, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { Loader } from "../../../components/Loader";
import { useCollection, useDocument, useDocumentOnce } from 'react-firebase-hooks/firestore'
import { ScrollView } from "react-native-gesture-handler";
import { data } from "../../../components/data";
import { PostCard } from "../post/PostCard";
import { SplashIcon } from "../../../../assets/svg/SplashIcon";
import VerifiedIcon from "../../../components/VerifiedIcon";

export default function ProfileScreen({route}) {

    const navigation = useNavigation() 
    const user = auth.currentUser
    const [userInfo, setUserInfo] = useState(route.params.userInfo)

    const reference = doc(firestore, "users", user.uid)
    const [snapshot, loading, error] = useDocument(reference)

    const postRef = collection(firestore, "posts")
    const q = query(postRef, where("uid", "==", user.uid), orderBy("uid"), orderBy("date", "desc"))
    const [postsSnapshot, postsLoading, postsError] = useCollection(q)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if(postsSnapshot) {
            setPosts(postsSnapshot.docs)
        }
    }, [postsSnapshot])

    const [values, setValues] = useState({
        message: "",
        loading: false,
        showSnackBar: false,
    })

    useEffect(() => {
        if(snapshot && snapshot.exists()) {
            setUserInfo(snapshot.data())
        }
    }, [snapshot])

    useEffect(() => setValues({...values, showSnackBar: values.message !== ""}), [values.message])
    useEffect(() => {
        if (error && error.message !== "") {
            setValues({...values, showSnackBar: true, message: error.message})
        }
    }, [error])

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => {return (
                <TouchableOpacity style={{alignItems: 'center', marginStart: SIZES.md}} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={SIZES.xl} color={COLORS.onSurface}/>
                    {/* <Text style={{...TYPOGRAPHY.h2}}>Back</Text> */}
                </TouchableOpacity>
            )},
            headerRight: () => {return (
                <TouchableOpacity style={{alignItems: 'center', marginEnd: SIZES.md}} onPress={() => navigation.navigate('SettingsScreen' as never)}>
                    <MaterialIcons name="menu-open" size={SIZES.xl} color={COLORS.onSurface}/>
                </TouchableOpacity>
            )},
        })
    },[])


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.surface}}>

            <Loader showLoader={values.loading || loading || postsLoading} />

            <ScrollView style={{flex: 1}}>
                <View style={{paddingHorizontal: SIZES.md}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: SIZES.md}}>
                        <View style={{flex: 1, marginEnd: SIZES.sm, flexDirection: 'row'}}>
                            <Text style={{...TYPOGRAPHY.h1}} numberOfLines={2}>{user.displayName}</Text>
                            { userInfo.verified && <VerifiedIcon /> }
                        </View>
                        <View style={{overflow: 'hidden', width: 53, height: 53, borderRadius: 53 / 2, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center'}}>
                            { user.photoURL ? 
                                <Avatar.Image size={50} source={{ uri: user.photoURL }} />
                                : <SplashIcon />
                            }
                        </View>
                    </View>
                    
                    <Text style={{...TYPOGRAPHY.p}}>{userInfo.bio}</Text>
                    
                    <View style={{marginTop: SIZES.md}}>
                        <Text style={{...TYPOGRAPHY.p}}>{`${userInfo.company} \u2022 ${userInfo.school}`}</Text>
                        <Text style={{...TYPOGRAPHY.p, opacity: .5}}>{`Badagry, Lagos state, Nigeria`}</Text>
                    </View>
                    
                    <View style={{flexDirection: 'row', marginTop: SIZES.sm}}>
                        <TouchableOpacity activeOpacity={.8} onPress={() => navigation.navigate('FollowScreen' as never)}>
                            <Text style={{...TYPOGRAPHY.h2, opacity: .5}}>{`${followerCount(userInfo.followers.length)} followers \u2022 `}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.8} style={{flex: 1}}>
                            <Text style={{...TYPOGRAPHY.h2, opacity: .5, color: COLORS.primary}} numberOfLines={1}>{userInfo.link}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: SIZES.md}}>
                        <TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate('EditProfileScreen' as never)} style={{flex: .47, padding: SIZES.md, paddingVertical: SIZES.xxs, backgroundColor: COLORS.onSurface, borderRadius: SIZES.xxs, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{...TYPOGRAPHY.h2, color: COLORS.surface}}>Edit Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.5} style={{flex: .47, padding: SIZES.md, paddingVertical: SIZES.xxs / 2, borderWidth: 2, borderColor: COLORS.lightGray, borderRadius: SIZES.xxs, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{...TYPOGRAPHY.h2, color: COLORS.onSurface}}>Share Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                { posts.map((item) => {return (<PostCard item={item.data()} key={item.id} navigation={navigation} userInfo={{}} />)}) }
            </ScrollView>

            <Snackbar
                visible={values.showSnackBar}
                onDismiss={() => setValues({...values, message: ""})}
                theme={{ colors: { primary: COLORS.primary } }}
                action={{ 
                    textColor: COLORS.primary,
                    label: 'OK',
                    onPress: () => {},
                }}>
                    <Text style={{...TYPOGRAPHY.p, color: COLORS.white}}>{values.message}</Text>
            </Snackbar>
        </SafeAreaView>
    )
}