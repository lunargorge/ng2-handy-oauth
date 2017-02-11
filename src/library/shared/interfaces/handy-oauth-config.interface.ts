import { HandyOauthUrlsInterface as UrlsInterface } from './handy-oauth-urls.interface';
import {
    HandyOauthConfigProviderInterface as ConfigProviderInterface
} from './handy-oauth-config-provider.interface';
import { HandyOauthStorageInterface as StorageInterface } from './handy-oauth-storage.interface';

export interface HandyOauthConfigInterface {
    providers: {
        google?: ConfigProviderInterface,
        facebook?: ConfigProviderInterface,
        foursquare?: ConfigProviderInterface,
        spotify?: ConfigProviderInterface,
        // twitter?: ConfigProviderInterface,
        // yahoo?: ConfigProviderInterface,
    };
    storage?: StorageInterface;
    urls?: UrlsInterface;
}
