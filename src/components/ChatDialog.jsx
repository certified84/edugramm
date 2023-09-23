import React, { useState } from "react";
import { Button, Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { COLORS, SIZES, TYPOGRAPHY } from "../assets/theme";
import { Foundation, FontAwesome5, MaterialIcons } from '@expo/vector-icons'

const ChatDialog = ({ showPersonDialog, setShowPersonDialog, name, image }) => {


    return (
        //    {/* https://www.npmjs.com/package/react-native-modal */}
        <Modal
            isVisible={showPersonDialog}
            onBackdropPress={() => setShowPersonDialog(false)}
            animationIn="slideInLeft"
            animationOut="slideOutRight"
            animationOutTiming={500}
        >

            <View style={styles.container} >
                <View style={{
                    position: "absolute",
                    zIndex: 1,
                    backgroundColor: COLORS.black,
                    width: "100%",
                    padding: 12,
                    opacity: 0.5,
                    borderTopLeftRadius: SIZES.md,
                    borderTopRightRadius: SIZES.md,
                }}>
                    <Text style={{
                        ...TYPOGRAPHY.h2,
                        color: COLORS.white,
                    }}>{name}</Text>
                </View>

                <Image
                    source={{ uri: image, }}
                    style={{
                        flex: 0.95,
                        width: "100%",
                        height: 250,
                        borderTopLeftRadius: SIZES.md,
                        borderTopRightRadius: SIZES.md,
                    }} />

                <View style={{
                    flex: 0.15,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginHorizontal: SIZES.md
                }}>
                    <MaterialIcons name="message" size={SIZES.md} color={COLORS.white} onPress={() => { }} />
                    <FontAwesome5 name="user-slash" size={SIZES.md} color={COLORS.white} onPress={() => { }} />
                    <Foundation name="info" size={SIZES.lg} color={COLORS.white} onPress={() => { }} />
                </View>
            </View>

        </Modal>
    );
}

export default ChatDialog

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        marginVertical: SIZES.xl + 200,
        marginHorizontal: SIZES.xl + 10,
        borderRadius: SIZES.md
    }
})
