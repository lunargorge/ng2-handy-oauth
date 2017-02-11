import { HandyOauthUrlsInterface } from './../interfaces/handy-oauth-urls.interface';
import { Injectable } from '@angular/core';

@Injectable()
export class HandyOauthUrls implements HandyOauthUrlsInterface {
    // google
    public GOOGLE_AUTH_URL: string = 'https://accounts.google.com';
    public GOOGLE_AUTH_URI: string = '/o/oauth2/v2/auth';
    public GOOGLE_USERINFO_URL: string = 'https://www.googleapis.com';
    public GOOGLE_USERINFO_URI: string = '/oauth2/v3/userinfo';
    public GOOGLE_TOKENINFO_URL: string = 'https://www.googleapis.com';
    public GOOGLE_TOKENINFO_URI: string = '/oauth2/v3/tokeninfo';
    public GOOGLE_REVOKE_URL: string = 'https://accounts.google.com';
    public GOOGLE_REVOKE_URI: string = '/o/oauth2/revoke';
    // facebook
    public FACEBOOK_AUTH_URL: string = 'https://www.facebook.com';
    public FACEBOOK_AUTH_URI: string = '/v2.8/dialog/oauth';
    public FACEBOOK_USERINFO_URL: string = 'https://graph.facebook.com';
    public FACEBOOK_USERINFO_URI: string = '/me';
    public FACEBOOK_REVOKE_URL: string = 'https://graph.facebook.com';
    public FACEBOOK_REVOKE_URI: string = '/permissions';
    // foursquare
    public FOURSQUARE_AUTH_URL: string = 'https://foursquare.com';
    public FOURSQUARE_AUTH_URI: string = '/oauth2/authenticate';
    public FOURSQUARE_USERINFO_URL: string = 'https://api.foursquare.com';
    public FOURSQUARE_USERINFO_URI: string = '/v2/users/self';
    // spotify
    public SPOTIFY_AUTH_URL: string = 'https://accounts.spotify.com';
    public SPOTIFY_AUTH_URI: string = '/authorize';
    public SPOTIFY_USERINFO_URL: string = 'https://api.spotify.com';
    public SPOTIFY_USERINFO_URI: string = '/v1/me';
}
