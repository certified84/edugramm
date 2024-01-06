import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { COLORS, SIZES } from "../../../theme";
import Header from "../../../components/Header";
import { StackParamList } from "../../../types";
import Search from "../../../components/Search";
import { useEffect, useState } from "react";
import JobComponent from "../../../components/JobComponent";
import { RouteProp, NavigationProp } from "@react-navigation/native";
import {
  DocumentData,
  Firestore,
  collection,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { Job } from "../../../data/models/Job";
import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";
import { Loader } from "../../../components/Loader";

type ScreenRouteProp = RouteProp<StackParamList, "JobsScreen">;
type NavProp = NavigationProp<StackParamList, "JobsScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavProp;
};

const JobsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { width } = useWindowDimensions();
  const [searchText, setSearchText] = useState("");
  const [bookmarked, setBookmarked] = useState(route!.params.bookmarked);

  const jobsRef = collection(firestore, route?.params.which ?? "jobs");
  const q = query(
    jobsRef,
    // where("communityId", "==", "")
    // orderBy("date", "desc")
  );
  const [jobsSnapshot, jobsLoading, jobsError] = useCollection(q);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (jobsSnapshot) {
      const data = jobsSnapshot.docs;
      console.log("Jobs", data)
      setJobs(data);
    }
  }, [jobsSnapshot]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Loader showLoader={jobsLoading}/>
      <View style={styles.innerContainer}>
        <Header
          title={route!.params.title}
          navigation={navigation}
          showBack={route?.params.showBack}
          showBookmark={route!.params.showBookmark}
          bookmarked={bookmarked}
          onBookmarkPress={() => setBookmarked(!bookmarked)}
        />

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
              bookmarked={route!.params.title === "Bookmarks"}
            />
          )}
          keyExtractor={(item) => item.id}
          ListFooterComponent={() => <View style={{ height: 90 }} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default JobsScreen;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    marginTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight! + SIZES.sm
        : SIZES.sm,
  },
});
