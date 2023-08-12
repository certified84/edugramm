import 'react-native-gesture-handler';
import { LogBox, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { useFonts } from 'expo-font';
import React, { useState, useEffect } from 'react'

const Stack = createStackNavigator();

// SCREENS IMPORTS
import {
  // OnBoardingScreen, AnimatedSplashScreen,
  ForgotPasswordScreen, LoginScreen, SignupScreen
} from './screens';
import { COLORS, SIZES } from './assets/theme';
import { MenuProvider } from 'react-native-popup-menu';


LogBox.ignoreLogs(["Constants.platform.ios.model",])

const App = () => {

  // FONT CONFIG 
  const [fontsLoaded] = useFonts({
    'comic-lg': require('./assets/fonts/comic-sans-bold.ttf'), //
    'comic-md': require('./assets/fonts/comic-sans.ttf'), // md 
    'comic-sm': require('./assets/fonts/comic-sans-light.ttf'), // sm
    'comic-xs': require('./assets/fonts/comic-sans-hairline.ttf'), // xs
    'comic-xxs': require('./assets/fonts/comic-sans-hairline.ttf'), // xxs
  });

  if (!fontsLoaded) {
    return null;
  }


  return (
    // <AnimatedSplashScreen>
      <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="LoginScreen"
            screenOptions={{
              headerTitleStyle: { ...customHeaderTitleStyle },
              headerBackTitle: " ",
              headerTintColor: COLORS.primary, // COLOR OF THE ALL HEADER TEXT 
              headerStyle: {
                backgroundColor: COLORS.lightGray
              }
            }}
          >
            {/* <Stack.Screen
              name="OnBoardingScreen"
              component={OnBoardingScreen}
              options={{
                headerShown: false,
                gestureEnabled: false
              }}
            /> */}
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
              options={{
                title: "Forgot Password",
              }}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                headerShown: false,
                gestureEnabled: false
              }}
            />
            <Stack.Screen
              name="SignupScreen"
              component={SignupScreen}
              options={{
                headerShown: false,
                gestureEnabled: false
              }}
            />
            {/* <Stack.Screen
              name="FeedDetailed"
              component={FeedDetailed}
              options={{
                title: "School Feed",
              }}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    // </AnimatedSplashScreen>
  )
}

export default App


const customHeaderTitleStyle = {
  fontFamily: "comic-md",
  fontWeight: "700",
  fontSize: SIZES.md,
  color: COLORS.black,
}