import React, { useEffect, useRef, useState } from "react";
import { Button, Text, FlatList, View, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import Modal from "react-native-modal";
import { COLORS, SIZES, TYPOGRAPHY } from "../../assets/theme";
import { Foundation, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from "react-native";

const ChatDialog = ({ showImageDialog, setShowImageDialog, images, image, index }) => {

    const {width, height} = useWindowDimensions()
    const slidesRef = useRef(null)

    useEffect(() => {
        // console.log(index)
        if (index > 0)
            slidesRef.current.scrollToIndex({ index: index })
    }, [])

    return (
        //    {/* https://www.npmjs.com/package/react-native-modal */}
        <Modal
            isVisible={showImageDialog}
            onBackdropPress={() => setShowImageDialog(false)}
            animationIn="zoomIn"
            animationOut="zoomOut"
            backdropOpacity={1}
            deviceWidth={width}
            deviceHeight={height}
            // swipeDirection={["down",'left','right']}
            onSwipeComplete={(gestureState) => setShowImageDialog(false)}
            style={{margin: 0}}
            // animationOutTiming={500}
        >

            <SafeAreaView style={{...styles.container}} >
                {/* {console.log(image)} */}
                <View style={{flex: .2, justifyContent: 'center', paddingStart: SIZES.md}}>
                    <TouchableOpacity activeOpacity={.9} onPress={() => setShowImageDialog(false)} style={{backgroundColor: COLORS.white + 20, width: 35, height: 35, borderRadius: 25, justifyContent: 'center'}}>
                        <MaterialIcons style={{alignSelf: 'center'}} name='close' size={30} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
                {
                    images.length > 0 ? 
                    <FlatList
                        data={images}
                        horizontal
                        ref={slidesRef}
                        initialScrollIndex={index}
                        renderItem={({ item }) =>
                            <Image
                                source={{ uri: item }}
                                style={{
                                    flex: 1,
                                    width: width
                                }} 
                            />
                        }
                        pagingEnabled
                        keyExtractor={(index) => index}
                        alwaysBounceVertical={false}
                        onScrollToIndexFailed={() => {}}
                        showsHorizontalScrollIndicator={false}
                    /> :
                    <Image
                        source={{ uri: image, }}
                        style={{
                            flex: 1,
                        }} 
                    />
                }
                <View style={{flex: .2}} />
            </SafeAreaView>
        </Modal>
    );
}

export default ChatDialog

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black
    }
})
