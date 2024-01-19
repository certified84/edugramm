import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../assets/theme";
import EmptySVG from "../../assets/svg/EmptySVG";

interface EmptyDesignProps {
  title: string;
  description: string;
  style?: StyleProp<ViewStyle>;
}
const EmptyDesign: React.FC<EmptyDesignProps> = ({ title, description, style }) => {
  return (
    <View style={[styles.container, style]}>
      <EmptySVG />
      <Text style={{ ...TYPOGRAPHY.h3, marginTop: 30, marginBottom: 4 }}>
        {title}
      </Text>
      <Text style={styles.emptySubtitle}>{description}</Text>
    </View>
  );
};

export default EmptyDesign;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 24,
  },
  emptySubtitle: {
    ...TYPOGRAPHY.h3,
    fontSize: SIZES.xs,
    color: COLORS.onSurface,
    opacity: 0.7,
    textAlign: "center",
  },
});
