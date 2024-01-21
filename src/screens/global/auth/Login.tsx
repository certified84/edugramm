import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
  StatusBar,
} from "react-native";
import { TYPOGRAPHY, COLORS, SIZES } from "../../../../assets/theme";
import { Snackbar, TextInput } from "react-native-paper";
import {
  ActionButton,
  AppleButton,
  GoogleButton,
} from "../../../components/Buttons";
import { useState } from "react";
import { auth } from "../../../../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { Loader } from "../../../components/Loader";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';
import { RouteProp, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "../../../../types";
import { isEmail } from "../../../constants";
import {Ionicons} from "@expo/vector-icons";

type ScreenRouteProp = RouteProp<StackParamList, "LoginScreen">;
type NavProp = NavigationProp<StackParamList, "LoginScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavProp;
};

const LoginScreen: React.FC<Props> = ({ route, navigation }) => {
  const { width } = useWindowDimensions();
  const provider = new GoogleAuthProvider();

  const [{}, userCredential] = useSignInWithGoogle(auth);

  // GoogleSignin.configure({
  //     webClientId: '535570809491-rfd6nbbqpi8178tpdcbe079k6qhlscmm.apps.googleusercontent.com',
  // });

  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
    showPassword: false,
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  async function signInWithGoogle() {
    setValues({ ...values, loading: true });
    // await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    // .then((has) => {
    //     if (!has) return
    // })
    // .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode, errorMessage)
    //     setValue({ ...value, message: "An error occurred. Please try again.", loading: false })
    // })
    // await useSignInWithGoogle(auth, provider)
    // const { idToken } = await GoogleSignin.signIn();
    // const credential = GoogleAuthProvider.credential(idToken);

    // await signInWithCredential(auth, userCredential)
    setValues({
      ...values,
      loading: false,
    });
    // .then((credential) => {
    //     const user = credential.user
    //     setValue({...value, loading: false})
    // })
    // .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode, errorMessage)
    //     setValue({ ...value, message: "An error occurred. Please try again.", loading: false })
    // })
  }

  async function signIn() {
    if (values.email === "" || !isEmail(values.email)) {
      setErrors({ ...errors, email: true });
      return;
    } else if (values.password === "") {
      setErrors({ ...errors, password: true });
      return;
    }

    setValues({ ...values, loading: true });
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setValues({ ...values, loading: false });
        if (!user.emailVerified) {
          Toast.show({
            title: "Please verify your email address.",
            type: ALERT_TYPE.DANGER,
          });
          auth.signOut();
        }
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

      <View style={{ flex: 1, margin: SIZES.md, paddingTop: SIZES.lg }}>
        <Text style={styles.titleText}>Sign in</Text>
        <Text style={styles.subtitleText}>
          We missed you while you were away
        </Text>

        <TextInput
          mode="outlined"
          placeholder="Email"
          keyboardType="email-address"
          theme={{ roundness: SIZES.xs }}
          value={values.email}
          onChangeText={(text) => {
            if (text !== "") {
              setErrors({ ...errors, email: false });
            } else {
              setErrors({ ...errors, email: true });
            }
            setValues({ ...values, email: text });
          }}
          style={[styles.inputField, { marginTop: SIZES.xl }]}
          underlineColor={COLORS.onSecondaryContainer}
          activeOutlineColor={COLORS.secondaryContainer}
          placeholderTextColor={COLORS.onSecondaryContainer}
          textColor={COLORS.onSecondaryContainer}
        />
        {errors.email && (
          <Text style={styles.errorText}>Valid email is required</Text>
        )}

        <TextInput
          mode="outlined"
          autoCapitalize={"none"}
          placeholder="Password"
          keyboardType="visible-password"
          theme={{ roundness: SIZES.xs }}
          value={values.password}
          onChangeText={(text) => {
            if (text !== "") {
              setErrors({ ...errors, password: false });
            } else if (text === "") {
              setErrors({ ...errors, password: true });
            }
            setValues({ ...values, password: text });
          }}
          secureTextEntry={values.showPassword}
          style={styles.inputField}
          underlineColor={COLORS.onSecondaryContainer}
          activeOutlineColor={COLORS.secondaryContainer}
          placeholderTextColor={COLORS.onSecondaryContainer}
          textColor={COLORS.onSecondaryContainer}
          right={
            <TextInput.Icon
              icon={() => (
                <TouchableOpacity
                  onPress={() =>
                    setValues({ ...values, showPassword: !values.showPassword })
                  }
                  activeOpacity={0.5}
                >
                  {values.showPassword ? (
                    <Ionicons
                      name="eye-off"
                      color={COLORS.primary}
                      size={SIZES.md}
                    />
                  ) : (
                    <Ionicons
                      name="eye"
                      color={COLORS.primary}
                      size={SIZES.md}
                    />
                  )}
                </TouchableOpacity>
              )}
              color={COLORS.primary}
            />
          }
        />
        {errors.password && (
          <Text style={styles.errorText}>Password is required</Text>
        )}

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate("ForgotPasswordScreen" as never);
          }}
        >
          <Text style={{ ...TYPOGRAPHY.h3, ...styles.forgotPassword }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <ActionButton
          style={{ width: "100%", marginTop: SIZES.lg }}
          buttonTitle={"Sign in"}
          buttonColor={COLORS.primary}
          textColor={COLORS.onPrimary}
          onPress={signIn}
        />

        <View style={styles.orContainer}>
          <View style={styles.orLine} />
          <Text style={{ ...TYPOGRAPHY.h3, color: COLORS.onSurface }}>OR</Text>
          <View style={styles.orLine} />
        </View>

        <GoogleButton
          onPress={() =>
            Toast.show({
              type: ALERT_TYPE.INFO,
              title: "Coming soon",
              textBody: "This feature isn't available yet",
            })
          }
          style={{ width: "100%", marginTop: SIZES.lg }}
          buttonTitle={"Sign in with Google"}
        />

        <AppleButton
          onPress={() =>
            Toast.show({
              type: ALERT_TYPE.INFO,
              title: "Coming soon",
              textBody: "This feature isn't available yet",
            })
          }
          style={{ width: "100%", marginTop: SIZES.lg }}
          buttonTitle={"Sign in with Apple"}
        />

        <View style={styles.bottomSection}>
          <View style={{ ...styles.line, width: width }} />
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...TYPOGRAPHY.h3, color: COLORS.onSurface }}>
              New to EduGramm?
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ marginHorizontal: SIZES.xxs }}
              onPress={() => {
                navigation.navigate("SignupScreen");
              }}
            >
              <Text style={{ ...TYPOGRAPHY.h3, color: COLORS.primary }}>
                Sign up.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  titleText: {
    ...TYPOGRAPHY.h1,
    fontSize: SIZES.xl - 2,
    color: COLORS.onSurface,
    alignSelf: "center",
  },
  subtitleText: {
    ...TYPOGRAPHY.h3,
    fontFamily: "space-grotesk-light",
    marginTop: SIZES.md,
    color: COLORS.onSurface,
    alignSelf: "center",
  },
  errorText: {
    ...TYPOGRAPHY.p,
    alignSelf: "flex-end",
    color: COLORS.error,
  },
  orContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: SIZES.xl,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  orLine: { flex: 0.42, height: 1, backgroundColor: COLORS.darkGray },
  bottomSection: { flex: 1, justifyContent: "flex-end", alignItems: "center" },
  inputField: {
    backgroundColor: COLORS.surface1,
    color: COLORS.black,
    marginTop: SIZES.sm,
  },
  forgotPasswordButton: {
    paddingTop: SIZES.sm,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  forgotPassword: {
    color: COLORS.primary,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  line: {
    height: 1,
    backgroundColor: COLORS.darkGray,
    marginBottom: SIZES.md,
  },
});
