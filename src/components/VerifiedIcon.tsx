import { MaterialIcons } from '@expo/vector-icons'
import { SIZES } from '../../assets/theme';

export default function VerifiedIcon(props) {
    const style = props.style
    return (
        <MaterialIcons name='verified' size={SIZES.sm} color={"#0082CB"} style={{...style, marginStart: SIZES.xxs, alignSelf: "center" }} />
    );
}