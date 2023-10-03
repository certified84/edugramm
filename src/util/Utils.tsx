import { Timestamp } from "firebase/firestore"

export function followerCount(followers: number): string {
    switch(true) {
        case (followers >= 1000000): {
            const value = (followers / 1000000)
            if (followers % 1000000 === 0)
                return `${value}M`
            else return `${value.toFixed(1)}M`
        }
        case followers >= 10000 : {
            const value = (followers / 1000)
            if (followers % 1000 === 0)
                return `${value}K`
            else return `${value.toFixed(1)}K`
        }
        default:
            return `${followers}`
    }
}

export function formatDate(millis: number): string {

    const now = Timestamp.now().toMillis()
    const date = new Date(millis)

    const year = date.getFullYear().toString().slice(-2)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    
    const seconds = Math.floor((now - millis) / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    switch(true) {
        case seconds < 60 : return `${seconds}s`
        case minutes < 60 : return `${minutes}m`
        case hours < 24 : return `${hours}h`
        case days < 7 : return `${days}d`
        default : return `${month}/${day}/${year}`
    }
}