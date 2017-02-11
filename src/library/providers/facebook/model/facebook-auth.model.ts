import { Injectable } from '@angular/core';

import { HandyOauthUrls as Urls } from './../../../shared/class/handy-oauth-urls.class';
import { GoogleAuthModel } from './../../google/model/google-auth.model';

@Injectable()
export class FacebookAuthModel extends GoogleAuthModel {
    protected scope: string = 'public_profile,email';

    constructor(protected urls: Urls) {
        super(urls);
    }

    protected prepareUrl() {
        this.url = this.urls.FACEBOOK_AUTH_URL;
        this.uri = this.urls.FACEBOOK_AUTH_URI;
    }
}
