import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Animated,
} from "react-native";
import { TextInput } from "react-native-paper";
import { TYPOGRAPHY, COLORS, SIZES } from "../../../../assets/theme";
import {
  ActionButton,
  AppleButton,
  GoogleButton,
} from "../../../components/Buttons";
import { styles } from "./Login";
import { useNavigation } from "@react-navigation/native";
import { Loader } from "../../../components/Loader";
import { useEffect, useState } from "react";
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth, firestore } from "../../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { User, defaultUser } from "../../../data/model/User";
import { Ionicons } from "@expo/vector-icons";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { RouteProp, NavigationProp } from "@react-navigation/native";
import { StackNavigation, StackParamList } from "../../../../types";
import { isEmail } from "../../../constants";

type ScreenRouteProp = RouteProp<StackParamList, "SignupScreen">;
type NavProp = NavigationProp<StackParamList, "SignupScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavProp;
};

const SignupScreen: React.FC<Props> = ({ route, navigation }) => {
  const { width } = useWindowDimensions();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    loading: false,
    showPassword: false,
    success: false,
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  async function signUp() {
    if (values.name === "") {
      setErrors({ ...errors, name: true });
      return;
    } else if (values.email === "" || !isEmail(values.email)) {
      setErrors({ ...errors, email: true });
      return;
    } else if (values.password === "") {
      setErrors({ ...errors, password: true });
      return;
    }

    setValues({ ...values, loading: true });
    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        uploadData(user);
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

  async function uploadData(user: FirebaseUser) {
    const data: User = {
      ...defaultUser,
      uid: user.uid,
      name: values.name,
      email: values.email.toLowerCase(),
    };
    await setDoc(doc(firestore, "users", user.uid), data)
      .then(() => {
        updateUserProfile(user, values.name);
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

  async function updateUserProfile(
    user: FirebaseUser,
    displayName?: string | null
  ) {
    await updateProfile(user, { displayName: displayName })
      .then(() => {
        sendEmailVerification(user);
        Toast.show({
          title: "A verification email has been sent to your email address.",
          type: ALERT_TYPE.SUCCESS,
        });
        setValues({
          ...values,
          loading: false,
          success: true,
        });
        auth.signOut();
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
        <Text
          style={{
            ...TYPOGRAPHY.h1,
            fontSize: SIZES.xl - 2,
            color: COLORS.onSurface,
            alignSelf: "center",
          }}
        >
          Sign up
        </Text>
        <Text
          style={{
            ...TYPOGRAPHY.h3,
            fontFamily: "space-grotesk-light",
            marginTop: SIZES.md,
            color: COLORS.onSurface,
            alignSelf: "center",
          }}
        >
          We could use your presence here
        </Text>

        <TextInput
          mode="outlined"
          placeholder="Name"
          theme={{ roundness: SIZES.xs }}
          value={values.name}
          onChangeText={(text) => {
            if (text !== "") {
              setErrors({ ...errors, name: false });
            } else {
              setErrors({ ...errors, name: true });
            }
            setValues({ ...values, name: text });
          }}
          style={[styles.inputField, { marginTop: SIZES.xl }]}
          underlineColor={COLORS.onSecondaryContainer}
          activeOutlineColor={COLORS.secondaryContainer}
          placeholderTextColor={COLORS.onSecondaryContainer}
          textColor={COLORS.onSecondaryContainer}
        />
        {errors.name && (
          <Text
            style={{
              ...TYPOGRAPHY.p,
              alignSelf: "flex-end",
              color: COLORS.error,
            }}
          >
            Name is required
          </Text>
        )}

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
          style={[styles.inputField]}
          underlineColor={COLORS.onSecondaryContainer}
          activeOutlineColor={COLORS.secondaryContainer}
          placeholderTextColor={COLORS.onSecondaryContainer}
          textColor={COLORS.onSecondaryContainer}
        />
        {errors.email && (
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

        <TextInput
          mode="outlined"
          placeholder="Password"
          keyboardType={"visible-password"}
          theme={{ roundness: SIZES.xs }}
          value={values.password}
          onChangeText={(text) => {
            if (text !== "") {
              setErrors({ ...errors, password: false });
            } else {
              setErrors({ ...errors, password: true });
            }
            setValues({ ...values, password: text });
          }}
          style={styles.inputField}
          underlineColor={COLORS.onSecondaryContainer}
          activeOutlineColor={COLORS.secondaryContainer}
          placeholderTextColor={COLORS.onSecondaryContainer}
          textColor={COLORS.onSecondaryContainer}
          secureTextEntry={!values.showPassword}
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
          <Text
            style={{
              ...TYPOGRAPHY.p,
              alignSelf: "flex-end",
              color: COLORS.error,
            }}
          >
            Password is required
          </Text>
        )}

        <ActionButton
          onPress={signUp}
          style={{ width: "100%", marginTop: SIZES.lg }}
          buttonTitle={"Sign up"}
          buttonColor={COLORS.primary}
          textColor={COLORS.onPrimary}
        />

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            marginTop: SIZES.xl,
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <View
            style={{ flex: 0.42, height: 1, backgroundColor: COLORS.darkGray }}
          />
          <Text style={{ ...TYPOGRAPHY.h3, color: COLORS.onSurface }}>OR</Text>
          <View
            style={{ flex: 0.42, height: 1, backgroundColor: COLORS.darkGray }}
          />
        </View>

        <GoogleButton
          onPress={() =>
            Toast.show({ title: "Coming soon..", type: ALERT_TYPE.INFO })
          }
          style={{ width: "100%", marginTop: SIZES.lg }}
          buttonTitle={"Sign up with Google"}
        />

        <AppleButton
          onPress={() =>
            Toast.show({ title: "Coming soon..", type: ALERT_TYPE.INFO })
          }
          style={{ width: "100%", marginTop: SIZES.lg }}
          buttonTitle={"Sign up with Apple"}
        />

        <View
          style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
        >
          <View
            style={{
              height: 1,
              backgroundColor: COLORS.darkGray,
              marginBottom: SIZES.md,
              width: width,
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...TYPOGRAPHY.h3, color: COLORS.onSurface }}>
              Already have an account?
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ marginHorizontal: SIZES.xxs }}
              onPress={() => {
                navigation.navigate("LoginScreen");
              }}
            >
              <Text style={{ ...TYPOGRAPHY.h3, color: COLORS.primary }}>
                Sign in.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;
