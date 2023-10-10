import { LogBox, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { COLORS, TYPOGRAPHY, SIZES } from '../../assets/theme';
import {
  // AnimatedSplashScreen,
  MainScreen, HomeScreen, PostDetailedScreen, PanZoomImage, ChatScreen, NotificationScreen, ProfileScreen, UserDetailScreen, FollowScreen, AddPostScreen, EditProfileScreen, SettingsScreen,
} from '../screens';

const Stack = createStackNavigator();

export default function MainStack({ customHeaderTitleStyle }) {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="MainScreen" 
                screenOptions={{ 
                    headerTitleStyle: { ...customHeaderTitleStyle },
                    headerBackTitle: " ",
                    headerTintColor: COLORS.onSurface,
                    title: ' ',
                    headerStyle: { backgroundColor: COLORS.surface, height: 120 }
                }}
            >
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
                        headerShadowVisible: false,
                    }}
                />
                <Stack.Screen
                    name="UserDetailScreen"
                    component={UserDetailScreen}
                    options={{
                        headerShown: true,
                        headerShadowVisible: false,
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
    )
}