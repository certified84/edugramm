import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  useWindowDimensions,
  Image,
  ScrollView,
} from "react-native";
import { Avatar } from "react-native-paper";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { auth, firestore } from "../../../../firebase";
import { collection, doc, query } from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { defaultUser } from "../../../data/model/User";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../../assets/theme";
import Search from "../../../components/Search";
import { Props } from "../../../../types";
import JobComponent from "../../../components/JobComponent";
import EmptyDesign from "../../../components/EmptyDesign";

const JobScreen: React.FC<Props> = ({ route, navigation }) => {
  const { width, height } = useWindowDimensions();
  const [searchText, setSearchText] = useState("");
  const user = auth.currentUser!;
  const [userData, setUserData] = useState({ ...defaultUser });

  const userRef = doc(firestore, "users", user!.uid);
  const [userSnapshot, userLoading, userError] = useDocument(userRef);

  useEffect(() => {
    if (userSnapshot?.exists) {
      setUserData({ ...defaultUser, ...userSnapshot.data() });
    }
  }, [userSnapshot]);

  const jobsRef = collection(firestore, "jobs");
  const q = query(
    jobsRef
    // where("communityId", "==", "")
    // orderBy("date", "desc")
  );
  const [jobsSnapshot, jobsLoading, jobsError] = useCollection(q);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (jobsSnapshot) {
      const data = jobsSnapshot.docs;
      console.log("Jobs", data);
      setJobs(data);
    }
  }, [jobsSnapshot]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.surface }}>
      <View style={styles.innerContainer}>
        <View style={styles.nameContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                navigation.navigate("ProfileScreen", { userInfo: userData })
              }
            >
              {user.photoURL ? (
                <Avatar.Image size={50} source={{ uri: user.photoURL }} />
              ) : (
                <FontAwesome5 size={40} name="user-circle" />
              )}
            </TouchableOpacity>
            <View style={{ marginStart: SIZES.sm }}>
              <Text style={{ ...TYPOGRAPHY.h3 }}>Hello,</Text>
              <Text style={{ ...TYPOGRAPHY.h2 }}>{user.displayName}</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate("BookmarkScreen")}
            style={{ padding: 4 }}
          >
            <Ionicons size={24} name="bookmark" color={COLORS.onBackground} />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        {jobs.length === 0 ? (
          <EmptyDesign
            title="There's nothing here yet."
            description="There are no job listings at the moment. They will appear here
              when they are available..."
          />
        ) : (
          <ScrollView>
            <ImageBackground
              source={require("../../../../assets/images/home_card_background.png")}
              style={styles.imageContainer}
            >
              <Text
                style={{
                  ...TYPOGRAPHY.h1,
                  color: COLORS.white,
                }}
              >
                Find a job or internship position on Edugram
              </Text>

              <Search
                text={searchText}
                onChangeText={setSearchText}
                placeHolder="Search for a job or skill..."
              />
            </ImageBackground>

            <View style={styles.moreContainer}>
              <Text style={{ ...TYPOGRAPHY.h3 }}>Suggested Openings</Text>
              <TouchableOpacity
                style={{ padding: 4 }}
                onPress={() =>
                  navigation.navigate("JobsScreen", {
                    title: "Suggested Jobs",
                    bookmarked: false,
                    showBookmark: false,
                  })
                }
              >
                <Text style={{ ...TYPOGRAPHY.h3, color: COLORS.primary }}>
                  See more
                </Text>
              </TouchableOpacity>
            </View>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={jobs}
              style={{ marginHorizontal: SIZES.md }}
              renderItem={({ item, index }) => (
                <JobComponent
                  job={item.data()}
                  width={width * 0.7}
                  horizontal
                  navigation={navigation}
                  bookmarked={userData.bookmarks?.includes(item.data().id)}
                />
              )}
              keyExtractor={(item) => item.id}
            />

            <View style={styles.moreContainer}>
              <Text style={{ ...TYPOGRAPHY.h3 }}>Top Openings</Text>
              <TouchableOpacity
                style={{ padding: 4 }}
                onPress={() =>
                  navigation.navigate("JobsScreen", {
                    title: "Top Jobs",
                    bookmarked: false,
                    showBookmark: false,
                  })
                }
              >
                <Text style={{ ...TYPOGRAPHY.h3, color: COLORS.primary }}>
                  See more
                </Text>
              </TouchableOpacity>
            </View>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={jobs}
              style={{ marginHorizontal: SIZES.md }}
              renderItem={({ item, index }) => (
                <JobComponent
                  job={item.data()}
                  width={width * 0.7}
                  horizontal
                  navigation={navigation}
                  bookmarked={userData.bookmarks?.includes(item.data().id)}
                />
              )}
              keyExtractor={(item) => item.id}
            />
            <View style={{ height: 90 }} />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default JobScreen;

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
    width: "100%",
    backgroundColor: COLORS.lightGray,
    marginVertical: SIZES.sm,
  },
  imageContainer: {
    borderRadius: SIZES.md,
    overflow: "hidden",
    padding: SIZES.md,
    marginHorizontal: SIZES.md,
  },
  nameContainer: {
    flexDirection: "row",
    marginHorizontal: SIZES.md,
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchContainer: {
    paddingHorizontal: SIZES.sm,
    backgroundColor: "#FFFFFF",
    marginTop: SIZES.xl,
    borderRadius: SIZES.xs,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  moreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: SIZES.md,
    alignItems: "center",
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
