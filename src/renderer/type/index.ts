export interface SharedState {
    currentUrl: string;
    currentType: string;
}
export interface MenuItem {
    value: string;
    enabled: boolean;
    base: string;
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
