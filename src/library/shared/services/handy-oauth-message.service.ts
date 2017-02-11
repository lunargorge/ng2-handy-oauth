import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class HandyOauthMessageService<T> {
    protected subject: Subject<T> = new BehaviorSubject<T>(null);

    public next(data: T) {
        this.subject.next(data);
    }

    public subscribe(cb: Function, cbErr?: Function) {
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
