
namespace ies {

    export class SettingWindowMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "SettingWindowMediator";

        private proxy: GameProxy;

        public constructor(viewComponent: any) {
            super(SettingWindowMediator.NAME, viewComponent);
            super.initializeNotifier("ApplicationFacade");

            this.proxy = this.facade().retrieveProxy(GameProxy.NAME) as GameProxy;
            this.pageView.addEventListener(egret.Event.ADDED_TO_STAGE, this.initData, this);

            this.pageView.btnVolumeEffect.addEventListener(eui.UIEvent.CHANGE_END, this.setVolume, this);
            this.pageView.btnVolumeBGM.addEventListener(eui.UIEvent.CHANGE_END, () => this.setVolume("bgm"), this);
            
            this.pageView.switchEffect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchEffectClick, this);
            this.pageView.switchBG.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchBGClick, this);
            this.pageView.btnDeveloper.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showDeveloper, this);
            
        }

        public async initData() {
            this.pageView.showSetting = true;
            this.pageView.showDeveloper = false;
            this.pageView.switchEffect.selected = this.proxy.playerInfo.isSoundEffectOn;
            this.pageView.switchBG.selected = this.proxy.playerInfo.isSoundBGMOn;

            this.pageView.btnVolumeEffect.value = this.proxy.playerInfo.volumeEffect * 10;
            this.pageView.btnVolumeBGM.value = this.proxy.playerInfo.volumeBGM * 10;
        }

        private setVolume(type?: string) {
            if (type == "bgm") {
                SoundPool.volumeBGM = this.proxy.playerInfo.volumeBGM = this.pageView.btnVolumeBGM.pendingValue / 10;
            }
            else {
                this.proxy.playerInfo.volumeEffect = this.pageView.btnVolumeEffect.pendingValue / 10;
            }
            this.proxy.savePlayerInfoToStorage();
        }

        private switchEffectClick(e: egret.TouchEvent) {
            this.proxy.switchEffect(this.pageView.switchEffect.selected);
        }

        private switchBGClick(e: egret.TouchEvent) {
            this.proxy.switchBGM(this.pageView.switchBG.selected);
        }

        private showDeveloper(b: boolean = true) {
            this.pageView.showSetting = !b;
            this.pageView.showDeveloper = b;
        }

        public listNotificationInterests(): Array<any> {
            return [GameProxy.HIDE_DEV_WINDOW];
        }

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case GameProxy.HIDE_DEV_WINDOW: {
                    this.showDeveloper(false);
                    break;
                }
            }
        }

        public get pageView(): SettingWindow {
            return this.viewComponent;
        }
    }
}