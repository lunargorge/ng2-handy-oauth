import { Injectable } from '@angular/core';

import {
    HandyOauthAuthModelInterface,
    HandyOauthConfigProviderInterface as ConfigProviderInterface,
    HandyOauthUrls as Urls
} from './../../../shared';

@Injectable()
export class GoogleAuthModel implements HandyOauthAuthModelInterface {
    protected url: string;
    protected uri: string;
    protected scope: string = 'email profile openid';
    protected state: string = 'profile';
    protected redirectUrl: string = '';
    protected responseType: string = 'token';
    protected clientId: string = '';

    constructor(protected urls: Urls) {
        this.prepareUrl();
    }

    public setState() {
        this.state = this.state + '-' + Math.random().toString(16);
    }

    public getState(): string {
        return this.state;
    }

    public setConfig(config: ConfigProviderInterface): void {
        this.redirectUrl = config.redirectUrl;
        this.clientId = config.clientId;
        // todo: others ...
    }

    public getUrl(): string {
        this.setState();

        return this.url
            + this.uri
            + '?client_id=' + this.clientId
            + '&redirect_uri=' + encodeURI(this.redirectUrl)
            + '&state=' + encodeURI(this.state)
            + '&response_type=' + encodeURI(this.responseType)
            + '&scope=' + encodeURI(this.scope);
    }

    protected prepareUrl() {
        this.url = this.urls.GOOGLE_AUTH_URL;
        this.uri = this.urls.GOOGLE_AUTH_URI;
    }
}
