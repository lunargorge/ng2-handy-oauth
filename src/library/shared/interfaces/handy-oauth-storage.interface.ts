export interface HandyOauthStorageInterface {
    set(key: string, value: any): void;
    get(key: string): any;
    remove(key: string): void;
}
