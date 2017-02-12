import { HttpModule, JsonpModule, Http } from '@angular/http';
import { Router, RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';

import {
    SpotifyHttpService,
    SpotifyProviderModel,
    SpotifyUserinfoModel,
    SpotifyAuthModel
} from './providers/spotify';

import {
    FoursquareHttpService,
    FoursquareAuthModel,
    FoursquareUserinfoModel,
    FoursquareProviderModel
} from './providers/foursquare';

import {
    FacebookAuthModel,
    FacebookUserinfoModel,
    FacebookProviderModel,
    FacebookAuthRevokeModel,
    FacebookHttpService
} from './providers/facebook';

import {
    GoogleProviderModel,
    GoogleAuthModel,
    GoogleUserinfoModel,
    GoogleTokeninfoModel,
    GoogleHttpService,
    GoogleRevokeModel
} from './providers/google';

import {
    HandyOauthProvidersContainer as ProvidersContainer,
    HandyOauthProvidersController as ProvidersController
} from './providers';

import {
    HandyOauthMessageService as MessageService,
    HandyOauthConfigInterface as ConfigInterface,
    HandyOauthConfigProvidersService as ConfigProvidersService,
    HandyOauthStorageService as StorageService,
    HandyOauthStorageInterface as StorageInterface,
    HandyOauthMessageInterface as MessageInterface,
    HandyOauthUrls as Urls,
    HandyOauthConfig
} from './shared';

export function configProvidersServiceFactory(config: ConfigInterface) {
  return  new ConfigProvidersService(config);
  // return  new ConfigProvidersService();
}

export function storageServiceFactory(config: ConfigInterface) {
    return  (!config.hasOwnProperty('storage')) ? new StorageService() : config.storage;
}

export function urlsFactory(config: ConfigInterface) {
    return  (!config.hasOwnProperty('urls')) ? new Urls() : config.urls;
}

export function messageServiceFactory() {
    return  new MessageService<MessageInterface>();
}

export * from './providers';
export * from './shared';

@NgModule({
  imports: [
      HttpModule,
      JsonpModule,
      RouterModule,
  ],
  // declarations: [ ],
  // exports: [ ],
})

export class Ng2HandyOauthModule {
public static forRoot(
    config: ConfigInterface,
    ): ModuleWithProviders {
        return {
            ngModule: Ng2HandyOauthModule,
            providers: [
                {
                    provide: HandyOauthConfig,
                    useValue: config
                },
                // google
                GoogleHttpService,
                GoogleAuthModel,
                GoogleRevokeModel,
                GoogleUserinfoModel,
                GoogleTokeninfoModel,
                GoogleProviderModel,
                // facebook
                FacebookHttpService,
                FacebookAuthModel,
                FacebookAuthRevokeModel,
                FacebookUserinfoModel,
                FacebookProviderModel,
                // foursquare
                FoursquareHttpService,
                FoursquareAuthModel,
                FoursquareUserinfoModel,
                FoursquareProviderModel,
                // spotify
                SpotifyHttpService,
                SpotifyAuthModel,
                SpotifyUserinfoModel,
                SpotifyProviderModel,
                {
                    provide: ConfigProvidersService,
                    useFactory: configProvidersServiceFactory,
                    deps: [HandyOauthConfig]
                },
                {
                    provide: StorageService,
                    useFactory: storageServiceFactory,
                    deps: [HandyOauthConfig]
                },
                {
                    provide: Urls,
                    useFactory: urlsFactory,
                    deps: [HandyOauthConfig]
                },
                {
                    provide: MessageService,
                    useFactory: messageServiceFactory
                },
                ProvidersContainer,
                ProvidersController
            ]
        };
  };
}
