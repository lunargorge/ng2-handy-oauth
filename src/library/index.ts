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
    HandyOauthUrls as Urls
} from './shared';

// let provideProvidersFactory = (
//     config: ConfigProvidersService,
//     storage: StorageService,
//     message: MessageService<MessageInterface>,
//     http: Http
// ) => {
//     return new ProvidersFactory(config, storage, message, http);
// };

export * from './providers';
export * from './shared';

@NgModule({
  imports: [
      HttpModule,
      JsonpModule,
      RouterModule,
  ],
  declarations: [ ],
  exports: [ ],
})

export class Ng2HandyOauthModule {
public static forRoot(
    config: ConfigInterface,
    ): ModuleWithProviders {
        return {
            ngModule: Ng2HandyOauthModule,
            providers: [
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
                    useValue: new ConfigProvidersService(config.providers)
                },
                {
                    provide: StorageService,
                    useValue: (!config.hasOwnProperty('storage')) ? new StorageService() : config.storage
                },
                {
                    provide: Urls,
                    useValue: (!config.hasOwnProperty('urls')) ? new Urls() : config.urls
                },
                {
                    provide: MessageService,
                    useValue: new MessageService<MessageInterface>()
                },
                ProvidersContainer,
                ProvidersController
                // {
                //     provide: ProvidersFactory,
                //     useFactory: provideProvidersFactory,
                //     deps: [ConfigProvidersService, StorageService, MessageService, Http]
                // },
            ]
        };
  };
}
