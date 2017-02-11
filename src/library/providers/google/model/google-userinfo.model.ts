import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GoogleUserinfoResponseInterface } from './../interface/google-userinfo-response.interface';
import { GoogleHttpService } from './../service/google-http.service';
import {
    HandyOauthUrls as Urls,
    HandyOauthFlowModelInterface
} from './../../../shared';

@Injectable()
export class GoogleUserinfoModel implements HandyOauthFlowModelInterface {

    protected url: string;
    protected uri: string;
    protected accessToken: string = '';

    constructor(private http: GoogleHttpService, private urls: Urls) {
        this.url = urls.GOOGLE_USERINFO_URL;
        this.uri = urls.GOOGLE_USERINFO_URI;
    }

    public setAccessToken(token: string): void {
        this.accessToken = token;
    }

    public getUrl(): string {
        return this.url
                + this.uri
                + '?alt=json'
                + '&access_token=' + this.accessToken;
    }

    public send(): Observable<GoogleUserinfoResponseInterface> {
        return this.http.userinfo(this.getUrl());
    }
}
