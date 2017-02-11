import { HandyOauthUserDataInterface } from './handy-oauth-user-data.interface';

export interface HandyOauthMessageInterface {
    progress: number;   // HandyOauthProcessProgressEnum
    response?: HandyOauthUserDataInterface;
    error?: {
        code: string,
        message: any
    };
}
