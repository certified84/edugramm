import { FieldValue, Timestamp, serverTimestamp } from "firebase/firestore";

type JobStatus = "pending" | "sent" | "rejected" | "accepted";

export type Job = {
  id: string;
  title: string;
  pay: string;
  type: string;
  locationType: string;
  location: string;
  company: string;
  companyLogo?: string | null;
  description: string;
  requirements: string[];
  date?: FieldValue | null,
};

export const defaultJob: Job = {
  id: "",
  title: "",
  pay: "",
  type: "",
  locationType: "",
  location: "",
  company: "",
  description: "",
  requirements: [""],
  date: serverTimestamp(),
};


export type Application = {
  id: string;
  job: Job;
  uid: string;
  status: JobStatus;
  statusUpdate?: string;
  statusUpdateDate?: FieldValue | Timestamp,
  resume: string;
  coverLetter: string;
};

export const defaultApplication: Application = {
  id: "",
  job: defaultJob,
  uid: "",
  status: "pending",
  statusUpdate: "",
  statusUpdateDate: serverTimestamp(),
  resume: "",
  coverLetter: "",
};