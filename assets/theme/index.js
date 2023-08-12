import { StyleSheet } from "react-native";


export const COLORS = {
    black: "#000",
    white: "#fff",
    green: "green",
    red: "#C00000",
    yellow: '#F5C51B',

    primary: "#AE0057",
    primaryLight: "#F9BBE7",
    primaryDark: "#650032",

    secondary: "#13005C",
    secondaryLight: "",

    tertiary: "#F5C51B",
    lightGray: "#E9E9E9",
    darkGray: "#B4B4B4"
}

export const SIZES = {
    xxs: 8,
    xs: 12,
    sm: 15,
    md: 18,
    lg: 22,
    xl: 26,
}


export const TYPOGRAPHY = {
    h1: {
        color: COLORS.black,
        fontFamily: "comic-lg",
        fontWeight: "700",
        fontSize: SIZES.md
    },
    h2: {
        color: COLORS.black,
        fontFamily: "comic-md",
        fontWeight: "400",
        fontSize: SIZES.sm
    },
    p: {
        color: COLORS.black,
        fontFamily: "comic-sm",
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