import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SIZES, COLORS, TYPOGRAPHY } from "../../assets/theme";
import { Filter } from "../../assets/svg/Home";

interface SearchProps {
  text: string;
  onChangeText?: (text: string) => void | null;
  placeHolder: string;
  borderColor?: string | null;
  activeBorderColor?: string | null;
  style?: {} | null
}

const Search: React.FC<SearchProps> = ({
  text,
  onChangeText,
  placeHolder,
  borderColor,
  activeBorderColor,
  style
}) => (
  <TextInput
    placeholder={placeHolder}
    theme={{ roundness: SIZES.xs }}
    left={
      <TextInput.Icon
        icon={() => (
          <Ionicons name="search-outline" size={SIZES.md} color={COLORS.onSecondaryContainer} />
        )}
        color={COLORS.primary}
      />
    }
    right={
      <TextInput.Icon
        icon={() => (
          <TouchableOpacity activeOpacity={0.5}>
            <Filter fill={COLORS.onSecondaryContainer}/>
          </TouchableOpacity>
        )}
        color={COLORS.primary}
      />
    }
    style={{...styles.searchStyle, ...style}}
    mode="outlined"
    outlineColor={borderColor ?? "transparent"}
    activeOutlineColor={activeBorderColor ?? "transparent"}
    placeholderTextColor={"#ADADAF"}
    selectionColor={COLORS.black}
    value={text}
    onChangeText={onChangeText}
  />
);

export default Search;

const styles = StyleSheet.create({
  searchStyle: {
    backgroundColor: COLORS.secondaryContainer,
    color: COLORS.onSecondaryContainer,
    marginTop: SIZES.xl,
  },
});
