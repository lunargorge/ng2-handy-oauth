import { HandyOauthConfigProviderInterface } from './../handy-oauth-config-provider.interface';

export interface HandyOauthAuthModelInterface {
    setConfig(config: HandyOauthConfigProviderInterface): void;
    getState(): string;
    getUrl(): string;
}
