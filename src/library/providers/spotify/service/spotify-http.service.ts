import { Injectable } from '@angular/core';
import { Http, Response, Jsonp, RequestOptionsArgs , Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { SpotifyUserinfoResponseInterface } from './../interface/facebook-userinfo-response.interface';

@Injectable()
export class SpotifyHttpService {
    public static handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }

    constructor(private http: Http, private jsonp: Jsonp) {

    }

    public userinfo(url: string, accessToken: string): Observable<SpotifyUserinfoResponseInterface> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + accessToken);
        console.log(accessToken);
        return this.http.get(url, { headers })
            .map((res) => res.json()).catch(SpotifyHttpService.handleError);
    }

}
