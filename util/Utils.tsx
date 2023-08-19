export function followerCount(followers: number): string {
    let count = ''
    if (followers >= 1000000) {
        const value = followers / 1000000
        count = `${Number(value.toFixed(1))}M followers`
    } else if (followers >= 10000) {
        const value = followers / 1000
        count = `${Number(value.toFixed(1))}K followers`
    } else {
        count = `${followers} followers`
    }
    return count;
}