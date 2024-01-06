export type StackNavigation = StackNavigationProp<StackParamList>;

import { RouteProp, NavigationProp } from "@react-navigation/native";
import { Application, Job } from "../data/models/Job";

type StackParamList = {
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
  BookmarksScreen: {
  };
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
};

type ScreenRouteProp = RouteProp<StackParamList>;
type NavigationProp = NavigationProp<StackParamList>;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavigationProp;
};
