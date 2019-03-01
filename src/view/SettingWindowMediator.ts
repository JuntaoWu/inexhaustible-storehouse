
namespace ies {

    export class SettingWindowMediator extends puremvc.Mediator implements puremvc.IMediator {
        public static NAME: string = "SettingWindowMediator";

        private proxy: GameProxy;

        public constructor(viewComponent: any) {
            super(SettingWindowMediator.NAME, viewComponent);
            super.initializeNotifier("ApplicationFacade");

            this.proxy = this.facade().retrieveProxy(GameProxy.NAME) as GameProxy;
            this.pageView.addEventListener(egret.Event.ADDED_TO_STAGE, this.initData, this);

            this.pageView.btnVolumeEffect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
            this.pageView.btnVolumeEffect.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
            this.pageView.btnVolumeEffect.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
            this.pageView.volumeEffectGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.volumeClick, this);

            this.pageView.btnVolumeBGM.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
            this.pageView.btnVolumeBGM.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => this.onMove(e, "bgm"), this);
            this.pageView.btnVolumeBGM.addEventListener(egret.TouchEvent.TOUCH_END, (e: egret.TouchEvent) => this.touchEnd(e, "bgm"), this);
            this.pageView.volumeBGMGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => this.volumeClick(e, "bgm"), this);
            
            this.pageView.switchEffect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchEffectClick, this);
            this.pageView.switchBG.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchBGClick, this);
            this.pageView.btnDeveloper.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showDeveloper, this);
            
        }

        public async initData() {
            this.pageView.showSetting = true;
            this.pageView.showDeveloper = false;
            this.pageView.switchEffect.selected = this.proxy.playerInfo.isSoundEffectOn;
            this.pageView.switchBG.selected = this.proxy.playerInfo.isSoundBGMOn;
            
            this.pageView.widthEffect = Math.floor(740 * this.proxy.playerInfo.volumeEffect);
            this.pageView.btnVolumeEffect.x = this.pageView.widthEffect + 300;
            this.pageView.widthBGM = Math.floor(740 * this.proxy.playerInfo.volumeBGM);
            this.pageView.btnVolumeBGM.x = this.pageView.widthBGM + 300;
        }

        private offsetX: number;
        private touchBegin(e: egret.TouchEvent): void {
            e.stopImmediatePropagation();
            console.log("TOUCH_BEGIN");
            this.offsetX = e.stageX - e.currentTarget.x;
        }
        private onMove(e: egret.TouchEvent, type?: string): void {
            e.stopImmediatePropagation();
            const currentX = Math.max(300, Math.min(1040, (e.stageX - this.offsetX)));
            this.setVolumeUI(currentX, type);
        }
        private touchEnd(e: egret.TouchEvent, type?: string): void {
            e.stopImmediatePropagation();
            this.setVolume(type);
        }

        private volumeClick(e: egret.TouchEvent, type?: string): void {
            const currentX = Math.max(300, Math.min(1040, (e.stageX - 440)));
            this.setVolumeUI(currentX, type);
            this.setVolume(type);
        }

        private setVolumeUI(currentX: number, type?: string) {
            if (type == "bgm") {
                this.pageView.btnVolumeBGM.x = currentX;
                this.pageView.widthBGM = currentX - 300;
            }
            else {
                this.pageView.btnVolumeEffect.x = currentX;
                this.pageView.widthEffect = currentX - 300;
            }
        }
        private setVolume(type?: string) {
            if (type == "bgm") {
                SoundPool.volumeBGM = this.proxy.playerInfo.volumeBGM = this.pageView.widthBGM / 740;
            }
            else {
                SoundPool.volumeEffect = this.proxy.playerInfo.volumeEffect = this.pageView.widthEffect / 740;
            }
            this.proxy.savePlayerInfoToStorage();
        }

        private switchEffectClick(e: egret.TouchEvent) {
            this.proxy.playerInfo.isSoundEffectOn = this.pageView.switchEffect.selected;
            this.proxy.savePlayerInfoToStorage();
        }

        private switchBGClick(e: egret.TouchEvent) {
            this.proxy.playerInfo.isSoundBGMOn = this.pageView.switchBG.selected;
            this.proxy.savePlayerInfoToStorage();
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