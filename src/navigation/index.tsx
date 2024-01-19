import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import { COLORS, SIZES } from "../../assets/theme";
import { AlertNotificationRoot } from "react-native-alert-notification";

export default function RootNavigation() {
  const [user] = useAuthState(auth);

  return (
    <AlertNotificationRoot>
      {user && user.emailVerified ? (
        <MainStack customHeaderTitleStyle={customHeaderTitleStyle} />
      ) : (
        <AuthStack customHeaderTitleStyle={customHeaderTitleStyle} />
      )}
    </AlertNotificationRoot>
  );
}

const customHeaderTitleStyle = {
  fontFamily: "space-grotesk-medium",
  // fontWeight: 'bold',
  fontSize: SIZES.md,
  color: COLORS.onSurface,
};
