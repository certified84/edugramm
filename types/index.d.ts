export type StackNavigation = StackNavigationProp<StackParamList>;

import { RouteProp, NavigationProp } from "@react-navigation/native";
import { Application, Job } from "../data/models/Job";
import { Community } from "../src/data/model/Community";
import { defaultUser, User } from "../src/data/model/User";

type StackParamList = {
  FollowScreen: { userInfo: User };
  UserDetailScreen: { userInfo: User };
  ExpertiseSelectionScreen: {};
  HomeScreen: {};
  NotificationsScreen: {};
  JobsScreen: {
    title: string;
    bookmarked: boolean;
    showBookmark: boolean;
    showBack: boolean;
    which?: string;
  };
  BookmarksScreen: {};
  JobDetailScreen: {
    job: Job;
    title: string;
    bookmarked: boolean;
    showBookmark: boolean;
  };
  JobApplicationScreen: {
    job: Job;
    title: string;
    bookmarked: boolean;
    showBookmark: boolean;
  };
  JobSeekerDashboard: {};
  JobApplicationsScreen: {
    title: string;
  };
  JobApplicationDetailScreen: {
    application: Application;
    title: string;
  };

  AddPostScreen: { userInfo: User; communityId: string };
  CommunityDetailScreen: { communityInfo: Community };
  CommunityScreen: {};
  ChatScreen: {userInfo: User};

  OnboardingScreen: {};
  SignupScreen: {};
  LoginScreen: {};
  ForgotPasswordScreen: {};
};

export type StackNavigation = StackNavigationProp<StackParamList>;

type ScreenRouteProp = RouteProp<StackParamList>;
type NavigationProp = NavigationProp<StackParamList>;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavigationProp;
};
