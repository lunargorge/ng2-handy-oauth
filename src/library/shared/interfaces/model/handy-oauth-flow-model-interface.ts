import { Observable } from 'rxjs/Observable';

export interface HandyOauthFlowModelInterface {
    setAccessToken(token: string): void;
    getUrl(): string;
    send(): Observable<any>;
}
