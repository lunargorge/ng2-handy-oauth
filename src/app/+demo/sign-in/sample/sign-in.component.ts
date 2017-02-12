
import { Component, OnInit } from '@angular/core';

import {
    HandyOauthStorageKeys,
    HandyOauthUserDataInterface,
    HandyOauthStorageService,
    HandyOauthConfigProvidersService,
    HandyOauthProvidersController
} from './../../../../library'; // ... from 'ng2-handy-oauth'

@Component({
    selector: 'handy-sign-in',
    // tslint:disable
    template: `
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-8">
                <div class="card text-center">
                    <div class="card-header">
                        <strong>Sign in</strong>
                    </div>
                    <div class="card-block">
                        <a *ngFor="let provider of providers" 
                            (click)="login(provider)" class="btn btn-secondary btn-block {{provider}}">
                            <i class="fa fa-{{provider}}" aria-hidden="true"></i>
                            Sign in with {{provider}}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <sign-in-doc></sign-in-doc>
    `,
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    public providers: string[];

    constructor(
        private oauthProvidersController: HandyOauthProvidersController,
        private oauthConfigServ: HandyOauthConfigProvidersService,
        private storageServ: HandyOauthStorageService,
    ) {

    }

    public ngOnInit() {
        this.top();
        this.block();
        this.getNamesProviders();
    }

    public login(nameProvider: string): void {
        this.oauthProvidersController.login(nameProvider);
    }

    protected top(): void {
        setTimeout(() => {
            window.scrollTo(0,0);
        }, 200);
    }

    protected getNamesProviders(): void {
        this.providers = this.oauthConfigServ.getNamesProviders();
    }

    protected block(): void {
        // for the logged-in user you can block this view ...
        // let data: HandyOauthUserDataInterface = this.storageServ.get(HandyOauthStorageKeys.DATA);
        // if (data) {
            // redirect somewhere ...
        // }
    }
}
