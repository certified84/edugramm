import { User, defaultUser } from "./User"

type Comment = {
    id: string,
    uid: string,
    comment: string,
    date?: number | null,
    likes: [],
    postId: string,
    subComments: []
}

const defaultComment: Comment = {
    id: "",
    uid: "",
    comment: "",
    date: null,
    likes: [],
    postId: "",
    subComments: []
}

type SubComment = {
    id: string,
    user: User,
    comment: string,
    date?: number | null,
    likes: [],
    tag: User,
    postId: string,
    commentId: [],
}

const defaultSubComment: SubComment = {
    id: "",
    user: defaultUser,
    comment: "",
    date: null,
    likes: [],
    tag: defaultUser,
    postId: "",
    commentId: [],
}

export { Comment, defaultComment, SubComment, defaultSubComment}