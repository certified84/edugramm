import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  useWindowDimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../theme";
import Header from "../../../components/Header";
import { StackParamList } from "../../../types";
import { useEffect, useState } from "react";
import { RouteProp, NavigationProp } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import {
  FileUpload,
  FileUploaded,
  Link,
  Mail,
  User,
} from "../../../assets/svg/Job";
import { is_email } from "../../../constants";
import { auth, firestore, storage } from "../../../firebase";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { getDownloadURL, ref } from "firebase/storage";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { useUploadFile } from "react-firebase-hooks/storage";
import { Application, defaultApplication } from "../../../data/models/Job";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { Loader } from "../../../components/Loader";

type ScreenRouteProp = RouteProp<StackParamList, "JobApplicationScreen">;
type NavProp = NavigationProp<StackParamList, "JobApplicationScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavProp;
};

interface ValuesProps {
  bookmarked?: boolean;
  name: string;
  email: string;
  porfolioLink: string;
  coverLetter: string;
  resume: boolean;
  resumeUploaded: boolean;
  loading: boolean;
  file?: string | null;
  application?: Application;
}

const JobApplicationScreen: React.FC<Props> = ({ route, navigation }) => {
  const { width } = useWindowDimensions();
  const user = auth.currentUser;
  const job = route?.params.job!;
  const splitIndex = user?.displayName?.indexOf(" ");
  const [values, setValues] = useState<ValuesProps>({
    bookmarked: route?.params.bookmarked,
    name: "",
    email: "",
    porfolioLink: "",
    coverLetter: "",
    resume: false,
    resumeUploaded: false,
    loading: false,
    file: null,
    application: { ...defaultApplication, job: job },
  });

  const disabled = values.porfolioLink.length <= 0;

  useEffect(() => {
    if (values.resume) {
      setTimeout(() => {
        setValues({ ...values, resume: false, resumeUploaded: true });
      }, 4000);
    }
  }, [values.resume, values.resumeUploaded]);

  const [uploadFile, uploading, imageSnapshot, imageError] = useUploadFile();
  const resumeRef = ref(
    storage,
    `resumes/${user!.uid}/${job.title} - ${job.company}.pdf`
  );

  const getResume = async () => {
    await DocumentPicker.getDocumentAsync({ type: "application/pdf" }).then(
      (res) => {
        if (res.assets !== null) {
          setValues({ ...values, file: res.assets[0].uri });
          uploadResume(res.assets[0].uri, user!.uid);
        }
      }
    );
  };

  async function uploadResume(resumeUri: string, id: string) {
    try {
      const { uri } = await FileSystem.getInfoAsync(resumeUri);
      const blob: Blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      await uploadFile(resumeRef, blob, { contentType: "application/pdf" })
        .then(() => {
          setValues({ ...values, resumeUploaded: true });
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Resume uploaded",
            textBody:
              "Resume uploaded successfully. Please complete your application",
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: "Error",
            textBody: "An error occurred. Please try again",
          });
        });
      // blob.close()
    } catch (e) {
      console.log(e);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "An error occurred. Please try again",
      });
    }
  }

  async function getUrl(id: string) {
    await getDownloadURL(resumeRef)
      .then((url) => {
        updateApplication(url, id);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: "An error occurred. Please try again",
        });
      });
  }
  async function uploadApplication() {
    setValues({ ...values, loading: true });
    const data = {
      ...values.application,
      porfolioLink: values.porfolioLink,
      coverLetter: values.coverLetter,
      uid: user?.uid,
    };

    const docRef = addDoc(
      collection(firestore, `applications/${user?.uid}/applications`),
      data
    );
    await docRef
      .then((snapshot) => {
        updateDoc(snapshot, { id: snapshot.id }).then(() =>
          getUrl(snapshot.id)
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setValues({ ...values, loading: false });
        console.log(errorCode, errorMessage);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: "An error occurred. Please try again",
        });
      });
  }

  async function updateApplication(url: string, id: string) {
    const applicationRef = doc(
      firestore,
      `applications/${user?.uid}/applications`,
      id
    );
    await updateDoc(applicationRef, { resume: url })
      .then(() => {
        setValues({ ...values, loading: false });
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Application Submitted",
          textBody: "Your application has been submitted successfully",
        });
        navigation?.goBack();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setValues({ ...values, loading: false });
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: "An error occurred. Please try again",
        });
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Loader showLoader={values.loading} />
      <View style={styles.innerContainer}>
        <Header
          title={route!.params.title}
          navigation={navigation}
          showBookmark={route!.params.showBookmark}
          bookmarked={values.bookmarked}
          onBookmarkPress={() =>
            setValues({ ...values, bookmarked: !values.bookmarked })
          }
        />
        <ScrollView style={{ margin: SIZES.md }}>
          <Text style={{ ...TYPOGRAPHY.h4 }}>Full Name</Text>

          <TextInput
            placeholder={"e.g Firstname Lastname"}
            theme={{ roundness: SIZES.xs }}
            left={<TextInput.Icon icon={() => <User />} />}
            style={styles.textInput}
            mode="outlined"
            editable={false}
            outlineColor={"transparent"}
            activeOutlineColor={COLORS.primary}
            placeholderTextColor={"#ADADAF"}
            selectionColor={COLORS.black}
            value={user?.displayName ?? ""}
          />

          <Text style={{ ...TYPOGRAPHY.h4 }}>Email</Text>

          <TextInput
            placeholder={"e.g name@example.com"}
            theme={{ roundness: SIZES.xs }}
            left={<TextInput.Icon icon={() => <Mail />} />}
            style={styles.textInput}
            mode="outlined"
            outlineColor={"transparent"}
            activeOutlineColor={COLORS.primary}
            placeholderTextColor={"#ADADAF"}
            selectionColor={COLORS.black}
            value={user?.email ?? ""}
            editable={false}
          />

          <Text style={{ ...TYPOGRAPHY.h4 }}>Upload Resume</Text>

          {values.resumeUploaded ? (
            <View style={styles.resumeUploadedContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FileUploaded />
                <View style={{ marginStart: SIZES.sm }}>
                  <Text style={{ ...TYPOGRAPHY.h5 }}>
                    {`CV-${user?.displayName?.substring(
                      0,
                      splitIndex
                    )}-${user?.displayName?.substring(
                      splitIndex ?? 0 + 1,
                      user?.displayName?.length
                    )}.pdf`}
                  </Text>
                  <Text style={{ ...TYPOGRAPHY.p, fontSize: SIZES.xs }}>
                    128kb
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() =>
                  setValues({ ...values, resumeUploaded: false, resume: false })
                }
              >
                <Ionicons name="close" color={"#F92020"} size={24} />
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              {!values.file ? (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={getResume}
                  style={styles.uploadResumeContainer}
                >
                  <FileUpload />
                  <Text style={{ ...TYPOGRAPHY.p, marginTop: SIZES.xxs }}>
                    Browse File
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.uploadResumeContainer}>
                  <FileUpload />
                  <Text style={styles.uploading}>Uploading...</Text>
                </View>
              )}
            </View>
          )}

          <Text style={{ ...TYPOGRAPHY.h4 }}>Portfolio Link</Text>

          <TextInput
            placeholder={"e.g https://link.portforlio.com"}
            theme={{ roundness: SIZES.xs }}
            left={<TextInput.Icon icon={() => <Link />} />}
            style={styles.textInput}
            mode="outlined"
            autoCorrect={false}
            outlineColor={"transparent"}
            activeOutlineColor={COLORS.primary}
            placeholderTextColor={"#ADADAF"}
            selectionColor={COLORS.black}
            value={values.porfolioLink}
            onChangeText={(text) =>
              setValues({ ...values, porfolioLink: text })
            }
          />

          <Text style={{ ...TYPOGRAPHY.h4 }}>Cover Letter</Text>

          <TextInput
            placeholder={"Anything more you'd like to say to the recruiter..."}
            theme={{ roundness: SIZES.xs }}
            style={{ ...styles.textInput, minHeight: 100, maxHeight: 200 }}
            mode="outlined"
            multiline
            numberOfLines={5}
            outlineColor={"transparent"}
            activeOutlineColor={COLORS.primary}
            placeholderTextColor={"#ADADAF"}
            selectionColor={COLORS.black}
            value={values.coverLetter}
            onChangeText={(text) => setValues({ ...values, coverLetter: text })}
          />

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={uploadApplication}
            disabled={disabled}
            style={{ ...styles.btnContinue, opacity: disabled ? 0.5 : 1 }}
          >
            <Text style={{ ...TYPOGRAPHY.h4, color: COLORS.white }}>
              Submit
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default JobApplicationScreen;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    marginTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight! + SIZES.sm
        : SIZES.sm,
  },
  textInput: {
    backgroundColor: "#F6F6F6",
    color: COLORS.primary,
    marginBottom: SIZES.sm,
  },
  btnContinue: {
    marginVertical: SIZES.xl,
    padding: SIZES.sm,
    backgroundColor: "#1472FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.md,
  },
  uploadResumeContainer: {
    borderWidth: 1,
    borderStyle: "dashed",
    alignItems: "center",
    marginVertical: SIZES.xs,
    borderRadius: SIZES.md,
    backgroundColor: "#F6F6F6",
    padding: 30,
    borderColor: "#ADADAF",
  },
  uploading: {
    ...TYPOGRAPHY.p,
    marginTop: SIZES.xxs,
    color: COLORS.primary,
  },
  resumeUploadedContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF3F3",
    padding: SIZES.md,
    justifyContent: "space-between",
    marginVertical: SIZES.xs,
    borderRadius: SIZES.sm,
    alignItems: "center",
  },
});
