import { Injectable } from '@angular/core';

import { SpotifyUserinfoResponseInterface } from './interface/facebook-userinfo-response.interface';

import { SpotifyAuthModel } from './model/spotify-auth.model';
import { SpotifyUserinfoModel } from './model/spotify-userinfo.model';

import {
    HandyOauthProvider,
    HandyOauthStorageKeys,
    HandyOauthErrorKeys,
    HandyOauthProviders,
    HandyOauthProcessProgressEnum,
    HandyOauthUrlParameter,
    HandyOauthStorageService,
    HandyOauthMessageInterface,
    HandyOauthMessageService,
    HandyOauthConfigProvidersService,
    HandyOauthConfigProviderInterface,
    HandyOauthUserDataInterface,
    HandyOauthProviderInterface
} from './../../shared';

@Injectable()
export class SpotifyProviderModel extends HandyOauthProvider implements HandyOauthProviderInterface {

    constructor(
        protected configServ: HandyOauthConfigProvidersService,
        protected messageServ: HandyOauthMessageService<HandyOauthMessageInterface>,
        protected storageServ: HandyOauthStorageService,
        protected auth: SpotifyAuthModel,
        protected userinfo: SpotifyUserinfoModel
    ) {
        super();

        let config: HandyOauthConfigProviderInterface = this.configServ.getConfigProvider(HandyOauthProviders.SPOTIFY);
        if (config) {
            this.auth.setConfig(config);
            this.providerName = HandyOauthProviders.SPOTIFY;
        }
    }

    public logout(data: HandyOauthUserDataInterface): void {
        // ... don't have desc revoked
        this.messageServ.next({
            progress: HandyOauthProcessProgressEnum.REVOKED
        });
    }

    protected getUserInfo(accessToken: string): void {
        let expiresIn: number = parseInt(HandyOauthUrlParameter.get(this.currentUrl, 'expires_in'), 10);

        this.userinfo.setAccessToken(accessToken);
        this.userinfo.send().subscribe((res: SpotifyUserinfoResponseInterface) => {
            this.prepareData(accessToken, res, expiresIn);
        },
            (err) => {
                this.messageServ.next({
                    progress: HandyOauthProcessProgressEnum.END,
                    error: {
                        code: this.providerName + '.' + HandyOauthErrorKeys.GET_USER_INFO,
                        message: err
                    }
                });
            });
    }

    protected prepareData(token: string, data: SpotifyUserinfoResponseInterface, expiresIn: number): void {
        let responseData = {
            cid: data.id,
            name: '',
            familyName: '',
            email: data.email,
            gender: '',
            locale: data.country.toLowerCase(),
            picture: '',
            accessToken: token,
            accessTokeneEpires: (new Date()).getTime() + expiresIn,
            provider: HandyOauthProviders.SPOTIFY,
            orignalResponse: {
                userinfo: data,
            }
        };

        this.storageServ.set(HandyOauthStorageKeys.DATA, responseData);

        this.messageServ.next({
            progress: HandyOauthProcessProgressEnum.END,
            response: responseData
        });
    }
}
