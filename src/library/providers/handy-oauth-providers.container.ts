import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import {
    HandyOauthConfigProvidersService as ConfigProvidersService,
    HandyOauthProviderInterface as ProviderInterface,
    HandyOauthStorageService as StorageService,
    HandyOauthMessageService as MessageService,
    HandyOauthMessageInterface as MessageInterface,
    HandyOauthProviders as Providers
} from './../shared';

import { FacebookProviderModel } from './facebook/facebook-provider.model';
import { GoogleProviderModel } from './google/google-provider.model';
import { FoursquareProviderModel } from './foursquare/foursquare-provider.model';
import { SpotifyProviderModel } from './spotify/spotify-provider.model';

@Injectable()
export class HandyOauthProvidersContainer {
    private providers: {[providerName: string]: ProviderInterface} = {};

    constructor(
            private configServ: ConfigProvidersService,
            private providerGoogle: GoogleProviderModel,
            private providerFacebook: FacebookProviderModel,
            private providerFoursquare: FoursquareProviderModel,
            private providerSpotify: SpotifyProviderModel
    ) {
    }

    public getProvider(providerName: string): ProviderInterface {
        if (this.configServ.getNamesProviders().indexOf(providerName) < 0) {
             throw Error('You have to config provider "' + providerName + '" !');
        }

        switch (providerName) {
            case Providers.GOOGLE:
                return this.providerGoogle;
            case Providers.FACEBOOK:
                 return this.providerFacebook;
            case Providers.FOURSQUARE:
                 return this.providerFoursquare;
            case Providers.SPOTIFY:
                 return this.providerSpotify;
            default:
        }

        throw Error('ProvidersContainer don\'t support provider "' + providerName + '" !');
    }
}
