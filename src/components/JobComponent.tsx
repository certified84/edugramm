import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Job } from "../data/model/Job";
import { StackNavigation } from "../../types";
import { SIZES, TYPOGRAPHY, COLORS } from "../../assets/theme";
import { Briefcase } from "../../assets/svg/Onboarding";

interface JobProps {
  job: Job;
  width: number;
  horizontal?: boolean | null;
  navigation: StackNavigation;
  bookmarked?: boolean;
}

const JobComponent: React.FC<JobProps> = ({
  job,
  width,
  horizontal,
  navigation,
  bookmarked,
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("JobDetailScreen", {
          job: job,
          title: job.company,
          bookmarked: bookmarked,
          showBookmark: true,
        })
      }
      activeOpacity={0.5}
      style={{
        ...styles.jobContainer,
        width: width,
        marginEnd: horizontal ? SIZES.md : 0,
        marginTop: !horizontal ? SIZES.md : 0,
        backgroundColor: horizontal ? COLORS.secondaryContainer : "#F9F9F9",
      }}
    >
      <View style={styles.logoBookmarkContainer}>
        <View style={styles.companyLogoContainer}>
          {job.companyLogo && (
            <Image
              source={{ uri: job.companyLogo }}
              style={{ width: 24, height: 24 }}
            />
          )}
          {!job.companyLogo && <Briefcase />}
        </View>

        {/* <TouchableOpacity activeOpacity={0.5} style={{ padding: 4 }}> */}
        <MaterialCommunityIcons
          name={bookmarked ? "bookmark" : "bookmark-outline"}
          size={30}
          color={COLORS.onSecondaryContainer}
        />
        {/* </TouchableOpacity> */}
      </View>

      <Text style={{ ...TYPOGRAPHY.h3, marginVertical: SIZES.xs }}>
        {job.title}
      </Text>

      <Text style={{ ...TYPOGRAPHY.p }}>
        {`${job.company} \u2022 `}{" "}
        <Text style={{ color: COLORS.primary }}>{job.pay}</Text>
      </Text>

      <View style={styles.line} />

      <Text style={{ ...TYPOGRAPHY.h3, fontSize: SIZES.sm }}>
        {job.location}
      </Text>

      <View style={{ flexDirection: "row", marginTop: SIZES.sm }}>
        <View
          style={{
            ...styles.jobTypeContainer,
            borderWidth: horizontal ? 1 : 0,
            backgroundColor: horizontal ? COLORS.onSecondaryContainer : "#DDEAFF",
          }}
        >
          <Text
            style={{
              ...TYPOGRAPHY.p,
              color: horizontal ? COLORS.secondaryContainer : COLORS.primary,
            }}
          >
            {job.type}
          </Text>
        </View>
        <View
          style={{
            ...styles.jobTypeContainer,
            borderWidth: horizontal ? 1 : 0,
            backgroundColor: horizontal ? COLORS.onSecondaryContainer : "#DDEAFF",
          }}
        >
          <Text
            style={{
              ...TYPOGRAPHY.p,
              color: horizontal ? COLORS.secondaryContainer : COLORS.primary,
            }}
          >
            {job.locationType}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default JobComponent;

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: "100%",
    backgroundColor: COLORS.onSecondaryContainer,
    marginVertical: SIZES.sm,
  },
  jobContainer: {
    borderRadius: SIZES.xs,
    borderWidth: 2,
    borderColor: COLORS.onSecondaryContainer,
    padding: SIZES.sm,
  },
  companyLogoContainer: {
    padding: SIZES.xs,
    borderRadius: SIZES.xxs,
    borderWidth: 2,
    borderColor: COLORS.onSecondaryContainer,
  },
  logoBookmarkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  jobTypeContainer: {
    borderWidth: 1,
    borderColor: "#CACACA",
    padding: 4,
    paddingHorizontal: SIZES.xs,
    borderRadius: SIZES.xxs,
    marginEnd: SIZES.sm,
  },
});
