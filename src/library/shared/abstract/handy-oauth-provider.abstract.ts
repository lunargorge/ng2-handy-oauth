import { HandyOauthFlowModelInterface } from './../interfaces/model/handy-oauth-flow-model-interface';
import { HandyOauthStorageService } from './../services/handy-oauth-storage.service';
import { HandyOauthConfigProvidersService } from '../services/handy-oauth-config-providers.service';
import { HandyOauthErrorKeys } from './../class/handy-oauth-error-keys.class';
import { HandyOauthProcessProgressEnum } from '../enum/handy-oauth-process-progress.enum';
import { HandyOauthMessageInterface } from './../interfaces/handy-oauth-message.interface';
import { HandyOauthMessageService } from './../services/handy-oauth-message.service';
import { HandyOauthUrlParameter } from './../class/handy-oauth-url-parameter.class';
import { HandyOauthAuthModelInterface } from './../interfaces/model/handy-oauth-auth-model.interface';

export abstract class HandyOauthProvider {
    protected keyAccessToken: string = 'access_token';
    protected keyState: string = 'state';
    protected keyError: string = 'error';

    protected configServ: HandyOauthConfigProvidersService;
    protected messageServ: HandyOauthMessageService<HandyOauthMessageInterface>;
    protected storageServ: HandyOauthStorageService;
    protected auth: HandyOauthAuthModelInterface;
    protected userinfo: HandyOauthFlowModelInterface;
    protected revoke: HandyOauthFlowModelInterface;
    protected tokeninfo: HandyOauthFlowModelInterface;

    protected providerName: string;
    protected currentUrl: string;

    public login(): void {
        window.location.href = this.auth.getUrl();
    }

    public flow(currentUrl: string): void {
        this.currentUrl = currentUrl;
        let paramError: string = HandyOauthUrlParameter.get(currentUrl, this.keyError);
        let paramState: string = HandyOauthUrlParameter.get(currentUrl, this.keyState);
        let paramAccessToken: string = HandyOauthUrlParameter.get(currentUrl, this.keyAccessToken);
        let stopProcess: number = 0;

        this.messageServ.next({
            progress: HandyOauthProcessProgressEnum.START
        });

        if (paramError) {
            this.messageServ.next({
                progress: HandyOauthProcessProgressEnum.END,
                error: {
                    code: paramError,
                    message: ''
                }
            });
            stopProcess = 1;
        }

        if (!stopProcess && paramState && paramState === this.auth.getState()) {
            this.messageServ.next({
                progress: HandyOauthProcessProgressEnum.END,
                error: {
                    code: this.providerName + '.' + HandyOauthErrorKeys.PARAM_STATE_ERROR,
                    message: ''
                }
            });
            stopProcess = 1;
        }

        if (!stopProcess && paramAccessToken) {
            this.getUserInfo(paramAccessToken);
        }
    }

    protected getUserInfo(accessToken: string): void {
        //
    }
}
