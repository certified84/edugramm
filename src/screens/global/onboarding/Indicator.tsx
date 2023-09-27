import { StyleSheet, View } from "react-native";
import { COLORS, SIZES } from "../../../../assets/theme";

export default function Inidcator({ isSelected = true }) {
    return ( <View style={styles(isSelected).circle} /> )
}

const styles = (isSelected) => StyleSheet.create({
    circle: {
        width: SIZES.xs - 2, 
        height: SIZES.xs - 2, 
        borderRadius: (SIZES.xs - 2) / 2, 
        borderWidth: 1, 
        borderColor: COLORS.onPrimary, 
        backgroundColor: isSelected ? COLORS.onPrimary : COLORS.primary,
        marginHorizontal: SIZES.xxs / 2,
        marginTop: SIZES.xs / 2
    }
})