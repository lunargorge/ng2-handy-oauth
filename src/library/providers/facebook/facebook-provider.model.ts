import { Injectable } from '@angular/core';

import { FacebookUserinfoResponseInterface } from './interface/facebook-userinfo-response.interface';

import {
    FacebookUserinfoModel,
    FacebookAuthRevokeModel,
    FacebookAuthModel
} from './model';

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
export class FacebookProviderModel extends HandyOauthProvider implements HandyOauthProviderInterface {

    constructor(
        protected configServ: HandyOauthConfigProvidersService,
        protected messageServ: HandyOauthMessageService<HandyOauthMessageInterface>,
        protected storageServ: HandyOauthStorageService,
        protected auth: FacebookAuthModel,
        protected revoke: FacebookAuthRevokeModel,
        protected userinfo: FacebookUserinfoModel
    ) {
        super();

        let config: HandyOauthConfigProviderInterface = this.configServ.getConfigProvider(HandyOauthProviders.FACEBOOK);
        if (config) {
            this.auth.setConfig(config);
            this.providerName = HandyOauthProviders.FACEBOOK;
        }
    }

    public logout(data: HandyOauthUserDataInterface): void {
        this.revoke.setAccessToken(data.accessToken);
        this.revoke.setCid(data.cid);
        this.revoke.send().subscribe(
            (res) => {
                this.messageServ.next({
                    progress: HandyOauthProcessProgressEnum.REVOKED
                });
            },
            (err) => {
                this.messageServ.next({
                    progress: HandyOauthProcessProgressEnum.REVOKED,
                    error: {
                        code: this.providerName + '.' + HandyOauthErrorKeys.REVOKE,
                        message: err
                    }
                });
            }
        );
    }

    protected getUserInfo(accessToken: string): void {
        let expiresIn: number = parseInt(HandyOauthUrlParameter.get(this.currentUrl, 'expires_in'), 10);

        this.userinfo.setAccessToken(accessToken);
        this.userinfo.send().subscribe((res: FacebookUserinfoResponseInterface) => {
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

    protected prepareData(token: string, data: FacebookUserinfoResponseInterface, expiresIn: number): void {
        let responseData = {
            cid: data.id,
            name: data.name.split(' ')[0],
            familyName: data.name.split(' ')[1],
            email: JSON.parse('"' + data.email + '"'), // fix facebook unicode problem
            gender: data.gender,
            locale: data.locale.split('_')[0].toLowerCase(),
            picture: '',
            accessToken: token,
            accessTokeneEpires: (new Date()).getTime() + expiresIn,
            provider: HandyOauthProviders.FACEBOOK,
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
