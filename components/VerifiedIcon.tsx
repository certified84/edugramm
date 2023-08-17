import { MaterialIcons } from '@expo/vector-icons'
import { SIZES } from '../assets/theme';

export default function VerifiedIcon() {
    return (
        <MaterialIcons name='verified' size={SIZES.sm} color={"#0082CB"} style={{ alignSelf: "center" }} />
    );
}