import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../assets/theme";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import EmptyDesign from "../../components/EmptyDesign";

const events = [];

export default function EventScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.surface }}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 0.2 }} />
          <Text
            style={{
              ...TYPOGRAPHY.h1,
              alignSelf: "center",
              color: COLORS.onSurface,
            }}
          >
            Events
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ flex: 0.2, alignItems: "center" }}
          >
            <MaterialCommunityIcons
              name={"calendar-edit"}
              color={COLORS.onSurface}
              size={SIZES.xl}
            />
          </TouchableOpacity>
        </View>
        {events && (
          <EmptyDesign
            title="Coming soon..."
            description="The events feature is on its way. Watch this space"
          />
        )}
      </View>
    </SafeAreaView>
  );
}
