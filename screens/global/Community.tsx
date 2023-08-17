import { View, Text, SafeAreaView, StyleSheet, ImageBackground, FlatList, Image } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../assets/theme";

const communities = [
    {
        id: 1,
        name: 'Android Developers',
        image: 'https://source.unsplash.com/random/?android,developer',
        color: ''
    },
    {
        id: 2,
        name: 'Open Source',
        image: 'https://source.unsplash.com/random/?computer,github',
        color: ''
    },
    {
        id: 3,
        name: 'Android',
        image: 'https://source.unsplash.com/random/?android,device',
        color: ''
    },
    {
        id: 4,
        name: 'LeetCoders',
        image: 'https://source.unsplash.com/random/?code,computer',
        color: ''
    },
]

const messages = [
    {
        id: 1,
        name: 'Samson Achiaga',
        image: 'https://source.unsplash.com/random/?android,developer',
        message: "Hey man. How's it going?"
    },
    {
        id: 2,
        name: 'Olorunnegan Ifeoluwa',
        image: 'https://source.unsplash.com/random/?computer,github',
        message: "Agba Developer 🙌🏾. How Vella dey go an?"
    },
    {
        id: 3,
        name: 'James Oluseyi',
        image: 'https://source.unsplash.com/random/?android,device',
        message: "My boy! What's good?"
    },
    {
        id: 4,
        name: 'OKafe Vincent',
        image: 'https://source.unsplash.com/random/?code,computer',
        message: 'Yo cunt! How your life.'
    },
    {
        id: 5,
        name: 'Kolawole Godstime',
        image: 'https://source.unsplash.com/random/?code,computer',
        message: "Hey man. How's it going?"
    },
]

export default function CommunityScreen() {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.surface}}>
            <View style={{justifyContent: 'center'}}>
                <Text style={{...TYPOGRAPHY.h1, alignSelf: 'center', color: COLORS.onSurface}}>Communities</Text>
                <FlatList
                    data={communities}
                    horizontal
                    renderItem={({ item }) => <Community community={item} />}
                    keyExtractor={(item) => `${item.id}`}
                    alwaysBounceVertical={false}
                    showsHorizontalScrollIndicator={false}
                />

                <View style={{height: 1, width: '100', backgroundColor: COLORS.darkGray}}/>
            </View>
        </SafeAreaView>
    )
}

const Community = ({community}) => {
    return (
        <View style={{borderRadius: 15, marginVertical: SIZES.sm, marginHorizontal: SIZES.xxs, width: 160, height: 130, overflow: 'hidden'}}>
            <ImageBackground source={{uri: community.image}} resizeMode='cover' style={{width: '100%', height: '100%', }}>
                <View />
                <View style={{position: 'absolute', bottom: 0,backgroundColor: COLORS.primary, width: '100%', padding: SIZES.xs}}>
                    <Text numberOfLines={1} style={{...TYPOGRAPHY.h2, color: COLORS.white, alignSelf: 'center'}}>{community.name}</Text>
                </View>
            </ImageBackground>
        </View>
    )
}

const Message = ({message}) => {
    <View style={{flexDirection: 'row', width: '100%', marginTop: SIZES.xxs}}>
        <Image source={{uri: message.image}} style={{width: 50, height: 50, borderRadius: 25}}/>
        <View style={{}}>
            <Text>{message.name}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    
})