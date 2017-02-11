export class HandyOauthUrlParameter {
    public static get(url, name): any {
        let half = url.split(name + '=')[1];
        return half !== undefined ? decodeURIComponent(half.split('&')[0]) : null;
    }
}
