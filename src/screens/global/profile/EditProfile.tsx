import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";
import { COLORS, LINE, SIZES, TYPOGRAPHY } from "../../../../assets/theme";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Avatar, Snackbar, TextInput } from "react-native-paper";
import { defaultUser } from '../../../data/model/User'
import { auth, firestore } from '../../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Loader } from "../../../components/Loader";
import { useDocumentOnce } from 'react-firebase-hooks/firestore'
import { SplashIcon } from "../../../../assets/svg/SplashIcon";

export default function EditProfileScreen() {
    
    const navigation = useNavigation()
    const user = auth.currentUser

    const reference = doc(firestore, "users", user.uid)
    const [snapshot, loading, error, reload] = useDocumentOnce(reference)

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
                bio: data.bio,
                company: data.company,
                school: data.school,
                link: data.link
            })
        }
    }, [snapshot])

    useEffect(() => setValues({...values, showSnackBar: values.message !== ""}), [values.message])
    useEffect(() => {
        if (error && error.message !== "") {
            setValues({...values, showSnackBar: true, message: error.message})
        }
    }, [error])

    async function updateUserProfile() {
        console.log("Update Values: ", values)
        setValues({...values, loading: true})
        const userRef = doc(firestore, "users", user.uid)
        await updateDoc(userRef, { 
            bio: values.bio,
            company: values.company,
            school: values.school,
            link: values.link
         }).then(() => {
            setValues({...values, loading: false})
            navigation.goBack()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            setValues({ ...values, message: "An error occurred. Please try again.", loading: false })
        })
    }

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => {return (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={TYPOGRAPHY.h2}>Cancel</Text>
              </TouchableOpacity>
            )}
        })
    },[])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {return (
              <TouchableOpacity onPress={updateUserProfile}>
                <Text style={{...TYPOGRAPHY.h2, color: COLORS.primary}}>Done</Text>
              </TouchableOpacity>
            )},
        })
    }, [values])

    return ( 
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.surface}}>

            <Loader showLoader={values.loading || loading} />

            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                <View style={{flex: 1}}>

                    <TouchableOpacity activeOpacity={.6} style={{alignSelf: 'center'}}>
                        <View style={{ overflow: 'hidden', width: 85, height: 85, borderRadius: 83 / 2, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center'}}>
                            { user.photoURL ? 
                                <Avatar.Image size={80} source={{ uri: user.photoURL }} />
                                : <SplashIcon />
                            }
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
                            <Text style={{...TYPOGRAPHY.h2, flex: .25, paddingBottom: SIZES.xxs}}>Bio</Text>
                            <View style={{flex: 1}}>
                                <TextInput
                                    value={values.bio}
                                    onChangeText={(text) => {
                                        setValues({ ...values, bio: text})
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
                            <Text style={{...TYPOGRAPHY.h2, flex: .25, paddingBottom: SIZES.xxs}}>Company</Text>
                            <View style={{flex: 1}}>
                                <TextInput
                                    value={values.company}
                                    onChangeText={(text) => {
                                        setValues({ ...values, company: text})
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
                            <Text style={{...TYPOGRAPHY.h2, flex: .25, paddingBottom: SIZES.xxs}}>School</Text>
                            <View style={{flex: 1}}>
                                <TextInput
                                        value={values.school}
                                        onChangeText={(text) => {
                                            setValues({ ...values, school: text})
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
                                    value={values.link}
                                    onChangeText={(text) => {
                                        setValues({ ...values, link: text})
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