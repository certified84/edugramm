import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  FlatList,
} from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../assets/theme";
import React, { useEffect, useState } from "react";
import { Avatar } from "react-native-paper";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import ImageDialog from "./ImageDialog";
import VerifiedIcon from "./VerifiedIcon";
import { SplashIcon } from "../../assets/svg/SplashIcon";
import { auth, firestore } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { formatDate } from "../util/Utils";
import { useDocument } from "react-firebase-hooks/firestore";

export const PostCard = ({ item, navigation, userInfo }) => {
  const { width } = useWindowDimensions();
  const user = auth.currentUser;
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [liked, setLiked] = useState(item.likes.includes(user.uid));
  const [imageIndex, setImageIndex] = useState(0);

  const reference = doc(firestore, "users", item.uid);
  const [snapshot, loading, error] = useDocument(reference);
  const [photo, setPhoto] = useState<string>(null);

  async function likePost(isLiked: boolean) {
    console.log("Liked: ", isLiked);
    let likes = item.likes;
    isLiked ? likes.push(user.uid) : likes.splice(likes.indexOf(user.uid), 1);
    const postRef = doc(firestore, "posts", item.id);
    await updateDoc(postRef, {
      likes: [...likes],
    })
      .then(() => {
        // setLiked(!isLiked)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  useEffect(() => {
    if (snapshot && snapshot.exists()) {
      setPhoto(snapshot.data().photo);
    }
  }, [snapshot]);

  return (
    <View style={{ flex: 1, width: width }}>
      <ImageDialog
        showImageDialog={showImageDialog}
        setShowImageDialog={setShowImageDialog}
        image={item.photoUrl}
        images={item.images}
        index={imageIndex}
      />

      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: SIZES.md,
          paddingVertical: SIZES.xs,
        }}
      >
        <View>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ height: 50 }}
            onPress={() => {
              item.uid === user.uid
                ? navigation.navigate("ProfileScreen", { userInfo: userInfo })
                : navigation.navigate("UserDetailScreen", {
                    userInfo: { ...userInfo, name: item.name, uid: item.uid },
                  });
            }}
          >
            <View
              style={{
                overflow: "hidden",
                width: 43,
                height: 43,
                borderRadius: 43 / 2,
                backgroundColor: COLORS.primary,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* { photo ?  */}
              {/* <Avatar.Image size={40} source={{ uri: photo }} /> */}
              <SplashIcon />
              {/* } */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => navigation.navigate("PostDetailedScreen", { item })}
          />
        </View>
        <View style={{ flex: 1, marginStart: SIZES.xxs }}>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ ...TYPOGRAPHY.h3, color: COLORS.onSurface }}>
              {item.name}
            </Text>
            {item.verified && <VerifiedIcon />}
            <Text
              style={{
                flex: 1,
                ...TYPOGRAPHY.h3,
                color: COLORS.onSurface,
                textAlign: "right",
              }}
            >{` \u2022 ${formatDate(item.date)}`}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate("PostDetailedScreen", { item });
            }}
          >
            <Text
              style={{ ...TYPOGRAPHY.p, color: COLORS.onSurface }}
              numberOfLines={8}
            >
              {item.post}
            </Text>
          </TouchableOpacity>
          {item.images.length === 1 && (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setShowImageDialog(true)}
              style={{
                width: width * 0.7,
                height: width * 0.8,
                marginTop: SIZES.xs,
              }}
            >
              <Image
                source={{ uri: item.images[0] }}
                style={{
                  width: "100%",
                  height: width * 0.8,
                  borderRadius: SIZES.sm,
                }}
              />
            </TouchableOpacity>
          )}
          {item.images.length > 1 && (
            <>
              <FlatList
                data={item.images}
                horizontal
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      setImageIndex(index);
                      setShowImageDialog(true);
                    }}
                    style={{
                      width: width * 0.7,
                      height: width * 0.8,
                      marginTop: SIZES.xs,
                      marginEnd: SIZES.xs,
                    }}
                  >
                    <Image
                      source={{ uri: item }}
                      style={{
                        width: width * 0.7,
                        height: width * 0.8,
                        borderRadius: SIZES.sm,
                      }}
                    />
                  </TouchableOpacity>
                )}
                keyExtractor={(index) => index}
                alwaysBounceVertical={false}
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}

          <TouchableOpacity
            style={{ ...styles.bottomSection }}
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate("PostDetailedScreen", { item });
            }}
          >
            <View
              style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
            >
              <TouchableOpacity
                onPress={() => {
                  setLiked(!liked);
                  likePost(!liked);
                }}
              >
                <AntDesign
                  name={item.likes.includes(user.uid) ? "heart" : "hearto"}
                  size={SIZES.md}
                  color={
                    item.likes.includes(user.uid)
                      ? COLORS.red
                      : COLORS.onSurface
                  }
                />
              </TouchableOpacity>
              <Text style={styles.commentSection}>{item.likes.length}</Text>
              <Ionicons
                name="chatbubble-outline"
                size={SIZES.md}
                color={COLORS.onSurface}
              />
              <Text style={styles.commentSection}>{item.comments.length}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* {item.feed_type === "video" &&
                (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate("FeedDetailed", { item })}
                        style={{ height: 150, backgroundColor: COLORS.lightGray }}>
                    </TouchableOpacity>
                )
            } */}
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: COLORS.white,
          opacity: 0.1,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: SIZES.sm,
  },
  commentSection: {
    ...TYPOGRAPHY.h3,
    fontSize: SIZES.sm,
    marginStart: SIZES.xxs,
    marginEnd: SIZES.md,
    color: COLORS.onSurface,
  },
  dateSection: {
    flex: 0.6,
    ...TYPOGRAPHY.h3,
    textAlign: "right",
    justifyContent: "flex-end",
    alignSelf: "center",
    color: "#6F6F6F",
  },
});
