import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SIZES, COLORS, TYPOGRAPHY } from "../../../../theme";

interface RenderTabProps {
  index: number;
  setIndex: (index: number) => void;
}

const RenderTab: React.FC<RenderTabProps> = ({ index, setIndex }) => {
  return (
    <View style={styles.renderTabContainer}>
      <TabTitle
        title={"Description"}
        selected={index === 0}
        onPress={() => setIndex(0)}
      />
      <TabTitle
        title={"Requirements"}
        selected={index === 1}
        onPress={() => setIndex(1)}
      />
    </View>
  );
};

export default RenderTab;

interface TabTitleProps {
  title: string;
  selected: boolean;
  onPress?: () => void;
}

const TabTitle: React.FC<TabTitleProps> = ({ title, selected, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={{
        ...styles.tabTitleContainer,
        backgroundColor: selected ? "#1472FF" : COLORS.white,
      }}
    >
      <Text
        style={{
          ...styles.tabTitle,
          color: selected ? COLORS.white : COLORS.black,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  renderTabContainer: {
    flexDirection: "row",
    marginHorizontal: SIZES.md,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#F0F0F0",
    borderRadius: SIZES.sm + 5,
  },
  tabTitleContainer: {
    flex: 0.5,
    alignItems: "center",
    borderRadius: SIZES.md,
    padding: SIZES.sm,
  },
  tabTitle: {
    ...TYPOGRAPHY.h4,
    fontSize: SIZES.sm,
  },
});
