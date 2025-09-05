export function formatDateTime(value: string) {
    try {
        return new Date(value).toLocaleString();
    } catch {
        return value;
    }
}

export function clampText(text: string, max = 160) {
    if (text.length <= max) return text;
    return text.slice(0, max - 1) + '…';
}