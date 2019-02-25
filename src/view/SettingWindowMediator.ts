
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
            this.pageView.volumeEffectGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.volumeClick, this);

            this.pageView.btnVolumeBGM.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
            this.pageView.btnVolumeBGM.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => this.onMove(e, "bgm"), this);
            this.pageView.volumeBGMGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => this.volumeClick(e, "bgm"), this);
            
            this.pageView.switchEffect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchEffectClick, this);
            this.pageView.switchBG.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchBGClick, this);
            this.pageView.btnDeveloper.addEventListener(egret.TouchEvent.TOUCH_TAP, () => this.showDeveloper(true), this);
            
            this.pageView.devWindow.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
            this.pageView.devWindow.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        }

        public async initData() {
            this.pageView.switchEffect.selected = this.proxy.playerInfo.isSoundEffectOn;
            this.pageView.switchBG.selected = this.proxy.playerInfo.isSoundBGMOn;
            this.pageView.showSetting = true;
            this.pageView.showDeveloper = false;
        }

        private touchBeginTime: number;
        private offsetX: number;
        private touchBegin(e: egret.TouchEvent): void {
            e.stopImmediatePropagation();
            console.log("TOUCH_BEGIN");
            this.touchBeginTime = new Date().getTime();
            this.offsetX = e.stageX - e.currentTarget.x;
        }
        private onMove(e: egret.TouchEvent, type?: string): void {
            e.stopImmediatePropagation();
            const currentX = Math.max(300, Math.min(1040, (e.stageX - this.offsetX)));
            this.setVolumeUI(currentX, type);
        }
        private touchEnd(e: egret.TouchEvent): void {
            e.stopImmediatePropagation();
            let touchEndTime: number = new Date().getTime();
            if (touchEndTime - this.touchBeginTime < 200) {
                this.showDeveloper(false);
            }
        }

        private volumeClick(e: egret.TouchEvent, type?: string): void {
            const currentX = Math.max(300, Math.min(1040, (e.stageX - 440)));
            this.setVolumeUI(currentX, type);
        }

        private setVolumeUI(currentX: number, type?: string) {
            if (type == "bgm") {
                this.pageView.btnVolumeBGM.x = currentX;
                this.pageView.widthBGM = currentX - 300;
                SoundPool.volumeBGM = this.pageView.widthBGM / 740;
            }
            else {
                this.pageView.btnVolumeEffect.x = currentX;
                this.pageView.widthEffect = currentX - 300;
                SoundPool.volumeEffect = this.pageView.widthEffect / 740;
            }
        }

        private switchEffectClick(e: egret.TouchEvent) {
            this.proxy.playerInfo.isSoundEffectOn = this.pageView.switchEffect.selected;
        }

        private switchBGClick(e: egret.TouchEvent) {
            this.proxy.playerInfo.isSoundBGMOn = this.pageView.switchBG.selected;
        }

        private showDeveloper(b: boolean) {
            this.pageView.showSetting = !b;
            this.pageView.showDeveloper = b;
        }

        public get pageView(): SettingWindow {
            return this.viewComponent;
        }
    }
}