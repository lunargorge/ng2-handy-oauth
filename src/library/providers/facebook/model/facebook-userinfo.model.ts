import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FacebookUserinfoResponseInterface } from './../interface/facebook-userinfo-response.interface';
import { FacebookHttpService } from './../service/facebook-http.service';
import {
    HandyOauthUrls as Urls,
    HandyOauthFlowModelInterface
} from './../../../shared';

@Injectable()
export class FacebookUserinfoModel implements HandyOauthFlowModelInterface {

    protected url: string;
    protected uri: string;
    protected accessToken: string = '';
    protected fields: string = 'email,name,id,gender,locale';

    constructor(private http: FacebookHttpService, private urls: Urls) {
        this.url = urls.FACEBOOK_USERINFO_URL;
        this.uri = urls.FACEBOOK_USERINFO_URI;
    }

    public setAccessToken(token: string): void {
        this.accessToken = token;
    }

    public getUrl(): string {
        return this.url
                + this.uri
                + '?access_token=' + this.accessToken
                + '&fields=' + this.fields;
    }

    public send(): Observable<FacebookUserinfoResponseInterface> {
        return this.http.userinfo(this.getUrl());
    }
}
