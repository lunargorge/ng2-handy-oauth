import { Injectable } from '@angular/core';

import { HandyOauthUrls as Urls } from './../../../shared/class/handy-oauth-urls.class';
import { GoogleAuthModel } from './../../google/model/google-auth.model';

@Injectable()
export class SpotifyAuthModel extends GoogleAuthModel {
    protected scope: string = 'user-read-private user-read-email user-read-birthdate';

    constructor(protected urls: Urls) {
        super(urls);
    }

    protected prepareUrl() {
        this.url = this.urls.SPOTIFY_AUTH_URL;
        this.uri = this.urls.SPOTIFY_AUTH_URI;
    }
}
