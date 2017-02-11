import { Injectable } from '@angular/core';
import { Http, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { GoogleUserinfoModel } from './../model/google-userinfo.model';
import {
    GoogleUserinfoResponseInterface,
    GoogleTokeninfoReponseInterface
} from './../interface';

@Injectable()
export class GoogleHttpService {
    public static handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }

    constructor(private http: Http, private jsonp: Jsonp) {

    }

    public tokeninfo(url: string): Observable<GoogleTokeninfoReponseInterface> {
        return this.send(url);
    }

    public userinfo(url: string): Observable<GoogleUserinfoResponseInterface> {
        return this.send(url);
    }

    public revoke(url: string): Observable<any> {
        return this.jsonp.request(url).catch(GoogleHttpService.handleError);
    }

    protected send(url: string): Observable<any> {
        return this.http.get(url)
            .map((res) => res.json()).catch(GoogleHttpService.handleError);
    }
}
