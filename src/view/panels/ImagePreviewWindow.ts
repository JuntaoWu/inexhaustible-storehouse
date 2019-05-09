
namespace ies {

    export class ImagePreviewWindow extends BasePanel {

        public constructor() {
            super();

            this.name = "imagePreviewWindow";
            this.skinName = "skins.ies.ImagePreviewWindow";
            this.addEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            // this.width = this.stage.stageWidth;
            this.scaleX = this.stage.stageWidth / 1920;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        }

        public imgRes: string;

        public setImageRes(res: string) {
            this.imgRes = res;
            console.log(res);
        } 
    }
}