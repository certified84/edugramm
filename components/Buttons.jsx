import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES, TYPOGRAPHY } from '../assets/theme'

export const AuthButton = ({text, textColor, buttonColor, onPress}) => {
  return (
    <TouchableOpacity style={styles.authButtonContainer} onPress={onPress} activeOpacity={0.5}>
        <Text style={{ ...TYPOGRAPHY.h2, fontSize: SIZES.md }}>{text}</Text>
    </TouchableOpacity>
  )
}

export const DefaultButton = ({ onPress, buttonTitle }) => {
  return (
    <TouchableOpacity
      style={styles.defaultBtn}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <Text style={styles.defaultBtnText}>
        {buttonTitle}
      </Text>
    </TouchableOpacity>
  )
}

export const ActionButton = ({ onPress, buttonTitle, buttonColor, textColor }) => {
  return (
    <TouchableOpacity
      style={{...styles.actionBtn, backgroundColor: buttonColor}}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <Text style={{...styles.defaultBtnText, color: textColor}}>
        {buttonTitle}
      </Text>
    </TouchableOpacity>
  )
}

export const DangerButton = () => {
  return (
    <View>
      <Text>AuthButton</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  defaultBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.xs,
    width: "90%",
    alignSelf: "center"
  },
  actionBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    width: "90%",
    alignSelf: "center"
  },
  defaultBtnText: {
    ...TYPOGRAPHY.h1,
    color: COLORS.white,
    textAlign: "center",
    padding: SIZES.sm
  },
  authButtonContainer: {
      height: 54,
      alignItems: 'center',
      marginTop: 24,
      marginStart: 32,
      marginEnd: 32,
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: '#F5C51B',
  },
})