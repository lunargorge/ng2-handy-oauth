
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import {
    HandyOauthProcessProgressEnum,
    HandyOauthMessageInterface,
    HandyOauthProvidersController,
    HandyOauthStorageKeys,
    HandyOauthUserDataInterface,
    HandyOauthStorageService
} from '../../../../library'; // ... from 'ng2-handy-oauth'

@Component({
    selector: 'handy-info',
    template: `
        <div class="container" *ngIf="logoutProcess === 0">
            <div class="row text-center">
                <div class="col-12">
                    <a (click)="logout()" class="btn btn-secondary btn-block">
                        <i class="fa fa-sign-out" aria-hidden="true"></i>
                        Sign out
                    </a>
                </div>
            </div>
            <div class="row text-left mt-3">
                <div class="col-12">
                    <pre *ngIf="data">{{data | json}}</pre>
                </div>
            </div>
        </div>
        <div class="container" *ngIf="logoutProcess === 1">
            Wait ...
        </div>
    `
})
export class InfoComponent implements OnInit, OnDestroy {
    public data: HandyOauthUserDataInterface;
    public logoutProcess: number;

    constructor(
        private router: Router,
        private storageServ: HandyOauthStorageService,
        private oauthProvidersController: HandyOauthProvidersController
    ) {

    }

    public ngOnInit() {
        this.logoutProcess = 0;
        this.data = this.storageServ.get(HandyOauthStorageKeys.DATA);

        if (!this.data) {
            this.router.navigate(['/demo', 'sign-in']);
        }
    }

    public ngOnDestroy() {
        this.oauthProvidersController.unsubscribe();
    }

    public logout(): void {
        this.logoutProcess = 1;
        this.oauthProvidersController.logout((res: HandyOauthMessageInterface) => {
            if (res.progress === HandyOauthProcessProgressEnum.REVOKED) {
                this.logoutProcess = 0;
                this.router.navigate(['/demo', 'sign-in']);
            }
        });
    }
}
