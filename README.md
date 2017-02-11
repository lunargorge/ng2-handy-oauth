# ng2-handy-oauth
---
The Angular 2 component supports OAuth 2 implicit grant flow.

[Live demo](http://oauth.diamondtower.pl)

![Angular 2 OAuth](/src/assets/img/ng2-handy-oauth.png)

### Installation

```bash
npm install ng2-handy-oauth --save
```

### Configuration
In your app add Ng2HandyOauthModule:
```bash
import { NgModule } from 'angular2/core';
import { Ng2HandyOauthModule } from 'ng2-handy-oauth';

@NgModule({
 bootstrap:    [ /*YourAppComponent*/ ],
 declarations: [ /*YourAppComponent*/ ],
 imports:      [ 
   BrowserModule, 
   Ng2HandyOauthModule.forRoot({
      providers: {
        google: {
          clientId: '<KEY>',
          redirectUrl: '<REDIRECT_URL>'
        },
        <PROVIDER>: {
          clientId: '<KEY>',
          redirectUrl: '<REDIRECT_URL>'
        }
      }
    }) 
 ]
})
export class AppModule {}
```

### Obtaining OAuth 2 Keys

Google
* [Doc](https://developers.google.com/identity/protocols/OAuth2UserAgent)
* Go to [Google Developer Console](https://console.developers.google.com)
* Click "Credentials" (left menu)
* Click "Create credentials"
* Then select OAuth client ID
    * Application Type: Web Application
    * Authorized Javascript origins: http://example.com
    * Authorized redirect URI: http://example.com/callback

Facebook
* [Doc](https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/)
* Go to [Facebook Developers](https://developers.facebook.com)
* Click "My Apps"
* Then click "Add a New App" in the navigation bar
* Enter Display Name, choose a category and click "Create App ID"
* Click on Settings (left menu), then click + Add Platform
* Select Website
* Enter http://example.com for Site URL

Foursquare
* [Doc](https://developer.foursquare.com/overview/auth)
* Go to [Developers](https://developer.foursquare.com)
* Click "My Apps"
* Click "Create a new app"
* Enter "Your app name", "Application Url", "Redirect Url"

Spotify
* [Doc](https://developer.spotify.com/web-api/authorization-guide/#implicit-grant-flow)
* Go to [Spotify Developers](https://developer.spotify.com)
* Click "My Apps"
* Enter "Application Name", "Application Description"
* In next step enter Website and Redirect URIs
* Prepare other components - Full example

### Prepare other components - [Full example](http://oauth.diamondtower.pl/demo/sign-in)

* Sign in - init implicit grant flow
* Callback - receive access_token
* Info - display user data
* Error - handling errors