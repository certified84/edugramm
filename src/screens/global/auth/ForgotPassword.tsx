import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { TextInput } from "react-native-paper";
import { TYPOGRAPHY, COLORS, SIZES } from "../../../../assets/theme";
import { ActionButton, GoogleButton } from "../../../components/Buttons";
import { styles } from "./Login";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/Header";
import { RouteProp, NavigationProp } from "@react-navigation/native";
import { StackNavigation, StackParamList } from "../../../../types";
import { auth } from "../../../../firebase";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { Loader } from "../../../components/Loader";
import { isEmail } from "../../../constants";

type ScreenRouteProp = RouteProp<StackParamList, "ForgotPasswordScreen">;
type NavProp = NavigationProp<StackParamList, "ForgotPasswordScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavProp;
};

const ForgotPasswordScreen: React.FC<Props> = ({ route, navigation }) => {
  const { width } = useWindowDimensions();

  const [values, setValues] = useState({
    email: "",
    loading: false,
  });

  const [emailError, setEmailError] = useState(false);

  async function resetPassword() {
    if (values.email === "" || !isEmail(values.email)) {
      setEmailError(true);
      return;
    }

    setValues({ ...values, loading: true });
    await sendPasswordResetEmail(auth, values.email)
      .then(() => {
        Toast.show({
          title: "A reset link has been sent to your email.",
          type: ALERT_TYPE.SUCCESS,
        });
        setValues({
          ...values,
          loading: false,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        Toast.show({
          title: "An error occurred. Please try again.",
          type: ALERT_TYPE.DANGER,
        });
        setValues({
          ...values,
          loading: false,
        });
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Loader showLoader={values.loading} />
      <View style={{ flex: 1 }}>
        <Header
          title={"Forgot password?"}
          navigation={navigation}
          showBack={true}
          showBookmark={false}
          bookmarked={false}
        />
        <View style={{ margin: SIZES.md, marginTop: 0 }}>
          <Text
            style={{
              ...TYPOGRAPHY.h3,
              fontFamily: "space-grotesk-light",
              marginTop: SIZES.md,
              color: COLORS.onSurface,
              alignSelf: "center",
            }}
          >
            Enter your email and we'll send you a reset link
          </Text>

          <TextInput
            mode="outlined"
            placeholder="Email"
            keyboardType={"email-address"}
            theme={{ roundness: SIZES.xs }}
            value={values.email}
            onChangeText={(text) => {
              if (text !== "") {
                setEmailError(false);
              } else {
                setEmailError(true);
              }
              setValues({ ...values, email: text });
            }}
            style={[styles.inputField, { marginTop: SIZES.xl }]}
            underlineColor={COLORS.onSecondaryContainer}
            activeOutlineColor={COLORS.secondaryContainer}
            placeholderTextColor={COLORS.onSecondaryContainer}
            textColor={COLORS.onSecondaryContainer}
          />
          {emailError && (
            <Text
              style={{
                ...TYPOGRAPHY.p,
                alignSelf: "flex-end",
                color: COLORS.error,
              }}
            >
              Valid email is required
            </Text>
          )}

          <ActionButton
            style={{ width: "100%", marginTop: SIZES.lg }}
            buttonTitle={"Reset password"}
            buttonColor={COLORS.primary}
            textColor={COLORS.onPrimary}
            onPress={resetPassword}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
