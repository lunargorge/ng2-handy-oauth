import { Injectable } from '@angular/core';
import { Http, Response, Jsonp, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { FacebookUserinfoResponseInterface } from './../interface/facebook-userinfo-response.interface';

@Injectable()
export class FacebookHttpService {
    public static handleError(error: Response): Observable<any> {
        return Observable.throw(error.json().error || 'Server error');
    }

    constructor(private http: Http, private jsonp: Jsonp) {

    }

    public userinfo(url: string): Observable<FacebookUserinfoResponseInterface> {
        return this.http.get(url)
            .map((res) => res.json()).catch(FacebookHttpService.handleError);
    }

    public revoke(url: string): Observable<any> {
        return this.http.delete(url)
            .map((res) => res.json()).catch(FacebookHttpService.handleError);
    }

}
