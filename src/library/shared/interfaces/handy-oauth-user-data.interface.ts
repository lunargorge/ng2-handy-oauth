export interface HandyOauthUserDataInterface {
    cid: string;
    name: string;
    familyName: string;
    email: string;
    gender: string;
    locale: string;
    picture: string;
    accessToken: string;
    accessTokeneEpires: any; // The time the ID token expires, represented in Unix time (integer seconds).
    provider: string;
    orignalResponse: any;
}
