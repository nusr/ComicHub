import request from '../utils/request';

const requestPrefix: string = process.env.NODE_ENV === 'production' ? '' : '/v1';

interface PostData {
  url: string;

  [index: string]: string;
}

export async function getMenuList() {
  return request(`${requestPrefix}/menu`);
}

export async function postItem(params: PostData) {
  const { url = '', ...rest } = params;
  if (!url) {
    return null;
  }
  const realUrl = `${requestPrefix}/${url}`;
  return request(realUrl, {
    method: 'POST',
    body: rest,
  });
}
