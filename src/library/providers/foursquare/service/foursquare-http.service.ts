import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { FoursquareUserinfoResponseInterface } from './../interface/foursquare-userinfo-response.interface';

@Injectable()
export class FoursquareHttpService {
    public static handleError(error: Response): Observable<any> {
        return Observable.throw(error.json().error || 'Server error');
    }

    constructor(private http: Http) {

    }

    public userinfo(url: string): Observable<FoursquareUserinfoResponseInterface> {
        return this.http.get(url)
            .map((res) => res.json()).catch(FoursquareHttpService.handleError);
    }
}
