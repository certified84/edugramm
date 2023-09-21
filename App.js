import 'react-native-gesture-handler';
import { LogBox, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { useFonts } from 'expo-font';
import React, { useState, useEffect } from 'react'

const Stack = createStackNavigator();

// SCREENS IMPORTS
import {
  // AnimatedSplashScreen,
  OnboardingScreen, ForgotPasswordScreen, LoginScreen, SignupScreen,
  MainScreen, HomeScreen, PostDetailedScreen, PanZoomImage, ChatScreen, NotificationScreen, ProfileScreen, UserDetailScreen, FollowScreen, AddPostScreen, EditProfileScreen, SettingsScreen,
} from './screens';
import { COLORS, SIZES, TYPOGRAPHY } from './assets/theme';
import { MenuProvider } from 'react-native-popup-menu';


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
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="OnboardingScreen"
            screenOptions={{
              headerTitleStyle: { ...customHeaderTitleStyle },
              headerBackTitle: " ",
              headerTintColor: COLORS.onSurface, // COLOR OF THE ALL HEADER TEXT 
              title: ' ',
              headerStyle: {
                backgroundColor: COLORS.surface,
                height: 120,
              }
            }}
          >
            <Stack.Screen
              name="OnboardingScreen"
              component={OnboardingScreen}
              options={{
                headerShown: false,
                gestureEnabled: false
              }}
            />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignupScreen"
              component={SignupScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MainScreen"
              component={MainScreen}
              options={{
                headerShown: false,
                gestureEnabled: false
              }}
            />
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                headerShown: false,
                gestureEnabled: false
              }}
            />
            <Stack.Screen
              name="PostDetailedScreen"
              component={PostDetailedScreen}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="PanZoomImage"
              component={PanZoomImage}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="ChatScreen"
              component={ChatScreen}
              options={{
                headerShown: true,
                headerTitleContainerStyle: {
                  overflow: 'hidden',
                  margin: 0
                },
                headerLeftContainerStyle: {
                  width: 100,
                  marginEnd: 0,
                  paddingStart: SIZES.xs
                },
                headerRightContainerStyle: {
                  width: 150,
                  paddingEnd: SIZES.xs
                }
                // headerShadowVisible: false
              }}
            />
            <Stack.Screen
              name="NotificationScreen"
              component={NotificationScreen}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="UserDetailScreen"
              component={UserDetailScreen}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="FollowScreen"
              component={FollowScreen}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="AddPostScreen"
              component={AddPostScreen}
              options={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
              }}
            />
            <Stack.Screen
              name="EditProfileScreen"
              component={EditProfileScreen}
              options={{
                headerTitle: () => {return(<Text style={TYPOGRAPHY.h1}>Edit profile</Text>)},
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                headerShadowVisible: false,
                headerLeftContainerStyle: { paddingStart: SIZES.xs },
                headerRightContainerStyle: { paddingEnd: SIZES.xs }
              }}
            />
            <Stack.Screen
              name="SettingsScreen"
              component={SettingsScreen}
              options={{
                headerTitle: () => {return(<Text style={TYPOGRAPHY.h1}>Settings</Text>)},
                // headerShadowVisible: false,
                headerLeftContainerStyle: { paddingStart: SIZES.xs },
                headerRightContainerStyle: { paddingEnd: SIZES.xs }
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    // </AnimatedSplashScreen>
  )
}

export default App


const customHeaderTitleStyle = {
  fontFamily: "space-grotesk-medium",
  fontWeight: "700",
  fontSize: SIZES.md,
  color: COLORS.onSurface,
}