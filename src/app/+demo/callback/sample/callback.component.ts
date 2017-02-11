
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import {
    HandyOauthStorageKeys,
    HandyOauthStorageService,
    HandyOauthMessageInterface,
    HandyOauthProvidersController,
    HandyOauthProcessProgressEnum
} from './../../../../library'; // ... from 'ng2-handy-oauth'

@Component({
    selector: 'handy-callback',
    template: `
        <div class="container-fluid">
            <span *ngIf="progress === 1 || progress === 2">Logging ...</span>
            <span *ngIf="progress === 3">Redirecting ...</span>
        </div>
    `
})
export class CallbackComponent implements OnInit, OnDestroy {
    public progress: number;

    constructor(
        private router: Router,
        private oauthProvidersController: HandyOauthProvidersController,
        private storageServ: HandyOauthStorageService
    ) {

    }

    public ngOnInit() {
        this.progress = HandyOauthProcessProgressEnum.NO;
        this.callbackFlow();
    }

    public ngOnDestroy() {
        this.oauthProvidersController.unsubscribe();
    }

    protected callbackFlow() {
        this.oauthProvidersController.flow((res: HandyOauthMessageInterface) => {
            this.progress = res.progress;
            if (res.hasOwnProperty('response') && res.response.hasOwnProperty('cid')) {
                this.router.navigate(['/demo', 'info']);
            } else if (res.hasOwnProperty('error')) {
                this.storageServ.remove(HandyOauthStorageKeys.DATA);
                this.router.navigate(['/demo', 'error', res.error.code]);
            }
        });
    }
}
