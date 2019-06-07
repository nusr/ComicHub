export default function toNum(data: string | undefined): number {
    if (typeof data === 'undefined') {
        return 0;
    }
    const temp: number = parseInt(data, 10);
    return temp || 0;
}
