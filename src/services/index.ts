import request from '../utils/request';

const requestPrefix = '/v1';

interface PostData {
  url: string;
  type: string;
  name: string;
  page_size?: number;
}

export async function getMenuList(): Promise<JsObject> {
  return request(`${requestPrefix}/menu`);
}
// eslint-disable-next-line
export async function postItem(params: PostData): Promise<any> {
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
