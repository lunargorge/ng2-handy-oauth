import { Injectable } from '@angular/core';

import {
    HandyOauthConfigProviderInterface as ConfigProviderInterface
} from './../interfaces/handy-oauth-config-provider.interface';
import { HandyOauthConfigInterface } from './../interfaces/handy-oauth-config.interface';

@Injectable()
export class HandyOauthConfigProvidersService {
    // constructor() {
    //     //
    // }
    constructor(private config: HandyOauthConfigInterface) {
        // this.configProviders = config.providers;
    }

    public getNamesProviders(): string[] {
        return Object.keys(this.config.providers);
    }

    public isProvider(name: string): boolean {
        return this.config.providers.hasOwnProperty(name);
    }

    public getConfigProvider(name: string): ConfigProviderInterface {
        if (this.isProvider(name)) {
            return this.config.providers[ name ];
        }

        throw Error('Provider "' + name + '" don\'t exists');
    }
}
