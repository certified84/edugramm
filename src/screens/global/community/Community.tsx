import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../../assets/theme";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import VerifiedIcon from "../../../components/VerifiedIcon";
import { collection, doc, orderBy, query, where } from "firebase/firestore";
import { auth, firestore } from "../../../../firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { useEffect, useState } from "react";
import CommunityPlaceHolder from "../../../../assets/svg/CommunityPlaceHolder";
import { StackParamList } from "../../../../types";
import { RouteProp, NavigationProp } from "@react-navigation/native";
import { defaultUser } from "../../../data/model/User";

type ScreenRouteProp = RouteProp<StackParamList, "CommunityScreen">;
type NavProp = NavigationProp<StackParamList, "CommunityScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavProp;
};

const CommunityScreen: React.FC<Props> = ({ route, navigation }) => {

  const [values, setValues] = useState({
    userInfo: defaultUser,
    chatId: "x",
    messages: [],
    message: "",
    snackMessage: "",
    loading: false,
    showSnackBar: false,
  });

  const user = auth.currentUser;
  const userRef = doc(firestore, "users", user.uid);
  const [snapshot, loading, error] = useDocument(userRef);

  const communitiesRef = collection(firestore, "communities");
  const communitiesQuery = query(communitiesRef);
  const [communitiesSnapshot, communitiesLoading, communitiesError] =
    useCollection(communitiesQuery);
  const [communities, setCommunities] = useState([]);

  const chatsRef = collection(firestore, "chats");
  const chatsQuery = query(
    chatsRef,
    where("ids", "array-contains", user.uid),
    // orderBy("timestamp", "desc")
  );
  const [chatSnapshot, chatLoading, chatError] = useCollection(chatsQuery);

  useEffect(() => {
    if (chatSnapshot) {
      // const data = chatSnapshot.docs
      setValues({
        ...values,
        messages: chatSnapshot.docs
      });
    }
  }, [chatSnapshot]);

  useEffect(() => {
    if (snapshot && snapshot.exists()) {
      setValues({
        ...values,
        userInfo: {
          ...defaultUser,
          ...snapshot.data(),
        },
      });
    }
  }, [snapshot]);

  useEffect(() => {
    if (communitiesSnapshot) {
      const data = communitiesSnapshot.docs;
      setCommunities(data);
    }
  }, [communitiesSnapshot]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.surface }}>
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 0.3 }} />
          <Text
            style={{
              ...TYPOGRAPHY.h1,
              alignSelf: "center",
              color: COLORS.onSurface,
            }}
          >
            Communities & Chat
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CreateCommunityScreen" as never)
            }
            activeOpacity={0.8}
            style={{ flex: 0.3, alignItems: "center" }}
          >
            <AntDesign
              name={"addusergroup"}
              color={COLORS.onSurface}
              size={SIZES.xl}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={communities}
          style={{ alignSelf: "center" }}
          horizontal
          renderItem={({ item }) => (
            <Community item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => `${item.id}`}
          alwaysBounceVertical={false}
          showsHorizontalScrollIndicator={false}
        />
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: COLORS.darkGray,
            marginVertical: SIZES.xs,
          }}
        />
      </View>

      <View>
        <FlatList
          data={values.messages}
          renderItem={({ item }) => (
            <Message
              onPress={() =>
                {}
                // navigation.navigate("ChatScreen", { userInfo: item })
              }
              message={item.data()}
            />
          )}
          keyExtractor={(item) => `${item.id}`}
          alwaysBounceVertical={false}
          ListFooterComponent={<View style={{ height: 220 }} />}
        />
      </View>
    </SafeAreaView>
  );
};

const Community = ({ item, navigation }) => {
  const community = item.data();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("CommunityDetailScreen", {
          communityInfo: community,
        })
      }
      activeOpacity={0.7}
      style={{
        borderRadius: 15,
        marginVertical: SIZES.sm,
        marginHorizontal: SIZES.xxs,
        width: 180,
        height: 130,
        overflow: "hidden",
      }}
    >
      {community.image ? (
        <ImageBackground
          source={{ uri: community.image }}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <CommunityPlaceHolder />
      )}
      {/* <ImageBackground source={{uri: community.image}} resizeMode='cover' style={{width: '100%', height: '100%', }}> */}
      {/* <View /> */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: community.color,
          width: "100%",
          padding: SIZES.xs,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            ...TYPOGRAPHY.h3,
            color: COLORS.onSurface,
            alignSelf: "center",
          }}
        >
          {community.name}
        </Text>
      </View>
      {/* </ImageBackground> */}
    </TouchableOpacity>
  );
};

const Message = ({ message, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flex: 1,
        flexDirection: "row",
        margin: SIZES.sm,
        marginBottom: 0,
      }}
    >
      <Image
        source={{ uri: message.image }}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
      <View
        style={{
          flex: 1,
          marginHorizontal: SIZES.xs,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", flex: 0.8 }}>
            <Text
              style={{ ...TYPOGRAPHY.h3, color: COLORS.onSurface }}
              numberOfLines={1}
            >
              {message.name}
            </Text>
            <VerifiedIcon />
          </View>
          <Text
            style={{
              ...TYPOGRAPHY.h3,
              color: message.isRead ? COLORS.onSurface : COLORS.primary,
            }}
          >
            Yesterday
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              ...TYPOGRAPHY.h3,
              color: COLORS.onSurface,
              opacity: 0.7,
              flex: 0.9,
            }}
            numberOfLines={2}
          >
            {message.message}
          </Text>
          <View
            style={{
              marginEnd: SIZES.xxs,
              width: SIZES.xxs,
              height: SIZES.xxs,
              backgroundColor: COLORS.primary,
              borderRadius: SIZES.xxs / 2,
              alignSelf: "center",
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CommunityScreen;

const styles = StyleSheet.create({});
