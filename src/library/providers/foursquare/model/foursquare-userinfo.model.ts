import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FoursquareUserinfoResponseInterface } from './../interface/foursquare-userinfo-response.interface';
import { FoursquareHttpService } from './../service/foursquare-http.service';

import {
    HandyOauthUrls as Urls,
    HandyOauthFlowModelInterface
} from './../../../shared';

@Injectable()
export class FoursquareUserinfoModel implements HandyOauthFlowModelInterface {

    protected url: string;
    protected uri: string;
    protected accessToken: string = '';

    constructor(private http: FoursquareHttpService, private urls: Urls) {
        this.url = urls.FOURSQUARE_USERINFO_URL;
        this.uri = urls.FOURSQUARE_USERINFO_URI;
    }

    public setAccessToken(token: string): void {
        this.accessToken = token;
    }

    public getUrl(): string {
        return this.url
            + this.uri
            + '?oauth_token=' + this.accessToken
            + '&v=' + this.yyyymmdd();
    }

    public send(): Observable<FoursquareUserinfoResponseInterface> {
        return this.http.userinfo(this.getUrl());
    }

    protected yyyymmdd(): string {
        let date = new Date();
        let mm = date.getMonth() + 1; // getMonth() is zero-based
        let dd = date.getDate();

        return [
            date.getFullYear(),
            (mm > 9 ? '' : '0') + mm,
            (dd > 9 ? '' : '0') + dd
        ].join('');
    }
}
