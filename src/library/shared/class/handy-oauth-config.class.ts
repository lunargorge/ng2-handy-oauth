import { HandyOauthConfigInterface } from './../interfaces/handy-oauth-config.interface';

// klasa istnieje jedynie ze wzgledu na AoT
export class HandyOauthConfig  implements HandyOauthConfigInterface {
    public providers: any;
}
