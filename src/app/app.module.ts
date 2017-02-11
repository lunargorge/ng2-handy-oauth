
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';

import { Ng2HandySyntaxHighlighterModule } from 'ng2-handy-syntax-highlighter';

import '../styles/styles.scss';
import '../styles/headings.css';

import { Ng2HandyOauthModule } from './../library/index'; // ... from 'ng2-handy-oauth'

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    HomeComponent,
    NoContentComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2HandySyntaxHighlighterModule,
    Ng2HandyOauthModule.forRoot({
      providers: {
        facebook: {
          clientId: '1844231895853940',
          redirectUrl: 'http://oauth.diamondtower.pl/demo/callback'
        },
        google: {
          clientId: '967564884306-m8fmpkv78j24u24kf2tigrbci43ua3ni.apps.googleusercontent.com',
          redirectUrl: 'http://oauth.diamondtower.pl/demo/callback'
        },
        spotify: {
          clientId: '783ebe0153dc41febe56783b2ccee809',
          redirectUrl: 'http://oauth.diamondtower.pl/demo/callback'
        },
        foursquare: {
          clientId: 'K4XRQ2S5VFXMY2KS53MHUDPNAX11L3PF3DVYCW32ENYXLX5Y',
          redirectUrl: 'http://oauth.diamondtower.pl/demo/callback'
        }
      }
    }),
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [
     {provide: LocationStrategy, useClass: PathLocationStrategy},
  ]
})
export class AppModule {}
