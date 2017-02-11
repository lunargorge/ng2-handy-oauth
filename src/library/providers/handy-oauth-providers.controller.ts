import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import {
    HandyOauthMessageInterface as MessageInterface,
    HandyOauthMessageService as MessageService,
    HandyOauthProcessProgressEnum as ProcessProgressEnum,
    HandyOauthStorageService as StorageService,
    HandyOauthProviderInterface as ProviderInterface,
    HandyOauthConfigProvidersService as ConfigProvidersService,
    HandyOauthConfigProviderInterface as ConfigProviderInterface,
    HandyOauthStorageKeys as StorageKeys,
    HandyOauthUserDataInterface as UserDataInterface,
    HandyOauthErrorKeys as ErrorKeys
} from './../shared';
import { HandyOauthProvidersContainer as ProvidersContainer } from './handy-oauth-providers.container';

@Injectable()
export class HandyOauthProvidersController {
    private subFlow: any;
    private subMessage: any;

    constructor(
        private router: Router,
        private provaiders: ProvidersContainer,
        private configServ: ConfigProvidersService,
        private storageServ: StorageService,
        private messageServ: MessageService<MessageInterface>,
    ) {
    }

    public login(providerName: string): void {
        this.storageServ.set(StorageKeys.CURRENT_PROVIDER, providerName);
        let provider: ProviderInterface = this.provaiders.getProvider(providerName);
        provider.login();
    }

    public logout(cb: Function): void {
        this.subscribeMessage(cb);

        let providerName: string | null = this.storageServ.get(StorageKeys.CURRENT_PROVIDER);
        let data: UserDataInterface = this.storageServ.get(StorageKeys.DATA);

        if (providerName) {
            this.storageServ.remove(StorageKeys.CURRENT_PROVIDER);
            this.storageServ.remove(StorageKeys.DATA);
        }

        if (data) {
            let provider: ProviderInterface = this.provaiders.getProvider(providerName);
            provider.logout(data);
        }
    }

    public flow(cb: Function): void {
        this.subscribeMessage(cb);

        this.subFlow = this.router.events
            .filter((event) => event instanceof NavigationEnd)
            .subscribe((event) => {
            let providerName: string | null = this.storageServ.get(StorageKeys.CURRENT_PROVIDER);
            if (providerName) {
                let providerConfig: ConfigProviderInterface = this.configServ.getConfigProvider(providerName);
                let redirectUrl: string = providerConfig.redirectUrl.toLowerCase();
                let currentUrl: string = window.location.href;
                // tslint:disable-next-line:max-line-length
                // let currentUrl: string = 'http://oauth.diamondtower.pl/demo/callback#access_token=BQA9Uja5mPybrXzwe75cNWUlHI7uTw3M0qQFxKNvQ0TYh9tvapCSdWtmEzDinh8IT7TR6Ju_UP3y9eVuJkx_zFbGX_ZQjAOySICO4iWOp8SD0DB507ijJ_wvlpKnEQasuJFIbBs9TuyHVcAeaf4HSwo3_fT8uSDtNhHI&token_type=Bearer&expires_in=3600&state=profile-0.6fa7585fd6053';
                let pattern: any = new RegExp(redirectUrl);

                if (pattern.test(currentUrl)) {
                    let provider: ProviderInterface = this.provaiders.getProvider(providerName);
                    provider.flow(currentUrl);
                } else {
                    this.messageServ.next({
                        progress: ProcessProgressEnum.END,
                        error: {
                            code: providerName + '.' + ErrorKeys.ADDRESS_CALLBACK_ERROR,
                            message: currentUrl + ' do not contain ' + redirectUrl
                        }
                    });
                }
            }
        });
    }

    public unsubscribe(): void {
        if (this.subFlow) {
            this.subFlow.unsubscribe();
        }

        if (this.subMessage) {
            this.subMessage.unsubscribe();
        }
    }

    protected subscribeMessage(cb: Function): void {
        this.subMessage = this.messageServ.subscribe((res: MessageInterface) => {
            cb(res);
        });
    }
}
