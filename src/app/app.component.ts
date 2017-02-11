import {
  HandyOauthMessageInterface as OauthMessageInterface
} from './../library/shared/interfaces/handy-oauth-message.interface';
import {
  HandyOauthMessageService as OauthMessageService
} from './../library/shared/services/handy-oauth-message.service';
import {
  HandyOauthProvidersController as OauthProvidersController
} from './../library';
import {
  HandyOauthProcessProgressEnum as OauthProcessProgressEnum
} from './../library/shared/enum/handy-oauth-process-progress.enum.ts';

/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <h1 class="text-center h1-top">
            <a [routerLink]=" ['/'] ">ng2-handy-oauth</a></h1>
          <hr>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-2 bd-sidebar">
          <nav>
            <span>
              <a [routerLink]=" ['/'] ">
                Home
              </a>
            </span>
            <hr>
            <span>
              <a [routerLink]=" ['./demo/sign-in'] ">
                Demo
              </a>
            </span>
          </nav>
        </div>
        <div class="col-sm-10">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {

  // tslint:disable-next-line:no-empty
  constructor() {

  }

  public ngOnInit() {
    //
  }
}
