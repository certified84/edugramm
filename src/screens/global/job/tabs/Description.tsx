import { ScrollView, Text, View } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../../../assets/theme";
import { Job } from "../../../../data/model/Job";

interface DescriptionTabProps {
  job: Job;
}

const DescriptionTab: React.FC<DescriptionTabProps> = ({ job }) => {
  return (
    <ScrollView style={{ margin: SIZES.md }}>
      <Text style={{ ...TYPOGRAPHY.h2 }}>About this Job</Text>
      <Text style={{...TYPOGRAPHY.p, marginVertical: SIZES.xxs}}>{job.description}</Text>
    </ScrollView>
  );
};

export default DescriptionTab;
