import { HandyOauthUserDataInterface } from './handy-oauth-user-data.interface';

export interface HandyOauthProviderInterface {
    login(): void;
    flow(currentUrl: string): void;
    logout(data: HandyOauthUserDataInterface): void;
}
