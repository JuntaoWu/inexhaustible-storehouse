
namespace ies {

    export class AlertWindow extends BasePanel {

        public constructor() {
            super();

            this.name = "alertWindow";
            this.skinName = "skins.ies.AlertWindow";
            this.addEventListener(eui.UIEvent.ADDED, this.createCompleteEvent, this);
            this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                this.close();
                this.cbk && this.cbk();
            },this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.width = this.stage.stageWidth;
            // this.scaleX = this.stage.stageWidth / 1920;
            this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        }

        public closeButton: eui.Button;
        public btnConfirm: eui.Button;

        public msg: string;
        public cbk: () => {};

        public setWindowMsg(data: { msg: string, cbk?: () => {}, confirmRes?: string, cancelRes?: string }) {
            console.log(data);
            this.msg = data.msg;
            this.cbk = data.cbk;
            const cancel = this.closeButton.getChildByName('imgRes') as eui.Image;
            cancel.source = data.cancelRes || "btn-cancel";
            const comfirm = this.btnConfirm.getChildByName('imgRes') as eui.Image;
            comfirm.source = data.confirmRes || "btn-alert-confirm";
        } 
    }
}