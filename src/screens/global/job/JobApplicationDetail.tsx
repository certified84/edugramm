import {
  Text,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../theme";
import Header from "../../../components/Header";
import { StackParamList } from "../../../types";
import { RouteProp, NavigationProp } from "@react-navigation/native";
import JobDetailComponent from "../../../components/JobDetailComponent";
import { JobStatus } from "../../../constants";
import { FileUploaded } from "../../../assets/svg/Job";
import { auth, firestore } from "../../../firebase";
import { Timestamp, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";

type ScreenRouteProp = RouteProp<StackParamList, "JobApplicationDetailScreen">;
type NavProp = NavigationProp<StackParamList, "JobApplicationDetailScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavProp;
};

const JobApplicationDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { width } = useWindowDimensions();
  const user = auth.currentUser;
  const splitIndex = user?.displayName?.indexOf(" ");

  const [application, setApplication] = useState(route?.params.application!);
  const applicationRef = doc(
    firestore,
    `applications/${user?.uid}/applications`,
    application.id
  );
  const [snapshot, loading, error] = useDocument(applicationRef);
  const statusUpdateDate = (application.statusUpdateDate as Timestamp)
    ?.toDate()
    .toDateString();

  useEffect(() => {
    if (snapshot && snapshot.exists()) {
      setApplication(snapshot.data());
    }
  }, [snapshot]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.innerContainer}>
        <Header
          title={"Application Details"}
          navigation={navigation}
          showBack={true}
          showBookmark={false}
          bookmarked={false}
        />

        <JobDetailComponent application={application} />

        <View style={{ marginHorizontal: SIZES.md, marginTop: SIZES.lg }}>
          <Text style={{ ...TYPOGRAPHY.h4 }}>Resume</Text>

          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.uploadResumeContainer}
          >
            <FileUploaded />
            <Text style={styles.resume}>
              {`CV-${user?.displayName?.substring(
                0,
                splitIndex
              )}-${user?.displayName?.substring(
                splitIndex ?? 0 + 1,
                user?.displayName?.length
              )}.pdf`}
            </Text>
          </TouchableOpacity>

          <Text style={{ ...TYPOGRAPHY.h4 }}>Application Status</Text>

          <View style={styles.statusDateContainer}>
            <View
              style={{
                ...styles.statusContainer,
                backgroundColor: JobStatus[application.status].background,
              }}
            >
              <Text
                style={{
                  ...TYPOGRAPHY.p,
                  color: JobStatus[application.status].color,
                }}
              >
                {JobStatus[application.status].text}
              </Text>
            </View>
            <Text style={{ ...TYPOGRAPHY.p }}>{statusUpdateDate}</Text>
          </View>

          <Text style={{ ...TYPOGRAPHY.p }}>
            {JobStatus[application.status].update}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default JobApplicationDetailScreen;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    marginTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight! + SIZES.sm
        : SIZES.sm,
  },
  statusContainer: {
    paddingHorizontal: SIZES.xxs,
    paddingVertical: SIZES.xxs - 2,
    borderRadius: 5,
  },
  statusDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: SIZES.sm,
  },
  uploadResumeContainer: {
    overflow: "hidden",
    flexDirection: "row",
    borderWidth: 1,
    borderStyle: "dashed",
    alignItems: "center",
    marginVertical: SIZES.md,
    borderRadius: SIZES.xs,
    backgroundColor: "#F6F6F6",
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xxs,
    borderColor: "#ADADAF",
  },
  resume: {
    ...TYPOGRAPHY.h5,
    fontFamily: "outfit_semi_bold",
    color: "#ADADAF",
    marginStart: SIZES.md,
  },
});
