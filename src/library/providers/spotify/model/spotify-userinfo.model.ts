import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SpotifyUserinfoResponseInterface } from './../interface/facebook-userinfo-response.interface';
import { SpotifyHttpService } from './../service/spotify-http.service';

import {
    HandyOauthUrls as Urls,
    HandyOauthFlowModelInterface
} from './../../../shared';

@Injectable()
export class SpotifyUserinfoModel implements HandyOauthFlowModelInterface {

    protected url: string;
    protected uri: string;
    protected accessToken: string = '';

    constructor(private http: SpotifyHttpService, private urls: Urls) {
        this.url = urls.SPOTIFY_USERINFO_URL;
        this.uri = urls.SPOTIFY_USERINFO_URI;
    }

    public setAccessToken(token: string): void {
        this.accessToken = token;
    }

    public getUrl(): string {
        return this.url + this.uri;
    }

    public send(): Observable<SpotifyUserinfoResponseInterface> {
        return this.http.userinfo(this.getUrl(), this.accessToken);
    }
}
