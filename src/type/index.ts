type Params = {
    name: string;
    page_size?: number;
    noCache?: number;
}

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
    cache: boolean;
}

export interface IOptionData {
    value: string | number;
    name: string;
    enabled: boolean;
}
