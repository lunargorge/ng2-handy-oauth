import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';

@Injectable()
export class HandyOauthMessageService<T> {
    protected subject: Subject<T> = new BehaviorSubject<T>(null);

    public next(data: T) {
        this.subject.next(data);
    }

    public subscribe(cb: Function, cbErr?: Function): Subscription {
        return this.subject.subscribe(
            (res: T) => {
                if (!res) {
                    return;
                }
                cb(res);
            },
            (err: any) => {
                cbErr(err);
            }
        );
    }
}
