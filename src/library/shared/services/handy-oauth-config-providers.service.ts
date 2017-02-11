import { Injectable } from '@angular/core';

import {
    HandyOauthConfigProviderInterface as ConfigProviderInterface
} from './../interfaces/handy-oauth-config-provider.interface';

@Injectable()
export class HandyOauthConfigProvidersService {
    constructor(private configProviders: {[name: string]: ConfigProviderInterface}) { }

    public getNamesProviders(): string[] {
        return Object.keys(this.configProviders);
    }

    public isProvider(name: string): boolean {
        return this.configProviders.hasOwnProperty(name);
    }

    public getConfigProvider(name: string): ConfigProviderInterface {
        if (this.isProvider(name)) {
            return this.configProviders[ name ];
        }

        throw Error('Provider "' + name + '" don\'t exists');
    }
}
