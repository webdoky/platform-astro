export default function adjustOutputFolder(path: string) {
    return path.replace('_colon_', '-_colon_').replace('_doublecolon_', '-_doublecolon_');
}