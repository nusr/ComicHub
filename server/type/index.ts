interface ICommon {
  id?: number;
  create_time?: number;
}

export interface ISearchItem {
  url: string;
  title: string;
  area?: string;
  author?: string;
  introduce?: string;
  category?: string;
}

export interface IChapterItem {
  url: string;
  title: string;
  page_size: number;
}

export interface IImageItem {
  url: string;
  page: number;
}

export interface ISearchMysql extends ISearchItem, ICommon {}

export interface IChapterMysql extends IChapterItem, ICommon {
  search_id?: number;
}

export interface IImageMysql extends IImageItem, ICommon {
  chapter_id?: number;
}

export interface IRequestData {
  name: string;
  type: string;
  page?: number;
  noCache?: boolean;
}
