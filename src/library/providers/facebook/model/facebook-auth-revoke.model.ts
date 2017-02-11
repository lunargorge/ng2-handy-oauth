import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FacebookHttpService } from './../service/facebook-http.service';
import {
    HandyOauthUrls as Urls,
    HandyOauthFlowModelInterface
} from './../../../shared';

@Injectable()
export class FacebookAuthRevokeModel implements HandyOauthFlowModelInterface {
    protected url: string;
    protected uri: string;
    protected accessToken: string = '';
    protected cid: string;

    constructor(
        private http: FacebookHttpService,
        private urls: Urls
    ) {
        this.url = urls.FACEBOOK_REVOKE_URL;
        this.uri = urls.FACEBOOK_REVOKE_URI;
    }

    public setAccessToken(token: string): void {
        this.accessToken = token;
    }

    public setCid(cid: string): void {
        this.cid = cid;
    }

    public getUrl(): string {
        return this.url
                + '/' + this.cid + this.uri
                + '?access_token=' + this.accessToken;
    }

    public send(): Observable<any> {
        return this.http.revoke(this.getUrl());
    }
}
