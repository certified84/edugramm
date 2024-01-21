import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../../assets/theme";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { SplashIcon } from "../../../../assets/svg/SplashIcon";
import { auth } from "../../../../firebase";

export default function HomeHeader({ titleText, navigation, userInfo }) {
  const user = auth.currentUser;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titleText}</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ marginHorizontal: SIZES.xs }}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("NotificationScreen")}
        >
          <MaterialCommunityIcons
            name="bell-outline"
            color={COLORS.onSurface}
            size={SIZES.xl + 5}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginStart: SIZES.xs }}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("ProfileScreen", { userInfo: { ...userInfo } })
          }
        >
          <View style={styles.profilePictureContainer}>
            {user.photoURL ? (
              <Avatar.Image size={35} source={{ uri: user.photoURL }} />
            ) : (
              <SplashIcon />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SIZES.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    ...TYPOGRAPHY.h1,
    fontFamily: "sansita-italic",
    fontSize: SIZES.xxl,
    color: COLORS.onSurface,
  },
  profilePictureContainer: {
    overflow: "hidden",
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
