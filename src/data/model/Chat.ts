type Chat = {
    id: string,
    senderId: string,
    message: string,
    date?: number | null,
    read: boolean,
}

const defaultChat: Chat = {
    id: "",
    senderId: "",
    message: "",
    date: null,
    read: false,
}