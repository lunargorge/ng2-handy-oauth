import { Injectable } from '@angular/core';

import {
    HandyOauthConfigInterface,
    HandyOauthConfigProviderInterface as ConfigProviderInterface
} from './../interfaces';

@Injectable()
export class HandyOauthConfigProvidersService {

    constructor(private config: HandyOauthConfigInterface) {

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

        return null;
        // throw Error('Provider "' + name + '" don\'t exists');
    }
}
