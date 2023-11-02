import { FieldValue } from "firebase/firestore"

export type Post = {
    id: string,
    communityId: string,
    uid: string,
    name: string,
    photoUrl: string,
    verified: boolean,
    post: string,
    images: [],
    likes: [],
    comments: [],
    date?: number | null,
}

export const defaultPost: Post = {
    id: "",
    communityId: "",
    uid: "",
    name: "",
    photoUrl: "",
    verified: false,
    post: "",
    images: [],
    likes: [],
    comments: [],
    date: null,
}