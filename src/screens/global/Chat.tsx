import "expo-dev-client";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import {
  MaterialIcons,
  Ionicons,
  AntDesign,
  Feather,
} from "@expo/vector-icons";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../assets/theme";
import { useCallback, useEffect, useState } from "react";
import VerifiedIcon from "../../components/VerifiedIcon";
import { Avatar, TextInput } from "react-native-paper";
import { SplashIcon } from "../../../assets/svg/SplashIcon";
// import AgoraUIKit from "agora-rn-uikit";
import { auth, firestore } from "../../../firebase";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { defaultUser } from "../../data/model/User";
import { defaultChat, Chat } from "../../data/model/Chat";
import {
  GiftedChat,
  Bubble,
  Actions,
  Send,
  InputToolbar,
} from "react-native-gifted-chat";
import { StackParamList } from "../../../types";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

type ScreenRouteProp = RouteProp<StackParamList, "ChatScreen">;
type NavProp = NavigationProp<StackParamList, "ChatScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavProp;
};

const ChatScreen: React.FC<Props> = ({ route, navigation }) => {
  const user = auth.currentUser;

  const [values, setValues] = useState({
    userInfo: {
      ...defaultUser,
      ...route.params.userInfo,
    },
    chatId: "x",
    messages: [],
    message: "",
    snackMessage: "",
    loading: false,
    showSnackBar: false,
  });

  const userRef = doc(firestore, "users", values.userInfo.uid);
  const [snapshot, loading, error] = useDocument(userRef);

  const chatRef = collection(
    firestore,
    `chats/${values.userInfo.uid}_${user.uid}/messages`
  );
  const [chatSnapshot, chatLoading, chatError] = useCollection(chatRef);

  const chatRef2 = collection(
    firestore,
    `chats/${user.uid}_${values.userInfo.uid}/messages`
  );
  const [chatSnapshot2, chatLoading2, chatError2] = useCollection(chatRef2);

  const mainChatRef = collection(firestore, `chats/${values.chatId}/messages`);
  const q = query(mainChatRef, orderBy("createdAt", "desc"));
  const [mainChatSnapshot, mainChatLoading, mainChatError] = useCollection(q);

  useEffect(() => {
    if (mainChatSnapshot) {
      const data = mainChatSnapshot.docs.map((doc) => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user,
      }));
      setValues({
        ...values,
        messages: data,
      });
    }
  }, [mainChatSnapshot]);

  useEffect(() => {
    if (chatSnapshot && chatSnapshot.docs.length > 0) {
      setValues({
        ...values,
        chatId: `${values.userInfo.uid}_${user.uid}`,
      });
    } else {
      setValues({
        ...values,
        chatId: `${user.uid}_${values.userInfo.uid}`,
      });
    }
    console.log("Chat ID: ", values.chatId);
  }, [chatSnapshot, chatSnapshot2]);

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

  useEffect(
    () => setValues({ ...values, showSnackBar: values.snackMessage !== "" }),
    [values.snackMessage]
  );
  useEffect(() => {
    if (error && error.message !== "") {
      setValues({ ...values, showSnackBar: true, snackMessage: error.message });
    }
  }, [error]);

  const onSend = useCallback((messages = []) => {
    setValues((previousState) => ({
      ...values,
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    const { text } = messages[0];
    sendMessage(text);
    // saveLastConversation(text, createdAt) // Recent chat
    // sendDeviceNotification(text)
  }, []);

  async function sendMessage(text) {
    const data: Chat = {
      ...defaultChat,
      text: text,
      createdAt: new Date(),
      user: {
        _id: user.uid,
        name: user.displayName,
        avatar: user.photoURL,
      },
    };
    const chatId = values.chatId;
    console.log("Chat ID: ", chatId);
    await addDoc(collection(firestore, `chats/${chatId}/messages`), data)
      .then((snapshot) => {
        setValues({ ...values, message: "" });
        updateDoc(snapshot, { _id: snapshot.id });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setValues({
          ...values,
          message: "An error occurred. Please try again.",
          loading: false,
        });
        console.log(errorCode, errorMessage);
      });
  }

  // const [videoCall, setVideoCall] = useState(false);
  const connectionData = {
    appId: "8bc017f304734bc0bb5178fd629e2bd7",
    channel: "test",
    token:
      "007eJxTYNgxU2xSy1PfZ1xLvjhc5v7/gaN1+rZ1ZcnnVdYE/zd6Nq1bgcEiKdnA0DzN2MDE3NgEyE5KMjU0t0hLMTOyTDVKSjH/+dgrtSGQkSH9hjEDIxSC+CwMJanFJQwMAAzcIjY=",
  };

  // const callbacks = {
  //   EndCall: () => setVideoCall(false),
  // };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons
                name="chevron-back"
                size={SIZES.xl}
                color={COLORS.onSurface}
              />
            </TouchableOpacity>
          </View>
        );
      },
      headerRight: () => {
        return (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {}}
              activeOpacity={0.7}
              style={{ marginEnd: SIZES.md }}
            >
              <Feather name="phone" size={SIZES.xl} color={COLORS.onSurface} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: "green" }}
              onPress={() => console.log("Video: Clicked")}
              activeOpacity={0.7}
            >
              <Feather name="video" size={SIZES.xl} color={COLORS.onSurface} />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View
          style={{
            padding: SIZES.xxs + 4,
            borderRadius: 100,
            alignItems: "center",
            marginHorizontal: SIZES.xxs,
            backgroundColor: COLORS.onSecondary,
          }}
        >
          <Feather name="send" size={SIZES.md} color={COLORS.onSurface} />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: COLORS.onPrimaryContainer,
          },
          left: {
            color: COLORS.onSecondaryContainer,
          },
        }}
        wrapperStyle={{
          right: {
            color: COLORS.white,
            backgroundColor: COLORS.primaryContainer,
          },
          left: {
            color: COLORS.white,
            backgroundColor: COLORS.secondaryContainer,
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    //Add the extra styles via containerStyle
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderTopWidth: 1.5,
          borderTopColor: "#333",
          backgroundColor: COLORS.surface,
        }}
      />
    );
  };

  // videoCall ? (
  //   <AgoraUIKit connectionData={connectionData} rtcCallbacks={callbacks} />
  // ) :
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          alignItems: "center",
          marginEnd: SIZES.sm,
        }}
      >
        <TouchableOpacity
          style={{ padding: SIZES.xxs }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="chevron-back"
            size={SIZES.xl}
            color={COLORS.onSurface}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("UserDetailScreen", {
              userInfo: values.userInfo,
            })
          }
          style={{
            flex: 1,
            marginStart: SIZES.sm,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              marginEnd: SIZES.sm,
              overflow: "hidden",
              width: 43,
              height: 43,
              borderRadius: 43 / 2,
              backgroundColor: COLORS.primary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {values.userInfo.photo ? (
              <Avatar.Image size={40} source={{ uri: values.userInfo.photo }} />
            ) : (
              <SplashIcon />
            )}
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ ...TYPOGRAPHY.h3 }} numberOfLines={1}>
                {values.userInfo.name}
              </Text>
              {values.userInfo.verified && <VerifiedIcon />}
            </View>
            <Text
              style={{
                ...TYPOGRAPHY.h3,
                fontSize: SIZES.xs,
                color: COLORS.onSurface,
                opacity: 0.8,
              }}
            >
              Active now
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() =>
              Toast.show({
                title: "Feature not available",
                textBody:
                  "This feature is not available yet. Please check back later.",
                type: ALERT_TYPE.INFO,
              })
            }
            activeOpacity={0.7}
            style={{ padding: SIZES.xxs }}
          >
            <Feather name="phone" size={SIZES.xl} color={COLORS.onSurface} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Toast.show({
                title: "Feature not available",
                textBody:
                  "This feature is not available yet. Please check back later.",
                type: ALERT_TYPE.INFO,
              })
            }
            style={{ padding: SIZES.xxs }}
            activeOpacity={0.7}
          >
            <Feather name="video" size={SIZES.xl} color={COLORS.onSurface} />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: COLORS.white,
          opacity: 0.2,
          marginTop: SIZES.xxs,
        }}
      />

      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={values.messages}
          renderSend={renderSend}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          // alwaysShowSend
          renderAvatar={null}
          // messagesContainerStyle={{ backgroundColor: 'green'}}
          // textInputStyle={{ color: COLORS.onSurface }}
          onSend={(messages) => onSend(messages)}
          user={{ _id: user.uid }}
          scrollToBottom
        />
        {Platform.OS === "android" && (
          <KeyboardAvoidingView behavior="padding" />
        )}

        {/* <View style={{
                        // flex: 1,
                        flexDirection: 'row',
                        // width: '100%',
                        alignSelf: 'stretch',
                        overflow: 'hidden',
                        backgroundColor: COLORS.secondaryContainer,
                        alignItems: 'flex-end',
                        marginHorizontal: SIZES.xs,
                        borderRadius: 25
                    }}> */}
        {/* <TextInput
                            mode="outlined"
                            placeholder='Message'
                            value={values.message}
                            onChangeText={(text) => {
                                setValues({ ...values, message: text })
                            }}
                            multiline
                            // numberOfLines={30}
                            style={styles.inputField}
                            outlineColor={COLORS.secondaryContainer}
                            underlineColor={COLORS.onSecondaryContainer}
                            activeOutlineColor={COLORS.secondaryContainer}
                            placeholderTextColor={COLORS.onSecondaryContainer}
                            textColor={COLORS.onSecondaryContainer}
                        /> */}

        {/* </View> */}
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    // marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  inputField: {
    backgroundColor: COLORS.secondaryContainer,
    color: COLORS.black,
    paddingEnd: 40,
    flex: 1,
    paddingTop: 4,
    paddingVertical: 4,
  },
});
