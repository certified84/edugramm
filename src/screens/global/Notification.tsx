import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../assets/theme";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import EmptyDesign from "../../components/EmptyDesign";

const notifications = [];

export default function NotificationScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: SIZES.md,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="chevron-back"
              size={SIZES.xl}
              color={COLORS.onSurface}
            />
          </TouchableOpacity>
          <Text
            style={{
              ...TYPOGRAPHY.h1,
              flex: 1,
              textAlign: "center",
              marginEnd: SIZES.xl,
              color: COLORS.onSurface,
            }}
          >
            Notifications
          </Text>
        </View>
        {notifications.length <= 0 && (
          <EmptyDesign
            title="There's nothing here yet."
            description="Your notifications will appear here when they are available..."
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
