import { LogBox, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../../assets/theme';
import {
  // AnimatedSplashScreen,
  OnboardingScreen, ForgotPasswordScreen, LoginScreen, SignupScreen,
} from '../screens';

const Stack = createStackNavigator();

export default function AuthStack({ customHeaderTitleStyle }) {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="OnboardingScreen" 
                screenOptions={{ 
                    headerTitleStyle: { ...customHeaderTitleStyle },
                    headerBackTitle: " ",
                    headerTintColor: COLORS.onSurface,
                    title: ' ',
                    headerStyle: { backgroundColor: COLORS.surface, height: 120, }
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
            </Stack.Navigator>
        </NavigationContainer>
    )
}