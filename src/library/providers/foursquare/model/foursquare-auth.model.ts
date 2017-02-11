import { Injectable } from '@angular/core';

import {
    HandyOauthUrls as Urls,
    HandyOauthConfigProviderInterface,
    HandyOauthAuthModelInterface
} from './../../../shared';

@Injectable()
export class FoursquareAuthModel implements HandyOauthAuthModelInterface {
    protected url: string;
    protected uri: string;
    protected clientId: string;
    protected responseType: string = 'token';
    protected redirectUrl: string;

    constructor(protected urls: Urls) {
        this.prepareUrl();
    }

    public setConfig(config: HandyOauthConfigProviderInterface): void {
        this.redirectUrl = config.redirectUrl;
        this.clientId = config.clientId;
    }

    public getState(): string {
        return '';
    }

    public getUrl(): string {
        return this.url
            + this.uri
            + '?client_id=' + this.clientId
            + '&redirect_uri=' + encodeURI(this.redirectUrl)
            + '&response_type=' + this.responseType;
    }

    protected prepareUrl() {
        this.url = this.urls.FOURSQUARE_AUTH_URL;
        this.uri = this.urls.FOURSQUARE_AUTH_URI;
    }
}
