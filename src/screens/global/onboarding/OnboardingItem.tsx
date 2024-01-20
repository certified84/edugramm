import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Lottie from "lottie-react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../../assets/theme";

export default function OnboardingItem({ item }) {
  const { width } = useWindowDimensions();
  return (
    <View style={{ ...styles.container, width: width * 0.9 }}>
      <View style={{ flex: 0.9, width: "100%",  }}>
        <Lottie source={item.animation} autoPlay loop />
      </View>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // alignSelf: 'center',
    // justifyContent: "center",
    alignItems: "center",
    // height: "100%",
  },
  text: {
    flex: 0.1,
    ...TYPOGRAPHY.h3,
    textAlign: "center",
    color: COLORS.onPrimary,
  },
});
