import { Injectable } from '@angular/core';

import {
    HandyOauthProvider,
    HandyOauthStorageKeys,
    HandyOauthProviders,
    HandyOauthConfigProviderInterface,
    HandyOauthErrorKeys,
    HandyOauthProcessProgressEnum,
    HandyOauthMessageInterface,
    HandyOauthMessageService,
    HandyOauthUserDataInterface,
    HandyOauthProviderInterface,
    HandyOauthConfigProvidersService,
    HandyOauthStorageService
} from './../../shared';

import {
    FoursquareAuthModel, FoursquareUserinfoModel
 } from './model';

import { FoursquareUserinfoResponseInterface } from './interface/foursquare-userinfo-response.interface';

@Injectable()
export class FoursquareProviderModel extends HandyOauthProvider implements HandyOauthProviderInterface {
    constructor(
        protected configServ: HandyOauthConfigProvidersService,
        protected storageServ: HandyOauthStorageService,
        protected messageServ: HandyOauthMessageService<HandyOauthMessageInterface>,
        protected auth: FoursquareAuthModel,
        protected userinfo: FoursquareUserinfoModel
    ) {
        super();

        let config: HandyOauthConfigProviderInterface
            = this.configServ.getConfigProvider(HandyOauthProviders.FOURSQUARE);
        this.auth.setConfig(config);
        this.providerName = HandyOauthProviders.FOURSQUARE;
    }

    public logout(data: HandyOauthUserDataInterface): void {
        // https://developer.foursquare.com/overview/auth ... don't have desc revoked
        this.messageServ.next({
            progress: HandyOauthProcessProgressEnum.REVOKED
        });
    }

    protected getUserInfo(accessToken: string): void {

        this.userinfo.setAccessToken(accessToken);
        this.userinfo.send().subscribe(
            (res: FoursquareUserinfoResponseInterface) => {
                this.prepareData(accessToken, res);
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

    protected prepareData(token: string, data: FoursquareUserinfoResponseInterface): void {
        let responseData = {
            cid: data.response.user.id,
            name: data.response.user.firstName,
            familyName: data.response.user.lastName,
            email: data.response.user.contact.email,
            gender: data.response.user.gender,
            locale: '',
            picture: data.response.user.photo.prefix + '64x64' + data.response.user.photo.suffix,
            accessToken: token,
            accessTokeneEpires: (new Date()).getTime() + 3600,
            provider: this.providerName,
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
