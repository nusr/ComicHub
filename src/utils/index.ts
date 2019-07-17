export function addZero(temp: number): string {
    if (temp < 10) {
        return `0${temp}`;
    }
    return `${temp}`;
}

/**
 * 统一格式化时间
 * @param temp
 */
export function renderDate(temp: number | string): string {
    let date: Date;
    try {
        date = new Date(temp);
    } catch (e) {
        return '';
    }
    const year: number = date.getFullYear();
    if (Number.isNaN(year)) {
        return '';
    }
    const month: number = date.getMonth() + 1;
    const day: number = date.getDate();
    const hour: number = date.getHours();
    const minute: number = date.getMinutes();
    const second: number = date.getSeconds();
    return `${year}-${addZero(month)}-${addZero(day)} ${addZero(hour)}:${addZero(minute)}:${addZero(second)}`;
}


export enum typeConfig {
    chapter = 'chapter',
    downloadAll = 'downloadAll',
    download = 'images',
    search = 'search',
    result = 'result',
}
