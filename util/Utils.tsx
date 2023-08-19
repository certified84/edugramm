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