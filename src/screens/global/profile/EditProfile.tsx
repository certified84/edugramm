import { SafeAreaView, View, TouchableOpacity, Image, Text, StyleSheet, ScrollView } from "react-native";
import { COLORS, LINE, SIZES, TYPOGRAPHY } from "../../../../assets/theme";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import VerifiedIcon from "../../../components/VerifiedIcon";
import { MaterialIcons, Ionicons, AntDesign, Feather } from '@expo/vector-icons'
import { Avatar, Snackbar, TextInput } from "react-native-paper";
import { User as FirebaseUser, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { User, defaultUser } from '../../../data/model/User'
import { auth, firestore } from '../../../../firebase';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import { Loader } from "../../../components/Loader";

export default function EditProfileScreen() {
    
    const navigation = useNavigation()
    const user = auth.currentUser
    const [userData, setUserData] = useState(defaultUser)
    const [value, setValue] = useState({
        bio: "",
        company: "",
        school: "",
        link: "",
        message: "",
        loading: false,
        showSnackBar: false,
    })

    useEffect(() => {
        getUserData()
        return () => {}
    }, [])

    useEffect(() => setValue({...value, showSnackBar: value.message !== ""}), [value.message])

    async function getUserData() {
        console.log("Called")
        setValue({ ...value, loading: true })
        const docRef = doc(firestore, "users", user.uid)
        await getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data() as User
                console.log("Data: ", data)
                setUserData(data)
                setValue({
                    ...value,
                    bio: data.bio,
                    company: data.company,
                    school: data.school,
                    link: data.link
                })
                console.log(value)
            } else {
                setValue({ ...value, message: "An error occurred. Please try again."})
            }
            setValue({ ...value, loading: false })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            setValue({ ...value, message: "An error occurred. Please try again.", loading: false })
        })
    }

    async function updateUserProfile() {
        setValue({...value, loading: true})
        console.log("Bio", value.bio)
        const userRef = doc(firestore, "users", user.uid)
        await updateDoc(userRef, { 
            bio: value.bio,
            company: value.company,
            school: value.school,
            link: value.link
         }).then(() => {
            setValue({...value, loading: false})
            navigation.goBack()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            setValue({ ...value, message: "An error occurred. Please try again.", loading: false })
        })
    }

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => {return (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={TYPOGRAPHY.h2}>Cancel</Text>
              </TouchableOpacity>
            )},
            headerRight: () => {return (
              <TouchableOpacity onPress={updateUserProfile}>
                <Text style={{...TYPOGRAPHY.h2, color: COLORS.primary}}>Done</Text>
              </TouchableOpacity>
            )},
        })
    },[])

    return ( 
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.surface}}>

            <Loader showLoader={value.loading} />

            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                <View style={{flex: 1}}>

                    <TouchableOpacity activeOpacity={.6} style={{alignSelf: 'center'}}>
                        <View style={{width: 85, height: 85, borderRadius: 83 / 2, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center'}}>
                            <Avatar.Image size={80} source={{ uri: 'https://source.unsplash.com/random/?man,kid' }} />
                        </View>
                        <Text style={{...TYPOGRAPHY.h2, color: COLORS.primary, marginTop: SIZES.sm}}>Edit picture</Text>
                    </TouchableOpacity>

                    <View style={{width: '100%', height: 1, backgroundColor: COLORS.onSurface, opacity: .1, marginTop: SIZES.md}}/>

                    <View style={{}}>

                        <View style={{flexDirection: 'row', marginStart: SIZES.md, alignItems: 'center'}}>
                            <Text style={{...TYPOGRAPHY.h2, flex: .25}}>Name</Text>
                            <View style={{flex: 1}}>
                                <TextInput
                                        value={user.displayName}
                                        mode="outlined"
                                        placeholder='e.g Samson Achiaga'
                                        editable={false}
                                        style={styles.inputField}
                                        selectionColor={COLORS.onSurface}
                                        contentStyle={{margin: 0, padding: 0}}
                                        outlineColor={'transparent'}
                                        activeOutlineColor={'transparent'}
                                        placeholderTextColor={COLORS.darkGray}
                                        textColor={COLORS.onSurface}
                                    />
                                <View style={{width: '100%', height: 1, backgroundColor: COLORS.onSurface, opacity: .1, marginStart: SIZES.sm}}/>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', marginStart: SIZES.md, alignItems: 'center'}}>
                            <Text style={{...TYPOGRAPHY.h2, flex: .25}}>Bio</Text>
                            <View style={{flex: 1}}>
                                <TextInput
                                        value={value.bio}
                                        onChangeText={(text) => {
                                            setValue({ ...value, bio: text})
                                            console.log(value.bio)
                                        }}
                                        mode="outlined"
                                        placeholder='Enter a short description about yourself'
                                        style={styles.inputField}
                                        selectionColor={COLORS.onSurface}
                                        multiline
                                        contentStyle={{margin: 0, padding: 0}}
                                        outlineColor={'transparent'}
                                        activeOutlineColor={'transparent'}
                                        placeholderTextColor={COLORS.darkGray}
                                        textColor={COLORS.onSurface}
                                    />
                                <View style={{width: '100%', height: 1, backgroundColor: COLORS.onSurface, opacity: .1, marginStart: SIZES.sm}}/>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', marginStart: SIZES.md, alignItems: 'center'}}>
                            <Text style={{...TYPOGRAPHY.h2, flex: .25}}>Company</Text>
                            <View style={{flex: 1}}>
                                <TextInput
                                        value={value.company}
                                        onChangeText={(text) => {
                                            setValue({ ...value, company: text})
                                        }}
                                        mode="outlined"
                                        placeholder='Where do you work?'
                                        style={styles.inputField}
                                        selectionColor={COLORS.onSurface}
                                        multiline
                                        contentStyle={{margin: 0, padding: 0}}
                                        outlineColor={'transparent'}
                                        activeOutlineColor={'transparent'}
                                        placeholderTextColor={COLORS.darkGray}
                                        textColor={COLORS.onSurface}
                                    />
                                <View style={{width: '100%', height: 1, backgroundColor: COLORS.onSurface, opacity: .1, marginStart: SIZES.sm}}/>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', marginStart: SIZES.md, alignItems: 'center'}}>
                            <Text style={{...TYPOGRAPHY.h2, flex: .25}}>School</Text>
                            <View style={{flex: 1}}>
                                <TextInput
                                        value={value.school}
                                        onChangeText={(text) => {
                                            setValue({ ...value, school: text})
                                        }}
                                        mode="outlined"
                                        placeholder='Where do/did you study?'
                                        style={styles.inputField}
                                        selectionColor={COLORS.onSurface}
                                        multiline
                                        contentStyle={{margin: 0, padding: 0}}
                                        outlineColor={'transparent'}
                                        activeOutlineColor={'transparent'}
                                        placeholderTextColor={COLORS.darkGray}
                                        textColor={COLORS.onSurface}
                                    />
                                <View style={{width: '100%', height: 1, backgroundColor: COLORS.onSurface, opacity: .1, marginStart: SIZES.sm}}/>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', marginStart: SIZES.md, alignItems: 'center'}}>
                            <Text style={{...TYPOGRAPHY.h2, flex: .25}}>Link</Text>
                            <View style={{flex: 1}}>
                                <TextInput
                                        value={value.link}
                                        onChangeText={(text) => {
                                            setValue({ ...value, link: text})
                                        }}
                                        mode="outlined"
                                        placeholder='e.g edugramm.com/edugramm'
                                        style={styles.inputField}
                                        selectionColor={COLORS.primary}
                                        multiline
                                        contentStyle={{margin: 0, padding: 0}}
                                        outlineColor={'transparent'}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        activeOutlineColor={'transparent'}
                                        placeholderTextColor={COLORS.darkGray}
                                        textColor={COLORS.primary}
                                    />
                            </View>
                        </View>
                        
                        <View style={{width: '100%', height: 1, backgroundColor: COLORS.onSurface, opacity: .1}}/>

                        <TouchableOpacity activeOpacity={.5} style={{paddingVertical: SIZES.sm, marginStart: SIZES.md}}>
                            <Text style={{...TYPOGRAPHY.h2, color: COLORS.primary}}>Sign up for Edugramm Verfied</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>

            <Snackbar
                visible={value.showSnackBar}
                onDismiss={() => setValue({...value, message: ""})}
                theme={{ colors: { primary: COLORS.primary } }}
                action={{ 
                    textColor: COLORS.primary,
                    label: 'OK',
                    onPress: () => {},
                }}>
                    <Text style={{...TYPOGRAPHY.p, color: COLORS.white}}>{value.message}</Text>
            </Snackbar>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    inputField: {
        ...TYPOGRAPHY.p,
        // flex: .4,
        padding: 0,
        margin: 0,
        backgroundColor: COLORS.surface,
        color: COLORS.onSurface,
    }
})