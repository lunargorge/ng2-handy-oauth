import { Ng2HandySyntaxHighlighterModule } from 'ng2-handy-syntax-highlighter';
import { SignInDocComponent } from './sign-in/docs/sign-in-doc.component';
import { ErrorComponent } from './error/sample/error.component';
import { InfoComponent } from './info/sample/info.component';
import { CallbackComponent } from './callback/sample/callback.component';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sample/sign-in.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

export const routesSignInModule: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'info', component: InfoComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'error/:errCode', component: ErrorComponent }
];

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(routesSignInModule),
      Ng2HandySyntaxHighlighterModule,
    ],
    providers: [],
    declarations: [
      SignInComponent, CallbackComponent, InfoComponent, ErrorComponent,
      SignInDocComponent
    ]
})
export class DemoSignInModule {

}
