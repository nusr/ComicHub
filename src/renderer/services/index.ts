import request from '../utils/request';

interface PostData {
    url?: string;

    [index: string]: string;
}

export async function getMenuList() {
    return request('/v1/menu');
}

export async function postItem(params: PostData = {}) {
    const { url, ...rest } = params;
    if (!url) {
        return;
    }
    const realUrl = `/v1/${url}`;
    return request(realUrl, {
        method: 'POST',
        body: rest,
    });
}
