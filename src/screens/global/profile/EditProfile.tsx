import { SafeAreaView, View, TouchableOpacity, Image, Text, StyleSheet, ScrollView } from "react-native";
import { COLORS, LINE, SIZES, TYPOGRAPHY } from "../../../../assets/theme";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import VerifiedIcon from "../../../components/VerifiedIcon";
import { MaterialIcons, Ionicons, AntDesign, Feather } from '@expo/vector-icons'
import { Avatar, TextInput } from "react-native-paper";

export default function EditProfileScreen() {
    
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => {return (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={TYPOGRAPHY.h2}>Cancel</Text>
              </TouchableOpacity>
            )},
            headerRight: () => {return (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{...TYPOGRAPHY.h2, color: COLORS.primary}}>Done</Text>
              </TouchableOpacity>
            )},
        })
    },[])

    return ( 
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.surface}}>
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
                                        value={'Samson Achiaga'}
                                        // onChangeText={setText}
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
                                        // value={text}
                                        // onChangeText={setText}
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
                                        // value={text}
                                        // onChangeText={setText}
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
                                        // value={text}
                                        // onChangeText={setText}
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
                                        // value={text}
                                        // onChangeText={setText}
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