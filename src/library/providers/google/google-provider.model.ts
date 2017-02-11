import { Injectable } from '@angular/core';

import {
    HandyOauthErrorKeys,
    HandyOauthStorageKeys,
    HandyOauthUserDataInterface,
    HandyOauthProviderInterface,
    HandyOauthConfigProviderInterface,
    HandyOauthConfigProvidersService,
    HandyOauthStorageService,
    HandyOauthMessageInterface,
    HandyOauthMessageService,
    HandyOauthProviders,
    HandyOauthProvider,
    HandyOauthProcessProgressEnum as ProgressEnum
} from './../../shared';

import {
    GoogleAuthModel,
    GoogleUserinfoModel,
    GoogleTokeninfoModel,
    GoogleRevokeModel
} from './model';

import {
    GoogleTokeninfoReponseInterface,
    GoogleUserinfoResponseInterface
} from './interface';

@Injectable()
export class GoogleProviderModel extends HandyOauthProvider implements HandyOauthProviderInterface {
    protected responseTokenInfo: GoogleTokeninfoReponseInterface;
    protected responseUserInfo: GoogleUserinfoResponseInterface;
    protected responseData: HandyOauthUserDataInterface;

    constructor(
        protected configServ: HandyOauthConfigProvidersService,
        protected messageServ: HandyOauthMessageService<HandyOauthMessageInterface>,
        protected storageServ: HandyOauthStorageService,
        protected auth: GoogleAuthModel,
        protected revoke: GoogleRevokeModel,
        protected userinfo: GoogleUserinfoModel,
        protected tokeninfo: GoogleTokeninfoModel
    ) {
        super();

        let config: HandyOauthConfigProviderInterface =  this.configServ.getConfigProvider(HandyOauthProviders.GOOGLE);
        this.auth.setConfig(config);
        this.providerName = HandyOauthProviders.GOOGLE;
    }

    public logout(data: HandyOauthUserDataInterface): void {
        this.revoke.setAccessToken(data.accessToken);
        this.revoke.send().subscribe(
            (res) => {
                this.messageServ.next({
                    progress: ProgressEnum.REVOKED
                });
            },
            (err) => {
                this.messageServ.next({
                    progress: ProgressEnum.REVOKED,
                    error: {
                        code: this.providerName + '.' + HandyOauthErrorKeys.REVOKE,
                        message: err
                    }
                });
            }
        );
    }

    protected getUserInfo(accessToken: string): void {
        this.userinfo.setAccessToken(accessToken);
        this.userinfo.send().subscribe((res: GoogleUserinfoResponseInterface) => {
            this.responseUserInfo = res;
            this.getTokenInfo(accessToken);
        },
        (err) => {
            this.messageServ.next({
                progress: ProgressEnum.END,
                error: {
                    code: this.providerName + '.' + HandyOauthErrorKeys.GET_USER_INFO,
                    message: err
                }
            });
        });
    }

    protected getTokenInfo(accessToken: string): void {
        this.tokeninfo.setAccessToken(accessToken);
        this.tokeninfo.send().subscribe((res: GoogleTokeninfoReponseInterface) => {
            this.responseTokenInfo = res;
            this.prepareData(accessToken);
        },
        (err) => {
            this.messageServ.next({
                progress: ProgressEnum.END,
                error: {
                    code: this.providerName + '.' + HandyOauthErrorKeys.GET_TOKEN_INFO,
                    message: err
                }
            });
        });
    }

    protected prepareData(token: string): void {
        this.responseData = {
            cid: this.responseUserInfo.sub,
            name: this.responseUserInfo.given_name,
            familyName: this.responseUserInfo.family_name,
            email: this.responseUserInfo.email,
            gender: this.responseUserInfo.gender,
            locale: this.responseUserInfo.locale,
            picture: this.responseUserInfo.picture,
            accessToken: token,
            accessTokeneEpires: this.responseTokenInfo.exp,
            provider: HandyOauthProviders.GOOGLE,
            orignalResponse: {
                userinfo:  this.responseUserInfo,
                tokeninfo: this.responseTokenInfo
            }
        };

        this.storageServ.set(HandyOauthStorageKeys.DATA, this.responseData);

        this.messageServ.next({
            progress: ProgressEnum.END,
            response: this.responseData
        });
    }
}
