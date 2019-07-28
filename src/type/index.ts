type Params = {
  name: string;
  page_size?: number;
};

export interface SharedState {
  currentUrl: string;
  params: Params;
}

export interface MenuItem {
  value: string;
  enabled: boolean;
  name: string;
}

export interface IFormData {
  url: string;
  name: string;
}

export interface IOptionData {
  value: string | number;
  name: string;
  enabled: boolean;
}

export enum TypeConfig {
  chapter = 'chapter',
  downloadAll = 'downloadAll',
  download = 'images',
  search = 'search',
  result = 'result',
}
