import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import { RouteProp, NavigationProp } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SceneMap, TabView } from "react-native-tab-view";
import DescriptionTab from "./tabs/Description";
import RequirementsTab from "./tabs/Requirements";
import RenderTab from "./components/RenderTab";
import JobDetailComponent from "../../../components/JobDetailComponent";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { useDocument } from "react-firebase-hooks/firestore";
import { Loader } from "../../../components/Loader";
import { StackParamList } from "../../../../types";
import { defaultUser } from "../../../data/model/User";
import { auth, firestore } from "../../../../firebase";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../../assets/theme";
import { ActionButton } from "../../../components/Buttons";

type ScreenRouteProp = RouteProp<StackParamList, "JobDetailScreen">;
type NavProp = NavigationProp<StackParamList, "JobDetailScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavProp;
};

const JobDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { width, height } = useWindowDimensions();
  const job = route?.params.job!;
  const user = auth.currentUser;
  const [values, setValues] = useState({
    userData: defaultUser,
    bookmarked: route!.params.bookmarked,
    index: 0,
    routes: [
      { key: "description", title: "Description" },
      { key: "requirements", title: "Requirements" },
    ],
  });

  const userRef = doc(firestore, "users", user!.uid);
  const [userSnapshot, userLoading, userError] = useDocument(userRef);

  useEffect(() => {
    if (userSnapshot?.exists) {
      setValues({
        ...values,
        userData: { ...defaultUser, ...userSnapshot.data() },
      });
    }
  }, [userSnapshot]);

  async function bookmarkJob(bookmarked: boolean) {
    let bookmarks = values.userData.bookmarks!;
    bookmarked
      ? bookmarks.push(job.id)
      : bookmarks.splice(bookmarks.indexOf(job.id), 1);
    console.log("Bookmarks: ", bookmarks);
    await updateDoc(doc(firestore, "users", user!.uid), {
      bookmarks: bookmarks,
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "An error occurred. Please try again.",
      });
    });
  }

  const renderScene = SceneMap({
    description: () => <DescriptionTab job={job} />,
    requirements: () => <RequirementsTab job={job} />,
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.surface }}>
      <Loader showLoader={userLoading} />
      <View style={styles.innerContainer}>
        <Header
          title={route!.params.title}
          navigation={navigation}
          showBookmark={route!.params.showBookmark}
          bookmarked={values.bookmarked}
          onBookmarkPress={() => {
            setValues({ ...values, bookmarked: !values.bookmarked });
            bookmarkJob(!values.bookmarked);
          }}
        />
        {/* <ScrollView style={{ flex: 1 }}> */}
        <JobDetailComponent job={job} />

        <View style={{ ...styles.line, margin: SIZES.md }} />

        <TabView
          renderTabBar={() => (
            <RenderTab
              index={values.index}
              setIndex={(index) => setValues({ ...values, index: index })}
            />
          )}
          navigationState={{ index: values.index, routes: values.routes }}
          renderScene={renderScene}
          onIndexChange={(index) => setValues({ ...values, index: index })}
          initialLayout={{ width: width, height: height }}
          style={{ flex: 1, height: "auto" }}
        />

        <ActionButton
          style={styles.btnContinue}
          buttonTitle={"Apply Now"}
          buttonColor={COLORS.primary}
          textColor={COLORS.onPrimary}
          onPress={() => {
            navigation?.navigate("JobApplicationScreen", {
              job: job,
              title: "Apply to Job",
              showBookmark: false,
              bookmarked: false,
            });
          }}
        />
        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

export default JobDetailScreen;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    marginTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight! + SIZES.sm
        : SIZES.sm,
  },
  line: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: SIZES.sm,
  },
  btnContinue: {
    marginBottom: SIZES.xxs,
    marginHorizontal: SIZES.md,
    // borderRadius: SIZES.md,
  },
});
