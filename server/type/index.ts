interface ICommon {
  id?: number; // 铸剑
  create_time?: number; // 创建时间
}

export interface ISearchItem {
  url: string; // 链接
  title: string; // 漫画名
  area?: string; // 地区
  author?: string; // 作者
  introduce?: string; // 简介
  category?: string; // 分类
  cover?: string; // 漫画封面
}

export interface IChapterItem {
  url: string; // 链接
  title: string; // 章节名
  page_size: number; // 章节图片数量
}

export interface IImageItem {
  url: string; // 链接
  page: number; // 章节中第几张图片
}

export interface ISearchMysql extends ISearchItem, ICommon {}

export interface IChapterMysql extends IChapterItem, ICommon {
  search_id?: number; // search 表 ID
}

export interface IImageMysql extends IImageItem, ICommon {
  chapter_id?: number; // chapter 表 ID
}

export interface IRequestData {
  name?: string; // 请求值
  type?: string; // 请求类型
  page_size?: number; // 章节图片数量
  noCache?: boolean; // 使用不查找数据库 ,为 true 不查找
}
