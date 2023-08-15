import { StyleSheet } from "react-native";


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
    
    // Light mode colors
    primary: '#00687B',
    onPrimary: '#FFFFFF',
    primaryContainer: '#AFECFF',
    onPrimaryContainer: '#001F27',
    secondary: '#4B6269',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#CEE7EF',
    onSecondaryContainer: '#061F25',
    tertiary: '#575C7E',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#DEE0FF',
    onTertiaryContainer: '#141937',
    background: '#FBFCFE',
    onBackground: '#191C1D',
    surface: '#FBFCFE',
    onSurface: '#191C1D',
    error: '#BA1A1A',
    onError: '#FFFFFF',
    errorContainer: '#FFDAD6',
    onErrorContainer: '#410002',
    surface1: '#EEF5F7',
    
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
        color: COLORS.black,
        fontFamily: "space-grotesk-bold",
        fontWeight: "700",
        fontSize: SIZES.md
    },
    h2: {
        color: COLORS.black,
        fontFamily: "space-grotesk-medium",
        fontWeight: "400",
        fontSize: SIZES.sm
    },
    p: {
        color: COLORS.black,
        fontFamily: "space-grotesk-regular",
        fontWeight: "400",
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