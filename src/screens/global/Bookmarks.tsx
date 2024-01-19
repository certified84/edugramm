import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import JobComponent from "../../components/JobComponent";
import { RouteProp, NavigationProp } from "@react-navigation/native";
import {
  DocumentData,
  Firestore,
  collection,
  doc,
  query,
  where,
} from "firebase/firestore";
import { auth, firestore } from "../../../firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { StackParamList } from "../../../types";
import { Loader } from "../../components/Loader";
import Search from "../../components/Search";
import { SIZES, COLORS, TYPOGRAPHY } from "../../../assets/theme";
import { defaultUser } from "../../data/model/User";
import EmptyDesign from "../../components/EmptyDesign";

type ScreenRouteProp = RouteProp<StackParamList, "BookmarksScreen">;
type NavProp = NavigationProp<StackParamList, "BookmarksScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavProp;
};

const BookmarksScreen: React.FC<Props> = ({ route, navigation }) => {
  const { width } = useWindowDimensions();
  const [searchText, setSearchText] = useState("");
  const [userData, setUserData] = useState({ ...defaultUser });
  const user = auth.currentUser;

  const userRef = doc(firestore, "users", user!.uid);
  const [userSnapshot, userLoading, userError] = useDocument(userRef);

  const jobsRef = collection(firestore, "jobs");
  const q = query(
    jobsRef
    // where("id", "==", "")
    // orderBy("date", "desc")
  );
  const [jobsSnapshot, jobsLoading, jobsError] = useCollection(q);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (userSnapshot?.exists) {
      setUserData({ ...defaultUser, ...userSnapshot.data() });
      console.log("User", userSnapshot.data());
    }
  }, [userSnapshot, jobsSnapshot]);

  useEffect(() => {
    if (jobsSnapshot) {
      const data = jobsSnapshot.docs.filter((item) =>
        userData.bookmarks?.includes(item.data().id)
      );
      console.log(data.length);
      setJobs(data);
    }
  }, [jobsSnapshot, userSnapshot, userData]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.surface }}>
      <Loader showLoader={jobsLoading} />
      <View style={styles.innerContainer}>
        <Header
          title={"Bookmarks"}
          navigation={navigation}
          showBack={true}
          showBookmark={false}
          bookmarked={false}
        />

        {jobs.length <= 0 ? (
          <EmptyDesign
            title="There's nothing here yet."
            description="You haven't bookmarked any listings. They will appear here when they are abailable..."
          />
        ) : (
          <FlatList
            ListHeaderComponent={() => (
              <Search
                text={searchText}
                onChangeText={setSearchText}
                placeHolder="Search..."
                style={{ marginTop: 0 }}
                borderColor={"#F0F0F0"}
                activeBorderColor={COLORS.primary}
              />
            )}
            // showsVerticalScrollIndicator={false}
            data={jobs}
            style={{ marginHorizontal: SIZES.md }}
            renderItem={({ item, index }) => (
              <JobComponent
                job={item.data()}
                width={width - SIZES.md * 2}
                navigation={navigation}
                bookmarked={true}
              />
            )}
            keyExtractor={(item) => item.id}
            ListFooterComponent={() => <View style={{ height: 90 }} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default BookmarksScreen;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  emptyContainer: {
    zIndex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    margin: SIZES.md,
  },
  emptySubtitle: {
    ...TYPOGRAPHY.h3,
    fontSize: SIZES.xs,
    color: COLORS.onSurface,
    opacity: 0.7,
    textAlign: "center",
  },
});
