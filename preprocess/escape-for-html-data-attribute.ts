export default function escapeForHtmlDataAttribute(str: string): string {
    return str.replace(/"/g, '&quot;');
}