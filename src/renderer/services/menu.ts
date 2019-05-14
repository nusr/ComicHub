import request from '../utils/request';

export async function getMenuList() {
  return request('/v1/menu');
}
