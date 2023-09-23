import { Appearance, StyleSheet } from "react-native";

const colorScheme = Appearance.getColorScheme()
console.log(colorScheme)
const isDarkTheme = colorScheme !== 'dark';
export const COLORS = {

    // General Colors
    black: '#000000',
    white: '#FFFFFF',
    green: "green",
    red: "#C00000",
    yellow: '#F5C51B',
    primaryLight: "#F9BBE7",
    secondaryLight: "",
    lightGray: "#E9E9E9",
    darkGray: "#B4B4B4",
    searchInput: !isDarkTheme ? '#E9E9E9' : '#B4B4B4',
    
    // Light mode colors
    primary: !isDarkTheme ? '#00687B' : '#57D6F6',
    onPrimary: !isDarkTheme ? '#FFFFFF' : '#003641',
    primaryContainer: !isDarkTheme ? '#AFECFF' : '#004E5D',
    onPrimaryContainer: !isDarkTheme ? '#001F27' : '#AFECFF',
    secondary: !isDarkTheme ? '#4B6269' : '#B2CBD3',
    onSecondary: !isDarkTheme ? '#FFFFFF' : '#1D343A',
    secondaryContainer: !isDarkTheme ? '#CEE7EF' : '#344A51',
    onSecondaryContainer: !isDarkTheme ? '#061F25' : '#CEE7EF',
    tertiary: !isDarkTheme ? '#575C7E' : '#C0C4EB',
    onTertiary: !isDarkTheme ? '#FFFFFF' : '#292E4D',
    tertiaryContainer: !isDarkTheme ? '#DEE0FF' : '#C0C4EB',
    onTertiaryContainer: !isDarkTheme ? '#141937' : '#DEE0FF',
    background: !isDarkTheme ? '#FBFCFE' : '#191C1D',
    onBackground: !isDarkTheme ? '#191C1D' : '#E1E3E4',
    surface: !isDarkTheme ? '#FBFCFE' : '#191C1D',
    onSurface: !isDarkTheme ? '#191C1D' : '#E1E3E4',
    error: !isDarkTheme ? '#BA1A1A' : '#FFB4AB',
    onError: !isDarkTheme ? '#FFFFFF' : '#690005',
    errorContainer: !isDarkTheme ? '#FFDAD6' : '#93000A',
    onErrorContainer: !isDarkTheme ? '#410002' : '#FFDAD6',
    surface1: !isDarkTheme ? '#EEF5F7' : '#1C2528',
    
    // Dark mode colors
    primaryDark: '#57D6F6',
    onPrimaryDark: '#003641',
    primaryContainerDark: '#004E5D',
    onPrimaryContainerDark: '#AFECFF',
    secondaryDark: '#B2CBD3',
    onSecondaryDark: '#1D343A',
    secondaryContainerDark: '#344A51',
    onSecondaryContainerDark: '#CEE7EF',
    tertiaryDark: '#C0C4EB',
    onTertiaryDark: '#292E4D',
    tertiaryContainerDark: '#404565',
    onTertiaryContainerDark: '#DEE0FF',
    backgroundDark: '#191C1D',
    onBackgroundDark: '#E1E3E4',
    surfaceDark: '#191C1D',
    onSurfaceDark: '#E1E3E4',
    errorDark: '#FFB4AB',
    onErrorDark: '#690005',
    errorContainerDark: '#93000A',
    onErrorContainerDark: '#FFDAD6',
    surface1Dark: '#1C2528',
}

export const SIZES = {
    xxs: 8,
    xs: 12,
    sm: 15,
    md: 18,
    lg: 22,
    xl: 26,
    xxl: 32,
}


export const TYPOGRAPHY = {
    h1: {
        color: COLORS.onSurface,
        fontFamily: "space-grotesk-bold",
        fontSize: SIZES.lg
    },
    h2: {
        color: COLORS.onSurface,
        fontFamily: "space-grotesk-medium",
        fontSize: SIZES.sm,
    },
    p: {
        color: COLORS.onSurface,
        fontFamily: "space-grotesk-regular",
        fontSize: SIZES.sm
    },
}


export const LINE = {
    horizontal: {
        marginVertical: SIZES.xs,
        borderBottomColor: COLORS.black,
        borderBottomWidth: StyleSheet.hairlineWidth + 1
    }
}

export const SHADOWS = {
    light: {
        shadowColor: COLORS.gray,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    medium: {
        shadowColor: COLORS.gray,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    dark: {
        shadowColor: COLORS.gray,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.51,
        shadowRadius: 9.11,

        elevation: 14,
    },
};