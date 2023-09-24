import { Animated, FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../../assets/theme";
import { ActionButton } from "../../../components/Buttons";
import { useNavigation } from '@react-navigation/native';
import OnboardingItem from "./OnboardingItem";
import { useRef, useState } from "react";
import Inidcator from "./Indicator";

export default function OnboardingScreen() {
    const navigation = useNavigation()

    const scrollX = useRef(new Animated.Value(0)).current

    const [currentIndex, setCurrentIndex] = useState(0)
    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index) // This line keeps throwing up an error when the phone is rotated
    }).current

    // next slide need to be 50% on screen before it will change 
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current
    const slidesRef = useRef(null)

    const onboardingItems = [
        {
            id: 1,
            animation: require('../../../../assets/animations/learn.json'),
            text: "Connect with a world of knowledge",
            color: 'blue'
        },
        {
            id: 2,
            animation: require('../../../../assets/animations/learn.json'),
            text: "Learn from diverse minds across the globe",
            color: 'red'
        },
        {
            id: 3,
            animation: require('../../../../assets/animations/grow.json'),
            text: "Grow your potential",
            color: 'green'
        }
    ]

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary}}>
            <View style={styles.container}>

                <View style={{flex: .6, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{...TYPOGRAPHY.h1, fontFamily: 'sansita-italic', fontSize: SIZES.xxl, color: COLORS.onPrimary}}>EduGramm</Text>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <FlatList
                            data={onboardingItems}
                            renderItem={({ item }) => <OnboardingItem item={item} />}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                            alwaysBounceHorizontal={false}
                            keyExtractor={(item) => `${item.id}`}
                            onViewableItemsChanged={viewableItemsChanged}
                            viewabilityConfig={viewConfig}
                            ref={slidesRef}
                        />
                        <View style={{flexDirection: 'row'}}>
                            {onboardingItems.map((item, index) => { return(<Inidcator key={index} isSelected={currentIndex == item.id - 1}/>) })}
                        </View>
                    </View>
                </View>

                <View style={{flex: .3, width: '100%', justifyContent: 'center'}}>
                    <ActionButton style={{}} buttonTitle={'Create Account'} buttonColor={COLORS.secondaryContainer} textColor={COLORS.onSecondaryContainer} onPress={() => { navigation.navigate("SignupScreen" as never) }} />
                    <View style={{height: SIZES.md}}/>
                    <ActionButton style={{}} buttonTitle={'Login'} buttonColor={COLORS.onPrimaryContainer} textColor={COLORS.primaryContainer} onPress={() => { navigation.navigate("LoginScreen" as never) }} />
                </View>

                <View style={{flex: .1, justifyContent: 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{...TYPOGRAPHY.h2, color: COLORS.onPrimary, opacity: .5}}>Read about our</Text>
                        <TouchableOpacity activeOpacity={.8} style={{marginHorizontal: SIZES.xxs}}>
                            <Text style={{...TYPOGRAPHY.h2, color: COLORS.onPrimary}}>Terms</Text>
                        </TouchableOpacity>
                        <Text style={{...TYPOGRAPHY.h2, color: COLORS.onPrimary, opacity: .5}}>and</Text>
                        <TouchableOpacity activeOpacity={.8} style={{marginHorizontal: SIZES.xxs}}>
                            <Text style={{...TYPOGRAPHY.h2, color: COLORS.onPrimary}}>Privacy Policy</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SIZES.xl,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
});