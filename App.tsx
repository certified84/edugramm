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


LogBox.ignoreLogs(["Constants.platform.ios.model",])

const App = () => {

  // FONT CONFIG 
  const [fontsLoaded] = useFonts({
    'space-grotesk-bold': require('./assets/fonts/space_grotesk_bold.ttf'), // lg
    'space-grotesk-semi-bold': require('./assets/fonts/space_grotesk_semi_bold.ttf'), // md
    'space-grotesk-medium': require('./assets/fonts/space_grotesk_medium.ttf'), // sm
    'space-grotesk-regular': require('./assets/fonts/space_grotesk_regular.ttf'), // xs
    'space-grotesk-light': require('./assets/fonts/space_grotesk_light.ttf'), // xxs
    'sansita-italic': require('./assets/fonts/sansita-italic.ttf'), // sansita-italic
  });

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