import { FieldValue } from "firebase/firestore"

export type Post = {
    id: string,
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