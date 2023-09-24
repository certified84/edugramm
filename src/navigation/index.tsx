import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import { COLORS, SIZES } from "../../assets/theme";

export default function RootNavigation() {

    const [user] = useAuthState(auth);

    return user && user.emailVerified ? <MainStack customHeaderTitleStyle={customHeaderTitleStyle} /> 
    : <AuthStack customHeaderTitleStyle={customHeaderTitleStyle} />;
}

const customHeaderTitleStyle = {
    fontFamily: "space-grotesk-medium",
    // fontWeight: 'bold',
    fontSize: SIZES.md,
    color: COLORS.onSurface,
  }