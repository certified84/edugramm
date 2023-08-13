import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES, TYPOGRAPHY } from '../assets/theme'
import { GoogleIcon } from '../assets/svg/SvgIcons'

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

export const ActionButton = ({style, onPress, buttonTitle, buttonColor, textColor }) => {
  return (
    <TouchableOpacity
      style={{...styles.actionBtn, ...style, backgroundColor: buttonColor}}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <Text style={{...styles.defaultBtnText, color: textColor}}>
        {buttonTitle}
      </Text>
    </TouchableOpacity>
  )
}

export const GoogleButton = ({style, onPress, buttonTitle, buttonColor, textColor }) => {
  return (
    <TouchableOpacity
      style={{...styles.actionBtn, ...styles.googleBtn, ...style, backgroundColor: buttonColor}}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: SIZES.sm }}>
          <GoogleIcon />
          <View style={{ marginHorizontal: SIZES.xs, }} />
          <Text style={{ ...TYPOGRAPHY.h2, ...styles.forgotPassword, textDecorationLine: "none" }}>{buttonTitle}</Text>
      </View>
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
  forgotPassword: {
      color: COLORS.primary,
      fontWeight: '700',
      textDecorationLine: 'underline',
  },
  googleBtn: {
    backgroundColor: COLORS.surface1,
    borderWidth: 2,
    borderColor: COLORS.primary,
  }
})