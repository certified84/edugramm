import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../../assets/theme";
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { followerCount } from "../../../util/Utils";
import { Avatar } from "react-native-paper";
import { PostsTab } from "./Tabs";

export default function ProfileScreen() {

    const navigation = useNavigation()

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.surface}}>
            <View style={{flex: 1}}>
                <View style={{paddingHorizontal: SIZES.md}}>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TouchableOpacity style={{width: '30%', flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back" size={SIZES.xl} color={COLORS.onSurface}/>
                            {/* <Text style={{...TYPOGRAPHY.h2}}>Back</Text> */}
                        </TouchableOpacity>

                        <TouchableOpacity style={{width: '30%', flexDirection: 'row-reverse', alignItems: 'center'}} onPress={() => navigation.navigate('SettingsScreen' as never)}>
                            <MaterialIcons name="menu-open" size={SIZES.xl} color={COLORS.onSurface}/>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: SIZES.md}}>
                        <View style={{flex: 1, marginEnd: SIZES.sm}}>
                            <Text style={{...TYPOGRAPHY.h1}} numberOfLines={2}>Samson Achiaga</Text>
                        </View>
                        <View style={{width: 53, height: 53, borderRadius: 53 / 2, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center'}}>
                            <Avatar.Image size={50} source={{ uri: 'https://source.unsplash.com/random/?man,kid' }} />
                        </View>
                    </View>
                    
                    <Text style={{...TYPOGRAPHY.p}}>
                        Mobile Application developer at Zettaworks Technologies. React Native | JavaScript | Kotlin | Dart | Flutter
                    </Text>
                    
                    <View style={{marginTop: SIZES.md}}>
                        <Text style={{...TYPOGRAPHY.p}}>{`Zettaworks Technologies \u2022 Federal University of Technology, Akure`}</Text>
                        <Text style={{...TYPOGRAPHY.p, opacity: .5}}>{`Badagry, Lagos state, Nigeria`}</Text>
                    </View>
                    
                    <View style={{flexDirection: 'row', marginTop: SIZES.sm}}>
                        <TouchableOpacity activeOpacity={.8} onPress={() => navigation.navigate('FollowScreen' as never)}>
                            <Text style={{...TYPOGRAPHY.h2, opacity: .5}}>{`${followerCount(200000000)} followers \u2022 `}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.8} style={{flex: 1}}>
                            <Text style={{...TYPOGRAPHY.h2, opacity: .5}} numberOfLines={1}>github.com/certified84</Text>
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

                <PostsTab />
            </View>
        </SafeAreaView>
    )
}