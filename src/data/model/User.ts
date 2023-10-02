import { auth } from "../../../firebase"

const user = auth.currentUser

export type User = {
    uid?: string | null,
    name?: string | null,
    email?: string | null,
    photo? : string | null,
    followers: [],
    following: [],
    bio: string,
    company: string,
    school: string,
    link: string,
    location: string,
    verified: boolean,
}

export const defaultUser: User = {
    uid: user ? user.uid : "",
    name: user ? user.displayName : "",
    email: user ? user.email : "",
    photo: user ? user.photoURL : "",
    followers: [],
    following: [],
    bio: "",
    company: "",
    school: "",
    link: "",
    location: "",
    verified: false,
}