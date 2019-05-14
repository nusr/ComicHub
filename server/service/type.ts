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

export interface ISearchMysql {
  id?: number;
  url: string;
  title: string;
  introduce?: string;
  create_time?: number;
  area?: string;
  author?: string;
  category?: string;
}

export interface IChapterMysql {
  id?: number;
  search_id?: number;
  url: string;
  title: string;
  page_size: number;
  create_time: number;
}

export interface IImageMysql {
  id?: number;
  chapter_id?: number;
  url: string;
  page: number;
  create_time?: number;
}
