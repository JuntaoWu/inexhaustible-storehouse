
namespace ies {

    export class SettingWindow extends eui.Component {

        public constructor() {
            super();

            this.name = "settingWindow";
            this.skinName = "skins.ies.SettingWindow";
            this.addEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.btnVolumeEffect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
            this.btnVolumeEffect.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
            this.volumeEffectGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.volumeClick, this);

            this.btnVolumeBGM.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
            this.btnVolumeBGM.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => this.onMove(e, "bgm"), this);
            this.volumeBGMGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => this.volumeClick(e, "bgm"), this);
            
            this.removeEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
        }

        public widthEffect: number = 720;
        public widthBGM: number = 720;

        public volumeEffectGroup: eui.Group;
        public volumeBGMGroup: eui.Group;
        public btnVolumeEffect: eui.Button;
        public btnVolumeBGM: eui.Button;

        private offsetX: number;
        private touchBegin(e: egret.TouchEvent): void {
            e.stopImmediatePropagation();
            console.log("TOUCH_BEGIN");
            this.offsetX = e.stageX - e.currentTarget.x;
        }
        private onMove(e: egret.TouchEvent, type?: string): void {
            e.stopImmediatePropagation();
            const currentX = Math.max(140, Math.min(860, (e.stageX - this.offsetX)));
            this.setVolumeUI(currentX, type);
        }

        private volumeClick(e: egret.TouchEvent, type?: string): void {
            console.log(e.stageX);
            const currentX = Math.max(140, Math.min(860, (e.stageX - 300)));
            this.setVolumeUI(currentX, type);
        }

        private setVolumeUI(currentX: number, type?: string) {
            if (type == "bgm") {
                this.btnVolumeBGM.x = currentX;
                this.widthBGM = currentX - 140;
                SoundPool.volumeBGM = this.widthBGM / 720;
            }
            else {
                this.btnVolumeEffect.x = currentX;
                this.widthEffect = currentX - 140;
                SoundPool.volumeEffect = this.widthEffect / 720;
            }
        }
    }
}