export const sortString = (str1: string, str2: string): number => {
    return str1 === str2 ? 0 : str1 > str2 ? 1 : -1
}