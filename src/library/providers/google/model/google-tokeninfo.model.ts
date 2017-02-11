import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GoogleTokeninfoReponseInterface } from './../interface/google-tokeninfo-response.interface';
import { GoogleHttpService } from './../service/google-http.service';
import {
    HandyOauthUrls as Urls,
    HandyOauthFlowModelInterface
} from './../../../shared';

@Injectable()
export class GoogleTokeninfoModel implements HandyOauthFlowModelInterface {
    protected url: string;
    protected uri: string;
    protected accessToken: string = '';

    constructor(
        private http: GoogleHttpService,
        private urls: Urls
    ) {
        this.url = urls.GOOGLE_TOKENINFO_URL;
        this.uri = urls.GOOGLE_TOKENINFO_URI;
    }

    public setAccessToken(token: string): void {
        this.accessToken = token;
    }

    public getUrl(): string {
        return this.url
                + this.uri
                + '?access_token=' + this.accessToken;
    }

    public send(): Observable<GoogleTokeninfoReponseInterface> {
        return this.http.tokeninfo(this.getUrl());
    }
}
