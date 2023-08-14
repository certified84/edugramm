import React, { useState } from "react";
import { Button, Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { COLORS, SIZES, TYPOGRAPHY } from "../assets/theme";
import { Foundation, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const ChatDialog = ({ showImageDialog, setShowImageDialog, images, image }) => {


    return (
        //    {/* https://www.npmjs.com/package/react-native-modal */}
        <Modal
            isVisible={showImageDialog}
            onBackdropPress={() => setShowImageDialog(false)}
            // animationIn="slideInLeft"
            // animationOut="slideOutRight"
            // animationOutTiming={500}
        >

            <SafeAreaView style={styles.container} >
                {console.log(images)}
                {console.log(image)}
                {
                    images && <FlatList
                        data={images}
                        // style={{backgroundColor: 'green'}}
                        horizontal
                        renderItem={({ item }) => 
                            <Image
                            source={{ uri: item, }}
                            style={{
                                flex: 1,
                                width: "100%",
                            }} 
                            />
                        }
                        pagingEnabled
                        keyExtractor={(index) => index}
                        alwaysBounceVertical={false}
                        showsHorizontalScrollIndicator={false}
                    />
                }

                {
                    image && <Image
                        source={{ uri: image, }}
                        style={{
                            flex: 1,
                            width: "100%",
                        }} 
                    />
                }
            </SafeAreaView>
        </Modal>
    );
}

export default ChatDialog

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
