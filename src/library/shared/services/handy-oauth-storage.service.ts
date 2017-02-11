import { Injectable } from '@angular/core';

import {
    HandyOauthStorageInterface as StorageInterface
} from './../interfaces/handy-oauth-storage.interface';

@Injectable()
export class HandyOauthStorageService implements StorageInterface {
    private storage: any;

    constructor() {
        this.storage = localStorage;
    }

    public set(key: string, value: any): void {
        this.storage.setItem(key, JSON.stringify(value));
    }

    public get(key: string): any {
        let val = this.storage.getItem(key);

        if (val) {
            return JSON.parse(val);
        }

        return null;
    }

    public remove(key: string): void {
        this.storage.removeItem(key);
    }
}
