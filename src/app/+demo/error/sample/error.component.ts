
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
    HandyOauthErrorKeys as ErrorKeys
} from './../../../../library'; // ... from 'ng2-handy-oauth'

@Component({
    selector: 'handy-error',
    template: `
        <div class="container-fluid">
            This error code: {{errProvider}} / {{errCode}}
        </div>
    `
})
export class ErrorComponent implements OnInit, OnDestroy {
    public errProvider: string;
    public errCode: string;
    private sub: any;

    constructor(private route: ActivatedRoute) {

    }

    public ngOnInit() {
        this.sub = this.route.params.subscribe((params) => {
            if (params.hasOwnProperty('errCode')) {
                let err = params['errCode'].split('.') || ['', ''];
                this.errProvider = err[0];
                this.errCode = err[1];

                // do something ...
                // switch (this.errCode) {
                //     case ErrorKeys.REVOKE:
                //     case ErrorKeys.PARAM_STATE_ERROR:
                //     case ErrorKeys.GET_USER_INFO:
                //     case ErrorKeys.GET_TOKEN_INFO:
                //     case ErrorKeys.ADDRESS_CALLBACK_ERROR:
                //     break;
                //     default:
                //     break;
                // }
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
