import { colors } from "../../util/Utils"
import { auth } from "../../../firebase"

const user = auth.currentUser

type Community = {
    id?: string | null,
    name: string,
    description: string,
    image?: string | null,
    color?: string | null,
    moderators?: string[] | null,
    members: string[],
    restricted: boolean
}

const defaultCommunity: Community = {
    id: null,
    name: "",
    description: "",
    image: null,
    color: null,
    moderators: user ? [user.uid] : [],
    members: user ? [user.uid] : [],
    restricted: false
}

export { Community, defaultCommunity }