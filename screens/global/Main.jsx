import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { COLORS, SHADOWS, SIZES, TYPOGRAPHY } from '../../assets/theme';
import HomeScreen from './home/Home';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { useTheme } from 'react-native-paper';
import CommunityScreen from './Community';

const Tab = createMaterialBottomTabNavigator();

const MainScreen = () => {

  // REMOVE WEIRD TAB NAVIGATION COLOR 
  const theme = useTheme()
  theme.colors.secondaryContainer = "transparent"

  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="HomeScreen"
        activeColor={COLORS.onSurface}
        inactiveColor={COLORS.onSurface}
        barStyle={{ backgroundColor: COLORS.surface }}
        screenListeners={{
          tabPress: (e) => { }
        }}
      >
        <Tab.Screen name="HomeScreen" component={HomeScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, focused }) => {
              return  (
                <View style={styles.tabBarIcon}>
                    <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} color={color} size={SIZES.xl} />
                </View>
              )
            },
            tabBarBadge: 2
          }}
        />
        <Tab.Screen name="SearchScreen" component={HomeScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, focused }) => {
                return  (
                  <View style={styles.tabBarIcon}>
                      <Ionicons name={focused ? 'search' : 'search-outline'} color={color} size={SIZES.xl} />
                  </View>
                )
            },
            tabBarBadge: 3
          }}
        />
        <Tab.Screen name="CommunitiesScreen" component={CommunityScreen}
          options={{
            tabBarLabel: "",
            showLabel: false,
            tabBarIcon: ({ color, focused }) => {
                return  (
                  <View style={styles.tabBarIcon}>
                    <Ionicons name={focused ? 'people' : 'people-outline'} color={color} size={SIZES.xl} />
                  </View>
                )
            },
          }}
        />
        <Tab.Screen name="EventsScreen" component={HomeScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, focused }) => {
                return  (
                  <View style={styles.tabBarIcon}>
                    <Ionicons name={focused ? 'calendar' : 'calendar-outline'} color={color} size={SIZES.xl} />
                  </View>
                )
            },
          }}
        />
        <Tab.Screen name="JobsScreen" component={HomeScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, focused }) => {
                return  (
                  <View style={styles.tabBarIcon}>
                      <MaterialCommunityIcons name={focused ? 'toolbox' : 'toolbox-outline'} color={color} size={SIZES.xl} />
                  </View>
                )
            },
          }}
        />
      </Tab.Navigator>
    </View>
  )
}

export default MainScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  tabBarIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
})