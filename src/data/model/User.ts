export type User = {
    uid: string,
    name: string,
    email: string,
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
    uid: "",
    name: "",
    email: "",
    photo: "",
    followers: [],
    following: [],
    bio: "",
    company: "",
    school: "",
    link: "",
    location: "",
    verified: false,
}