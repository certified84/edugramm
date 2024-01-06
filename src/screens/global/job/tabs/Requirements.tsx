import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SIZES, COLORS, TYPOGRAPHY } from "../../../../theme";
import { Job } from "../../../../data/models/Job";

interface RequirementsTabProps {
  job: Job;
}

const RequirementsTab: React.FC<RequirementsTabProps> = ({ job }) => {
  return (
    <ScrollView style={{ margin: SIZES.md }}>
      <Text style={{ ...TYPOGRAPHY.h4 }}>Qualifications</Text>
      {job.requirements.map((requirement, index) => (
        <View key={index} style={{ flexDirection: "row" }}>
          <Text style={styles.text}>{`   \u2022   `}</Text>
          <Text style={styles.text}>{requirement}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default RequirementsTab;

const styles = StyleSheet.create({
  text: { ...TYPOGRAPHY.h5, marginVertical: SIZES.xxs },
});
