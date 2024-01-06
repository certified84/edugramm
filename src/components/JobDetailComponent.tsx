import { View, Image, Text, StyleSheet } from "react-native";
import { SIZES, TYPOGRAPHY, COLORS } from "../../assets/theme";
import { Briefcase } from "../../assets/svg/Onboarding";
import { Application, Job } from "../data/model/Job";

interface JobProps {
  application?: Application;
  job?: Job;
}

const JobDetailComponent: React.FC<JobProps> = ({ application, job }) => {
  const jb = application?.job ?? job!;
  return (
    <View style={styles.jobContainer}>
      <View style={styles.companyLogoContainer}>
        {jb.companyLogo && (
          <Image
            source={{ uri: jb.companyLogo }}
            style={{ width: 24, height: 24 }}
          />
        )}
        {!jb.companyLogo && <Briefcase />}
      </View>

      <Text style={{ ...TYPOGRAPHY.h3, marginVertical: SIZES.xs }}>
        {jb.title}
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ ...TYPOGRAPHY.p }}>{`${jb.company}   \u2022   `} </Text>
        <View style={styles.jobTypeContainer}>
          <Text
            style={{
              ...TYPOGRAPHY.p,
              color: COLORS.primary,
            }}
          >
            {jb.type}
          </Text>
        </View>
        <View style={styles.jobTypeContainer}>
          <Text
            style={{
              ...TYPOGRAPHY.p,
              color: COLORS.primary,
            }}
          >
            {jb.locationType}
          </Text>
        </View>
      </View>

      <View style={{ ...styles.line, width: "100%" }} />

      <Text style={styles.jobLocation}>{jb.location}</Text>
      <Text style={styles.pay}>{jb.pay}</Text>
    </View>
  );
};

export default JobDetailComponent;

const styles = StyleSheet.create({
  jobContainer: {
    borderRadius: SIZES.xs,
    borderWidth: 2,
    borderColor: "#CACACA",
    padding: SIZES.md,
    marginHorizontal: SIZES.md,
    alignItems: "center",
  },
  companyLogoContainer: {
    padding: SIZES.xs,
    borderRadius: SIZES.xxs,
    borderWidth: 2,
    borderColor: "#CACACA",
  },
  jobTypeContainer: {
    backgroundColor: "#DDEAFF",
    padding: 4,
    paddingHorizontal: SIZES.xs,
    borderRadius: SIZES.xxs,
    marginEnd: SIZES.sm,
  },
  line: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: SIZES.sm,
  },
  pay: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primary,
    marginTop: SIZES.xxs,
  },
  jobLocation: { ...TYPOGRAPHY.h3, color: "#ADADAF", fontSize: SIZES.sm },
});
