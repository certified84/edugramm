import { SafeAreaView, TouchableOpacity, View, Text, StyleSheet, Image, FlatList, useWindowDimensions, ScrollView } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../assets/theme";
import { useNavigation } from "@react-navigation/native";
import { Avatar, TextInput } from "react-native-paper";
import { useState } from "react";
import { Feather, Ionicons } from '@expo/vector-icons'

export default function AddPostScreen() {
    const navigation = useNavigation()
    const { width } = useWindowDimensions()
    const [text, setText] = useState('')
    const [images, setImages] = useState([
        'https://source.unsplash.com/random/?woman,kid',
        'https://source.unsplash.com/random/?man,kid',
        'https://source.unsplash.com/random/?woman,bike',
        'https://source.unsplash.com/random/?man,car',
    ])
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.surface}}>
            <View style={{flex: 1, paddingHorizontal: SIZES.md}}>
                
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity activeOpacity={.6} onPress={() => navigation.goBack()} style={{paddingVertical: SIZES.xxs}}>
                        <Text style={{...TYPOGRAPHY.h2}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        activeOpacity={.6} 
                        style={{opacity: text.length > 0 || images.length > 0 ? 1 : .5}} 
                        disabled={text.length <= 0 || images.length <= 0} 
                        onPress={() => text.length > 0 || images.length > 0 ? {} : {}}
                    >
                        <View style={{borderRadius: 50, paddingHorizontal: SIZES.md, paddingVertical: SIZES.xxs, backgroundColor: COLORS.primary}}>
                            <Text style={{...TYPOGRAPHY.h2, color: COLORS.onPrimary}}>Post</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
                <View style={{flexDirection: 'row', flex: .8, marginTop: SIZES.sm}}>
                    <View style={{width: 43, height: 43, borderRadius: 43 / 2, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center'}}>
                        <Avatar.Image size={40} source={{ uri: 'https://source.unsplash.com/random/?woman,kid' }} />
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{...TYPOGRAPHY.h2, marginStart: SIZES.sm}}>Samson Achiaga</Text>
                        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                            <TextInput
                                value={text}
                                onChangeText={setText}
                                mode="outlined"
                                placeholder='What knowledge are you sharing today?'
                                style={styles.inputField}
                                selectionColor={COLORS.onSurface}
                                multiline
                                contentStyle={{margin: 0, padding: 0}}
                                outlineColor={'transparent'}
                                activeOutlineColor={'transparent'}
                                placeholderTextColor={COLORS.darkGray}
                                textColor={COLORS.onSurface}
                            />
                            <FlatList
                                data={images}
                                style={{flex: 1}}
                                horizontal
                                renderItem={({ item, index }) => 
                                    <View style={{ width: width * .7, height: width * .8, marginTop: SIZES.xs, marginEnd: SIZES.xs}}>
                                        <Image source={{ uri: item }} style={{ width: width * .7, height: width * .8, borderRadius: SIZES.sm}} />
                                        <TouchableOpacity 
                                            activeOpacity={.6} 
                                            style={{
                                                backgroundColor: COLORS.black,
                                                width: 35, height: 35, 
                                                position: 'absolute', 
                                                right: SIZES.xs, 
                                                top: SIZES.xs, 
                                                justifyContent: 'center', 
                                                alignItems: 'center', 
                                                borderRadius: 50
                                            }}
                                            onPress={() => {
                                                const newImages = []
                                                images.forEach((value, i) => {
                                                    if (index !== i)
                                                    newImages.push(value)
                                                })
                                                setImages(newImages)
                                            }}
                                        >
                                            <Ionicons size={SIZES.lg} name='close' color={COLORS.white}/>
                                        </TouchableOpacity>
                                    </View>
                                }
                                keyExtractor={(index) => index}
                                alwaysBounceVertical={false}
                                showsHorizontalScrollIndicator={false}
                            />
                        </ScrollView>
                    </View>
                </View>

                <View style={{flex: .2, alignItems: 'center'}}>
                    <TouchableOpacity style={{width: 80, height: 80, borderWidth: 1, borderColor: COLORS.primary, borderRadius: SIZES.sm, justifyContent: 'center', alignItems: 'center'}}>
                        <Feather name="camera" size={30} color={COLORS.onSurface}/>
                    </TouchableOpacity>
                </View>
            </View>
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