import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GoogleHttpService } from './../service/google-http.service';
import {
    HandyOauthFlowModelInterface,
    HandyOauthUrls as Urls
} from './../../../shared';

@Injectable()
export class GoogleRevokeModel implements HandyOauthFlowModelInterface {
    protected url: string;
    protected uri: string;
    protected accessToken: string = '';

    constructor(
        private http: GoogleHttpService,
        private urls: Urls
    ) {
        this.url = urls.GOOGLE_REVOKE_URL;
        this.uri = urls.GOOGLE_REVOKE_URI;
    }

    public setAccessToken(token: string): void {
        this.accessToken = token;
    }

    public getUrl(): string {
        return this.url
                + this.uri
                + '?token=' + this.accessToken;
    }

    public send(): Observable<any> {
        return this.http.revoke(this.getUrl());
    }
}
