import { FieldValue, serverTimestamp } from "firebase/firestore"

export type Chat = {
    _id: string,
    text: string,
    createdAt: Date,
    read: boolean,
    user: {
        _id: string,
        name: string,
        avatar?: string | null,
    }
}

export const defaultChat: Chat = {
    _id: `${new Date().getTime()}`,
    text: "",
    createdAt: new Date(),
    read: false,
    user: {
        _id: "",
        name: "",
        avatar: "",
    }
}