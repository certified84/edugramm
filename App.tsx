import 'react-native-gesture-handler';
import { LogBox, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { useFonts } from 'expo-font';
import React, { useState, useEffect } from 'react'

import {PermissionsAndroid, Platform} from 'react-native';
import {
    ClientRoleType,
    createAgoraRtcEngine,
    IRtcEngine,
    RtcSurfaceView,
    ChannelProfileType,
} from 'react-native-agora';


const Stack = createStackNavigator();

// SCREENS IMPORTS
import {
  // AnimatedSplashScreen,
  OnboardingScreen, ForgotPasswordScreen, LoginScreen, SignupScreen,
  MainScreen, HomeScreen, PostDetailedScreen, PanZoomImage, ChatScreen, NotificationScreen, ProfileScreen, UserDetailScreen, FollowScreen, AddPostScreen, EditProfileScreen, SettingsScreen,
} from './src/screens';
import { COLORS, SIZES, TYPOGRAPHY } from './assets/theme';
import { MenuProvider } from 'react-native-popup-menu';
import RootNavigation from './src/navigation';
import { customFontLocation } from './src/constants';


LogBox.ignoreLogs(["Constants.platform.ios.model",])

const App = () => {
  const [fontsLoaded] = useFonts(customFontLocation);
  if (!fontsLoaded) {
    return null;
  }

  return (
    // <AnimatedSplashScreen>
      <MenuProvider>
        <RootNavigation />
      </MenuProvider>
    // </AnimatedSplashScreen>
  )
}

export default App


const customHeaderTitleStyle = {
  fontFamily: "space-grotesk-medium",
  // fontWeight: 'bold',
  fontSize: SIZES.md,
  color: COLORS.onSurface,
}