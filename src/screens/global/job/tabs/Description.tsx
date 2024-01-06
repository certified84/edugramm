import { ScrollView, Text, View } from "react-native";
import { SIZES, TYPOGRAPHY } from "../../../../theme";
import { Job } from "../../../../data/models/Job";

interface DescriptionTabProps {
  job: Job;
}

const DescriptionTab: React.FC<DescriptionTabProps> = ({ job }) => {
  return (
    <ScrollView style={{ margin: SIZES.md }}>
      <Text style={{ ...TYPOGRAPHY.h4 }}>About this Job</Text>
      <Text style={{...TYPOGRAPHY.h5, marginVertical: SIZES.xxs}}>{job.description}</Text>
    </ScrollView>
  );
};

export default DescriptionTab;
