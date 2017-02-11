import { Component } from '@angular/core';

// tslint:disable
let appModuleTs = require('!!raw-loader?lang=typescript!./../../../app.module.ts');
let signInTs = require('!!raw-loader?lang=typescript!./../sample/sign-in.component.ts');
let callbackTs = require('!!raw-loader?lang=typescript!./../../callback/sample/callback.component.ts');
let infoTs = require('!!raw-loader?lang=typescript!./../../info/sample/info.component.ts');
let errorTs = require('!!raw-loader?lang=typescript!./../../error/sample/error.component.ts');

@Component({
    selector: 'sign-in-doc',
    template: `
        <div class="container-fluid mt-5">
            <ul class="nav flex-column flex-md-row nav-tabs" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#appModuleTs" role="tab">app.module.ts</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#signInTs" role="tab">sign-in.component.ts</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#callbackTs" role="tab">callback.component.ts</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#infoTs" role="tab">info.component.ts</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#errorTs" role="tab">error.component.ts</a>
            </li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
            <div class="tab-pane active" id="appModuleTs" role="tabpanel">
                <handy-syntax-highlighter [language]="'typescript'" [content]="appModuleTs"></handy-syntax-highlighter>
            </div>

            <div class="tab-pane" id="signInTs" role="tabpanel">
                <handy-syntax-highlighter [language]="'typescript'" [content]="signInTs"></handy-syntax-highlighter>
            </div>

            <div class="tab-pane" id="callbackTs" role="tabpanel">
                <handy-syntax-highlighter [language]="'typescript'" [content]="callbackTs"></handy-syntax-highlighter>
            </div>

            <div class="tab-pane" id="infoTs" role="tabpanel">
                <handy-syntax-highlighter [language]="'typescript'" [content]="infoTs"></handy-syntax-highlighter>
            </div>

            <div class="tab-pane" id="errorTs" role="tabpanel">
                <handy-syntax-highlighter [language]="'typescript'" [content]="errorTs"></handy-syntax-highlighter>
            </div>
            </div>
        </div>
    `
})
export class SignInDocComponent {
    public appModuleTs: string = appModuleTs;
    public signInTs: string = signInTs;
    public callbackTs: string = callbackTs;
    public infoTs: string = infoTs;
    public errorTs: string = errorTs;
}
